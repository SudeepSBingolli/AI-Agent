export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-6">
        <h1 className="text-6xl font-semibold text-gray-900 mb-4">404</h1>
        <p className="text-2xl font-medium text-gray-600 mb-8">Page Not Found</p>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-md bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}
