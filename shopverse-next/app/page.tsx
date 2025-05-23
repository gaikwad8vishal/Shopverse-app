import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Shopverse</h1>
      <p className="mb-4">Your one-stop e-commerce platform</p>
      <Link href="/products" className="text-blue-500 hover:underline">
        Shop Now
      </Link>
    </div>
  );
}