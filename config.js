import envalid from "envalid";
import Logger from "@reactioncommerce/logger";

const { bool, str } = envalid;

const config = envalid.cleanEnv(process.env, {
  SENDGRID_DEBUG: bool({
    default: false
  }),
  SENDGRID_API_KEY: str({
    desc: "A Sendgrid Api v3 key",
    default: ""
  }),
  SENDGRID_NEWORDER_TEMPLATE_ID: str({
    desc: "The new order template id from sendgrid, if missing, the reaction template is used",
    default: ""
  }),
  SENDGRID_SHIPPEDORDER_TEMPLATE_ID: str({
    desc: "The shipped order template id from sendgrid, if missing, the reaction template is used",
    default: ""
  }),
  SENDGRID_REFUNDEDORDER_TEMPLATE_ID: str({
    desc: "The refunded order template id from sendgrid, if missing, the reaction template is used",
    default: ""
  }),
  SENDGRID_REFUNDEDITEM_TEMPLATE_ID: str({
    desc: "The refunded item template id from sendgrid, if missing, the reaction template is used",
    default: ""
  }),
}, {
  dotEnvPath: null
});

export const SendgridConfig = { 
  logger: config.SENDGRID_DEBUG, 
  apiKey: config.SENDGRID_API_KEY,
  newOrderTemplate: config.SENDGRID_NEWORDER_TEMPLATE_ID,
  shippedOrderTemplate: config.SENDGRID_SHIPPEDORDER_TEMPLATE_ID,
  refundedOrderTemplate: config.SENDGRID_REFUNDEDORDER_TEMPLATE_ID,
  refundedItemTemplate: config.SENDGRID_REFUNDEDITEM_TEMPLATE_ID
};

export default config;
