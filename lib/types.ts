export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  stock: number
  createdAt: any
}

export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

export interface UserWithRole {
  uid: string
  email: string | null
  displayName: string | null
  role: "admin" | "customer"
}

export interface AuthContextType {
  user: UserWithRole | null
  loading: boolean
  logout: () => Promise<void>
}

export interface CartContextType {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: any
  shippingAddress: {
    name: string
    address: string
    city: string
    state: string
    zip: string
    country: string
  }
}
