export default function Loading() {
  return (
    <div className="absolute inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}
