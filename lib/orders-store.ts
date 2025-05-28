import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface OrderItem {
  id: string
  name: string
  image: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  date: string
  status: "processando" | "em_transito" | "entregue" | "cancelado"
  total: number
  items: OrderItem[]
}

interface OrdersStore {
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
  getOrderById: (orderId: string) => Order | undefined
}

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [
        {
          id: "TXK8H9P2L",
          date: "2024-01-15",
          status: "entregue",
          total: 1598.0,
          items: [
            {
              id: "1",
              name: "Teclado Mecânico RGB Gamer",
              image: "/images/teclado-mecanico-rgb.png",
              quantity: 1,
              price: 299.0,
            },
            {
              id: "3",
              name: 'Monitor Gaming 27" G-SYNC',
              image: "/images/monitor-gaming-27.png",
              quantity: 1,
              price: 1299.0,
            },
          ],
        },
        {
          id: "ABC123XYZ",
          date: "2024-01-20",
          status: "em_transito",
          total: 459.0,
          items: [
            {
              id: "2",
              name: "Mouse Gamer RGB 12000 DPI",
              image: "/images/mouse-gamer-rgb.png",
              quantity: 1,
              price: 159.0,
            },
            {
              id: "4",
              name: "Headset Gamer RGB 7.1 Surround",
              image: "/images/headset-gamer-rgb.png",
              quantity: 1,
              price: 249.0,
            },
          ],
        },
      ],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((order) => (order.id === orderId ? { ...order, status } : order)),
        })),
      getOrderById: (orderId) => get().orders.find((order) => order.id === orderId),
    }),
    {
      name: "orders-storage",
    },
  ),
)
