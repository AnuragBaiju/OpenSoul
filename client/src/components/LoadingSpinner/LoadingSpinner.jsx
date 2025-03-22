import { motion } from "framer-motion";

const LoadingSpinner = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 border-4 border-t-blue-500 border-blue-200 rounded-full"
          variants={spinnerVariants}
          animate="animate"
        />
        <motion.div
          className="absolute inset-2 border-3 border-t-blue-400 border-blue-100 rounded-full"
          variants={spinnerVariants}
          animate="animate"
          transition={{ duration: 1.2 }} // Slightly different speed for layered effect
        />
        <div className="absolute inset-4 w-8 h-8 bg-blue-500 rounded-full opacity-20" />
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;