import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h2>404 - Page Not Found</h2>
      <p>Could not find the requested resource.</p>
      <Link href="/" style={{ color: '#3470ff', textDecoration: 'underline' }}>
        Return Home
      </Link>
    </div>
  );
}