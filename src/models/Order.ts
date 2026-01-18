/**
 * Order Model Interface
 * Represents an order in the canteen system
 */

export type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled";
export type PaymentStatus = "unpaid" | "paid" | "refunded";
export type DeliveryType = "pickup" | "home-delivery";

export interface OrderItem {
  snackId: string;
  snackName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  id: string;
  studentId: string;
  studentName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  deliveryType: DeliveryType;
  deliveryAddress?: string;
  orderDate: string;
  estimatedDeliveryTime?: string;
  completedDate?: string;
  notes?: string;
  specialRequests?: string;
  discountApplied?: number;
  taxAmount?: number;
}

/**
 * Create Order Request Data
 */
export interface CreateOrderData {
  studentId: string;
  items: {
    snackId: string;
    quantity: number;
  }[];
  deliveryType: DeliveryType;
  deliveryAddress?: string;
  notes?: string;
  specialRequests?: string;
}

/**
 * Order Update Data
 */
export interface UpdateOrderData {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  notes?: string;
}

/**
 * Order Statistics
 */

export interface OrderContextType {
  orders: Order[];
  placeOrder: (studentId: string, studentName: string, items?: OrderItem[]) => Promise<Order>;
  getOrderHistory: (studentId: string) => Order[];
  getTotalSpent: (studentId: string) => number;
}
export interface OrderStats {
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  mostPopularSnack: {
    snackId: string;
    snackName: string;
    orderCount: number;
  };
}

/**
 * Order with extended details
 */
export interface OrderDetails extends Order {
  student: {
    name: string;
    email?: string;
    phone?: string;
  };
  paymentMethod?: string;
  processedBy?: string;
}
