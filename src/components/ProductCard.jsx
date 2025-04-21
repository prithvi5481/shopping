import { motion } from 'framer-motion';
import { GiShoppingCart } from 'react-icons/gi';

const ProductCard = ({ product, onSwipe, direction }) => {
  return (
    <motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  onDragEnd={(e, info) => {
    const threshold = 100;
    const offsetX = info.offset.x;
    const offsetY = info.offset.y;

    if (offsetX > threshold) onSwipe('right');
    else if (offsetX < -threshold) onSwipe('left');
    else if (offsetY < -threshold) onSwipe('up');
  }}
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{
    x: direction === 'left' ? -500 : direction === 'right' ? 500 : 0,
    y: direction === 'up' ? -500 : 0,
    opacity: 0,
  }}
  transition={{ duration: 0.3 }}
  className="absolute bg-white rounded-3xl shadow-xl w-full h-full max-w-[400px] flex flex-col overflow-hidden cursor-grab active:cursor-grabbing"
  style={{ touchAction: 'none' }}
>
  {/* Image section */}
  <div className="relative w-full h-[80%] bg-gray-100 flex items-center justify-center">
    <img
      src={product.imageUrl}
      alt={product.name}
      className="w-full h-full object-cover"
      loading="lazy"
    />
    {product.discountPercentage > 0 && (
      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
        {product.discountPercentage}% OFF
      </div>
    )}
  </div>

  {/* Product info */}
  <div className="p-4 bg-white flex-grow">
    <h3 className="text-sm text-gray-500">{product.brand}</h3>
    <h2 className="text-lg font-semibold line-clamp-2">{product.name}</h2>
    <div className="flex items-center gap-2 mt-2">
      <span className="text-xl font-bold">₹{product.price.toLocaleString()}</span>
      {product.originalPrice > product.price && (
        <span className="text-base text-gray-400 line-through">
          ₹{product.originalPrice.toLocaleString()}
        </span>
      )}
    </div>
  </div>

  {/* Indicators */}
  <div className="absolute top-4 left-4 text-green-500 text-lg sm:text-2xl">LIKE</div>
  <div className="absolute top-4 right-4 text-red-500 text-lg sm:text-2xl">PASS</div>
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-blue-500 text-2xl">
    <GiShoppingCart />
  </div>
</motion.div>
  );
};

export default ProductCard;
