import envalid from "envalid";
import Logger from "@reactioncommerce/logger";
// import fetch from "node-fetch";
// import getConfigFromMailUrl from "./util/getConfigFromMailUrl.js";

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
  SENDGRID_NEWORDER_SUBJECT: str({
    desc: "The new order subject",
    default: "{{shop.name}}: Thank you for your order - {{order.referenceId}}"
  }),
  SENDGRID_SHIPPEDORDER_TEMPLATE_ID: str({
    desc: "The shipped order template id from sendgrid, if missing, the reaction template is used",
    default: ""
  }),
  SENDGRID_SHIPPEDORDER_SUBJECT: str({
    desc: "The new order subject",
    default: "{{shop.name}}: Your order has shipped - {{order.referenceId}}"
  }),
  SENDGRID_REFUNDEDORDER_TEMPLATE_ID: str({
    desc: "The refunded order template id from sendgrid, if missing, the reaction template is used",
    default: ""
  }),
  SENDGRID_REFUNDEDORDER_SUBJECT: str({
    desc: "The refunded order subject",
    default: "{{shop.name}}: Confirmation of refund for {{order.referenceId}}"
  }),
  SENDGRID_REFUNDEDITEM_TEMPLATE_ID: str({
    desc: "The refunded item template id from sendgrid, if missing, the reaction template is used",
    default: ""
  }),
  SENDGRID_REFUNDEDITEM_SUBJECT: str({
    desc: "The refunded item subject",
    default: "{{shop.name}}: Refund confirmation - {{order.referenceId}}"
  })

}, {
  dotEnvPath: null
});

export const SendgridConfig = { 
  logger: config.SENDGRID_DEBUG, 
  apiKey: config.SENDGRID_API_KEY,
  newOrderTemplate: config.SENDGRID_NEWORDER_TEMPLATE_ID,
  newOrderSubject: config.SENDGRID_NEWORDER_SUBJECT,
  shippedOrderTemplate: config.SENDGRID_SHIPPEDORDER_TEMPLATE_ID,
  shippedOrderSubject: config.SENDGRID_SHIPPEDORDER_SUBJECT,
  refundedOrderTemplate: config.SENDGRID_REFUNDEDORDER_TEMPLATE_ID,
  refundedOrderSubject: config.SENDGRID_REFUNDEDORDER_SUBJECT,
  refundedItemTemplate: config.SENDGRID_REFUNDEDITEM_TEMPLATE_ID,
  refundedItemSubject: config.SENDGRID_REFUNDEDITEM_SUBJECT
};

// Parse the MAIL_URL and add the parsed config
/*if (typeof config.MAIL_URL === "string" && config.MAIL_URL.length) {
  Object.assign(SMTPConfig, getConfigFromMailUrl(config.MAIL_URL));

  const logConfig = { ...SendinblueConfig };
  if (SendinblueConfig.auth) {
    // Hide password from auth logging
    logConfig.auth = {
      user: SendinblueConfig.auth.user,
      pass: "*".repeat(SendinblueConfig.auth.pass.length)
    };
  }
  Logger.debug(logConfig, "Parsed SMTP email config");
}*/

//TODO : Check connection api v3 to validate the api key
// https://github.com/zeit/next.js/issues/7960
/*const res = await fetch('https://api.sendinblue.com/v3/account', {
  method: 'GET',
  body: JSON.stringify({ hungry: true }),
  headers: {'Content-Type': 'application/json',},
})
const data = await res.json()
*/

/*
//export default async function expandAuthToken(token) {
  const response = await fetch("https://api.sendinblue.com/v3/account", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });

  if (!response.ok) throw new Error("Error introspecting token");

  //return response.json();
//}

Logger.info("SAM : sendinblue response " + response.json());
*/

/*var options = {
  method: 'GET',
  url: 'https://api.sendinblue.com/v3/account',
  headers: {accept: 'application/json'}
};*/

/*request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});*/


export default config;
