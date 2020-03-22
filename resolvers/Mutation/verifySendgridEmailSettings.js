/**
 * @name Mutation/verifySendgridEmailSettings
 * @method
 * @summary resolver for the verifySendgridEmailSettings GraphQL mutation
 * @param {Object} _ - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {String} input.shopId - ShopID this setting belongs to.
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} verifySendgridEmailSettingsPayload
 */

export default async function verifySendgridEmailSettings(_, { input }, context) {
  const {
    clientMutationId = null,
    shopId
  } = input;

  const isVerified = await context.mutations.verifySendgridEmailSettings(context, {
    shopId
  });

  return {
    clientMutationId,
    isVerified
  };
}
