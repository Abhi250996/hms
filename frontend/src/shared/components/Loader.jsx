// src/shared/components/Loader.jsx
const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <span className="text-gray-700 font-medium">{text}</span>
      </div>
    </div>
  );
};

export default Loader;
