# Sendgrid plugin for reaction commerce

## Overview

This plugin isan interface between reaction commerce and the sendgrid email platform http://wendgrid.com

Sendgrid is an email marketing platform. It is used to send orders notifications email.

## Configuration

Add in reaction/.env :

SENDGRID_API_KEY=YOUR_SENDGRID_API_KEY   (required)
SENDGRID_NEWORDER_TEMPLATE_ID=YOUR_NEW_ORDER_TEMPLATE_ID  (optional)
SENDGRID_SHIPPEDORDER_TEMPLATE_ID=YOUR_SHIPPED_ORDER_TEMPLATE_ID  (optional)
SENDGRID_REFUNDORDER_TEMPLATE_ID=YOUR_REFUND_ORDER_TEMPLATE_ID  (optional)
SENDGRID_REFUNDITEM_TEMPLATE_ID=YOUR_REFUND_ITEM_TEMPLATE_ID  (optional)

All sendgrid template id are optional, you can use whatever you need.

If a template id is not provided, the default reaction commerce template from the email-template plugin is used. In that case the sendgrid platform is used to send it anyway.

