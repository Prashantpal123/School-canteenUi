import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Order, OrderItem, Student } from "../models/index.js";
import { placeOrder as createOrderApi, updateStudent, updateSnack, getStudentById } from "../api/canteenApi.js";
import type { OrderContextType } from "../models/index.js";

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {

  const [orders, setOrders] = useState<Order[]>(() => {
    // Load orders from localStorage on init
    const stored = localStorage.getItem("orders");
    return stored ? JSON.parse(stored) : [];
  });

  const placeOrder = async (studentId: string, studentName: string, items?: OrderItem[]): Promise<Order> => {
    // Use provided items or fall back to cart items
    const orderItems = items && items.length > 0 ? items : [];
    
    if (orderItems.length === 0) {
      throw new Error("No items to order");
    }

    const totalAmount = orderItems.reduce((sum: number, item: OrderItem) => sum + item.subtotal, 0);

    try {
      // Create order using API with full item details
      const newOrder = await createOrderApi({
        studentId,
        items: orderItems.map((item: OrderItem) => ({
          snackId: item.snackId,
          snackName: item.snackName,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.subtotal
        })),
        deliveryType: "pickup"
      });

      // Update local state
      const updatedOrders = [...orders, newOrder];
      setOrders(updatedOrders);

      // Persist to localStorage as backup
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      // Update student's spent amount and totalOrders
      try {
        // Get current student data
        const currentStudent = await getStudentById(studentId);
        
        // Update student with incremented spent and totalOrders
        await updateStudent(studentId, {
          spent: (currentStudent?.spent || 0) + totalAmount,
          totalOrders: (currentStudent?.totalOrders || 0) + 1
        });
      } catch (error) {
        console.error("Error updating student:", error);
      }

      // Update each snack's ordersCount
      try {
        for (const item of orderItems) {
          await updateSnack(item.snackId, {
            ordersCount: (item.quantity || 0)
          });
        }
      } catch (error) {
        console.error("Error updating snacks count:", error);
      }

      return newOrder;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  const getOrderHistory = (studentId: string): Order[] => {
    return orders.filter((order) => order.studentId === studentId);
  };

  const getTotalSpent = (studentId: string): number => {
    return orders
      .filter((order) => order.studentId === studentId)
      .reduce((sum, order) => sum + order.totalAmount, 0);
  };

  const value: OrderContextType = {
    orders,
    placeOrder,
    getOrderHistory,
    getTotalSpent,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within OrderProvider");
  }
  return context;
};