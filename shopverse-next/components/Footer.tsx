import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-gray-300">
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-gray-300">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p>Email: support@shopverse.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 E-Commerce St, Shop City, SC 12345</p>
        </div>

        {/* About Shopverse */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Shopverse</h3>
          <p>
            Shopverse is your one-stop e-commerce platform, offering a wide range of products with seamless shopping and delivery experiences.
          </p>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="mt-6 text-center border-t border-gray-600 pt-4">
        <p>&copy; {new Date().getFullYear()} Shopverse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;