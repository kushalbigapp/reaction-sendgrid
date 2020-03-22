import i18n from "./i18n/index.js";
import mutations from "./mutations/index.js";
import policies from "./policies.json";
import startup from "./startup.js";
import resolvers from "./resolvers/index.js";
import schemas from "./schemas/index.js";
import sendgridNotification from "./mutations/sendgridNotification.js";
/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function registerSendgridPlugin(app) {
  await app.registerPlugin({
    label: "Sendgrid",
    name: "reaction-sendgrid",
    version: app.context.appVersion,
    i18n,
    collections: {
      SendgridNotifications: {
        name: "SendgridNotifications",
        indexes: [
          // Create indexes. We set specific names for backwards compatibility
          // with indexes created by the aldeed:schema-index Meteor package.
          [{ jobId: 1 }, { name: "c2_jobId" }]
        ]
      }
    },
    graphQL: {
      resolvers,
      schemas
    },
    mutations: {
      sendEmail: sendgridNotification
    },
    policies,
    functionsByType: {
      startup: [startup]
    }
  });
}

