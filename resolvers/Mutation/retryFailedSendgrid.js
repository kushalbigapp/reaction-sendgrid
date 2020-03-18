import { decodeJobOpaqueId, decodeShopOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation.retryFailedSendinblue
 * @method
 * @memberof Routes/GraphQL
 * @summary Retry a failed or cancelled email job
 * @param {Object} parentResult - unused
 * @param {Object} args.input - RetryFailedEmailInput
 * @param {String} args.input.id - Email Job id
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} RetryFailedSendinbluePayload
 */
export default async function retryFailedSendinblue(parentResult, { input }, context) {
  const {
    clientMutationId = null,
    jobId: opaqueJobId,
    shopId: opaqueShopId
  } = input;
  const resp = await context.mutations.retryFailedSendinblue(context, {
    jobId: decodeJobOpaqueId(opaqueJobId),
    shopId: decodeShopOpaqueId(opaqueShopId)
  });

  return {
    clientMutationId,
    sendinblueSent: resp
  };
}
