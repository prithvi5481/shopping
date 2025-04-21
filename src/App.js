import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './components/ProductCard';
import { Products as products } from './constants';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSwipe = (direction) => {
    console.log(`${direction} swiped on ${products[currentIndex].id}`);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="relative w-full max-w-md h-[70vh]">
        <AnimatePresence>
          {products.slice(currentIndex, currentIndex + 3).map((product, index) => (
            <motion.div
              key={product.id}
              className="absolute w-full h-full"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ 
                scale: 1 - index * 0.05,
                opacity: 1 - index * 0.3,
                y: index * 10
              }}
              exit={{ 
                x: direction === 'right' ? 300 : direction === 'left' ? -300 : 0,
                y: direction === 'up' ? -300 : direction === 'down' ? 300 : 0,
                opacity: 0,
                transition: { duration: 0.3 }
              }}
              style={{ zIndex: 10 - index }}
            >
              <ProductCard 
                product={product} 
                active={index === 0}
                onSwipe={(dir) => {
                  setDirection(dir);
                  handleSwipe(dir);
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}