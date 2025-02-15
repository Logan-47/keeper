// src/pages/Landing.tsx
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Organize Your Items & Folders</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Drag, drop, and manage your items in real-time.
        </p>
        <Link to="/signup">
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
