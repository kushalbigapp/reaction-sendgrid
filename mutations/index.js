// from core-service email
import retryFailedSendgrid from "./retryFailedSendgrid.js";
import sendgridNotification from "./sendgridNotification.js";
// from plugin email-smtp
import verifySendgridEmailSettings from "./verifySendgridEmailSettings.js";


export default {
  // from core-service email
  retryFailedSendgrid,
  sendgridNotification,
  // from plugin email-smtp
  verifySendgridEmailSettings
};
