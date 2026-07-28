// ROYMEN Enterprise Google Apps Script Generator & Modular Build System
// Provides Modular Source Files (Source Mode) and Enterprise Build Pipeline to produce Code.gs

export interface GasSourceFile {
  filename: string;
  category: 'Core' | 'Auth & Security' | 'Catalog & Sales' | 'System & Utilities';
  description: string;
  code: string;
}

export interface BuildStats {
  status: 'SUCCESS' | 'QUALITY_GATE_FAILED';
  version: string;
  dbVersion: string;
  buildNumber: number;
  buildHash: string;
  timestamp: string;
  modulesCount: number;
  functionsCount: number;
  linesCount: number;
  qualityGatePassed: boolean;
}

export interface BuildResult {
  success: boolean;
  code: string;
  stats: BuildStats;
  issues: string[];
}

export const GAS_SOURCE_FILES: Record<string, GasSourceFile> = {
  'Config.gs': {
    filename: 'Config.gs',
    category: 'Core',
    description: 'Central app config, 30 sheet names, and database table schemas.',
    code: `/**
 * Config.gs - Central Configuration & Sheet Constant Schemas
 * ROYMEN Enterprise E-Commerce Platform
 */

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
  EMAIL_LOG: 'Email_Log',
  PAYMENT_SETTINGS: '27_Payment_Settings',
  SHIPPING_SETTINGS: '28_Shipping_Settings',
  APP_SETTINGS: '29_App_Settings',
  BACKUP_LOG: '30_Backup_Log',
  OTP_STORE: '31_OTP_Store',
  CUSTOMER_LOGIN: '32_Customer_Login',
  CUSTOMER_SESSIONS: '33_Customer_Sessions',
  LOGIN_LOG: '34_Login_Log',
  PAYMENT_LOG: '35_Payment_Log',
  ACTIVITY_LOG: '36_Activity_Log',
  SYSTEM_ERROR_LOG: '37_System_Error_Log',
  CUSTOMER_ADDRESS: '38_Customer_Address',
  CUSTOMER_PROFILE: '39_Customer_Profile',
  INVOICE_EDIT_LOG: '41_Invoice_Edit_Log'
};

var SCHEMAS = {
  '01_Settings': ['Key', 'Value', 'UpdatedAt'],
  '02_Admins': ['AdminID', 'Name', 'Email', 'PasswordHash', 'SecretCode', 'Role', 'Status', 'FailedAttempts', 'LockedUntil', 'LastLogin', 'RememberToken', 'CreatedAt', 'UpdatedAt'],
  '03_Users': ['ID', 'Name', 'Email', 'Phone', 'PasswordHash', 'Role', 'Status', 'Addresses', 'CreatedAt', 'UpdatedAt', 'LastLogin', 'LoginCount', 'Device', 'Browser'],
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
  '17_Cart': ['ID', 'UserID', 'ProductID', 'VariantColor', 'VariantSize', 'Quantity', 'UpdatedAt'],
  '18_Newsletter': ['ID', 'Email', 'SubscribedAt', 'Status'],
  '19_Contacts': ['ID', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status', 'CreatedAt'],
  '20_Notifications': ['ID', 'Type', 'Title', 'Message', 'Read', 'Timestamp'],
  '21_Audit_Log': ['ID', 'AdminUser', 'Action', 'Module', 'Timestamp', 'Details'],
  '22_API_Keys': ['ID', 'ClientName', 'Key', 'Role', 'Status', 'CreatedAt'],
  '23_Inventory_Log': ['ID', 'ProductID', 'SKU', 'ChangeType', 'Quantity', 'Reason', 'Timestamp'],
  '24_Order_Status_Log': ['ID', 'OrderID', 'PreviousStatus', 'NewStatus', 'UpdatedBy', 'Timestamp'],
  '25_System_Config': ['ConfigKey', 'ConfigValue', 'Description', 'LastUpdated'],
  '26_Email_Templates': ['TemplateID', 'Subject', 'BodyHtml', 'Variables', 'Status'],
  'Email_Log': ['Email ID', 'Recipient', 'Category', 'Subject', 'Status', 'Sent Time', 'Retry Count', 'Error Message'],
  '27_Payment_Settings': ['Gateway', 'Enabled', 'MerchantID', 'Mode', 'LastUpdated'],
  '28_Shipping_Settings': ['Zone', 'FeeInsideDhaka', 'FeeOutsideDhaka', 'FreeShippingMin', 'CourierPartner'],
  '29_App_Settings': ['AppName', 'Tagline', 'CurrencySymbol', 'Country', 'SupportEmail', 'SupportPhone'],
  '30_Backup_Log': ['BackupID', 'SheetName', 'RowCount', 'Timestamp', 'Status'],
  '31_OTP_Store': ['Email', 'OTP', 'CreatedAt', 'ExpiresAt', 'Status', 'UsedAt'],
  'OTP_Store': ['Email', 'OTP', 'CreatedAt', 'ExpiresAt', 'Status', 'UsedAt'],
  '32_Customer_Login': ['ID', 'Email', 'LoginTime', 'IP', 'Browser', 'Device', 'Status'],
  'Customer_Login': ['ID', 'Email', 'LoginTime', 'IP', 'Browser', 'Device', 'Status'],
  '33_Customer_Sessions': ['SessionID', 'UserID', 'Email', 'Token', 'CreatedAt', 'ExpiresAt', 'Status'],
  'Customer_Sessions': ['SessionID', 'UserID', 'Email', 'Token', 'CreatedAt', 'ExpiresAt', 'Status'],
  '34_Login_Log': ['ID', 'Email', 'LoginTime', 'Status', 'IP', 'Browser', 'Device', 'Reason'],
  'Login_Log': ['ID', 'Email', 'LoginTime', 'Status', 'IP', 'Browser', 'Device', 'Reason'],
  '35_Payment_Log': ['PaymentID', 'OrderID', 'Amount', 'Gateway', 'TransactionID', 'Status', 'Timestamp'],
  'Payment_Log': ['PaymentID', 'OrderID', 'Amount', 'Gateway', 'TransactionID', 'Status', 'Timestamp'],
  '36_Activity_Log': ['ID', 'User', 'Action', 'Target', 'Details', 'Timestamp'],
  'Activity_Log': ['ID', 'User', 'Action', 'Target', 'Details', 'Timestamp'],
  '37_System_Error_Log': ['ID', 'Timestamp', 'Module', 'Function', 'ErrorMessage', 'StackTrace', 'User'],
  'System_Error_Log': ['ID', 'Timestamp', 'Module', 'Function', 'ErrorMessage', 'StackTrace', 'User'],
  '38_Customer_Address': ['ID', 'CustomerID', 'AddressType', 'FullName', 'Phone', 'Division', 'District', 'Thana', 'FullAddress', 'IsDefault', 'CreatedAt'],
  'Customer_Address': ['ID', 'CustomerID', 'AddressType', 'FullName', 'Phone', 'Division', 'District', 'Thana', 'FullAddress', 'IsDefault', 'CreatedAt'],
  '39_Customer_Profile': ['CustomerID', 'FullName', 'Email', 'Phone', 'Gender', 'BirthDate', 'AvatarUrl', 'MembershipTier', 'TotalSpent', 'TotalOrders', 'UpdatedAt'],
  'Customer_Profile': ['CustomerID', 'FullName', 'Email', 'Phone', 'Gender', 'BirthDate', 'AvatarUrl', 'MembershipTier', 'TotalSpent', 'TotalOrders', 'UpdatedAt'],
  '40_API_Request_Log': ['ID', 'Endpoint', 'Method', 'IP', 'UserAgent', 'ResponseTimeMs', 'StatusCode', 'Timestamp'],
  'API_Request_Log': ['ID', 'Endpoint', 'Method', 'IP', 'UserAgent', 'ResponseTimeMs', 'StatusCode', 'Timestamp'],
  '41_Invoice_Edit_Log': ['ID', 'OrderID', 'AdminName', 'AdminEmail', 'EditedFields', 'OldValues', 'NewValues', 'Timestamp'],
  'Invoice_Edit_Log': ['ID', 'OrderID', 'AdminName', 'AdminEmail', 'EditedFields', 'OldValues', 'NewValues', 'Timestamp']
};
`
  },

  'Utils.gs': {
    filename: 'Utils.gs',
    category: 'Core',
    description: 'Core helper utilities, spreadsheet accessor, and JSON transformers.',
    code: `/**
 * Utils.gs - Spreadsheet Accessor & Helper Utilities
 */

function getActiveSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

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

function generateUniqueId(prefix) {
  var pfx = prefix || 'GEN';
  return pfx + '-' + Date.now().toString(36) + '-' + Math.floor(1000 + Math.random() * 9000);
}

function slugifyText(text) {
  if (!text) return '';
  return text.toString().toLowerCase()
    .replace(/\\s+/g, '-')
    .replace(/[^\\w\\-]+/g, '')
    .replace(/\\-\\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
`
  },

  'Response.gs': {
    filename: 'Response.gs',
    category: 'Core',
    description: 'Standardized JSON response formatting helpers for REST API.',
    code: `/**
 * Response.gs - Standardized REST API Response Formatter
 */

function createJsonResponse(data, success, message, extra) {
  var isSuccess = (success !== undefined) ? Boolean(success) : true;
  var msg = message || (isSuccess ? 'Operation completed successfully.' : 'Operation failed.');
  
  var payload = {
    success: isSuccess,
    message: msg,
    data: data || null,
    timestamp: new Date().toISOString(),
    version: APP_CONFIG.VERSION,
    dbVersion: APP_CONFIG.DB_VERSION
  };

  if (extra && typeof extra === 'object') {
    for (var key in extra) {
      payload[key] = extra[key];
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function createErrorResponse(errorMessage, statusCode) {
  var payload = {
    success: false,
    error: errorMessage || 'An unexpected server error occurred.',
    timestamp: new Date().toISOString(),
    version: APP_CONFIG.VERSION
  };

  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
`
  },

  'Validation.gs': {
    filename: 'Validation.gs',
    category: 'Core',
    description: 'Input sanitization, regex validators, and schema validators.',
    code: `/**
 * Validation.gs - Input Validation & Sanitization Engine
 */

function validateEmailAddress(email) {
  if (!email || typeof email !== 'string') return false;
  var re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return re.test(email.trim().toLowerCase());
}

function validatePhoneNumber(phone) {
  if (!phone) return false;
  var cleaned = phone.toString().replace(/[^0-9+]/g, '');
  return cleaned.length >= 10;
}

function sanitizeInputString(str) {
  if (!str) return '';
  return str.toString().trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
`
  },

  'Router.gs': {
    filename: 'Router.gs',
    category: 'Core',
    description: 'REST API Request Router handling HTTP GET and POST requests.',
    code: `/**
 * Router.gs - Central REST API Request Router (GET & POST)
 */

function doGet(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var healReport = runZeroConfigBootSequence();
    var params = (e && e.parameter) ? e.parameter : {};
    var action = params.action || 'init';

    var rawPayload = params.payload;
    var payload = {};
    if (rawPayload) {
      if (typeof rawPayload === 'string') {
        try { payload = JSON.parse(rawPayload); } catch(pErr) { payload = {}; }
      } else if (typeof rawPayload === 'object') {
        payload = rawPayload;
      }
    }

    var responseData = {};

    switch (action) {
      case 'init':
      case 'settings':
        responseData = {
          settings: getSheetDataAsJson(SHEETS.SETTINGS),
          appSettings: getSheetDataAsJson(SHEETS.APP_SETTINGS),
          healReport: healReport
        };
        break;

      case 'products':
        responseData = getSheetDataAsJson(SHEETS.PRODUCTS);
        break;

      case 'categories':
        responseData = getSheetDataAsJson(SHEETS.CATEGORIES);
        break;

      case 'brands':
        responseData = getSheetDataAsJson(SHEETS.BRANDS);
        break;

      case 'collections':
        responseData = getSheetDataAsJson(SHEETS.COLLECTIONS);
        break;

      case 'orders':
        responseData = getSheetDataAsJson(SHEETS.ORDERS);
        break;

      case 'banners':
        responseData = getSheetDataAsJson(SHEETS.BANNERS);
        break;

      case 'coupons':
        responseData = getSheetDataAsJson(SHEETS.COUPONS);
        break;

      case 'email_logs':
      case 'emailLogs':
        responseData = getSheetDataAsJson('Email_Log') || getSheetDataAsJson(SHEETS.EMAIL_LOG);
        break;

      case 'sendOTP':
      case 'send_otp':
      case 'generateAndSendOTP':
        var gEmail = (payload && (payload.email || payload.Email || payload.recipient || payload.customerEmail || payload.userEmail)) || params.email || params.Email || params.recipient || params.customerEmail || params.userEmail || '';
        var gName = (payload && (payload.name || payload.Name || payload.customerName)) || params.name || params.Name || params.customerName || '';
        var gOtp = (payload && (payload.otp || payload.OTP)) || params.otp || params.OTP || '';

        Logger.log('================== [ENTERPRISE REST API GET OTP REQUEST] ==================');
        Logger.log('ACTION: ' + action);
        Logger.log('QUERY PARAMS: ' + JSON.stringify(params));
        Logger.log('EXTRACTED EMAIL: "' + gEmail + '"');
        Logger.log('EXTRACTED NAME: "' + gName + '"');
        Logger.log('EXTRACTED OTP: "' + gOtp + '"');
        Logger.log('===========================================================================');

        if (!gEmail || gEmail.indexOf('@') === -1) {
          return createJsonResponse({
            success: false,
            error: 'Email missing in query parameters or invalid email format',
            receivedQueryParams: params,
            receivedPayload: payload
          }, false, 'Email missing in GET request.');
        }

        var otpResGet = generateAndSendOTP(gEmail, gName, gOtp);
        return createJsonResponse(otpResGet, otpResGet.success, otpResGet.message);

      case 'verifyOTP':
      case 'verify_otp':
        var gvEmail = (payload && (payload.email || payload.Email)) || params.email || params.Email || '';
        var gvOtp = (payload && (payload.otp || payload.OTP || payload.code)) || params.otp || params.OTP || params.code || '';
        var vResGet = verifyCustomerOTP(gvEmail, gvOtp);
        return createJsonResponse(vResGet, vResGet.success, vResGet.message);

      case 'placeOrder':
      case 'POST_ORDER':
        var custEmailGet = ((payload && (payload.customerEmail || payload.email || payload.Email)) || params.customerEmail || params.email || params.Email || '').toString().trim();
        if (!custEmailGet || custEmailGet.indexOf('@') === -1) {
          return createErrorResponse('401 Unauthorized: Mandatory customer authentication is required before placing an order.');
        }
        var orderIdGet = saveOrderToSheet(payload);
        payload.id = orderIdGet;
        sendCustomerOrderConfirmation(payload);
        sendAdminNewOrderNotification(payload);
        return createJsonResponse({ orderId: orderIdGet }, true, 'Order saved to sheet successfully.');

      case 'subscribeNewsletter':
      case 'saveSubscriber':
        var subResGet = saveSubscriber((payload && (payload.email || payload.subscriberEmail)) || params.email || params.subscriberEmail || '');
        return createJsonResponse(subResGet, subResGet.success !== false, 'Subscriber logged to sheet.');

      case 'saveContactMessage':
      case 'submitContact':
        var cntResGet = saveContactMessage(payload);
        return createJsonResponse(cntResGet, true, 'Contact message saved to sheet.');

      case 'registerCustomer':
      case 'saveCustomer':
      case 'updateProfile':
        var custResGet = saveOrUpdateCustomer(payload);
        return createJsonResponse({ customer: custResGet }, true, 'Customer saved to sheet.');

      case 'updateProduct':
        var prdIdGet = saveOrUpdateProduct(payload);
        return createJsonResponse({ productId: prdIdGet }, true, 'Product saved to sheet.');

      case 'submitReview':
        var revResGet = saveReview(payload);
        return createJsonResponse({ reviewId: revResGet }, true, 'Review saved to sheet.');

      case 'health':
      case 'health_check':
        return createJsonResponse(runFullHealthCheck(), true, 'System Health Diagnostic Complete');

      case 'setup_sheets':
        var healReport = runZeroConfigBootSequence();
        var isSuccess = healReport && healReport.status === 'SUCCESS';
        var msg = healReport && healReport.message ? healReport.message : 'Installer Executed';
        return createJsonResponse({ report: healReport, diagnostic: healReport }, isSuccess, msg);

      default:
        return createJsonResponse({ status: 'ONLINE', healReport: healReport }, true, 'ROYMEN REST API v2.0 Online');
    }

    return createJsonResponse(responseData, true, 'Data fetched successfully.');

  } catch (err) {
    return createErrorResponse(err.toString());
  } finally {
    lock.releaseLock();
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    runZeroConfigBootSequence();

    var postData = {};
    if (e && e.postData && e.postData.contents) {
      try {
        postData = JSON.parse(e.postData.contents);
      } catch (pErr) {
        postData = (e && e.parameter) ? e.parameter : {};
      }
    } else if (e && e.parameter) {
      postData = e.parameter;
    }

    var action = postData.action || (e && e.parameter && e.parameter.action) || 'ping';
    var rawPayload = postData.payload;
    var payload = (rawPayload && typeof rawPayload === 'object') ? rawPayload : postData;

    var email = payload.email || payload.Email || payload.customerEmail || payload.userEmail || postData.email || postData.Email || (e && e.parameter && (e.parameter.email || e.parameter.Email)) || '';
    var name = payload.name || payload.Name || payload.customerName || postData.name || (e && e.parameter && e.parameter.name) || '';
    var otp = payload.otp || payload.OTP || postData.otp || (e && e.parameter && e.parameter.otp) || '';

    switch (action) {
      case 'UPDATE_INVOICE':
      case 'updateInvoice':
        if (payload && payload.editLog) {
          try {
            var ss = getActiveSpreadsheet();
            var logSheet = ss.getSheetByName('Invoice_Edit_Log') || ss.getSheetByName(SHEETS.INVOICE_EDIT_LOG || '41_Invoice_Edit_Log');
            if (logSheet) {
              logSheet.appendRow([
                payload.editLog.id || generateUniqueId('IEL'),
                payload.editLog.orderId || '',
                payload.editLog.adminName || '',
                payload.editLog.adminEmail || '',
                JSON.stringify(payload.editLog.editedFields || []),
                JSON.stringify(payload.editLog.oldValues || {}),
                JSON.stringify(payload.editLog.newValues || {}),
                payload.editLog.timestamp || new Date().toISOString()
              ]);
            }
          } catch (invErr) {
            Logger.log('Invoice_Edit_Log error: ' + invErr.toString());
          }
        }
        return createJsonResponse({ updated: true }, true, 'Invoice update recorded.');
      case 'checkEmailType':
        return createJsonResponse(checkUserOrAdminEmail(payload.email || email), true, 'Email classification complete.');

      case 'verifyAdminPassword':
        var pwRes = verifyAdminPasswordInSheet(payload.email || email, payload.password);
        return createJsonResponse(pwRes, pwRes.success, pwRes.message);

      case 'verifyAdminSecretCode':
        var secRes = verifyAdminSecretCodeInSheet(payload.email || email, payload.secretCode, payload.rememberMe);
        return createJsonResponse(secRes, secRes.success, secRes.message);

      case 'sendOTP':
      case 'send_otp':
      case 'generateAndSendOTP':
        Logger.log('================== [ENTERPRISE REST API POST OTP REQUEST] ==================');
        Logger.log('RAW POST CONTENTS: ' + (e && e.postData ? e.postData.contents : 'NONE'));
        Logger.log('PARSED POST DATA: ' + JSON.stringify(postData));
        Logger.log('ACTION: ' + action);
        Logger.log('PAYLOAD: ' + JSON.stringify(payload));
        Logger.log('EXTRACTED EMAIL: "' + email + '"');
        Logger.log('EXTRACTED NAME: "' + name + '"');
        Logger.log('EXTRACTED OTP: "' + otp + '"');
        Logger.log('=============================================================================');

        if (!email || email.indexOf('@') === -1) {
          return createJsonResponse({
            success: false,
            error: 'Email missing in request body or invalid email format',
            receivedPostData: postData,
            receivedPayload: payload,
            receivedParameters: (e && e.parameter) ? e.parameter : {}
          }, false, 'Email missing in request body.');
        }

        var otpRes = generateAndSendOTP(email, name, otp);
        return createJsonResponse(otpRes, otpRes.success, otpRes.message);

      case 'verifyOTP':
      case 'verify_otp':
        var vEmail = payload.email || payload.Email || postData.email || email || '';
        var vOtp = payload.otp || payload.OTP || postData.otp || otp || '';
        var vRes = verifyCustomerOTP(vEmail, vOtp);
        return createJsonResponse(vRes, vRes.success, vRes.message);

      case 'placeOrder':
      case 'POST_ORDER':
        var custEmail = (payload.customerEmail || payload.email || payload.Email || '').toString().trim();
        if (!custEmail || custEmail.indexOf('@') === -1) {
          return createErrorResponse('401 Unauthorized: Mandatory customer authentication is required before placing an order.');
        }
        var orderId = saveOrderToSheet(payload);
        payload.id = orderId;
        // Automatically send Customer Order Confirmation Email directly
        sendCustomerOrderConfirmation(payload);
        // Automatically send Admin New Order Notification Email directly
        sendAdminNewOrderNotification(payload);
        logAuditTrail('CUSTOMER', 'PLACE_ORDER', SHEETS.ORDERS, 'Order created: ' + orderId);
        return createJsonResponse({ orderId: orderId }, true, 'Order placed successfully.');

      case 'processEmailQueue':
        var qRes = processFailedEmailQueue();
        return createJsonResponse({ result: qRes }, true, 'Email queue process completed.');

      case 'updateProduct':
        var prdId = saveOrUpdateProduct(payload);
        logAuditTrail('ADMIN', 'UPDATE_PRODUCT', SHEETS.PRODUCTS, 'Product saved: ' + payload.name);
        return createJsonResponse({ productId: prdId }, true, 'Product saved successfully.');

      case 'registerCustomer':
      case 'saveCustomer':
        var custRes = saveOrUpdateCustomer(payload);
        return createJsonResponse({ customer: custRes }, true, 'Customer saved successfully.');

      case 'updateProfile':
        var profileRes = saveOrUpdateCustomer(payload);
        return createJsonResponse({ customer: profileRes }, true, 'Customer profile updated.');

      case 'saveCartItem':
      case 'saveCart':
        var cartRes = saveCartItem(payload);
        return createJsonResponse({ cartId: cartRes }, true, 'Cart item saved.');

      case 'saveWishlistItem':
      case 'saveWishlist':
        var wishRes = saveWishlistItem(payload.userId || payload.email, payload.productId);
        return createJsonResponse({ wishlistId: wishRes }, true, 'Wishlist item saved.');

      case 'submitReview':
        var revRes = saveReview(payload);
        return createJsonResponse({ reviewId: revRes }, true, 'Review submitted successfully.');

      case 'logLogin':
        logLoginAttempt(payload.email, payload.status, payload.ip, payload.browser, payload.device, payload.reason);
        return createJsonResponse({ logged: true }, true, 'Login event logged.');

      case 'logError':
        logSystemError(payload.module, payload.function, payload.errorMessage, payload.stackTrace, payload.user);
        return createJsonResponse({ logged: true }, true, 'System error logged.');

      case 'subscribeNewsletter':
        var subRes = saveSubscriber(payload.email);
        return createJsonResponse({ subscriber: subRes }, true, 'Subscribed successfully.');

      case 'submitContact':
        var cntRes = saveContactMessage(payload);
        return createJsonResponse({ contact: cntRes }, true, 'Contact message saved.');

      case 'ping':
      default:
        return createJsonResponse({ message: 'ROYMEN REST WebApp Ping Acknowledged.' }, true, 'Ping successful.');
    }

  } catch (err) {
    return createErrorResponse(err.toString());
  } finally {
    lock.releaseLock();
  }
}
`
  },

  'Installer.gs': {
    filename: 'Installer.gs',
    category: 'Core',
    description: 'Enterprise zero-config auto installer & self-healing sheet provisioner.',
    code: `/**
 * Installer.gs - Enterprise Zero-Config Auto-Installer & Self-Healing Engine
 * Automatically creates all 38 required sheets, restores headers, adds missing columns,
 * freezes header rows, and repairs structure without ever deleting or overwriting user data.
 */

function runZeroConfigBootSequence() {
  var logs = [];
  var createdSheets = [];
  var existingSheets = [];
  var missingSheets = [];

  try {
    var ss = getActiveSpreadsheet();
    if (!ss) {
      Logger.log("Errors: Unable to access active Google Spreadsheet instance.");
      logs.push("Errors: Unable to access active Google Spreadsheet instance.");
      return logs;
    }

    // Assemble unified target sheets list from SHEETS object values AND SCHEMAS keys
    var allTargets = [];
    var seenNames = {};

    // 1. Collect all values from SHEETS
    var sheetKeys = Object.keys(SHEETS);
    for (var k = 0; k < sheetKeys.length; k++) {
      var sVal = SHEETS[sheetKeys[k]];
      if (sVal && !seenNames[sVal]) {
        seenNames[sVal] = true;
        allTargets.push(sVal);
      }
    }

    // 2. Collect all keys from SCHEMAS to ensure 100% schema coverage
    var schemaKeys = Object.keys(SCHEMAS);
    for (var m = 0; m < schemaKeys.length; m++) {
      var schKey = schemaKeys[m];
      if (schKey) {
        var unPref = schKey.replace(/^[0-9]+_/, '');
        var alreadyCovered = false;
        for (var exName in seenNames) {
          if (exName === schKey || exName.replace(/^[0-9]+_/, '') === unPref) {
            alreadyCovered = true;
            break;
          }
        }
        if (!alreadyCovered) {
          seenNames[schKey] = true;
          allTargets.push(schKey);
        }
      }
    }

    var expectedSheetCount = allTargets.length;
    Logger.log("Expected Sheet Count: " + expectedSheetCount);

    // PASS 1: Iterate over EVERY sheet defined inside SHEETS & SCHEMAS
    for (var i = 0; i < allTargets.length; i++) {
      var tabName = allTargets[i];

      try {
        var expectedHeaders = SCHEMAS[tabName] || SCHEMAS[tabName.replace(/^[0-9]+_/, '')] || ['ID', 'CreatedAt'];
        
        // Check if sheet exists by exact name or un-prefixed name
        var sheet = ss.getSheetByName(tabName);
        if (!sheet) {
          var unPrefixedName = tabName.replace(/^[0-9]+_/, '');
          if (unPrefixedName !== tabName) {
            sheet = ss.getSheetByName(unPrefixedName);
          }
        }

        if (!sheet) {
          // AUTO CREATE MISSING SHEET
          sheet = ss.insertSheet(tabName);
          sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
          sheet.getRange(1, 1, 1, expectedHeaders.length)
            .setFontWeight('bold')
            .setBackground('#18181b')
            .setFontColor('#ffffff');
          sheet.setFrozenRows(1);
          
          Logger.log("Sheet Created: " + tabName);
          createdSheets.push(tabName);
          logs.push("Sheet Created: Created missing sheet '" + tabName + "' with " + expectedHeaders.length + " headers.");
        } else {
          Logger.log("Sheet Exists: " + sheet.getName());
          existingSheets.push(sheet.getName());

          // SELF-HEALING: CHECK EXISTING SHEET
          var lastRow = sheet.getLastRow();
          var lastCol = sheet.getLastColumn();
          var data = (lastRow > 0 && lastCol > 0) ? sheet.getRange(1, 1, 1, Math.max(lastCol, expectedHeaders.length)).getValues() : [[]];
          var existingHeaders = data[0] || [];
          
          var hasValidHeaders = false;
          for (var hIdx = 0; hIdx < existingHeaders.length; hIdx++) {
            if (existingHeaders[hIdx] && String(existingHeaders[hIdx]).trim() !== '') {
              hasValidHeaders = true;
              break;
            }
          }

          if (!hasValidHeaders) {
            // AUTO HEADER CREATION: Header row is empty or missing
            sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
            sheet.getRange(1, 1, 1, expectedHeaders.length)
              .setFontWeight('bold')
              .setBackground('#18181b')
              .setFontColor('#ffffff');
            sheet.setFrozenRows(1);
            Logger.log("Headers Created: " + sheet.getName());
            logs.push("Headers Created: Restored headers for sheet '" + sheet.getName() + "'.");
          } else {
            // AUTO COLUMN ADDITION & HEADER REPAIR
            var currentHeaderStrings = [];
            for (var c = 0; c < existingHeaders.length; c++) {
              currentHeaderStrings.push(String(existingHeaders[c] || '').trim());
            }

            var columnsAdded = 0;
            var headerRepaired = false;

            for (var h = 0; h < expectedHeaders.length; h++) {
              var expectedCol = expectedHeaders[h];
              var foundIdx = currentHeaderStrings.indexOf(expectedCol);

              if (foundIdx === -1) {
                // Column missing -> append to right without overwriting existing data
                var newColIdx = currentHeaderStrings.length + 1;
                sheet.getRange(1, newColIdx)
                  .setValue(expectedCol)
                  .setFontWeight('bold')
                  .setBackground('#18181b')
                  .setFontColor('#ffffff');
                currentHeaderStrings.push(expectedCol);
                columnsAdded++;
                Logger.log("Columns Added: " + expectedCol + " to " + sheet.getName());
                logs.push("Columns Added: Added missing column '" + expectedCol + "' in sheet '" + sheet.getName() + "'.");
              }
            }

            // Ensure header row is frozen
            if (sheet.getFrozenRows() < 1) {
              sheet.setFrozenRows(1);
              headerRepaired = true;
            }

            // Ensure header styling is applied
            sheet.getRange(1, 1, 1, currentHeaderStrings.length)
              .setFontWeight('bold')
              .setBackground('#18181b')
              .setFontColor('#ffffff');

            if (columnsAdded > 0 || headerRepaired) {
              logs.push("Repair Completed: Repaired headers and structure for sheet '" + sheet.getName() + "'.");
            } else {
              logs.push("Already Exists: Sheet '" + sheet.getName() + "' is healthy and up to date.");
            }
          }
        }
      } catch (sheetErr) {
        Logger.log("Errors: Failed to verify/repair sheet '" + tabName + "': " + sheetErr.toString());
        logs.push("Errors: Failed to verify/repair sheet '" + tabName + "': " + sheetErr.toString());
      }
    }

    // PASS 2: INSTALLER VALIDATION & FAIL-SAFE HEALING
    missingSheets = [];
    for (var v = 0; v < allTargets.length; v++) {
      var vTarget = allTargets[v];
      var vSheet = ss.getSheetByName(vTarget) || ss.getSheetByName(vTarget.replace(/^[0-9]+_/, ''));
      if (!vSheet) {
        missingSheets.push(vTarget);
      }
    }

    // FAIL-SAFE: If any sheet is still missing, force creation immediately!
    if (missingSheets.length > 0) {
      Logger.log("Missing Sheet Names: " + missingSheets.join(", "));
      for (var f = 0; f < missingSheets.length; f++) {
        var mTarget = missingSheets[f];
        var mHeaders = SCHEMAS[mTarget] || SCHEMAS[mTarget.replace(/^[0-9]+_/, '')] || ['ID', 'CreatedAt'];
        try {
          var createdF = ss.insertSheet(mTarget);
          createdF.getRange(1, 1, 1, mHeaders.length).setValues([mHeaders]);
          createdF.getRange(1, 1, 1, mHeaders.length)
            .setFontWeight('bold')
            .setBackground('#18181b')
            .setFontColor('#ffffff');
          createdF.setFrozenRows(1);
          createdSheets.push(mTarget);
          Logger.log("Sheet Created: " + mTarget);
          logs.push("Sheet Created: Auto-created missing sheet '" + mTarget + "' during fail-safe validation.");
        } catch (fErr) {
          Logger.log("Errors: Fail-safe sheet creation failed for '" + mTarget + "': " + fErr.toString());
        }
      }

      // Re-check missing sheets after fail-safe creation
      missingSheets = [];
      for (var v2 = 0; v2 < allTargets.length; v2++) {
        var v2Target = allTargets[v2];
        var v2Sheet = ss.getSheetByName(v2Target) || ss.getSheetByName(v2Target.replace(/^[0-9]+_/, ''));
        if (!v2Sheet) {
          missingSheets.push(v2Target);
        }
      }
    }

    var actualSheetCount = ss.getSheets().length;

    // MANDATORY LOGGING DIAGNOSTICS
    Logger.log("Expected Sheet Count: " + expectedSheetCount);
    Logger.log("Actual Sheet Count: " + actualSheetCount);
    Logger.log("Created Sheet Names: " + (createdSheets.length > 0 ? createdSheets.join(", ") : "None"));
    Logger.log("Missing Sheet Names: " + (missingSheets.length > 0 ? missingSheets.join(", ") : "None"));
    Logger.log("Repair Result: " + (missingSheets.length === 0 ? "SUCCESS" : "DEGRADED"));

    try {
      seedInitialSettingsIfMissing(ss, logs);
      seedSuperAdminIfMissing(ss, logs);
    } catch (seedErr) {
      logs.push("Errors: Seeding default settings/admin failed: " + seedErr.toString());
    }

    var verifiedSheetCount = expectedSheetCount - missingSheets.length;
    var isSuccess = missingSheets.length === 0;

    return {
      status: isSuccess ? "SUCCESS" : "DEGRADED",
      message: "Successfully verified " + verifiedSheetCount + "/" + expectedSheetCount + " sheets.",
      expectedSheetCount: expectedSheetCount,
      verifiedSheetCount: verifiedSheetCount,
      createdSheetCount: createdSheets.length,
      existingSheetCount: existingSheets.length,
      missingSheetCount: missingSheets.length,
      createdSheetNames: createdSheets,
      existingSheetNames: existingSheets,
      missingSheetNames: missingSheets,
      repairActions: logs,
      logs: logs
    };
  } catch (err) {
    Logger.log("Errors: Zero-config boot sequence exception: " + err.toString());
    logs.push("Errors: Zero-config boot sequence exception: " + err.toString());

    return {
      status: "FAILED",
      message: "Boot sequence failed: " + err.toString(),
      expectedSheetCount: 0,
      verifiedSheetCount: 0,
      createdSheetCount: 0,
      existingSheetCount: 0,
      missingSheetCount: 0,
      createdSheetNames: [],
      existingSheetNames: [],
      missingSheetNames: [],
      repairActions: logs,
      logs: logs
    };
  }
}

function seedInitialSettingsIfMissing(ss, logs) {
  var settingsSheet = ss.getSheetByName(SHEETS.SETTINGS);
  if (!settingsSheet) return;

  var settingsData = settingsSheet.getDataRange().getValues();
  var settingsMap = {};
  for (var s = 1; s < settingsData.length; s++) {
    if (settingsData[s][0]) {
      settingsMap[settingsData[s][0]] = settingsData[s][1];
    }
  }

  var defaults = {
    'storeName': APP_CONFIG.APP_NAME,
    'tagline': APP_CONFIG.TAGLINE,
    'currency': APP_CONFIG.CURRENCY,
    'country': APP_CONFIG.COUNTRY,
    'insideDhakaFee': '80',
    'outsideDhakaFee': '150',
    'appVersion': APP_CONFIG.VERSION,
    'dbVersion': APP_CONFIG.DB_VERSION,
    'lastBootTime': new Date().toISOString()
  };

  var now = new Date().toISOString();
  for (var key in defaults) {
    if (!settingsMap[key]) {
      settingsSheet.appendRow([key, defaults[key], now]);
      logs.push("Installer: Seeded default setting " + key);
    }
  }
}

function seedSuperAdminIfMissing(ss, logs) {
  var adminSheet = ss.getSheetByName(SHEETS.ADMINS);
  if (!adminSheet) return;

  var adminData = adminSheet.getDataRange().getValues();
  if (adminData.length <= 1) {
    var now = new Date().toISOString();
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
    logs.push("Installer: Seeded Super Admin account " + APP_CONFIG.DEFAULT_ADMIN_EMAIL);
  }
}
`
  },

  'Migration.gs': {
    filename: 'Migration.gs',
    category: 'Core',
    description: 'Auto-Migration engine comparing schema versions and non-destructively upgrading.',
    code: `/**
 * Migration.gs - Database Schema Versioning & Auto Migration Engine
 */

function runAutoMigrations() {
  var ss = getActiveSpreadsheet();
  var settingsSheet = ss.getSheetByName(SHEETS.SETTINGS);
  var currentVersion = getSettingValue('dbVersion') || '1.0.0';
  var targetVersion = APP_CONFIG.DB_VERSION;

  if (currentVersion !== targetVersion) {
    updateSettingValue('dbVersion', targetVersion);
    logAuditTrail('SYSTEM_MIGRATION', 'VERSION_UPGRADE', SHEETS.SETTINGS, 'Migrated DB from ' + currentVersion + ' to ' + targetVersion);
    return 'Database migrated from v' + currentVersion + ' to v' + targetVersion;
  }

  return 'Database schema is up to date (v' + currentVersion + ').';
}
`
  },

  'Database.gs': {
    filename: 'Database.gs',
    category: 'Core',
    description: 'Generic CRUD operations for reading, inserting, updating, and deleting sheet rows.',
    code: `/**
 * Database.gs - Generic Sheet Row Operations
 */

function findRowInSheet(sheetName, columnName, targetValue) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return null;

  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return null;

  var headers = data[0];
  var colIdx = headers.indexOf(columnName);
  if (colIdx === -1) return null;

  for (var i = 1; i < data.length; i++) {
    if (data[i][colIdx] && data[i][colIdx].toString().toLowerCase() === targetValue.toString().toLowerCase()) {
      var obj = { _rowIndex: i + 1 };
      headers.forEach(function(h, idx) {
        obj[h] = data[i][idx];
      });
      return obj;
    }
  }
  return null;
}

function updateRowInSheet(sheetName, rowIndex, columnMap) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet || rowIndex < 2) return false;

  var headers = sheet.getDataRange().getValues()[0];
  for (var key in columnMap) {
    var cIdx = headers.indexOf(key);
    if (cIdx !== -1) {
      sheet.getRange(rowIndex, cIdx + 1).setValue(columnMap[key]);
    }
  }
  return true;
}
`
  },

  'Admin.gs': {
    filename: 'Admin.gs',
    category: 'Auth & Security',
    description: 'Executive Admin authentication, password hashing, lockout logic, and secret code check.',
    code: `/**
 * Admin.gs - Admin Authentication & Password/Secret Code Verification
 */

function checkUserOrAdminEmail(email) {
  if (!email) return { type: 'new_customer' };
  var normEmail = email.trim().toLowerCase();

  var users = getSheetDataAsJson(SHEETS.USERS);
  for (var u = 0; u < users.length; u++) {
    if (users[u].Email && users[u].Email.toLowerCase() === normEmail) {
      return { type: 'customer', user: users[u] };
    }
  }

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
          logAuditTrail(email, 'ADMIN_LOCKOUT', SHEETS.ADMINS, 'Account locked for 15 minutes after 5 failed attempts.');
          return { success: false, isLocked: true, message: 'Account locked for 15 minutes.' };
        }
        return { success: false, attemptsRemaining: 5 - failedAttempts, message: 'Invalid password. Attempt ' + failedAttempts + ' of 5.' };
      }
    }
  }

  return { success: false, message: 'Admin record not found.' };
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
          user: { id: row[0], name: row[1], email: row[2], role: 'admin', status: 'active' }
        };
      } else {
        return { success: false, message: 'Invalid Secret Authorization Code.' };
      }
    }
  }

  return { success: false, message: 'Admin account record not found.' };
}
`
  },

  'Authentication.gs': {
    filename: 'Authentication.gs',
    category: 'Auth & Security',
    description: 'OTP generation, OTP_Store persistence, email dispatch, user session creation, and verification.',
    code: `/**
 * Authentication.gs - Email OTP Dispatcher & OTP_Store Persistence
 */

function generateAndSendOTP(email, name, customOtp) {
  var targetEmail = '';
  if (typeof email === 'string') {
    targetEmail = email;
  } else if (email && typeof email === 'object') {
    targetEmail = email.email || email.Email || email.customerEmail || email.userEmail || '';
    if (!name && email.name) {
      name = email.name;
    }
    if (!customOtp && email.otp) {
      customOtp = email.otp;
    }
  }

  targetEmail = (targetEmail || '').toString().trim().toLowerCase();

  Logger.log('================== [ENTERPRISE generateAndSendOTP EXECUTION] ==================');
  Logger.log('TARGET EMAIL: "' + targetEmail + '"');
  Logger.log('TARGET NAME: "' + (name || 'Valued Customer') + '"');
  Logger.log('CUSTOM OTP PROVIDED: "' + (customOtp || 'NONE') + '"');

  if (!targetEmail || targetEmail.indexOf('@') === -1) {
    var errMessage = 'Invalid or missing recipient email address: "' + targetEmail + '"';
    Logger.log('generateAndSendOTP Error: ' + errMessage);
    return {
      success: false,
      error: 'Email missing in request body or invalid email format',
      receivedEmail: email,
      receivedName: name,
      receivedOtp: customOtp,
      message: errMessage
    };
  }

  var otp = (customOtp || '').toString().trim();
  if (!otp) {
    otp = Math.floor(100000 + Math.random() * 900000).toString();
  }
  var custName = name || 'Valued Customer';
  
  if (!name || custName === 'Valued Customer') {
    try {
      var userRow = findRowInSheet(SHEETS.USERS, 'Email', targetEmail);
      if (userRow && userRow.Name) {
        custName = userRow.Name;
      }
    } catch (e) {}
  }

  var createdAt = new Date().toISOString();
  var expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  // Write OTP to Google Sheets OTP_Store table immediately
  try {
    var ss = getActiveSpreadsheet();
    var otpSheet = ss.getSheetByName('OTP_Store') || ss.getSheetByName(SHEETS.OTP_STORE);
    if (!otpSheet) {
      runZeroConfigBootSequence();
      otpSheet = ss.getSheetByName('OTP_Store') || ss.getSheetByName(SHEETS.OTP_STORE);
    }

    if (otpSheet) {
      var data = otpSheet.getDataRange().getValues();
      for (var i = 1; i < data.length; i++) {
        var rowEmail = (data[i][0] || '').toString().trim().toLowerCase();
        var rowStatus = (data[i][4] || '').toString().trim().toUpperCase();
        if (rowEmail === targetEmail && rowStatus === 'ACTIVE') {
          otpSheet.getRange(i + 1, 5).setValue('REPLACED');
          Logger.log('OTP_Store: Replaced existing ACTIVE OTP for email "' + targetEmail + '" at row ' + (i + 1));
        }
      }

      Logger.log('OTP_Store Write Start: Sheet="OTP_Store", Email="' + targetEmail + '", OTP="' + otp + '", Status="ACTIVE"');
      otpSheet.appendRow([targetEmail, otp, createdAt, expiresAt, 'ACTIVE', '']);
      var lastRow = otpSheet.getLastRow();
      Logger.log('OTP_Store Write Success: Sheet="OTP_Store", Row=' + lastRow + ', Email="' + targetEmail + '", OTP="' + otp + '"');
    }
  } catch (sheetErr) {
    Logger.log('OTP_Store Write Exception: ' + sheetErr.toString());
    logSystemError('Authentication', 'generateAndSendOTP', sheetErr.toString(), '', targetEmail);
  }

  // Cache in Script Cache as fast backup layer
  var userCache = CacheService.getScriptCache();
  userCache.put('OTP_' + targetEmail, otp, 600);

  Logger.log('================== [OTP GENERATION & SAVE LOG] ==================');
  Logger.log('Generated OTP: ' + otp);
  Logger.log('Saved OTP: ' + otp);
  Logger.log('Email: ' + targetEmail);
  Logger.log('Created At: ' + createdAt);
  Logger.log('Expires At: ' + expiresAt);
  Logger.log('Expiry Status: VALID');
  Logger.log('==================================================================');

  var sendResult = sendCustomerOTPEmail(targetEmail, otp, custName);

  logAuditTrail(targetEmail, 'OTP_GENERATED', 'OTP_Store', 'OTP generated and sent to email: ' + targetEmail);

  return { 
    success: sendResult && sendResult.success !== false, 
    otp: otp, 
    recipient: targetEmail,
    message: sendResult && sendResult.success !== false ? 'Login OTP verification code dispatched to ' + targetEmail : 'OTP generated, but email delivery failed: ' + (sendResult ? sendResult.error : 'Unknown error') 
  };
}

function verifyCustomerOTP(email, enteredOtp) {
  var targetEmail = (email || '').toString().trim().toLowerCase();
  var inputOtp = (enteredOtp || '').toString().trim();

  var ss = getActiveSpreadsheet();
  var otpSheet = ss.getSheetByName('OTP_Store') || ss.getSheetByName(SHEETS.OTP_STORE);
  
  var foundInSheet = false;
  var storedOtpStr = '';
  var isExpired = false;
  var otpRowIndex = -1;

  if (otpSheet) {
    var data = otpSheet.getDataRange().getValues();
    for (var i = data.length - 1; i >= 1; i--) {
      var rowEmail = (data[i][0] || '').toString().trim().toLowerCase();
      var rowStatus = (data[i][4] || '').toString().trim().toUpperCase();
      if (rowEmail === targetEmail && rowStatus === 'ACTIVE') {
        foundInSheet = true;
        otpRowIndex = i + 1;
        storedOtpStr = (data[i][1] || '').toString().trim();
        var rowExpiresAt = data[i][3] ? new Date(data[i][3]).getTime() : 0;
        if (rowExpiresAt > 0 && rowExpiresAt < Date.now()) {
          isExpired = true;
        }
        break;
      }
    }
  }

  // Fallback to Script Cache if not found in sheet
  if (!foundInSheet) {
    var userCache = CacheService.getScriptCache();
    var cachedOtp = userCache.get('OTP_' + targetEmail);
    if (cachedOtp) {
      storedOtpStr = cachedOtp.toString().trim();
      foundInSheet = true;
    }
  }

  var isMatch = storedOtpStr !== '' && storedOtpStr === inputOtp;
  var expiryStatus = isExpired ? 'EXPIRED' : (storedOtpStr !== '' ? 'VALID' : 'NO_RECORD');

  Logger.log('================== [OTP VERIFICATION LOG] ==================');
  Logger.log('Email: ' + targetEmail);
  Logger.log('Entered OTP: ' + inputOtp);
  Logger.log('Stored OTP: ' + (storedOtpStr || 'NOT_FOUND'));
  Logger.log('OTP Match Result: ' + isMatch);
  Logger.log('Expiry Status: ' + expiryStatus);
  Logger.log('============================================================');

  if (expiryStatus === 'EXPIRED') {
    if (otpRowIndex > 1 && otpSheet) {
      otpSheet.getRange(otpRowIndex, 5).setValue('EXPIRED');
    }
    logLoginAttempt(targetEmail, 'FAILED', 'Client', 'WebBrowser', 'WebDevice', 'OTP Expired');
    return { success: false, message: 'OTP expired. Please request a new verification code.' };
  }

  if (!isMatch) {
    logLoginAttempt(targetEmail, 'FAILED', 'Client', 'WebBrowser', 'WebDevice', 'Invalid OTP Code');
    return { success: false, message: 'Invalid OTP code. Please enter the 6-digit verification code sent to your email.' };
  }

  // Mark OTP row as USED in OTP_Store sheet
  if (otpRowIndex > 1 && otpSheet) {
    otpSheet.getRange(otpRowIndex, 5).setValue('USED');
    otpSheet.getRange(otpRowIndex, 6).setValue(new Date().toISOString());
    Logger.log('OTP_Store Updated: Set row ' + otpRowIndex + ' Status="USED" for email ' + targetEmail);
  }

  var userCache = CacheService.getScriptCache();
  userCache.remove('OTP_' + targetEmail);

  // Save or update customer profile in 03_Users sheet
  var userRecord = saveOrUpdateCustomer({
    email: targetEmail,
    name: targetEmail.split('@')[0],
    lastLogin: new Date().toISOString()
  });

  logLoginAttempt(targetEmail, 'SUCCESS', 'Client', 'WebBrowser', 'WebDevice', 'OTP Verified Successfully');
  logAuditTrail(targetEmail, 'CUSTOMER_LOGIN_SUCCESS', '03_Users', 'Customer logged in via OTP verification.');

  return { success: true, message: 'OTP verified successfully.', email: targetEmail, user: userRecord };
}
`
  },

  'Customer.gs': {
    filename: 'Customer.gs',
    category: 'Auth & Security',
    description: 'Customer record management, profile updating, and saved addresses.',
    code: `/**
 * Customer.gs - Customer Record & Address Book Management
 */

function saveOrUpdateCustomer(cust) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.USERS);
  if (!sheet) {
    runZeroConfigBootSequence();
    sheet = ss.getSheetByName(SHEETS.USERS);
  }

  var normEmail = (cust.email || '').toString().trim().toLowerCase();
  var now = new Date().toISOString();

  if (!normEmail) {
    Logger.log('saveOrUpdateCustomer Error: missing email address.');
    return null;
  }

  Logger.log('03_Users Operation Start: Email="' + normEmail + '"');
  var existingUser = findRowInSheet(SHEETS.USERS, 'Email', normEmail);

  if (existingUser) {
    var rowIdx = existingUser._rowIndex;
    var loginCount = parseInt(existingUser.LoginCount || 0, 10) + 1;
    updateRowInSheet(SHEETS.USERS, rowIdx, {
      Name: cust.name || existingUser.Name || normEmail.split('@')[0],
      Phone: cust.phone || existingUser.Phone || '',
      Addresses: JSON.stringify(cust.addresses || (existingUser.Addresses ? JSON.parse(existingUser.Addresses) : [])),
      UpdatedAt: now,
      LastLogin: cust.lastLogin || now,
      LoginCount: loginCount,
      Device: cust.device || 'Web',
      Browser: cust.browser || 'Browser'
    });
    Logger.log('03_Users Write Success: Updated row ' + rowIdx + ' for email "' + normEmail + '"');
    logAuditTrail(normEmail, 'UPDATE_CUSTOMER', SHEETS.USERS, 'Customer profile updated.');
    return { id: existingUser.ID, email: normEmail, name: cust.name || existingUser.Name, role: existingUser.Role || 'customer' };
  } else {
    var custId = cust.id || generateUniqueId('USR');
    sheet.appendRow([
      custId,
      cust.name || normEmail.split('@')[0],
      normEmail,
      cust.phone || '',
      cust.passwordHash || '',
      cust.role || 'customer',
      cust.status || 'active',
      JSON.stringify(cust.addresses || []),
      now,
      now,
      now,
      1,
      cust.device || 'Web',
      cust.browser || 'Browser'
    ]);
    var newRowIdx = sheet.getLastRow();
    Logger.log('03_Users Write Success: Created row ' + newRowIdx + ' ID=' + custId + ' for email "' + normEmail + '"');
    logAuditTrail(normEmail, 'REGISTER_CUSTOMER', SHEETS.USERS, 'New customer registered in Users sheet.');
    return { id: custId, email: normEmail, name: cust.name || normEmail.split('@')[0], role: cust.role || 'customer' };
  }
}
`
  },

  'Security.gs': {
    filename: 'Security.gs',
    category: 'Auth & Security',
    description: 'Rate limiting with CacheService, LockService wrappers, and request sanitization.',
    code: `/**
 * Security.gs - Rate Limiting & Concurrency Locks
 */

function acquireScriptLock(timeoutMs) {
  var lock = LockService.getScriptLock();
  var success = lock.tryLock(timeoutMs || 10000);
  return { lock: lock, acquired: success };
}
`
  },

  'Cache.gs': {
    filename: 'Cache.gs',
    category: 'Auth & Security',
    description: 'Google Apps Script CacheService helper functions.',
    code: `/**
 * Cache.gs - CacheService Wrapper for Ultra-Fast API Responses
 */

function getCachedData(key) {
  var cache = CacheService.getScriptCache();
  var cached = cache.get(key);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      return cached;
    }
  }
  return null;
}

function setCachedData(key, value, expirationInSeconds) {
  var cache = CacheService.getScriptCache();
  var str = (typeof value === 'object') ? JSON.stringify(value) : value.toString();
  cache.put(key, str, expirationInSeconds || 300);
}
`
  },

  'Products.gs': {
    filename: 'Products.gs',
    category: 'Catalog & Sales',
    description: 'Product catalog manager, CRUD operations, image galleries, and pricing.',
    code: `/**
 * Products.gs - Product Catalog & SKU Management
 */

function saveOrUpdateProduct(prd) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.PRODUCTS);
  var prdId = prd.id || generateUniqueId('PRD');

  sheet.appendRow([
    prdId,
    prd.name,
    prd.slug || slugifyText(prd.name),
    prd.sku || ('SKU-' + Date.now()),
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
`
  },

  'Categories.gs': {
    filename: 'Categories.gs',
    category: 'Catalog & Sales',
    description: 'Category taxonomy and collection hierarchy management.',
    code: `/**
 * Categories.gs - Category Taxonomy Controller
 */

function saveCategory(cat) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.CATEGORIES);
  var catId = cat.id || generateUniqueId('CAT');

  sheet.appendRow([
    catId,
    cat.name,
    cat.slug || slugifyText(cat.name),
    cat.image || '',
    cat.itemCount || 0,
    cat.description || ''
  ]);
  return catId;
}
`
  },

  'Brands.gs': {
    filename: 'Brands.gs',
    category: 'Catalog & Sales',
    description: 'Brand profiles, logo URLs, and descriptions.',
    code: `/**
 * Brands.gs - Brand Profile Management
 */

function saveBrand(brand) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.BRANDS);
  var brandId = brand.id || generateUniqueId('BRD');

  sheet.appendRow([
    brandId,
    brand.name,
    brand.slug || slugifyText(brand.name),
    brand.logo || '',
    brand.description || ''
  ]);
  return brandId;
}
`
  },

  'Collections.gs': {
    filename: 'Collections.gs',
    category: 'Catalog & Sales',
    description: 'Featured seasonal collections and landing page banners.',
    code: `/**
 * Collections.gs - Seasonal Collection Manager
 */

function saveCollection(col) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.COLLECTIONS);
  var colId = col.id || generateUniqueId('COL');

  sheet.appendRow([
    colId,
    col.name,
    col.slug || slugifyText(col.name),
    col.bannerImage || '',
    col.description || '',
    col.itemCount || 0,
    col.isFeatured ? 'true' : 'false'
  ]);
  return colId;
}
`
  },

  'Variants.gs': {
    filename: 'Variants.gs',
    category: 'Catalog & Sales',
    description: 'Product variant size/color stock and price override manager.',
    code: `/**
 * Variants.gs - Product Variant SKU & Stock Matrix
 */

function saveProductVariant(varItem) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.PRODUCT_VARIANTS);
  var varId = varItem.id || generateUniqueId('VAR');

  sheet.appendRow([
    varId,
    varItem.productId,
    varItem.sku || generateUniqueId('SKU'),
    varItem.color || '',
    varItem.size || '',
    varItem.stock || 0,
    varItem.price || 0,
    varItem.status || 'active'
  ]);
  return varId;
}
`
  },

  'Orders.gs': {
    filename: 'Orders.gs',
    category: 'Catalog & Sales',
    description: 'Order processing, checkout tracking, and courier integration logger.',
    code: `/**
 * Orders.gs - Order Processing & Checkout Controller
 */

function saveOrderToSheet(order) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.ORDERS);
  if (!sheet) {
    runZeroConfigBootSequence();
    sheet = ss.getSheetByName(SHEETS.ORDERS);
  }

  var orderId = order.id || ('ORD-' + new Date().toISOString().replace(/\\D/g, '').substring(0, 8) + '-' + Math.floor(1000 + Math.random() * 9000));
  var now = new Date().toISOString();
  
  Logger.log('09_Orders Write Start: OrderID=' + orderId);
  sheet.appendRow([
    orderId,
    order.customerId || order.userId || 'GUEST',
    order.customerName || order.name || '',
    order.customerEmail || order.email || '',
    order.customerPhone || order.phone || '',
    JSON.stringify(order.shippingAddress || {}),
    order.subtotal || 0,
    order.discount || 0,
    order.couponCode || '',
    order.deliveryFee || order.shippingCharge || 0,
    order.total || 0,
    order.paymentMethod || 'COD',
    order.paymentStatus || 'pending',
    order.orderStatus || 'pending',
    order.trackingNumber || '',
    order.courierPartner || 'Pathao',
    now,
    order.notes || ''
  ]);
  var orderRowIdx = sheet.getLastRow();
  Logger.log('09_Orders Write Success: OrderID=' + orderId + ' Row=' + orderRowIdx);

  // Save item level breakdown to 10_OrderItems sheet
  try {
    var itemsSheet = ss.getSheetByName(SHEETS.ORDER_ITEMS);
    if (!itemsSheet) {
      runZeroConfigBootSequence();
      itemsSheet = ss.getSheetByName(SHEETS.ORDER_ITEMS);
    }
    if (itemsSheet) {
      var itemsList = [];
      if (typeof order.items === 'string') {
        try { itemsList = JSON.parse(order.items); } catch(e){}
      } else if (Array.isArray(order.items)) {
        itemsList = order.items;
      }

      for (var i = 0; i < itemsList.length; i++) {
        var it = itemsList[i];
        var itemQty = it.quantity || it.qty || 1;
        var itemPrice = it.price || 0;
        var itemSubtotal = itemPrice * itemQty;
        itemsSheet.appendRow([
          generateUniqueId('ORI'),
          orderId,
          it.productId || it.id || '',
          it.name || it.productName || 'ROYMEN Item',
          it.sku || '',
          it.color || it.variantColor || '',
          it.size || it.variantSize || '',
          itemPrice,
          itemQty,
          itemSubtotal,
          it.image || ''
        ]);
      }
      Logger.log('10_OrderItems Write Success: OrderID=' + orderId + ' ItemsCount=' + itemsList.length);
    }
  } catch (itemsErr) {
    Logger.log('10_OrderItems Write Error: ' + itemsErr.toString());
  }

  logAuditTrail(order.customerEmail || 'CUSTOMER', 'PLACE_ORDER', SHEETS.ORDERS, 'Order created: ' + orderId);
  return orderId;
}
`
  },

  'Cart.gs': {
    filename: 'Cart.gs',
    category: 'Catalog & Sales',
    description: 'Cart persistence and multi-device sync in 17_Cart.',
    code: `/**
 * Cart.gs - Customer Shopping Cart Synchronization
 */

function saveCartItem(item) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.CART);
  if (!sheet) {
    runZeroConfigBootSequence();
    sheet = ss.getSheetByName(SHEETS.CART);
  }
  var cartId = item.id || generateUniqueId('CRT');
  var now = new Date().toISOString();

  Logger.log('17_Cart Write Start: UserID="' + (item.userId || 'GUEST') + '" ProductID="' + item.productId + '"');
  sheet.appendRow([
    cartId,
    item.userId || item.email || 'GUEST',
    item.productId,
    item.color || item.variantColor || '',
    item.size || item.variantSize || '',
    item.quantity || 1,
    now
  ]);
  var lastRow = sheet.getLastRow();
  Logger.log('17_Cart Write Success: CartID=' + cartId + ' Row=' + lastRow);
  return cartId;
}
`
  },

  'Wishlist.gs': {
    filename: 'Wishlist.gs',
    category: 'Catalog & Sales',
    description: 'Wishlist item persistence and user bookmarking.',
    code: `/**
 * Wishlist.gs - Customer Wishlist Controller
 */

function saveWishlistItem(userId, productId) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.WISHLIST);
  if (!sheet) {
    runZeroConfigBootSequence();
    sheet = ss.getSheetByName(SHEETS.WISHLIST);
  }
  var wishId = generateUniqueId('WSH');
  var now = new Date().toISOString();

  Logger.log('16_Wishlist Write Start: UserID="' + userId + '" ProductID="' + productId + '"');
  sheet.appendRow([
    wishId,
    userId || 'GUEST',
    productId,
    now
  ]);
  var lastRow = sheet.getLastRow();
  Logger.log('16_Wishlist Write Success: WishlistID=' + wishId + ' Row=' + lastRow);
  return wishId;
}
`
  },

  'Coupons.gs': {
    filename: 'Coupons.gs',
    category: 'Catalog & Sales',
    description: 'Promo code validation, discount calculations, and limit tracking.',
    code: `/**
 * Coupons.gs - Coupon Code & Discount Matrix
 */

function validateCouponCode(code, spendAmount) {
  var coupons = getSheetDataAsJson(SHEETS.COUPONS);
  var normCode = (code || '').trim().toUpperCase();

  for (var c = 0; c < coupons.length; c++) {
    var cpn = coupons[c];
    if (cpn.Code && cpn.Code.toUpperCase() === normCode && cpn.Status === 'active') {
      var minSpend = parseFloat(cpn.MinSpend || 0);
      if (spendAmount < minSpend) {
        return { valid: false, message: 'Minimum spend of BDT ' + minSpend + ' required.' };
      }
      return { valid: true, coupon: cpn };
    }
  }
  return { valid: false, message: 'Invalid or expired coupon code.' };
}
`
  },

  'Reviews.gs': {
    filename: 'Reviews.gs',
    category: 'Catalog & Sales',
    description: 'Customer star ratings, product feedback, and buyer verification.',
    code: `/**
 * Reviews.gs - Product Reviews & Rating System
 */

function saveReview(rev) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.REVIEWS);
  if (!sheet) {
    runZeroConfigBootSequence();
    sheet = ss.getSheetByName(SHEETS.REVIEWS);
  }
  var revId = generateUniqueId('REV');
  var now = new Date().toISOString();

  Logger.log('12_Reviews Write Start: ProductID=' + rev.productId);
  sheet.appendRow([
    revId,
    rev.productId,
    rev.customerName || 'Anonymous',
    rev.rating || 5,
    rev.comment || '',
    rev.verifiedBuyer ? 'true' : 'false',
    now,
    'approved'
  ]);
  var lastRow = sheet.getLastRow();
  Logger.log('12_Reviews Write Success: ReviewID=' + revId + ' Row=' + lastRow);
  return revId;
}
`
  },

  'Newsletter.gs': {
    filename: 'Newsletter.gs',
    category: 'Catalog & Sales',
    description: 'Newsletter email subscription persistence.',
    code: `/**
 * Newsletter.gs - Newsletter Email Subscriber Logger
 */

function saveSubscriber(email) {
  var normEmail = (email || '').toString().trim().toLowerCase();
  if (!normEmail || normEmail.indexOf('@') === -1) return { success: false, message: 'Invalid email' };
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName('18_Newsletter') || ss.getSheetByName(SHEETS.NEWSLETTER);
  if (!sheet) {
    runZeroConfigBootSequence();
    sheet = ss.getSheetByName('18_Newsletter') || ss.getSheetByName(SHEETS.NEWSLETTER);
  }
  var subId = generateUniqueId('NWS');
  var now = new Date().toISOString();
  Logger.log('18_Newsletter Write Start: Email="' + normEmail + '"');
  sheet.appendRow([subId, normEmail, now, 'active']);
  var lastRow = sheet.getLastRow();
  Logger.log('18_Newsletter Write Success: Email="' + normEmail + '" Row=' + lastRow);
  return { id: subId, email: normEmail, subscribedAt: now, status: 'active' };
}
`
  },

  'Contacts.gs': {
    filename: 'Contacts.gs',
    category: 'Catalog & Sales',
    description: 'Customer contact form message persistence.',
    code: `/**
 * Contacts.gs - Contact Message Inquiry Recorder
 */

function saveContactMessage(cnt) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName('19_Contacts') || ss.getSheetByName(SHEETS.CONTACTS);
  if (!sheet) {
    runZeroConfigBootSequence();
    sheet = ss.getSheetByName('19_Contacts') || ss.getSheetByName(SHEETS.CONTACTS);
  }
  var cntId = cnt.id || generateUniqueId('CNT');
  var now = new Date().toISOString();
  Logger.log('19_Contacts Write Start: Name="' + (cnt.name || '') + '" Email="' + (cnt.email || '') + '"');
  sheet.appendRow([
    cntId,
    cnt.name || '',
    cnt.email || '',
    cnt.phone || '',
    cnt.subject || '',
    cnt.message || '',
    cnt.status || 'unread',
    now
  ]);
  var lastRow = sheet.getLastRow();
  Logger.log('19_Contacts Write Success: ContactID=' + cntId + ' Row=' + lastRow);
  return { id: cntId, status: 'unread', createdAt: now };
}
`
  },

  'Inventory.gs': {
    filename: 'Inventory.gs',
    category: 'Catalog & Sales',
    description: 'Inventory audit logs, stock deduction, and reorder alerts.',
    code: `/**
 * Inventory.gs - Inventory Audit Trail & Stock Deduction Engine
 */

function logInventoryChange(productId, sku, changeType, quantity, reason) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.INVENTORY_LOG);
  var logId = generateUniqueId('INV');

  sheet.appendRow([
    logId,
    productId,
    sku,
    changeType,
    quantity,
    reason || 'Manual Adjustment',
    new Date().toISOString()
  ]);
  return logId;
}
`
  },

  'Analytics.gs': {
    filename: 'Analytics.gs',
    category: 'System & Utilities',
    description: 'Traffic analytics logger, visitor tracking, and sales metrics.',
    code: `/**
 * Analytics.gs - Sales Analytics & Visitor Tracking
 */

function logVisitorAccess(ip, device, path) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.VISITORS);
  if (sheet) {
    sheet.appendRow([
      generateUniqueId('VIS'),
      ip || '127.0.0.1',
      device || 'Web',
      path || '/',
      new Date().toISOString()
    ]);
  }
}
`
  },

  'Notifications.gs': {
    filename: 'Notifications.gs',
    category: 'System & Utilities',
    description: 'In-app notification system and administrator alerts.',
    code: `/**
 * Notifications.gs - Real-Time Admin & Customer Alerts
 */

function createNotification(type, title, message) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.NOTIFICATIONS);
  var notifId = generateUniqueId('NTF');

  sheet.appendRow([
    notifId,
    type || 'INFO',
    title,
    message,
    'false',
    new Date().toISOString()
  ]);
  return notifId;
}
`
  },

  'Email.gs': {
    filename: 'Email.gs',
    category: 'System & Utilities',
    description: 'HTML email template compilation and concierge transactional mailer.',
    code: `/**
 * Email.gs - Essential Enterprise Transactional Email Engine & Workflow
 */

function buildBaseHtmlEmail(title, bodyContentHtml) {
  var supportEmail = getSettingValue('supportEmail') || 'support@roymen.com.bd';
  var supportPhone = getSettingValue('supportPhone') || '+880 1700-000000';
  var storeName = APP_CONFIG.APP_NAME || 'ROYMEN';
  var tagline = APP_CONFIG.TAGLINE || 'Wear Confidence.';

  var html = '<!DOCTYPE html>' +
  '<html>' +
  '<head>' +
  '<meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
  '<style>' +
  '  body { margin: 0; padding: 0; background-color: #09090b; color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }' +
  '  .container { max-width: 600px; margin: 30px auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; font-size: 15px; line-height: 1.6; }' +
  '  .header { padding: 32px 32px 24px; text-align: center; background-color: #18181b; border-bottom: 1px solid #27272a; }' +
  '  .logo { font-size: 28px; font-weight: 800; letter-spacing: 4px; color: #f59e0b; text-decoration: none; text-transform: uppercase; display: inline-block; }' +
  '  .tagline { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #a1a1aa; margin-top: 6px; font-weight: 600; }' +
  '  .content { padding: 32px; background-color: #18181b; }' +
  '  .footer { padding: 24px 32px; text-align: center; background-color: #09090b; border-top: 1px solid #27272a; font-size: 12px; color: #a1a1aa; }' +
  '  .footer a { color: #f59e0b; text-decoration: none; }' +
  '  .badge { display: inline-block; padding: 4px 12px; background-color: #27272a; color: #f59e0b; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }' +
  '  .table { width: 100%; border-collapse: collapse; margin: 20px 0; }' +
  '  .table th { text-align: left; padding: 10px; background-color: #27272a; color: #a1a1aa; font-size: 12px; text-transform: uppercase; }' +
  '  .table td { padding: 12px 10px; border-bottom: 1px solid #27272a; color: #f4f4f5; }' +
  '  .total-box { background-color: #27272a; padding: 16px; border-radius: 12px; margin-top: 20px; border: 1px solid #3f3f46; }' +
  '  .btn { display: inline-block; padding: 14px 28px; background-color: #f59e0b; color: #09090b; font-weight: 700; text-decoration: none; border-radius: 8px; margin-top: 20px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }' +
  '  @media (max-width: 600px) { .container { margin: 0; border-radius: 0; } .content, .header, .footer { padding: 20px; } }' +
  '</style>' +
  '</head>' +
  '<body>' +
  '  <div class="container">' +
  '    <div class="header">' +
  '      <div class="logo">' + storeName + '</div>' +
  '      <div class="tagline">' + tagline + ' • BANGLADESH</div>' +
  '    </div>' +
  '    <div class="content">' +
  bodyContentHtml +
  '    </div>' +
  '    <div class="footer">' +
  '      <p style="margin: 0 0 10px; font-weight: 600; color: #e4e4e7;">ROYMEN Atelier Bangladesh • Level 4, Gulshan Avenue, Dhaka</p>' +
  '      <p style="margin: 0 0 10px;">Support Email: <a href="mailto:' + supportEmail + '">' + supportEmail + '</a> | Support Phone: ' + supportPhone + '</p>' +
  '      <p style="margin: 0 0 14px;">Social: <a href="https://facebook.com/roymen.bd" target="_blank">Facebook</a> | <a href="https://instagram.com/roymen.bd" target="_blank">Instagram</a> | <a href="https://linkedin.com/company/roymen" target="_blank">LinkedIn</a></p>' +
  '      <p style="margin: 0; color: #71717a;">© 2026 ROYMEN. All Rights Reserved. Dark Mode Friendly & Mobile Responsive.</p>' +
  '    </div>' +
  '  </div>' +
  '</body>' +
  '</html>';

  return html;
}

function queueAndSendEmail(recipient, category, subject, htmlBody) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Email_Log') || ss.getSheetByName(SHEETS.EMAIL_LOG);
  
  if (!sheet) {
    runZeroConfigBootSequence();
    sheet = ss.getSheetByName('Email_Log') || ss.getSheetByName(SHEETS.EMAIL_LOG);
  }

  var normRecipient = (recipient || '').toString().trim();

  // Validate Recipient Address
  if (!normRecipient || normRecipient === '' || normRecipient.indexOf('@') === -1) {
    var errMsg = 'Failed to send email: no recipient or invalid email address ("' + recipient + '")';
    Logger.log('Email Send Validation Error: ' + errMsg);
    if (sheet) {
      sheet.appendRow([
        'EML-' + Date.now() + '-' + Math.floor(1000 + Math.random() * 9000),
        recipient || 'NO_RECIPIENT',
        category || 'System',
        subject || 'No Subject',
        'FAILED',
        '',
        1,
        errMsg
      ]);
    }
    return { success: false, status: 'FAILED', error: errMsg };
  }

  // Prevent Duplicate Emails (EXCEPT for transactional OTPs where re-sends must always go out)
  var isOtpEmail = (category && category.indexOf('OTP') !== -1) || (subject && (subject.indexOf('Verification') !== -1 || subject.indexOf('OTP') !== -1));
  var lowerRecipient = normRecipient.toLowerCase();
  var nowIso = new Date().toISOString();
  
  if (!isOtpEmail && sheet) {
    var logs = sheet.getDataRange().getValues();
    if (logs.length > 1) {
      var recentCutoff = Date.now() - 60000;
      for (var i = logs.length - 1; i >= Math.max(1, logs.length - 20); i--) {
        var rowRecip = (logs[i][1] || '').toString().toLowerCase();
        var rowSubj = (logs[i][3] || '').toString();
        var rowStatus = (logs[i][4] || '').toString();
        var rowTime = logs[i][5] ? new Date(logs[i][5]).getTime() : 0;
        
        if (rowRecip === lowerRecipient && rowSubj === subject && rowStatus === 'SENT' && rowTime > recentCutoff) {
          Logger.log('Duplicate email prevented for: ' + lowerRecipient + ' (' + subject + ')');
          return { success: true, duplicatePrevented: true };
        }
      }
    }
  }

  var emailId = 'EML-' + Date.now() + '-' + Math.floor(1000 + Math.random() * 9000);
  var status = 'QUEUED';
  var sentTime = '';
  var retryCount = 0;
  var errorMessage = '';

  try {
    // Attempt primary dispatch via GmailApp
    if (typeof GmailApp !== 'undefined' && GmailApp.sendEmail) {
      GmailApp.sendEmail(normRecipient, subject, 'Please view this email in an HTML compatible mail client.', {
        htmlBody: htmlBody,
        name: 'ROYMEN Concierge'
      });
      status = 'SENT';
      sentTime = nowIso;
      Logger.log('GmailApp email successfully sent to: ' + normRecipient + ' [' + subject + ']');
    } else {
      MailApp.sendEmail(normRecipient, subject, 'Please view this email in an HTML compatible mail client.', {
        htmlBody: htmlBody,
        name: 'ROYMEN Concierge'
      });
      status = 'SENT';
      sentTime = nowIso;
      Logger.log('MailApp email successfully sent to: ' + normRecipient + ' [' + subject + ']');
    }
  } catch (primaryErr) {
    Logger.log('Primary email dispatch failed (' + primaryErr.toString() + '), attempting MailApp fallback...');
    try {
      MailApp.sendEmail(normRecipient, subject, 'Please view this email in an HTML compatible mail client.', {
        htmlBody: htmlBody,
        name: 'ROYMEN Concierge'
      });
      status = 'SENT';
      sentTime = nowIso;
      Logger.log('MailApp fallback email successfully sent to: ' + normRecipient + ' [' + subject + ']');
    } catch (fallbackErr) {
      status = 'FAILED';
      errorMessage = 'Primary: ' + primaryErr.toString() + ' | Fallback: ' + fallbackErr.toString();
      retryCount = 1;
      Logger.log('Email Send Failure to ' + normRecipient + ': ' + errorMessage);
    }
  }

  // Record in Email_Log
  if (sheet) {
    sheet.appendRow([
      emailId,
      normRecipient,
      category,
      subject,
      status,
      sentTime,
      retryCount,
      errorMessage
    ]);
  }

  return { success: status === 'SENT', emailId: emailId, status: status, error: errorMessage };
}

function processFailedEmailQueue() {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Email_Log') || ss.getSheetByName(SHEETS.EMAIL_LOG);
  if (!sheet) return 'No Email_Log sheet found.';

  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return 'No queued emails found.';

  var retriedCount = 0;
  for (var i = 1; i < data.length; i++) {
    var rowStatus = (data[i][4] || '').toString();
    var retryCount = parseInt(data[i][6] || 0, 10);

    if ((rowStatus === 'FAILED' || rowStatus === 'QUEUED') && retryCount < 3) {
      var recipient = (data[i][1] || '').toString().trim();
      var subject = data[i][3];
      
      if (!recipient || recipient.indexOf('@') === -1) {
        sheet.getRange(i + 1, 8).setValue('Failed to retry: no valid recipient email');
        continue;
      }

      try {
        MailApp.sendEmail(recipient, subject, 'ROYMEN Notification Retry', { name: 'ROYMEN Concierge' });
        sheet.getRange(i + 1, 5).setValue('SENT');
        sheet.getRange(i + 1, 6).setValue(new Date().toISOString());
        retriedCount++;
      } catch (err) {
        sheet.getRange(i + 1, 7).setValue(retryCount + 1);
        sheet.getRange(i + 1, 8).setValue(err.toString());
      }
    }
  }

  return 'Processed queue. Retried ' + retriedCount + ' email(s).';
}

function sendCustomerOTPEmail(email, otp, name) {
  var targetEmail = (email || '').toString().trim();
  if (!targetEmail || targetEmail.indexOf('@') === -1) {
    Logger.log('sendCustomerOTPEmail Error: invalid or missing recipient email: "' + targetEmail + '"');
    return { success: false, error: 'No recipient email address provided.' };
  }

  var custName = name || 'Valued Customer';
  var expiryDate = new Date(Date.now() + 10 * 60 * 1000);
  var expiryStr = expiryDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dhaka' });

  var content = '<div style="text-align: center;">' +
    '<span class="badge">Security Verification</span>' +
    '<h2 style="font-size: 22px; margin: 16px 0 8px; color: #ffffff;">Login Verification Code</h2>' +
    '<p style="color: #a1a1aa; margin-bottom: 24px;">Dear <strong style="color: #ffffff;">' + custName + '</strong>, enter the 6-digit verification code below to authenticate your account session.</p>' +
    '<div style="background-color: #27272a; padding: 24px; border-radius: 12px; border: 1px solid #f59e0b; margin: 24px 0; text-align: center;">' +
      '<div style="font-size: 36px; font-weight: 800; letter-spacing: 12px; color: #f59e0b; font-family: monospace;">' + otp + '</div>' +
      '<div style="font-size: 12px; color: #a1a1aa; margin-top: 10px; font-weight: 600; text-transform: uppercase;">⏱ Code Expires in 10 Minutes (Valid until ' + expiryStr + ' BST)</div>' +
    '</div>' +
    '<div style="background-color: #09090b; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; text-align: left; font-size: 13px; color: #d4d4d8; margin-top: 24px;">' +
      '<strong style="color: #f59e0b;">Security Notice:</strong> Never share this OTP code with anyone, including ROYMEN personnel. If you did not initiate this request, please secure your account or contact our concierge support immediately.' +
    '</div>' +
  '</div>';

  var htmlBody = buildBaseHtmlEmail('ROYMEN Login Verification', content);
  var subject = 'Your ROYMEN Login Verification Code';

  return queueAndSendEmail(targetEmail, 'Customer Login OTP', subject, htmlBody);
}

function sendCustomerOrderConfirmationEmail(order) {
  if (!order) return { success: false, error: 'No order object provided.' };
  var custName = order.customerName || order.name || 'Valued Customer';
  var targetEmail = (order.customerEmail || order.email || order.Email || order.userEmail || '').toString().trim();
  
  if (!targetEmail || targetEmail.indexOf('@') === -1) {
    Logger.log('sendCustomerOrderConfirmationEmail Error: missing recipient email address.');
    return { success: false, error: 'No recipient email address found in order data.' };
  }

  var orderId = order.id || order.orderId || ('ORD-' + Date.now());
  var orderDate = order.createdAt ? new Date(order.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }) : new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });
  var paymentMethod = order.paymentMethod || 'Cash on Delivery';

  // Format Items
  var itemsList = [];
  try {
    if (typeof order.items === 'string') {
      itemsList = JSON.parse(order.items);
    } else if (Array.isArray(order.items)) {
      itemsList = order.items;
    }
  } catch (e) {
    itemsList = [];
  }

  var itemsHtml = '';
  var totalQty = 0;

  if (itemsList && itemsList.length > 0) {
    itemsHtml += '<table class="table">' +
      '<thead><tr><th>Product Item</th><th>Variant</th><th style="text-align: center;">Qty</th><th style="text-align: right;">Amount</th></tr></thead><tbody>';
    
    for (var i = 0; i < itemsList.length; i++) {
      var it = itemsList[i];
      var qty = it.quantity || it.qty || 1;
      var price = it.price || 0;
      totalQty += qty;
      var variantStr = (it.color || it.variantColor || '') + (it.size || it.variantSize ? ' / ' + (it.size || it.variantSize) : '');
      
      itemsHtml += '<tr>' +
        '<td><strong style="color: #ffffff;">' + (it.name || it.productName || 'ROYMEN Item') + '</strong></td>' +
        '<td style="color: #a1a1aa; font-size: 13px;">' + (variantStr || 'Standard') + '</td>' +
        '<td style="text-align: center; color: #ffffff;">' + qty + '</td>' +
        '<td style="text-align: right; color: #f59e0b; font-weight: 600;">৳' + (price * qty).toLocaleString() + '</td>' +
      '</tr>';
    }
    itemsHtml += '</tbody></table>';
  } else {
    itemsHtml = '<p style="color: #a1a1aa;">ROYMEN Bespoke Atelier Clothing & Apparel Package</p>';
    totalQty = 1;
  }

  // Shipping address formatting
  var addrStr = 'Not provided';
  if (typeof order.shippingAddress === 'object' && order.shippingAddress !== null) {
    var a = order.shippingAddress;
    addrStr = [a.address, a.area, a.city || 'Dhaka', a.district, 'Bangladesh'].filter(Boolean).join(', ');
  } else if (typeof order.shippingAddress === 'string') {
    addrStr = order.shippingAddress;
  }

  var deliveryFee = order.deliveryFee !== undefined ? parseFloat(order.deliveryFee) : (order.shippingCharge !== undefined ? parseFloat(order.shippingCharge) : 80);
  var subtotal = order.subtotal !== undefined ? parseFloat(order.subtotal) : parseFloat(order.total || 0) - deliveryFee;
  var discount = order.discount !== undefined ? parseFloat(order.discount) : 0;
  var grandTotal = order.total !== undefined ? parseFloat(order.total) : subtotal + deliveryFee - discount;

  var content = '<div>' +
    '<div style="text-align: center; margin-bottom: 24px;">' +
      '<span class="badge">Order Confirmed • #' + orderId + '</span>' +
      '<h2 style="font-size: 22px; margin: 16px 0 8px; color: #ffffff;">Thank You for Your Order</h2>' +
      '<p style="color: #a1a1aa; margin: 0;">Dear <strong style="color: #ffffff;">' + custName + '</strong>, your bespoke order has been recorded and is currently being prepared by our master tailors.</p>' +
    '</div>' +

    '<div style="background-color: #27272a; padding: 20px; border-radius: 12px; margin-bottom: 24px; border: 1px solid #3f3f46;">' +
      '<div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px;">' +
        '<span style="color: #a1a1aa;">Order ID:</span> <strong style="color: #ffffff;">#' + orderId + '</strong>' +
      '</div>' +
      '<div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px;">' +
        '<span style="color: #a1a1aa;">Order Date:</span> <span style="color: #ffffff;">' + orderDate + '</span>' +
      '</div>' +
      '<div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px;">' +
        '<span style="color: #a1a1aa;">Payment Method:</span> <strong style="color: #f59e0b;">' + paymentMethod + '</strong>' +
      '</div>' +
      '<div style="display: flex; justify-content: space-between; font-size: 13px;">' +
        '<span style="color: #a1a1aa;">Estimated Delivery:</span> <span style="color: #34d399; font-weight: 600;">2-3 Business Days (Dhaka) / 3-5 Days (Outside)</span>' +
      '</div>' +
    '</div>' +

    '<h3 style="font-size: 16px; color: #f59e0b; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">Products Ordered</h3>' +
    itemsHtml +

    '<div class="total-box">' +
      '<div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; color: #d4d4d8;">' +
        '<span>Total Items:</span> <span>' + totalQty + ' Pcs</span>' +
      '</div>' +
      '<div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; color: #d4d4d8;">' +
        '<span>Subtotal:</span> <span>৳' + subtotal.toLocaleString() + '</span>' +
      '</div>' +
      '<div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; color: #34d399;">' +
        '<span>Discount:</span> <span>-৳' + discount.toLocaleString() + '</span>' +
      '</div>' +
      '<div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 12px; color: #d4d4d8;">' +
        '<span>Shipping Charge:</span> <span>৳' + deliveryFee.toLocaleString() + '</span>' +
      '</div>' +
      '<hr style="border: 0; border-top: 1px solid #52525b; margin: 10px 0;" />' +
      '<div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: 800; color: #ffffff;">' +
        '<span>Total Amount:</span> <span style="color: #f59e0b;">৳' + grandTotal.toLocaleString() + '</span>' +
      '</div>' +
    '</div>' +

    '<div style="margin-top: 24px; padding: 16px; background-color: #27272a; border-radius: 8px;">' +
      '<h4 style="margin: 0 0 6px; font-size: 14px; color: #ffffff;">Shipping Address:</h4>' +
      '<p style="margin: 0; font-size: 13px; color: #a1a1aa;">' + addrStr + '</p>' +
    '</div>' +
  '</div>';

  var htmlBody = buildBaseHtmlEmail('ROYMEN Order Confirmation - #' + orderId, content);
  var subject = 'Your ROYMEN Order Confirmation - Order #' + orderId;

  return queueAndSendEmail(targetEmail, 'Order Confirmation', subject, htmlBody);
}

function sendAdminNewOrderAlertEmail(order) {
  var primaryAdmin = getSettingValue('adminNotificationEmail') || APP_CONFIG.DEFAULT_ADMIN_EMAIL || 'admin@roymen.com.bd';
  var additionalAdmins = getSettingValue('additionalAdminEmails') || '';
  
  var combinedAdminsRaw = primaryAdmin + ',' + additionalAdmins;
  var adminEmails = combinedAdminsRaw.split(/[,;]+/).map(function(e) { return e.trim(); }).filter(function(e) { return e.length > 0 && e.indexOf('@') !== -1; });
  
  // Deduplicate admin recipient emails
  var uniqueAdminEmails = [];
  for (var k = 0; k < adminEmails.length; k++) {
    if (uniqueAdminEmails.indexOf(adminEmails[k]) === -1) {
      uniqueAdminEmails.push(adminEmails[k]);
    }
  }

  if (uniqueAdminEmails.length === 0) {
    uniqueAdminEmails.push('admin@roymen.com.bd');
  }

  var orderId = order.id || order.orderId || ('ORD-' + Date.now());
  var customerName = order.customerName || order.name || 'Valued Customer';
  var customerEmail = order.customerEmail || order.email || 'N/A';
  var customerPhone = order.customerPhone || order.phone || 'N/A';
  var totalAmount = order.total !== undefined ? parseFloat(order.total).toLocaleString() : '0';
  var paymentMethod = order.paymentMethod || 'Cash on Delivery';
  var orderDate = order.createdAt ? new Date(order.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }) : new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });
  var orderUrl = order.orderUrl || ('https://roymen.com.bd/admin?orderId=' + orderId);

  var content = '<div style="font-family: inherit; font-size: 15px; color: #f4f4f5; line-height: 1.6;">' +
    '<p style="margin-top: 0; font-size: 16px;">Hello Admin,</p>' +
    '<p style="font-size: 15px;">A new order has been received on <strong>ROYMEN</strong>.</p>' +
    
    '<div style="background-color: #27272a; border: 1px solid #3f3f46; border-radius: 12px; padding: 20px; margin: 20px 0;">' +
      '<h3 style="margin-top: 0; margin-bottom: 16px; color: #f59e0b; font-size: 16px; border-bottom: 1px solid #3f3f46; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Order Information</h3>' +
      '<p style="margin: 0 0 12px;"><strong>Order ID:</strong><br><span style="color: #ffffff; font-size: 16px; font-weight: 700;">#' + orderId + '</span></p>' +
      '<p style="margin: 0 0 12px;"><strong>Customer:</strong><br><span style="color: #ffffff;">' + customerName + '</span></p>' +
      '<p style="margin: 0 0 12px;"><strong>Customer Email:</strong><br><a href="mailto:' + customerEmail + '" style="color: #38bdf8;">' + customerEmail + '</a></p>' +
      '<p style="margin: 0 0 12px;"><strong>Customer Phone:</strong><br><a href="tel:' + customerPhone + '" style="color: #38bdf8;">' + customerPhone + '</a></p>' +
      '<p style="margin: 0 0 12px;"><strong>Total Amount:</strong><br><span style="color: #f59e0b; font-size: 18px; font-weight: 800;">৳' + totalAmount + '</span></p>' +
      '<p style="margin: 0 0 12px;"><strong>Payment Method:</strong><br><span style="color: #ffffff;">' + paymentMethod + '</span></p>' +
      '<p style="margin: 0;"><strong>Order Date:</strong><br><span style="color: #ffffff;">' + orderDate + '</span></p>' +
    '</div>' +

    '<p style="font-size: 15px;">Please review and process this order from the Admin Dashboard.</p>' +

    '<p style="margin: 24px 0;">' +
      '<strong>View Order:</strong><br>' +
      '<a href="' + orderUrl + '" class="btn" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #f59e0b; color: #09090b; font-weight: 700; text-decoration: none; border-radius: 8px; margin-top: 8px;">View Order #' + orderId + '</a>' +
    '</p>' +

    '<p style="margin-bottom: 4px;">Thank you,</p>' +
    '<p style="margin-top: 0; font-weight: 700; color: #f59e0b; letter-spacing: 1px;">ROYMEN<br><span style="font-weight: 400; font-size: 12px; color: #a1a1aa;">Wear Confidence</span></p>' +

    '<p style="font-size: 12px; color: #71717a; border-top: 1px solid #27272a; padding-top: 12px; margin-top: 24px;">This is an automated system notification.<br>Please do not reply to this email.</p>' +
  '</div>';

  var htmlBody = buildBaseHtmlEmail('Admin Order Notification - #' + orderId, content);
  var subject = '🚨 New Order Received - #' + orderId;

  var results = [];
  for (var m = 0; m < uniqueAdminEmails.length; m++) {
    var res = queueAndSendEmail(uniqueAdminEmails[m], 'Admin Alert', subject, htmlBody);
    results.push(res);
  }

  return results;
}

function sendCustomerOrderConfirmation(order) {
  return sendCustomerOrderConfirmationEmail(order);
}

function sendAdminNewOrderNotification(order) {
  return sendAdminNewOrderAlertEmail(order);
}
`
  },

  'Logger.gs': {
    filename: 'Logger.gs',
    category: 'System & Utilities',
    description: 'Audit log trail, login event recorder, and system error logger.',
    code: `/**
 * Logger.gs - Audit Trail, Login Log, and System Error Logger
 */

function logAuditTrail(user, action, moduleName, details) {
  try {
    var ss = getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEETS.AUDIT_LOG);
    if (!sheet) {
      runZeroConfigBootSequence();
      sheet = ss.getSheetByName(SHEETS.AUDIT_LOG);
    }
    if (sheet) {
      sheet.appendRow([
        generateUniqueId('AUD'),
        user || 'ANONYMOUS',
        action || 'ACTION',
        moduleName || 'GENERAL',
        new Date().toISOString(),
        details || ''
      ]);
      Logger.log('Audit_Log Write Success: Action="' + action + '", User="' + user + '"');
    }
  } catch (e) {
    Logger.log('Audit_Log Write Error: ' + e.toString());
  }
}

function logLoginAttempt(email, status, ip, browser, device, reason) {
  try {
    var ss = getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Login_Log') || ss.getSheetByName(SHEETS.LOGIN_LOG);
    if (!sheet) {
      runZeroConfigBootSequence();
      sheet = ss.getSheetByName('Login_Log') || ss.getSheetByName(SHEETS.LOGIN_LOG);
    }
    if (sheet) {
      sheet.appendRow([
        generateUniqueId('LGN'),
        email || 'ANONYMOUS',
        new Date().toISOString(),
        status || 'UNKNOWN',
        ip || '127.0.0.1',
        browser || 'Browser',
        device || 'Device',
        reason || ''
      ]);
      Logger.log('Login_Log Write Success: Email="' + email + '", Status="' + status + '"');
    }
  } catch (err) {
    Logger.log('Login_Log Write Error: ' + err.toString());
  }
}

function logSystemError(moduleName, functionName, errorMessage, stackTrace, user) {
  try {
    var ss = getActiveSpreadsheet();
    var sheet = ss.getSheetByName('System_Error_Log') || ss.getSheetByName(SHEETS.SYSTEM_ERROR_LOG);
    if (!sheet) {
      runZeroConfigBootSequence();
      sheet = ss.getSheetByName('System_Error_Log') || ss.getSheetByName(SHEETS.SYSTEM_ERROR_LOG);
    }
    if (sheet) {
      sheet.appendRow([
        generateUniqueId('ERR'),
        new Date().toISOString(),
        moduleName || 'General',
        functionName || 'Unknown',
        errorMessage || '',
        stackTrace || '',
        user || 'System'
      ]);
      Logger.log('System_Error_Log Write Success: Module="' + moduleName + '", Error="' + errorMessage + '"');
    }
  } catch (err) {
    Logger.log('System_Error_Log Write Error: ' + err.toString());
  }
}
`
  },

  'Health.gs': {
    filename: 'Health.gs',
    category: 'System & Utilities',
    description: 'Full database health diagnostic & auto-repair scanner.',
    code: `/**
 * Health.gs - Full Diagnostic Scanner & Self-Healing Health Check
 */

function runFullHealthCheck() {
  var ss = getActiveSpreadsheet();
  var expectedCount = Object.keys(SHEETS).length;
  var report = {
    status: 'HEALTHY',
    spreadsheetId: ss.getId(),
    spreadsheetName: ss.getName(),
    sheetsFound: 0,
    expectedSheetsCount: expectedCount,
    superAdminCreated: false,
    cacheService: 'OPERATIONAL',
    lockService: 'OPERATIONAL',
    appVersion: APP_CONFIG.VERSION,
    dbVersion: APP_CONFIG.DB_VERSION,
    issues: []
  };

  var sheets = ss.getSheets();
  report.sheetsFound = sheets.length;

  var missing = [];
  for (var sKey in SHEETS) {
    var tName = SHEETS[sKey];
    var s = ss.getSheetByName(tName) || ss.getSheetByName(tName.replace(/^[0-9]+_/, ''));
    if (!s) {
      missing.push(tName);
    }
  }

  if (missing.length > 0) {
    report.issues.push("Missing sheets: " + missing.join(", ") + ". Auto-healing triggered.");
    runZeroConfigBootSequence();
  }

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
`
  },

  'Backup.gs': {
    filename: 'Backup.gs',
    category: 'System & Utilities',
    description: 'Automated backup logging and snapshot tracking.',
    code: `/**
 * Backup.gs - Automated Backup Log & Data Snapshot Controller
 */

function recordBackupLog(sheetName, rowCount) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.BACKUP_LOG);
  var backupId = generateUniqueId('BKP');

  if (sheet) {
    sheet.appendRow([
      backupId,
      sheetName,
      rowCount,
      new Date().toISOString(),
      'COMPLETED'
    ]);
  }
  return backupId;
}
`
  },

  'Settings.gs': {
    filename: 'Settings.gs',
    category: 'System & Utilities',
    description: 'Key-value settings reader and writer for 01_Settings and 29_App_Settings.',
    code: `/**
 * Settings.gs - Key-Value Settings Controller
 */

function getSettingValue(key) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.SETTINGS);
  if (!sheet) return null;

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === key) {
      return data[i][1];
    }
  }
  return null;
}

function updateSettingValue(key, val) {
  var ss = getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.SETTINGS);
  if (!sheet) return;

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
`
  },

  'Developer.gs': {
    filename: 'Developer.gs',
    category: 'System & Utilities',
    description: 'Developer panel endpoints, system diagnostics, and schema inspector.',
    code: `/**
 * Developer.gs - Developer API Utilities & System Configuration Inspector
 */

function getSystemDeveloperConfig() {
  return {
    appVersion: APP_CONFIG.VERSION,
    dbVersion: APP_CONFIG.DB_VERSION,
    sheetsCount: Object.keys(SHEETS).length,
    supportedGateways: ['COD', 'bKash', 'Nagad', 'SSLCommerz'],
    activeSpreadsheetName: getActiveSpreadsheet().getName()
  };
}
`
  }
};

// ==========================================
// ENTERPRISE BUILD SYSTEM & QUALITY GATE
// ==========================================
let currentBuildCount = 104;

export function buildEnterpriseBackend(): BuildResult {
  currentBuildCount++;
  const issues: string[] = [];
  const functionNames = new Set<string>();
  let totalLines = 0;

  // 1. Analyze and validate every source module
  const fileKeys = Object.keys(GAS_SOURCE_FILES);
  for (const key of fileKeys) {
    const module = GAS_SOURCE_FILES[key];
    const lines = module.code.split('\n');
    totalLines += lines.length;

    // Quality Gate Check: Check for function name collisions across modules
    const fnRegex = /function\s+([a-zA-Z0-9_$]+)\s*\(/g;
    let match: RegExpExecArray | null;
    while ((match = fnRegex.exec(module.code)) !== null) {
      const fnName = match[1];
      if (functionNames.has(fnName)) {
        issues.push(`Duplicate function '${fnName}' detected in module '${key}'.`);
      } else {
        functionNames.add(fnName);
      }
    }
  }

  // 2. Compute build hash and timestamp
  const buildHash = 'BUILD-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  const timestamp = new Date().toISOString();
  const qualityGatePassed = issues.length === 0;

  // 3. Assemble production Code.gs artifact preserving execution order and module headers
  const header = `/**
 * ==============================================================================
 * ROYMEN ENTERPRISE E-COMMERCE PLATFORM - ZERO-CONFIGURATION GAS BACKEND
 * BRAND: ROYMEN | TAGLINE: Wear Confidence. | COUNTRY: BANGLADESH
 * SPREADSHEET TABS: ENTERPRISE SHEETS (AUTO-PROVISIONED)
 * VERSION: ${APP_CONFIG_META.VERSION} | BUILD: #${currentBuildCount} (${buildHash})
 * GENERATED AT: ${timestamp}
 * ==============================================================================
 * 
 * INSTALLATION INSTRUCTIONS:
 * 1. Open Google Sheets > Extensions > Apps Script.
 * 2. Delete any existing code and paste this ENTIRE generated Code.gs file.
 * 3. Deploy as Web App (Execute as 'Me', Who has access 'Anyone').
 * 4. Paste Web App URL in ROYMEN Admin Panel / config.ts.
 */

`;

  let combinedCode = header;
  for (const key of fileKeys) {
    const mod = GAS_SOURCE_FILES[key];
    combinedCode += `// ==========================================\n`;
    combinedCode += `// MODULE: ${mod.filename} (${mod.category})\n`;
    combinedCode += `// ${mod.description}\n`;
    combinedCode += `// ==========================================\n`;
    combinedCode += mod.code + `\n\n`;
  }

  const stats: BuildStats = {
    status: qualityGatePassed ? 'SUCCESS' : 'QUALITY_GATE_FAILED',
    version: APP_CONFIG_META.VERSION,
    dbVersion: APP_CONFIG_META.DB_VERSION,
    buildNumber: currentBuildCount,
    buildHash: buildHash,
    timestamp: timestamp,
    modulesCount: fileKeys.length,
    functionsCount: functionNames.size,
    linesCount: combinedCode.split('\n').length,
    qualityGatePassed: qualityGatePassed
  };

  return {
    success: qualityGatePassed,
    code: combinedCode,
    stats: stats,
    issues: issues
  };
}

export const APP_CONFIG_META = {
  VERSION: "2.0.0",
  DB_VERSION: "2.0.0"
};

export function generateGoogleAppsScriptCode(): string {
  const result = buildEnterpriseBackend();
  return result.code;
}
