'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { UserRole } from '@/lib/types';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Shopverse
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/products" className="hover:text-gray-300">
            Products
          </Link>

          {/* Role-based Links */}
          {user && user.role === UserRole.SuperAdmin && (
            <Link href="/superadmin" className="hover:text-gray-300">
              SuperAdmin
            </Link>
          )}
          {(user && user.role === UserRole.Admin) || (user && user.role === UserRole.SuperAdmin) ? (
            <Link href="/admin" className="hover:text-gray-300">
              Admin
            </Link>
          ) : null}
          {user && user.role === UserRole.DeliveryBoy && (
            <Link href="/delivery" className="hover:text-gray-300">
              Delivery
            </Link>
          )}

          {/* Cart Link (Visible to Users) */}
          {(user && user.role === UserRole.User) || !user ? (
            <Link href="/cart" className="relative hover:text-gray-300">
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs rounded-full px-2">
                  {cart.length}
                </span>
              )}
            </Link>
          ) : null}

          {/* Login/Logout */}
          {user ? (
            <button
              onClick={handleLogout}
              className="hover:text-gray-300"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="hover:text-gray-300">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;