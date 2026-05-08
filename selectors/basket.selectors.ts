export const basketSelectors = {
  cartContainer: '.cart_list',
  cartItem: '.cart_item',
  productQty: '.cart_quantity',
  productDescription: '.inventory_item_name',
  productPrice: '.inventory_item_price',
  removeButton: '[data-test*="remove"]',
  continueShoppingButton: '#continue-shopping',
  checkoutButton: '#checkout',
} as const;
