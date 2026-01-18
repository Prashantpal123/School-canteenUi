/**
 * Type Definitions for School Canteen Application
 * All interfaces and types used across the application
 */

// ============================================
// SNACK INTERFACES
// ============================================

export interface Snack {
  id: string;
  name: string;
  price: number;
  ordersCount: number;
}

export interface SnackCardProps {
  snack: Snack;
}

// ============================================
// STUDENT INTERFACES
// ============================================

export interface Student {
  id: string;
  name: string;
  referralCode: string;
  totalSpent: number;
}

export interface CreateStudentFormData {
  name: string;
}

// ============================================
// ORDER INTERFACES
// ============================================

export interface Order {
  id?: string;
  studentId: string;
  snackId: string;
  quantity: number;
  totalPrice: number;
  timestamp?: string;
  status?: "pending" | "completed" | "cancelled";
}

export interface PlaceOrderData {
  studentId: string;
  snackId: string;
  quantity: number;
  totalPrice: number;
}

// ============================================
// CONTEXT INTERFACES
// ============================================

export interface StudentContextType {
  students: Student[];
  setStudents: (students: Student[]) => void;
}

export interface StudentContextProviderProps {
  children: React.ReactNode;
}

// ============================================
// API RESPONSE INTERFACES
// ============================================

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface CreateStudentResponse extends Student {}

export interface GetSnacksResponse extends Array<Snack> {}

export interface GetStudentsResponse extends Array<Student> {}

export interface PlaceOrderResponse extends Order {}

// ============================================
// COMPONENT PROPS INTERFACES
// ============================================

export interface NavbarProps {
  // Add navbar-specific props if needed
}

export interface FooterProps {
  // Add footer-specific props if needed
}

export interface SnacksPageState {
  snacks: Snack[];
  loading: boolean;
  error: string | null;
}

export interface StudentsPageState {
  students: Student[];
  loading: boolean;
  error: string | null;
}

export interface CreateStudentPageState {
  loading: boolean;
  message: string;
  messageType: "success" | "error" | "";
}

// ============================================
// UTILITY TYPES
// ============================================

export type MessageType = "success" | "error" | "";

export interface Message {
  text: string;
  type: MessageType;
  duration?: number;
}
