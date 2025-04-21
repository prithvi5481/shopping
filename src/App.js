import { useState } from 'react';
import ProductCard from './components/ProductCard';
import { Products as products } from './constants';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSwipe = (dir) => {
    setDirection(dir);
    setTimeout(() => {
      console.log(`${dir.toUpperCase()} product ${products[currentIndex].id}`);
      setCurrentIndex((prev) => (prev + 1) % products.length);
      setDirection(null);
    }, 200);
  };

  return (
    <div className='flex justify-center p-2'>
      {products[currentIndex] && (
        <ProductCard
          key={products[currentIndex].id}
          product={products[currentIndex]}
          onSwipe={handleSwipe}
          direction={direction}
        />
      )}
    </div>
  );
}

export default App;
