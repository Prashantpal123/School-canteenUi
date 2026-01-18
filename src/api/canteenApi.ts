import type {
  Snack,
  Student,
  Order,
  CreateOrderData,
  UpdateOrderData,
  CreateStudentData
} from "../models/index.js";

const BASE_URL = "http://localhost:3001";

/**
 * Fetches all available snacks from the API
 */
export const getSnacks = async (): Promise<Snack[]> => {
  const res = await fetch(`${BASE_URL}/snacks`);
  if (!res.ok) throw new Error("Failed to fetch snacks");
  return await res.json();
};

/**
 * Fetches all registered students from the API

 */
export const getStudents = async (): Promise<Student[]> => {
  const res = await fetch(`${BASE_URL}/students`);
  if (!res.ok) throw new Error("Failed to fetch students");
  return await res.json();
};

/**
 * Fetches a single student by ID
 */
export const getStudentById = async (studentId: string): Promise<Student> => {
  const res = await fetch(`${BASE_URL}/students/${studentId}`);
  if (!res.ok) throw new Error("Failed to fetch student");
  return await res.json();
};

/**
 * Creates a new student account
 * @param data - Student creation data
 * @returns Promise<Student> - Created student object
 */
export const createStudent = async (data: CreateStudentData): Promise<Student> => {
  const referralCode = "REF" + Math.floor(Math.random() * 10000);

  const res = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      referralCode,
      spent: 0,
      totalOrders: 0,
      isActive: true,
      accountCreatedDate: new Date().toISOString()
    })
  });

  if (!res.ok) throw new Error("Failed to create student");

  return await res.json();
};

/**
 * Updates a student's information
 * @param studentId - Student's ID
 * @param data - Updated student data
 * @returns Promise<Student> - Updated student object
 */
export const updateStudent = async (studentId: string, data: Partial<Student>): Promise<Student> => {
  const res = await fetch(`${BASE_URL}/students/${studentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Failed to update student");

  return await res.json();
};

/**
 * Updates a snack's information
 * @param snackId - Snack's ID
 * @param data - Updated snack data
 * @returns Promise<Snack> - Updated snack object
 */
export const updateSnack = async (snackId: string, data: Partial<Snack>): Promise<Snack> => {
  const res = await fetch(`${BASE_URL}/snacks/${snackId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Failed to update snack");

  return await res.json();
};

/**
 * Places a new order
 * @param data - Order data
 * @returns Promise<Order> - Created order object
 */
export const placeOrder = async (data: CreateOrderData): Promise<Order> => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      orderDate: new Date().toISOString(),
      status: "pending",
      paymentStatus: "unpaid"
    })
  });

  if (!res.ok) throw new Error("Failed to place order");

  return await res.json();
};

/**
 * Updates an order status
 * @param orderId - Order's ID
 * @param data - Order update data
 * @returns Promise<Order> - Updated order object
 */
export const updateOrder = async (orderId: string, data: UpdateOrderData): Promise<Order> => {
  const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Failed to update order");

  return await res.json();
};

/**
 * Fetches all orders for a student
 * @param studentId - Student's ID
 * @returns Promise<Order[]> - Array of student's orders
 */
export const getStudentOrders = async (studentId: string): Promise<Order[]> => {
  const res = await fetch(`${BASE_URL}/orders?studentId=${studentId}`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return await res.json();
};

/**
 * Fetches all orders
 * @returns Promise<Order[]> - Array of all orders
 */
export const getAllOrders = async (): Promise<Order[]> => {
  const res = await fetch(`${BASE_URL}/orders`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return await res.json();
};
