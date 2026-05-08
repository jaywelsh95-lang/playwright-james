export const pdpSelectors = {
  productContainer: '.inventory_details_container',
  productName: '[data-test="product-title"], .inventory_details_name_large, h1',
  productPrice: '[data-test="price"], .inventory_details_price, [class*="price"]',
  productDescription: '[data-test="product-description"], .inventory_details_desc_large, [class*="desc"]',
  productImage: '.inventory_details_img img, [data-test="product-image"]',
  addToCartButton: '#add-to-cart, [data-test*="add-to-cart"], button:has-text("Add to cart")',
  backButton: '#back-to-products, button:has-text("Back to products")',
} as const;