import React from "react";
import { motion } from "framer-motion";

const WonoButton = ({onClick, content}) => {
  return (
    <div>
      <div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={onClick}
          className=" p-2 bg-white wono-blue-dark w-full text-white rounded-md"
        >
          {content}
        </motion.button>
      </div>
    </div>
  );
};

export default WonoButton;
