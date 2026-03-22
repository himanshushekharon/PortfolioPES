import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
      className="w-full flex justify-center"
    >
      <div className="w-full max-w-full">
        {children}
      </div>
    </motion.div>
  );
};

export default PageTransition;
