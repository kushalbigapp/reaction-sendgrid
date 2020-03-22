import processSendgridJobs from "./util/processSendgridJobs.js";
import sendgridNotification from "./util/sendgridNotification.js";

/**
 * @summary Called on startup
 * @param {Object} context Startup context
 * @param {Object} context.collections Map of MongoDB collections
 * @returns {undefined}
 */
export default function sendgridStartup(context) {

  processSendgridJobs(context);
  context.appEvents.on("sendgridNotification", (...args) => sendgridNotification(context, ...args));
}

