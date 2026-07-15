import { motion } from 'framer-motion';

export default function LiveProjectButton() {
  return (
    <motion.button
      whileHover={{ backgroundColor: 'rgba(215, 226, 234, 0.1)' }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] font-medium uppercase tracking-widest text-sm sm:text-base px-8 py-3 sm:px-10 sm:py-3.5 text-[#D7E2EA] cursor-pointer"
    >
      Live Project
    </motion.button>
  );
}
