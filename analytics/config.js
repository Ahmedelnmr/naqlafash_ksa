/**
 * Analytics & Conversion Tracking Configuration
 * ================================================
 * 
 * Replace the placeholder values below with your actual IDs.
 * Do NOT commit real IDs to public repositories.
 * 
 * After configuring, add the GTM/GA4 snippets to all pages
 * or use Google Tag Manager to manage all tags.
 */

var ANALYTICS_CONFIG = {
  // Google Analytics 4 — Measurement ID
  // Format: G-XXXXXXXXXX
  GA4_MEASUREMENT_ID: '',

  // Google Ads — Conversion ID
  // Format: AW-XXXXXXXXXX
  GOOGLE_ADS_CONVERSION_ID: '',

  // Google Ads — Phone Call Conversion Label
  GOOGLE_ADS_PHONE_CONVERSION_LABEL: '',

  // Google Ads — WhatsApp Click Conversion Label
  GOOGLE_ADS_WHATSAPP_CONVERSION_LABEL: '',

  // Google Ads — Form Submit Conversion Label
  GOOGLE_ADS_FORM_CONVERSION_LABEL: '',

  // Google Tag Manager — Container ID
  // Format: GTM-XXXXXXX
  GTM_CONTAINER_ID: ''
};

/**
 * Conversion Events Reference:
 * 
 * Event Name              | Trigger
 * ----------------------- | -------
 * phone_click             | User clicks any phone link (tel:)
 * whatsapp_click          | User clicks any WhatsApp link
 * contact_form_submit     | User submits the contact form
 * 
 * These events are automatically tracked in js/main.js
 * and pushed to both gtag() and dataLayer[].
 * 
 * To connect with Google Ads conversions:
 * 1. Set up conversion actions in Google Ads
 * 2. Use GTM to map the events above to your conversion actions
 * 3. Or add gtag conversion snippets directly after gtag('config', ...)
 */
