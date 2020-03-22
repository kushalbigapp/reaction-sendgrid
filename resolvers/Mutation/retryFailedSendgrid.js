import { decodeJobOpaqueId, decodeShopOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation.retryFailedSendgrid
 * @method
 * @memberof Routes/GraphQL
 * @summary Retry a failed or cancelled email job
 * @param {Object} parentResult - unused
 * @param {Object} args.input - RetryFailedEmailInput
 * @param {String} args.input.id - Email Job id
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} RetryFailedSendgridPayload
 */
export default async function retryFailedSendgrid(parentResult, { input }, context) {
  const {
    clientMutationId = null,
    jobId: opaqueJobId,
    shopId: opaqueShopId
  } = input;
  const resp = await context.mutations.retryFailedSendgrid(context, {
    jobId: decodeJobOpaqueId(opaqueJobId),
    shopId: decodeShopOpaqueId(opaqueShopId)
  });

  return {
    clientMutationId,
    sendgridSent: resp
  };
}
