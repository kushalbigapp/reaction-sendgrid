// from core-service email
import retryFailedSendgrid from "./retryFailedSendgrid.js";
import sendNotification from "./sendNotification.js";
// from plugin email-smtp
import verifySendgridEmailSettings from "./verifySendgridEmailSettings.js";


export default {
  // from core-service email
  retryFailedSendgrid,
  sendNotification,
  // from plugin email-smtp
  verifySendinblueEmailSettings
};
