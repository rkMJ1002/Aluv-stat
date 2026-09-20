# Aluvion Google Sheets Custom Integration Connector

This connector automatically records all customer orders and verified PayPal transactions directly into your Google Sheets spreadsheet in real time.

---

## How It Works

1. When a customer pays via PayPal (Hosted Button `ZA4JPKKV2GVFY`), PayPal confirms the transaction.
2. The website redirects the customer to `/order-confirmation` and dispatches the order payload to the internal connector `/api/record-order`.
3. `/api/record-order` immediately posts the order data to your **Google Apps Script Web App URL** (`GOOGLE_SHEETS_WEBHOOK_URL`).
4. A new row is automatically appended to your Google Sheet with all order details!

---

## 3-Step Setup Guide

### Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.new) and create a new blank spreadsheet (e.g. name it `Aluvion Orders 2026`).

### Step 2: Add Google Apps Script
1. In your Google Sheet, click **Extensions** > **Apps Script**.
2. Delete any code in the editor, and paste the following script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Initialize headers and professional styling if sheet is blank
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Order ID",
        "Timestamp",
        "Customer Name",
        "Email",
        "Phone Number",
        "Shipping Address",
        "Product",
        "Finish",
        "Qty",
        "Total ($)",
        "Currency",
        "Payment Status",
        "Fulfillment Status",
        "Payment Method",
        "PayPal Transaction ID"
      ];
      sheet.appendRow(headers);

      // Header row styling
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#1E293B"); // Slate dark header
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(10);
      headerRange.setVerticalAlignment("middle");
      sheet.setRowHeight(1, 38);
      sheet.setFrozenRows(1);
    }

    // Sanitize phone number so Google Sheets treats it as plain text (never an equation #ERROR!)
    var rawPhone = data.customerPhone ? data.customerPhone.toString().trim() : "N/A";
    var safePhone = "'" + rawPhone.replace(/^'+/, "");

    var newRow = [
      data.orderId || "",
      data.timestamp ? new Date(data.timestamp).toLocaleString("en-US", { timeZoneName: "short" }) : new Date().toLocaleString(),
      data.customerName || "Customer",
      data.customerEmail || "",
      safePhone,
      data.shippingAddress || "",
      data.productName || "Aluvion Pocket 4K",
      data.finish || "Standard Kit",
      Number(data.quantity || 1),
      Number(data.totalAmount !== undefined ? data.totalAmount : 27.00),
      data.currency || "USD",
      data.paymentStatus || "PAID",
      data.fulfillmentStatus || "Unfulfilled",
      data.paymentMethod || "PayPal",
      data.paypalTransactionId || ""
    ];

    sheet.appendRow(newRow);
    var lastRow = sheet.getLastRow();

    // 1. Phone number plain text formatting
    sheet.getRange(lastRow, 5).setNumberFormat("@");

    // 2. Currency format on Total ($)
    sheet.getRange(lastRow, 10).setNumberFormat("$#,##0.00");

    // 3. Dropdown Menu for Payment Status (Column 12)
    var paymentValidation = SpreadsheetApp.newDataValidation()
      .requireValueInList(["PAID", "PENDING", "REFUNDED", "CANCELLED"], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(lastRow, 12).setDataValidation(paymentValidation);

    // 4. Dropdown Menu for Fulfillment Status (Column 13)
    var fulfillmentValidation = SpreadsheetApp.newDataValidation()
      .requireValueInList(["Unfulfilled", "Processing", "Shipped", "Delivered", "Cancelled"], true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(lastRow, 13).setDataValidation(fulfillmentValidation);

    // 5. Clean row formatting & alternating zebra striping
    sheet.setRowHeight(lastRow, 30);
    sheet.getRange(lastRow, 1, 1, 15).setVerticalAlignment("middle");
    if (lastRow % 2 === 1) {
      sheet.getRange(lastRow, 1, 1, 15).setBackground("#F8FAFC");
    } else {
      sheet.getRange(lastRow, 1, 1, 15).setBackground("#FFFFFF");
    }

    // Auto-fit columns for easy readability
    sheet.autoResizeColumns(1, 15);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", row: lastRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click the **Save** icon (disk icon).

### Step 3: Deploy as Web App
1. Click **Deploy** (top right) > **New deployment**.
2. Select type: **Web app** (gear icon).
3. Set:
   - **Execute as**: `Me` (your Google account).
   - **Who has access**: `Anyone` (this allows the webhook from your website to append rows).
4. Click **Deploy**. Authorize permissions if prompted by Google.
5. Copy the **Web App URL** (looks like `https://script.google.com/macros/s/.../exec`).

### Step 4: Connect to Your Aluvion Website
In your `.env.local` or Vercel Environment Variables, add:
```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Now, every order placed on the website or confirmed through PayPal will be logged directly into your Google Sheet!

---

## PayPal Return URL Setup (For Automatic Website Confirmation)

In your PayPal Account:
1. Go to **Pay & Get Paid** > **PayPal Buttons**.
2. Find Hosted Button **`ZA4JPKKV2GVFY`** (Aluvion Digicam).
3. Click **Edit Button Details**.
4. In Step 3 (*Customize advanced features*):
   - Check **"Take customers to this URL when they finish their checkout"**.
   - Enter your website confirmation URL: `https://www.aluvioncamera.com/order-confirmation` (or your Vercel URL `/order-confirmation`).
5. Save changes.
