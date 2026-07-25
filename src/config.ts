// ROYMEN Enterprise Configuration
// Central Source of Truth for Platform Credentials & System Meta

export const APP_CONFIG = {
  SPREADSHEET_ID: "",
  API_URL: "",
  APP_NAME: "ROYMEN",
  TAGLINE: "Wear Confidence.",
  COUNTRY: "Bangladesh",
  CURRENCY: "৳",
  VERSION: "2.0.0",
  DB_VERSION: "2.0.0",
  CLOUDINARY_CLOUD_NAME: "roymen-enterprise",
  GMAIL_SENDER: "concierge@roymen.com.bd",
  DEFAULT_ADMIN_EMAIL: "admin@roymen.com.bd",
  ENV: "production"
};

export interface AppConfigType {
  SPREADSHEET_ID: string;
  API_URL: string;
  APP_NAME: string;
  TAGLINE: string;
  COUNTRY: string;
  CURRENCY: string;
  VERSION: string;
  DB_VERSION: string;
  CLOUDINARY_CLOUD_NAME: string;
  GMAIL_SENDER: string;
  DEFAULT_ADMIN_EMAIL: string;
  ENV: string;
}
