// import nodemailer from "@reactioncommerce/nodemailer";

//import { MailService } from "@sendgrid/mail";
//import { setApiKey, sendGrid } from "@bubblemind/reaction-sendgrid";

import { SendinblueConfig } from "../config.js";
import Logger from "@reactioncommerce/logger";
// import fetchSendinblue from "./fetchSendinblue.js";

const sgMail = require('@sendgrid/mail');

/**
 * @name sendSendinblueEmail
 * @summary Responds to the "sendEmail" app event to send an email via SMTP
 * @param {Object} context App context
 * @param {Object} job Current sendSendinblue job being processed
 * @param {Function} sendEmailCompleted Called when email was successfully sent
 * @param {Function} sendEmailFailed Called on error
 * @returns {undefined} Calls one of the callbacks with a return
 */
export default async function sendSendinblueEmail(context, { job, sendSendinblueCompleted, sendSendinblueFailed }) {
  const { to, shopId, ...otherEmailFields } = job.data;


  sgMail.setApiKey(SendinblueConfig.SENDGRID_API_KEY);
  const msg = {
    to: job.data.to,
    from: job.data.from, // 'test@example.com',
    subject: job.data.subject, // 'Sending with Twilio SendGrid is Fun',
    // text: 'and easy to do anywhere, even with Node.js',
    html: job.data.html // '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  //const transport = nodemailer.createTransport(SMTPConfig);

  (async () => {
    try {
      await sgMail.sendGrid(msg);
      sendSendinblueCompleted(job, `Successfully sent email to ${to}`);
    } catch (err) {
      // console.error(err.toString());
      sendSendinblueFailed(job, `Email job failed: ${err.toString()}`);
    }
  })();

  /*
  transport.sendMail({ to, shopId, ...otherEmailFields }, (error) => {
    if (error) {
      sendEmailFailed(job, `Email job failed: ${error.toString()}`);
    } else {
      sendEmailCompleted(job, `Successfully sent email to ${to}`);
    }
  });
*/


  /*
  // Logger.info("Sam : jobData = " + JSON.stringify(job.data.data.order));

  Logger.info("Sam : jobData = " + JSON.stringify(job.data.data.combinedItems));

  let productsHeader;

  for (const item of job.data.data.combinedItems) {
    // Logger.info("Sam : item stringify = " + JSON.stringify(item));
    // Logger.info("SAM : item " + item.title);

    // const variantName = Object.keys(item.attributes).forEach((attribute) => {
    //   return `${attribute.label} ${attribute.value}`;
    // }).joint(" ");

    let variantName = "";

    for (const attribute of item.attributes) {
      Logger.info(`${attribute.label}-${attribute.value}-`);
      variantName += `${attribute.label} ${attribute.value} `;
    }

    const product = {
      name: item.title,
      quantity: item.quantity,
      price: item.price.displayAmount,
      image: item.variantImage,
      variant_name: variantName
    };

    productsHeader += product;
  }
  */

  /*
  Object.keys(job.data.data.combinedItems).forEach((item) => {
    const variantName = Object.keys(item.attributes).forEach((attribute) => {
      return `${attribute.label} ${attribute.value}`;
    }).joint(" ");

    const product = {
      name: item.title,
      quantity: item.quantity,
      price: item.price.displayAmount,
      image: item.variantImage,
      variant_name: variantName
    };

    productsHeader += product;
  });*/

  /*
  Logger.info("Sam : jobData = " + JSON.stringify(productsHeader));

  const dataHeader = {
    params: {
      ORDER_ID: job.data.data.order._id,
      ODER_DATE: job.data.data.orderDate,  // createdAt,
      ORDER_PRICE: job.data.data.billing.adjustedTotal,
      SHIPPING_FULL_NAME: job.data.data.order.shipping.fullName,
      // SHIPPING_FIRST_NAME: job.data.shipping.
      // SHIPPING_LAST_NAME
      SHIPPING_ADDRESS_1: job.data.data.order.shipping[0].address1,
      SHIPPING_ADDRESS_2: job.data.data.order.shipping[0].address2,
      SHIPPING_POSTCODE: job.data.data.order.shipping[0].postal,
      SHIPPING_CITY: job.data.data.order.shipping[0].city,

      BILLING_FULL_NAME: job.data.data.order.payments.fullName,
      // BILLING_FIRST_NAME: job.data.order.billing
      // BILLING_LAST_NAME
      BILLING_ADDRESS_1: job.data.data.order.payments.address1,
      BILLING_ADDRESS_2: job.data.data.order.payments.address2,
      BILLING_POSTCODE: job.data.data.order.payments.postal,
      BILLING_CITY: job.data.data.order.payments.city,

      ORDER_SUBTOTAL: job.data.data.billing.subtotal,
      CART_DISCOUNT: job.data.data.billing.discounts,
      productsHeader
    }
  };

  Logger.info("Sam : stringify = " + JSON.stringify(dataHeader));

  // OK : const response = await fetchSendinblue("smtp/templates", "GET", { templateStatus: true, limit: 2, offset: 0 }, {});
  // OK : const response = await fetchSendinblue("account", "GET", {}, {});

  const response = await fetchSendinblue("smtp/email", "POST", { templateStatus: true, limit: 2, offset: 0 }, dataHeader);

  const responseJson = await response.json();

  //const responseJsonObj = JSON.parse(responseJson);

  Logger.info("Sam : stringify = " + JSON.stringify(responseJson));
  */

  //Logger.info(`SAM ret : ${response_json.email}`);
  /* for (const prop in responseJson) {
    if (responseJson.hasOwnProperty(prop)) {
      Logger.info(`${prop} : ${responseJson[prop]}`);
    }
  }*/

  // responseContent for debugging
  /* let responseContent = Object.keys(responseJSON).map((key) => {
    return key + ' : ' + responseJSON[key]
  }).join(' & ');

  Logger.info("SAM : response content " + responseContent); */

  /*
  // Logger.info("SAM : notification job sendinblue count " + responseJson.count);
  // Logger.info("SAM : notification job sendinblue length " + Object.keys(responseJson.templates).length);

  if (response.status !== 200) {
    sendSendinblueFailed(job, `Email job failed: ${response.statusText}`);
  } else {
    sendSendinblueCompleted(job, `Successfully sent email to ${to}`);
  }
  */
}
/*
export default async function expandAuthToken(token) {
  const response = await fetch(HYDRA_OAUTH2_INTROSPECT_URL, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "GET",
    body: `token=${encodeURIComponent(token)}`
  });

  if (!response.ok) throw new Error("Error introspecting token");

  return response.json();
}
*/
