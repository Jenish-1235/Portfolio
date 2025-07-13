export default function ServerError() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-3xl font-bold">500 - Internal Server Error</h1>
        <p className="mt-2 text-gray-500">
          Something went wrong. Try again later.
        </p>
      </div>
    </div>
  );
}
