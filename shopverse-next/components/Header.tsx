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
    <header className="bg-white text-black p-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            TrendyKart
          </Link>

        {/* Navigation Links */}
        <nav className="space-x-4">
          <div className='flex items-center space-x-4'>
          <Link href="/" className="hover:text-gray-300 text-3xl font-serif">
            Home
          </Link>
          <Link href="/products" className="hover:text-gray-300 text-3xl font-serif">
            Collections
          </Link>
          <Link href="/products" className="hover:text-gray-300 text-3xl font-serif">
            About
          </Link>
          </div>
          
          </nav>

        

          <div className="flex items-center space-x-4">
          {/* Cart Link (Visible to Users) */}
          {(user && user.role === UserRole.User) || !user ? (
            <Link href="/cart" className="relative hover:text-gray-300 text-3xl font-serif">
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
              className="hover:text-gray-300 text-3xl font-serif"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="hover:text-gray-300 text-3xl font-serif">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;