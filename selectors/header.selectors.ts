export const headerSelectors = {
  headerContainer: '.primary_header',
  headerLogo: '.app_logo',
  headerMenuButton: '#react-burger-menu-btn',
  headerShoppingContainer: '#shopping_cart_container',
  headerShoppingCartLink: '.shopping_cart_link',
  shoppingCartLink: '.shopping_cart_link',
  shoppingCartBadge: '.shopping_cart_badge',
  cartList: '.cart_list',
  cartItem: '.cart_item',
  getStartedLink: {
    role: 'link',
    name: /Get started/i,
  },
} as const;
