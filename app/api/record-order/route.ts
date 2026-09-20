import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const orderData = await request.json();

    const rawPhone = (orderData.customerPhone || "N/A").toString().trim();
    // Prefix phone with ' if it starts with '+' or contains numbers to prevent Sheets from interpreting it as formula
    const customerPhone = rawPhone.startsWith("+") ? `'${rawPhone}` : rawPhone;

    const payload = {
      orderId: orderData.orderId || `ALV-${Date.now().toString().slice(-6)}`,
      timestamp: orderData.timestamp || new Date().toISOString(),
      customerName: orderData.customerName || "Customer",
      customerEmail: orderData.customerEmail || "N/A",
      customerPhone: customerPhone,
      shippingAddress: orderData.shippingAddress || "N/A",
      productName: orderData.productName || "Aluvion Pocket 4K",
      finish: orderData.finish || "Pearl White",
      quantity: orderData.quantity || 1,
      totalAmount: orderData.totalAmount !== undefined ? Number(orderData.totalAmount) : 27.0,
      currency: orderData.currency || "USD",
      paymentStatus: orderData.paymentStatus || "PAID",
      fulfillmentStatus: orderData.fulfillmentStatus || "Unfulfilled",
      paymentMethod: orderData.paymentMethod || "PayPal",
      paypalTransactionId: orderData.paypalTransactionId || orderData.hostedButtonId || "ZA4JPKKV2GVFY",
    };

    console.log("[Aluvion Order Recorded]:", payload);

    // Google Sheets Connector
    // Set GOOGLE_SHEETS_WEBHOOK_URL in environment variables (Vercel or .env.local)
    // Defaults to the user's active Google Apps Script web app URL
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
          console.log("[Google Sheets Connector] Successfully posted order to Google Sheets");
        } else {
          console.warn("[Google Sheets Connector] Failed to post to Sheets webhook:", response.status);
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
      { success: false, error: error.message || "Failed to process order" },
      { status: 500 }
    );
  }
}
