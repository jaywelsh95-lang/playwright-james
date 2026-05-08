export const pdpSelectors = {
  productContainer: '.inventory_details',
  productName: '.inventory_details_name',
  productPrice: '.inventory_details_price',
  productDescription: '.inventory_details_desc',
  productImage: '.inventory_details_img',
  addToCartButton: 'button:has-text("Add to cart")',
  backButton: '#back-to-products',
} as const;