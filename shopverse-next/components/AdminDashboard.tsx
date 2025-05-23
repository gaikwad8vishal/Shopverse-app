'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Product, Order, User, UserRole } from '@/lib/types';
import axios from 'axios';
import { toast } from 'react-toastify';

interface AdminDashboardProps {}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [deliveryBoys, setDeliveryBoys] = useState<User[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    stock: 0,
    category: '',
    image: '',
  });
  const [newCategory, setNewCategory] = useState('');

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsRes = await axios.get('/api/products', {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setProducts(productsRes.data);

        // Fetch orders
        const ordersRes = await axios.get('/api/orders', {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setOrders(ordersRes.data);

        // Fetch delivery boys
        const deliveryBoysRes = await axios.get('/api/users?role=delivery_boy', {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setDeliveryBoys(deliveryBoysRes.data);
      } catch (error) {
        toast.error('Failed to fetch data');
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  // Add a new product
  const handleAddProduct = async () => {
    try {
      const res = await axios.post('/api/products', newProduct, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setProducts([...products, res.data]);
      setNewProduct({ name: '', price: 0, stock: 0, category: '', image: '' });
      toast.success('Product added successfully');
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  // Delete a product
  const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setProducts(products.filter((product) => product.id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  // Add a new category
  const handleAddCategory = async () => {
    try {
      await axios.post('/api/categories', { name: newCategory }, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setNewCategory('');
      toast.success('Category added successfully');
    } catch (error) {
      toast.error('Failed to add category');
    }
  };

  // Assign order to delivery boy
  const handleAssignOrder = async (orderId: number, deliveryBoyId: number) => {
    try {
      await axios.patch(
        `/api/orders/${orderId}`,
        { deliveryBoyId, status: 'shipped' },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setOrders(
        orders.map((order) =>
          order.id === orderId
            ? { ...order, deliveryBoyId, status: 'shipped' }
            : order
        )
      );
      toast.success('Order assigned successfully');
    } catch (error) {
      toast.error('Failed to assign order');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add Product Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="p-2 border rounded"
          />
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Product List Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2">{product.stock}</td>
                <td className="border p-2">{product.category}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Category Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Category
          </button>
        </div>
      </div>

      {/* Order Management Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Delivery Boy</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border p-2">{order.id}</td>
                <td className="border p-2">{order.userId}</td>
                <td className="border p-2">${order.total}</td>
                <td className="border p-2">{order.status}</td>
                <td className="border p-2">
                  {order.deliveryBoyId
                    ? deliveryBoys.find((db) => db.id === order.deliveryBoyId)?.name
                    : 'Not Assigned'}
                </td>
                <td className="border p-2">
                  <select
                    onChange={(e) =>
                      handleAssignOrder(order.id, Number(e.target.value))
                    }
                    disabled={order.status !== 'pending'}
                    className="p-1 border rounded"
                  >
                    <option value="">Select Delivery Boy</option>
                    {deliveryBoys.map((db) => (
                      <option key={db.id} value={db.id}>
                        {db.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;