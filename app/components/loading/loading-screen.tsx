import { motion } from "framer-motion";
import "./loading-screen.css";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-teal-100 text-blue-600">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className="text-center"
      >
        <div className="mb-8">
          <div className="w-24 h-24 rounded-full border-4 border-blue-400 border-t-transparent animate-spin mx-auto"></div>
        </div>
        <h1 className="text-3xl font-semibold mb-4">Respira un poco...</h1>
        <p className="text-xl">
          Tu viaje para una mejor salud mental comienza ahora
        </p>
      </motion.div>
    </div>
  );
};

export default LoadingPage;
