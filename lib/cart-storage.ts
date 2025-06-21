export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export const getCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return []
  const cart = localStorage.getItem("elgreko-cart")
  return cart ? JSON.parse(cart) : []
}

export const saveCartToStorage = (cart: CartItem[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem("elgreko-cart", JSON.stringify(cart))
}

export const addToCart = (item: { id: number; name: string; price: number; image: string }, quantity = 1) => {
  const cart = getCartFromStorage()
  const existingItem = cart.find((cartItem) => cartItem.id === item.id)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({ ...item, quantity })
  }

  saveCartToStorage(cart)
  return cart
}

export const removeFromCart = (id: number) => {
  const cart = getCartFromStorage()
  const updatedCart = cart.filter((item) => item.id !== id)
  saveCartToStorage(updatedCart)
  return updatedCart
}

export const updateCartQuantity = (id: number, quantity: number) => {
  const cart = getCartFromStorage()
  const item = cart.find((cartItem) => cartItem.id === id)

  if (item) {
    if (quantity <= 0) {
      return removeFromCart(id)
    }
    item.quantity = quantity
    saveCartToStorage(cart)
  }

  return cart
}

export const clearCart = () => {
  if (typeof window === "undefined") return
  localStorage.removeItem("elgreko-cart")
  return []
}

export const getCartTotal = (cart: CartItem[]) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

export const getCartItemCount = (cart: CartItem[]) => {
  return cart.reduce((total, item) => total + item.quantity, 0)
}
