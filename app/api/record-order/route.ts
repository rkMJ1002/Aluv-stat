import { NextResponse } from "next/server";

// In-memory rate limiting tracker (15 requests per minute per IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 15;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean up old entries periodically
  if (rateLimitMap.size > 1000) {
    rateLimitMap.forEach((value, key) => {
      if (value.resetAt < now) {
        rateLimitMap.delete(key);
      }
    });
  }

  if (!record || record.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

/**
 * Neutralizes CSV/Spreadsheet Formula Injection (CWE-1236).
 * Prepends a single quote (') if a string begins with formula triggers: '=', '+', '-', '@', '\t', '\r'.
 * Truncates values to prevent memory exhaustion and buffer inflation.
 */
function sanitizeSpreadsheetField(val: unknown, maxLen = 200): string {
  if (val === null || val === undefined) return "N/A";
  let str = String(val).trim();
  if (!str) return "N/A";

  // Prevent Google Sheets formula interpretation
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }

  return str.slice(0, maxLen);
}

export async function POST(request: Request) {
  try {
    // 1. Basic IP / Origin Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded. Please try again shortly." },
        { status: 429 }
      );
    }

    // 2. Parse and validate JSON payload
    let orderData: any;
    try {
      orderData = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    if (!orderData || typeof orderData !== "object") {
      return NextResponse.json(
        { success: false, error: "Missing order data" },
        { status: 400 }
      );
    }

    // 3. Strict field sanitization and bounds checking
    const quantityNum = parseInt(orderData.quantity, 10);
    const safeQuantity = Number.isFinite(quantityNum) && quantityNum > 0 ? Math.min(quantityNum, 100) : 1;

    const totalAmountNum = parseFloat(orderData.totalAmount);
    const safeTotalAmount =
      Number.isFinite(totalAmountNum) && totalAmountNum >= 0
        ? Math.min(totalAmountNum, 100000)
        : safeQuantity * 27.0;

    const payload = {
      orderId: sanitizeSpreadsheetField(
        orderData.orderId || `ALV-${Date.now().toString().slice(-6)}`,
        50
      ),
      timestamp: new Date().toISOString(),
      customerName: sanitizeSpreadsheetField(orderData.customerName || "Customer", 100),
      customerEmail: sanitizeSpreadsheetField(orderData.customerEmail || "N/A", 120),
      customerPhone: sanitizeSpreadsheetField(orderData.customerPhone || "N/A", 50),
      shippingAddress: sanitizeSpreadsheetField(orderData.shippingAddress || "N/A", 300),
      productName: sanitizeSpreadsheetField(orderData.productName || "Aluvion Pocket 4K", 100),
      finish: sanitizeSpreadsheetField(orderData.finish || "Pearl White", 50),
      quantity: safeQuantity,
      totalAmount: safeTotalAmount,
      currency: "USD",
      paymentStatus: sanitizeSpreadsheetField(orderData.paymentStatus || "PAID", 30),
      fulfillmentStatus: sanitizeSpreadsheetField(orderData.fulfillmentStatus || "Unfulfilled", 30),
      paymentMethod: sanitizeSpreadsheetField(orderData.paymentMethod || "PayPal", 50),
      paypalTransactionId: sanitizeSpreadsheetField(
        orderData.paypalTransactionId || orderData.hostedButtonId || "ZA4JPKKV2GVFY",
        80
      ),
    };

    console.log("[Aluvion Order Sanitized & Recorded]:", payload.orderId);

    // 4. Secure Google Sheets Delivery
    const sheetsWebhookUrl =
      process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbyuDjnaBXBL7lLj1uqZdhc3inTq5HqHu-FGsv_oD0E89lHwrYyUQl2uEWnXIjhxZaUXPg/exec";
    let sheetsNotified = false;

    if (sheetsWebhookUrl) {
      try {
        const response = await fetch(sheetsWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          redirect: "follow",
        });

        if (response.ok || response.status < 400) {
          sheetsNotified = true;
        } else {
          console.warn("[Google Sheets Connector] Sheets returned status:", response.status);
        }
      } catch (sheetErr) {
        console.error("[Google Sheets Connector Error]:", sheetErr);
      }
    }

    return NextResponse.json({
      success: true,
      order: payload,
      sheetsNotified,
    });
  } catch (error: any) {
    console.error("[Record Order API Error]:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
