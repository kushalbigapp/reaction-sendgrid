// from core-service email

import Logger from "@reactioncommerce/logger";

/**
 * @param {Object} context App context
 * @returns {undefined}
 */
export default function processSendgridJobs(context) {
  const { appEvents, backgroundJobs, collections } = context;
  const { SendgridNotifications } = collections;

  /**
   * @name sendSendgridCompleted
   * @summary Callback for when an email has successfully been sent.
   *  Updates email status in DB, logs a debug message, and marks job as done.
   * @param {Object} job The job that completed
   * @param {String} message A message to log
   * @returns {undefined} undefined
   */
  async function sendgridCompleted(job, message) {
    const jobId = job._doc._id;

    await SendgridNotifications.updateOne({ jobId }, {
      $set: {
        status: "completed"
      }
    });

    Logger.debug(message);

    return job.done();
  }

  /**
   * @name sendSendgridFailed
   * @summary Callback for when an email delivery attempt has failed.
   *  Updates email status in DB, logs an error message, and marks job as failed.
   * @param {Object} job The job that failed
   * @param {String} message A message to log
   * @returns {undefined} undefined
   */
  async function sendgridFailed(job, message) {
    const jobId = job._doc._id;

    await SendgridNotifications.updateOne({ jobId }, {
      $set: {
        status: "failed"
      }
    });

    Logger.error(message);

    return job.fail(message);
  }

  backgroundJobs.addWorker({
    type: "sendgridNotification",
    pollInterval: 5 * 1000, // poll every 5 seconds
    workTimeout: 2 * 60 * 1000, // fail if it takes longer than 2mins
    async worker(job) {
      const { from, to, subject, html, ...optionalEmailFields } = job.data;

      //Logger.info("Sam : processSendgridJobs.js stringify job.data = " + JSON.stringify(job.data));

      if (!from || !to) {
        // || !subject) {
        // || !html) {
        const msg = "Sendgrid job requires an options object with to/from/subject/html.";
        Logger.error(`[Job]: ${msg}`);
        job.fail(msg, { fatal: true });
        return;
      }

      const jobId = job._doc._id;

      await SendgridNotifications.updateOne({ jobId }, {
        $set: {
          from,
          to,
          subject,
          //html,
          status: "processing",
          ...optionalEmailFields
        }
      }, {
        upsert: true
      });

      await appEvents.emit("sendgridNotification", { job, sendgridCompleted, sendgridFailed });
    }
  });
}
