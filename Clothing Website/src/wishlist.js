const WISHLIST_STORAGE_KEY = "wishlist";
const WISHLIST_CHANGE_EVENT = "wishlistchange";

const getProductId = (product) => product?._id || product?.id;

export const getWishlist = () => {
  try {
    const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    const wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
    return Array.isArray(wishlist) ? wishlist : [];
  } catch {
    return [];
  }
};

export const isInWishlist = (product) => {
  const productId = getProductId(product);
  return Boolean(productId) && getWishlist().some(
    (item) => getProductId(item) === productId
  );
};

const publishWishlistChange = (wishlist) => {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  window.dispatchEvent(new CustomEvent(WISHLIST_CHANGE_EVENT));
  return wishlist;
};

export const toggleWishlist = (product) => {
  const productId = getProductId(product);
  const wishlist = getWishlist();

  if (!productId) {
    return wishlist;
  }

  const isSaved = wishlist.some((item) => getProductId(item) === productId);
  const updatedWishlist = isSaved
    ? wishlist.filter((item) => getProductId(item) !== productId)
    : [...wishlist, product];

  return publishWishlistChange(updatedWishlist);
};