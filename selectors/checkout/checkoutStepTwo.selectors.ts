export const checkoutStepTwoSelectors = {
  productDetails: '.cart_item',
  productName: '.inventory_item_name',
  productDescription: '.inventory_item_desc',
  productPrice: '.inventory_item_price',
  productQty: '.cart_quantity',
  paymentInfo: '.summary_value_label[data-test="payment-info-value"]',
  shippingInfo: '.summary_value_label[data-test="shipping-info-value"]',
  subtotal: '.summary_subtotal_label',
  tax: '.summary_tax_label',
  total: '.summary_total_label',
  finishButton: '#finish',
} as const;