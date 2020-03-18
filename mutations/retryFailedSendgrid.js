// from core-service email

import Logger from "@reactioncommerce/logger";

/**
 * @name sendgrid/retryFailed
 * @summary Retry a failed or cancelled email job
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - mutation input
 * @param {String} input.jobId - a sendEmail job ID
 * @returns {Boolean} - returns true if job is successfully restarted
 */
export default async function retryFailed(context, input) {
  const { collections, backgroundJobs } = context;
  const { SendgridNotifications } = collections;
  const { jobId, shopId } = input;
  let sendgridJobId = jobId;

  await context.validatePermissions("reaction:legacy:emails", "send", {
    shopId
  });

  Logger.debug(`emails/retryFailed - restarting sendgrid job "${jobId}"`);

  // Get email job to retry
  const job = await backgroundJobs.getJob(jobId);

  // If this job was never completed, restart it and set it to "ready"
  if (job._doc.status !== "completed") {
    await job.restart();
    await job.ready();
  } else {
    // Otherwise rerun the completed job
    // `rerun` clones the job and returns the id.
    // We'll set the new one to ready
    sendgridJobId = job.rerun();
  }

  // Set the job status to ready to trigger the Jobs observer to trigger sendEmail
  SendgridNotifications.update({ _id: sendgridJobId }, {
    $set: {
      status: "ready"
    }
  });

  return true;
}
