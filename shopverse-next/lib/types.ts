enum UserRole {
  SuperAdmin = 'superadmin',
  Admin = 'admin',
  User = 'user',
  DeliveryBoy = 'delivery_boy',
}

interface User {
  id: number;
  role: UserRole;
  email: string;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

interface Order {
  id: number;
  userId: number;
  deliveryBoyId?: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  items: { productId: number; quantity: number }[];
  total: number;
}

export { UserRole };
export type { User, Product, Order };