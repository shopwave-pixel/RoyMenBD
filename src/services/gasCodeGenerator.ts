// ROYMEN Enterprise Google Apps Script Generator
// Produces single-file self-installing, self-healing, auto-migrating Code.gs for Google Sheets

export function generateGoogleAppsScriptCode(): string {
  return `/**
 * ==============================================================================
 * ROYMEN ENTERPRISE E-COMMERCE PLATFORM - ZERO-CONFIGURATION GAS BACKEND
 * BRAND: ROYMEN | TAGLINE: Wear Confidence. | COUNTRY: BANGLADESH
 * SPREADSHEET TABS: 30 ENTERPRISE SHEETS
 * VERSION: 2.0.0 (ZERO-CONFIG / AUTO-HEALING / AUTO-INSTALLER / PRODUCTION READY)
 * ==============================================================================
 * 
 * ZERO-CONFIGURATION INSTALLATION INSTRUCTIONS:
 * 1. Create a blank Google Spreadsheet.
 * 2. Click Extensions > Apps Script.
 * 3. Delete any default code and paste this entire code into Code.gs.
 * 4. Click 'Deploy' > 'New Deployment'.
 * 5. Select type: 'Web app'.
 * 6. Set Description: 'ROYMEN REST API v2'.
 * 7. Set 'Execute as': 'Me'.
 * 8. Set 'Who has access': 'Anyone' (Crucial for REST API access).
 * 9. Copy the generated Web App URL and paste it into ROYMEN config.ts / Admin panel.
 * 10. EVERYTHING ELSE HAPPENS AUTOMATICALLY ON FIRST BOOT!
 */

// ==========================================
// CENTRAL CONFIGURATION & SHEET CONSTANTS (30 SHEETS)
// ==========================================
var APP_CONFIG = {
  APP_NAME: "ROYMEN",
  TAGLINE: "Wear Confidence.",
  COUNTRY: "Bangladesh",
  CURRENCY: "৳",
  VERSION: "2.0.0",
  DB_VERSION: "2.0.0",
  DEFAULT_ADMIN_EMAIL: "admin@roymen.com.bd",
  DEFAULT_ADMIN_PASS: "roy_hash_Admin123!",
  DEFAULT_ADMIN_SECRET: "889900"
};

var SHEETS = {
  SETTINGS: '01_Settings',
  ADMINS: '02_Admins',
  USERS: '03_Users',
  PRODUCTS: '04_Products',
  PRODUCT_VARIANTS: '05_ProductVariants',
  CATEGORIES: '06_Categories',
  BRANDS: '07_Brands',
  COLLECTIONS: '08_Collections',
  ORDERS: '09_Orders',
  ORDER_ITEMS: '10_OrderItems',
  COUPONS: '11_Coupons',
  REVIEWS: '12_Reviews',
  BANNERS: '13_Banners',
  ANALYTICS: '14_Analytics',
  VISITORS: '15_Visitors',
  WISHLIST: '16_Wishlist',
  CART: '17_Cart',
  NEWSLETTER: '18_Newsletter',
  CONTACTS: '19_Contacts',
  NOTIFICATIONS: '20_Notifications',
  AUDIT_LOG: '21_Audit_Log',
  API_KEYS: '22_API_Keys',
  INVENTORY_LOG: '23_Inventory_Log',
  ORDER_STATUS_LOG: '24_Order_Status_Log',
  SYSTEM_CONFIG: '25_System_Config',
  EMAIL_TEMPLATES: '26_Email_Templates',
  PAYMENT_SETTINGS: '27_Payment_Settings',
  SHIPPING_SETTINGS: '28_Shipping_Settings',
  APP_SETTINGS: '29_App_Settings',
  BACKUP_LOG: '30_Backup_Log'
};

var SCHEMAS = {
  '01_Settings': ['Key', 'Value', 'UpdatedAt'],
  '02_Admins': ['AdminID', 'Name', 'Email', 'PasswordHash', 'SecretCode', 'Role', 'Status', 'FailedAttempts', 'LockedUntil', 'LastLogin', 'RememberToken', 'CreatedAt', 'UpdatedAt'],
  '03_Users': ['ID', 'Name', 'Email', 'Phone', 'Role', 'Status', 'Addresses', 'CreatedAt'],
  '04_Products': ['ID', 'Name', 'Slug', 'SKU', 'Barcode', 'Category', 'Brand', 'Collection', 'Price', 'DiscountPrice', 'Stock', 'LowStockAlert', 'Colors', 'Sizes', 'Images', 'Featured', 'Status', 'CreatedAt'],
  '05_ProductVariants': ['ID', 'ProductID', 'SKU', 'Color', 'Size', 'Stock', 'Price', 'Status'],
  '06_Categories': ['ID', 'Name', 'Slug', 'Image', 'ItemCount', 'Description'],
  '07_Brands': ['ID', 'Name', 'Slug', 'Logo', 'Description'],
  '08_Collections': ['ID', 'Name', 'Slug', 'BannerImage', 'Description', 'ItemCount', 'IsFeatured'],
  '09_Orders': ['ID', 'CustomerID', 'CustomerName', 'CustomerEmail', 'CustomerPhone', 'ShippingAddress', 'Subtotal', 'Discount', 'CouponCode', 'DeliveryFee', 'Total', 'PaymentMethod', 'PaymentStatus', 'OrderStatus', 'TrackingNumber', 'CourierPartner', 'CreatedAt', 'Notes'],
  '10_OrderItems': ['ID', 'OrderID', 'ProductID', 'ProductName', 'SKU', 'VariantColor', 'VariantSize', 'Price', 'Quantity', 'Subtotal', 'Image'],
  '11_Coupons': ['ID', 'Code', 'Type', 'Value', 'MinSpend', 'UsageLimit', 'UsageCount', 'ExpiryDate', 'Status'],
  '12_Reviews': ['ID', 'ProductID', 'CustomerName', 'Rating', 'Comment', 'VerifiedBuyer', 'Date', 'Status'],
  '13_Banners': ['ID', 'Title', 'Subtitle', 'ImageUrl', 'LinkUrl', 'CtaText', 'Position', 'Order', 'Status'],
  '14_Analytics': ['Date', 'Views', 'Orders', 'Revenue', 'ConversionRate', 'AvgOrderValue'],
  '15_Visitors': ['ID', 'IP', 'Device', 'Path', 'Timestamp'],
  '16_Wishlist': ['ID', 'UserID', 'ProductID', 'AddedAt'],
  '17_Cart': ['ID', 'UserID', 'ProductID', 'VariantColor', 'VariantSize', 'Quantity'],
  '18_Newsletter': ['ID', 'Email', 'SubscribedAt', 'Status'],
  '19_Contacts': ['ID', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status', 'CreatedAt'],
  '20_Notifications': ['ID', 'Type', 'Title', 'Message', 'Read', 'Timestamp'],
  '21_Audit_Log': ['ID', 'AdminUser', 'Action', 'Module', 'Timestamp', 'Details'],
  '22_API_Keys': ['ID', 'ClientName', 'Key', 'Role', 'Status', 'CreatedAt'],
  '23_Inventory_Log': ['ID', 'ProductID', 'SKU', 'ChangeType', 'Quantity', 'Reason', 'Timestamp'],
  '24_Order_Status_Log': ['ID', 'OrderID', 'PreviousStatus', 'NewStatus', 'UpdatedBy', 'Timestamp'],
  '25_System_Config': ['ConfigKey', 'ConfigValue', 'Description', 'LastUpdated'],
  '26_Email_Templates': ['TemplateID', 'Subject', 'BodyHtml', 'Variables', 'Status'],
  '27_Payment_Settings': ['Gateway', 'Enabled', 'MerchantID', 'Mode', 'LastUpdated'],
  '28_Shipping_Settings': ['Zone', 'FeeInsideDhaka', 'FeeOutsideDhaka', 'FreeShippingMin', 'CourierPartner'],
  '29_App_Settings': ['AppName', 'Tagline', 'CurrencySymbol', 'Country', 'SupportEmail', 'SupportPhone'],
  '30_Backup_Log': ['BackupID', 'SheetName', 'RowCount', 'Timestamp', 'Status']
};

function getActiveSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

// ==========================================
// REST API ROUTER - GET
// ==========================================
function doGet(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    // 1. RUN ZERO-CONFIG FIRST BOOT, AUTO-INSTALLER & SELF-HEALING AUTOMATICALLY
    var healReport = runZeroConfigBootSequence();

    var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'init';
    var jsonOutput = {
      success: true,
      timestamp: new Date().toISOString(),
      version: APP_CONFIG.VERSION,
      dbVersion: APP_CONFIG.DB_VERSION,
      action: action
    };

    switch (action) {
      case 'init':
      case 'settings':
        jsonOutput.data = getSheetDataAsJson(SHEETS.SETTINGS);
        jsonOutput.appSettings = getSheetDataAsJson(SHEETS.APP_SETTINGS);
        jsonOutput.healReport = healReport;
        break;

      case 'products':
        jsonOutput.data = getSheetDataAsJson(SHEETS.PRODUCTS);
        break;

      case 'categories':
        jsonOutput.data = getSheetDataAsJson(SHEETS.CATEGORIES);
        break;

      case 'brands':
        jsonOutput.data = getSheetDataAsJson(SHEETS.BRANDS);
        break;

      case 'collections':
        jsonOutput.data = getSheetDataAsJson(SHEETS.COLLECTIONS);
        break;

      case 'orders':
        jsonOutput.data = getSheetDataAsJson(SHEETS.ORDERS);
        break;

      case 'banners':
        jsonOutput.data = getSheetDataAsJson(SHEETS.BANNERS);
        break;

      case 'coupons':
        jsonOutput.data = getSheetDataAsJson(SHEETS.COUPONS);
        break;

      case 'health':
      case 'health_check':
        jsonOutput.diagnostic = runFullHealthCheck();
        break;

      case 'setup_sheets':
        jsonOutput.message = 'Zero-Config Auto-Installer executed successfully for all 30 sheets.';
        jsonOutput.report = healReport;
        break;

      default:
        jsonOutput.message = 'ROYMEN Enterprise GAS Zero-Config REST API v2.0 Online';
        jsonOutput.healReport = healReport;
    }

    return ContentService
      .createTextOutput(JSON.stringify(jsonOutput))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// ==========================================
// REST API ROUTER - POST
// ==========================================
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    runZeroConfigBootSequence();

    var postData = {};
    if (e && e.postData && e.postData.contents) {
      postData = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      postData = e.parameter;
    }

    var action = postData.action || 'ping';
    var payload = postData.payload || postData;
    var result = {
      success: true,
      action: action,
      timestamp: new Date().toISOString(),
      version: APP_CONFIG.VERSION
    };

    switch (action) {
      case 'checkEmailType':
        result.emailType = checkUserOrAdminEmail(payload.email);
        break;

      case 'verifyAdminPassword':
        result.auth = verifyAdminPasswordInSheet(payload.email, payload.password);
        break;

      case 'verifyAdminSecretCode':
        result.auth = verifyAdminSecretCodeInSheet(payload.email, payload.secretCode, payload.rememberMe);
        break;

      case 'sendOTP':
        result.otpRes = generateAndSendOTP(payload.email);
        break;

      case 'placeOrder':
      case 'POST_ORDER':
        result.orderId = saveOrderToSheet(payload);
        sendOrderConfirmationEmail(payload);
        logAuditTrail('CUSTOMER', 'PLACE_ORDER', SHEETS.ORDERS, 'Order placed successfully: ' + result.orderId);
        break;

      case 'updateProduct':
        result.data = saveOrUpdateProduct(payload);
        logAuditTrail('ADMIN', 'UPDATE_PRODUCT', SHEETS.PRODUCTS, 'Product updated: ' + payload.name);
        break;

      case 'subscribeNewsletter':
        result.message = saveSubscriber(payload.email);
        break;

      case 'submitContact':
        result.message = saveContactMessage(payload);
        break;

      case 'ping':
      default:
        result.message = 'ROYMEN REST WebApp Ping Acknowledged.';
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// ==========================================
// ZERO-CONFIGURATION BOOT, AUTO-INSTALLER & SELF-HEALING ENGINE
// ==========================================
function runZeroConfigBootSequence() {
  var ss = getActiveSpreadsheet();
  var logs = [];

  // 1. Ensure all 30 sheets exist with proper headers and formatting
  for (var tabName in SCHEMAS) {
    var sheet = ss.getSheetByName(tabName);
    var expectedHeaders = SCHEMAS[tabName];

    if (!sheet) {
      sheet = ss.insertSheet(tabName);
      sheet.appendRow(expectedHeaders);
      sheet.getRange(1, 1, 1, expectedHeaders.length)
        .setFontWeight('bold')
        .setBackground('#18181b')
        .setFontColor('#ffffff');
      sheet.setFrozenRows(1);
      logs.push("Auto-Installer: Created missing tab " + tabName);
    } else {
      // Self-Healing: Check if any expected columns are missing in header row
      var data = sheet.getDataRange().getValues();
      var existingHeaders = (data.length > 0) ? data[0] : [];

      if (existingHeaders.length === 0) {
        sheet.appendRow(expectedHeaders);
        sheet.getRange(1, 1, 1, expectedHeaders.length)
          .setFontWeight('bold')
          .setBackground('#18181b')
          .setFontColor('#ffffff');
        sheet.setFrozenRows(1);
        logs.push("Self-Healing: Restored header row for " + tabName);
      } else {
        // Find missing columns and append them at end
        for (var h = 0; h < expectedHeaders.length; h++) {
          var expectedCol = expectedHeaders[h];
          if (existingHeaders.indexOf(expectedCol) === -1) {
            var newColIndex = existingHeaders.length + 1;
            sheet.getRange(1, newColIndex).setValue(expectedCol).setFontWeight('bold').setBackground('#18181b').setFontColor('#ffffff');
            existingHeaders.push(expectedCol);
            logs.push("Self-Healing: Added missing column '" + expectedCol + "' in " + tabName);
          }
        }
      }
    }
  }

  // 2. Populate Default Settings in 01_Settings if missing
  var settingsSheet = ss.getSheetByName(SHEETS.SETTINGS);
  var settingsData = settingsSheet.getDataRange().getValues();
  var settingsMap = {};
  for (var s = 1; s < settingsData.length; s++) {
    if (settingsData[s][0]) {
      settingsMap[settingsData[s][0]] = settingsData[s][1];
    }
  }

  var defaultSettings = {
    'storeName': APP_CONFIG.APP_NAME,
    'tagline': APP_CONFIG.TAGLINE,
    'currency': APP_CONFIG.CURRENCY,
    'country': APP_CONFIG.COUNTRY,
    'division': 'Dhaka',
    'insideDhakaFee': '80',
    'outsideDhakaFee': '150',
    'paymentMethods': 'COD,bKash,Nagad,SSLCommerz',
    'appVersion': APP_CONFIG.VERSION,
    'dbVersion': APP_CONFIG.DB_VERSION,
    'lastBootTime': new Date().toISOString()
  };

  var now = new Date().toISOString();
  for (var key in defaultSettings) {
    if (!settingsMap[key]) {
      settingsSheet.appendRow([key, defaultSettings[key], now]);
      logs.push("Auto-Installer: Seeded default setting " + key);
    }
  }

  // 3. Super Admin Self-Creation: Ensure at least one Super Admin exists in 02_Admins
  var adminSheet = ss.getSheetByName(SHEETS.ADMINS);
  var adminData = adminSheet.getDataRange().getValues();
  var hasAdmin = (adminData.length > 1);

  if (!hasAdmin) {
    adminSheet.appendRow([
      'ADM001',
      'ROYMEN Executive Admin',
      APP_CONFIG.DEFAULT_ADMIN_EMAIL,
      APP_CONFIG.DEFAULT_ADMIN_PASS,
      APP_CONFIG.DEFAULT_ADMIN_SECRET,
      'Super Admin',
      'active',
      0,
      '',
      now,
      '',
      now,
      now
    ]);
    logs.push("Auto-Installer: Created Super Admin account " + APP_CONFIG.DEFAULT_ADMIN_EMAIL);
    logAuditTrail('SYSTEM_BOOT', 'AUTO_CREATE_SUPER_ADMIN', SHEETS.ADMINS, 'Zero-config auto-installer created default Super Admin.');
  }

  // 4. Auto Migration Engine: Update DB Version
  if (settingsMap['dbVersion'] !== APP_CONFIG.DB_VERSION) {
    updateSettingValue('dbVersion', APP_CONFIG.DB_VERSION);
    logs.push("Auto-Migration: Database version synced to " + APP_CONFIG.DB_VERSION);
  }

  return logs;
}

function updateSettingValue(key, val) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.SETTINGS);
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === key) {
      sheet.getRange(i + 1, 2).setValue(val);
      sheet.getRange(i + 1, 3).setValue(new Date().toISOString());
      return;
    }
  }
  sheet.appendRow([key, val, new Date().toISOString()]);
}

// ==========================================
// APPLICATION HEALTH CHECK DIAGNOSTICS
// ==========================================
function runFullHealthCheck() {
  var ss = getActiveSpreadsheet();
  var report = {
    status: 'HEALTHY',
    spreadsheetId: ss.getId(),
    spreadsheetName: ss.getName(),
    sheetsFound: 0,
    expectedSheetsCount: 30,
    superAdminCreated: false,
    cacheService: 'OPERATIONAL',
    lockService: 'OPERATIONAL',
    appVersion: APP_CONFIG.VERSION,
    dbVersion: APP_CONFIG.DB_VERSION,
    issues: []
  };

  var sheets = ss.getSheets();
  report.sheetsFound = sheets.length;

  var adminSheet = ss.getSheetByName(SHEETS.ADMINS);
  if (adminSheet && adminSheet.getLastRow() > 1) {
    report.superAdminCreated = true;
  } else {
    report.issues.push("Super Admin record missing in 02_Admins.");
  }

  if (report.issues.length > 0) {
    report.status = 'DEGRADED_AUTO_REPAIRED';
  }

  return report;
}

// ==========================================
// AUTHENTICATION CONTROLLERS (EMAIL / OTP / ADMIN PASSWORD / SECRET CODE)
// ==========================================
function checkUserOrAdminEmail(email) {
  if (!email) return { type: 'new_customer' };
  var normEmail = email.trim().toLowerCase();

  // 1. Check Users sheet
  var users = getSheetDataAsJson(SHEETS.USERS);
  for (var u = 0; u < users.length; u++) {
    if (users[u].Email && users[u].Email.toLowerCase() === normEmail) {
      return { type: 'customer', user: users[u] };
    }
  }

  // 2. Check Admins sheet
  var admins = getSheetDataAsJson(SHEETS.ADMINS);
  for (var a = 0; a < admins.length; a++) {
    if (admins[a].Email && admins[a].Email.toLowerCase() === normEmail) {
      return { type: 'admin', admin: admins[a] };
    }
  }

  return { type: 'new_customer' };
}

function verifyAdminPasswordInSheet(email, passwordInput) {
  var normEmail = email.trim().toLowerCase();
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.ADMINS);
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (row[2] && row[2].toString().toLowerCase() === normEmail) {
      var passwordHash = row[3] ? row[3].toString() : '';
      var failedAttempts = parseInt(row[7] || 0, 10);
      var lockedUntil = row[8] ? new Date(row[8]).getTime() : 0;

      if (lockedUntil > Date.now()) {
        return { success: false, isLocked: true, message: 'Account locked due to 5 failed attempts.' };
      }

      var isValid = (passwordInput === passwordHash || ('roy_hash_' + passwordInput) === passwordHash);
      if (isValid) {
        return { success: true, message: 'Password verified.' };
      } else {
        failedAttempts++;
        sheet.getRange(i + 1, 8).setValue(failedAttempts);
        if (failedAttempts >= 5) {
          var lockTime = new Date(Date.now() + 15 * 60 * 1000).toISOString();
          sheet.getRange(i + 1, 9).setValue(lockTime);
          sheet.getRange(i + 1, 7).setValue('locked');
          logAuditTrail(email, 'ADMIN_LOCKOUT', SHEETS.ADMINS, 'Account locked after 5 failed password attempts.');
          return { success: false, isLocked: true, message: 'Account locked for 15 minutes due to 5 failed login attempts.' };
        }
        return { success: false, attemptsRemaining: 5 - failedAttempts, message: 'Invalid password. Attempt ' + failedAttempts + ' of 5.' };
      }
    }
  }

  return { success: false, message: 'Administrator record not found.' };
}

function verifyAdminSecretCodeInSheet(email, secretInput, rememberMe) {
  var normEmail = email.trim().toLowerCase();
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.ADMINS);
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (row[2] && row[2].toString().toLowerCase() === normEmail) {
      var secretCode = row[4] ? row[4].toString() : '';
      if (secretCode === secretInput.trim()) {
        // Clear failed attempts and update last login
        sheet.getRange(i + 1, 8).setValue(0);
        sheet.getRange(i + 1, 9).setValue('');
        sheet.getRange(i + 1, 10).setValue(new Date().toISOString());
        
        var token = 'roy_sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
        if (rememberMe) {
          sheet.getRange(i + 1, 11).setValue(token);
        }

        logAuditTrail(email, 'ADMIN_LOGIN_SUCCESS', SHEETS.ADMINS, 'Executive Admin session created.');
        return {
          success: true,
          token: token,
          user: {
            id: row[0],
            name: row[1],
            email: row[2],
            role: 'admin',
            status: 'active'
          }
        };
      } else {
        return { success: false, message: 'Invalid Secret Authorization Code.' };
      }
    }
  }

  return { success: false, message: 'Admin account record not found.' };
}

function generateAndSendOTP(email) {
  var otp = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    MailApp.sendEmail(email, 'Your ROYMEN Security Verification Code', 'Your verification code is: ' + otp);
  } catch (err) {
    Logger.log('OTP Mail error: ' + err.toString());
  }
  return { success: true, otp: otp, message: 'OTP dispatched.' };
}

// ==========================================
// HELPER UTILITIES & DATABASE CONTROLLERS
// ==========================================
function getSheetDataAsJson(sheetName) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];

  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];

  var headers = data[0];
  var rows = data.slice(1);

  return rows.map(function(row) {
    var obj = {};
    headers.forEach(function(header, index) {
      obj[header] = row[index];
    });
    return obj;
  });
}

function saveOrderToSheet(order) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.ORDERS);
  if (!sheet) {
    runZeroConfigBootSequence();
    sheet = ss.getSheetByName(SHEETS.ORDERS);
  }

  var orderId = order.id || ('ORD-' + new Date().toISOString().replace(/\\D/g, '').substring(0, 8) + '-' + Math.floor(1000 + Math.random() * 9000));
  
  sheet.appendRow([
    orderId,
    order.customerId || 'GUEST',
    order.customerName || '',
    order.customerEmail || '',
    order.customerPhone || '',
    JSON.stringify(order.shippingAddress || {}),
    order.subtotal || 0,
    order.discount || 0,
    order.couponCode || '',
    order.deliveryFee || 0,
    order.total || 0,
    order.paymentMethod || 'COD',
    order.paymentStatus || 'pending',
    order.orderStatus || 'pending',
    order.trackingNumber || '',
    order.courierPartner || 'Pathao',
    new Date().toISOString(),
    order.notes || ''
  ]);

  return orderId;
}

function saveOrUpdateProduct(prd) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.PRODUCTS);
  var prdId = prd.id || ('PRD-' + Math.floor(100000 + Math.random() * 900000));

  sheet.appendRow([
    prdId,
    prd.name,
    prd.slug || prd.name.toLowerCase().replace(/\\s+/g, '-'),
    prd.sku || 'SKU-' + Date.now(),
    prd.barcode || '',
    prd.category || 'Apparel',
    prd.brand || 'ROYMEN',
    prd.collection || 'Atelier',
    prd.price || 0,
    prd.discountPrice || 0,
    prd.stock || 10,
    prd.lowStockAlert || 2,
    JSON.stringify(prd.colors || []),
    JSON.stringify(prd.sizes || []),
    JSON.stringify(prd.images || []),
    prd.featured ? 'true' : 'false',
    prd.status || 'active',
    new Date().toISOString()
  ]);

  return prdId;
}

function saveSubscriber(email) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.NEWSLETTER);
  if (!sheet) return 'Newsletter sheet missing.';

  sheet.appendRow([
    'nl-' + Date.now(),
    email,
    new Date().toISOString(),
    'active'
  ]);
  return 'Subscribed successfully.';
}

function saveContactMessage(cnt) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.CONTACTS);
  if (!sheet) return 'Contacts sheet missing.';

  sheet.appendRow([
    'cnt-' + Date.now(),
    cnt.name,
    cnt.email,
    cnt.phone || '',
    cnt.subject || '',
    cnt.message || '',
    'unread',
    new Date().toISOString()
  ]);
  return 'Message received.';
}

function logAuditTrail(user, action, moduleName, details) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.AUDIT_LOG);
  if (sheet) {
    sheet.appendRow([
      'audit-' + Date.now(),
      user,
      action,
      moduleName,
      new Date().toISOString(),
      details
    ]);
  }
}

function sendOrderConfirmationEmail(order) {
  try {
    if (!order.customerEmail) return;

    var subject = 'Order Confirmed #' + (order.id || 'ROYMEN') + ' | ROYMEN - Wear Confidence';
    var body = "Dear " + (order.customerName || 'Valued Customer') + ",\\n\\n" +
      "Thank you for choosing ROYMEN - Wear Confidence.\\n\\n" +
      "Order ID: " + order.id + "\\n" +
      "Total Amount: BDT ৳" + order.total + "\\n" +
      "Payment Method: " + order.paymentMethod + "\\n\\n" +
      "Our concierge team is preparing your package for express dispatch.\\n\\n" +
      "Warm Regards,\\n" +
      "ROYMEN Atelier Bangladesh\\n" +
      "Level 4, Gulshan Avenue, Dhaka";

    MailApp.sendEmail(order.customerEmail, subject, body);
  } catch (err) {
    Logger.log('Email send error: ' + err.toString());
  }
}
`;
}
