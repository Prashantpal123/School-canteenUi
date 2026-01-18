/**
 * Student Model Interface
 * Represents a student in the canteen system
 */

export interface Student {
  id: string;
  name: string;
  studentId: string;
  spent: number;
  referralCode: string;
  lastOrderDate?: string;
  totalOrders?: number;
  isActive?: boolean;
}

/**
 * Student Form Data for creating/updating students
 */
export interface CreateStudentData {
  name: string;
  studentId?: string;
}

/**
 * Student Profile with additional details
 */
export interface StudentProfile extends Student {
  orderHistory?: OrderSummary[];
  totalOrdersCount: number;
  averageOrderValue: number;
}

/**
 * Order summary for student profile
 */
export interface OrderSummary {
  orderId: string;
  snackName: string;
  quantity: number;
  amount: number;
  date: string;
}
