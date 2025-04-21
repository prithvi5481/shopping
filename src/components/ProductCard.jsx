import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { GiShoppingCart } from 'react-icons/gi';

const ProductCard = ({ product, active, onSwipe }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  const handleDragEnd = (_, info) => {
    if (!active) return;

    const SWIPE_THRESHOLD = 100;
    const VELOCITY_THRESHOLD = 500;

    const isRight = info.offset.x > SWIPE_THRESHOLD || info.velocity.x > VELOCITY_THRESHOLD;
    const isLeft = info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -VELOCITY_THRESHOLD;
    const isUp = info.offset.y < -SWIPE_THRESHOLD || info.velocity.y < -VELOCITY_THRESHOLD;
    const isDown = info.offset.y > SWIPE_THRESHOLD || info.velocity.y > VELOCITY_THRESHOLD;

    if (isRight || isLeft || isUp || isDown) {
      const direction = isRight ? 'right' : isLeft ? 'left' : isUp ? 'up' : 'down';
      animateExit(direction);
    } else {
      animate(x, 0, { type: 'spring', stiffness: 500 });
      animate(y, 0, { type: 'spring', stiffness: 500 });
    }
  };

  const animateExit = (direction) => {
    const target = {
      right: { x: 500, opacity: 0 },
      left: { x: -500, opacity: 0 },
      up: { y: -500, opacity: 0 },
      down: { y: 500, opacity: 0 }
    }[direction];

    animate(x, target.x, { duration: 0.3 });
    animate(y, target.y, { duration: 0.3 });
    animate(rotate, direction === 'right' ? 15 : direction === 'left' ? -15 : 0, { 
      duration: 0.3 
    }).then(() => {
      onSwipe(direction);
    });
  };

  return (
    <motion.div
      drag={active}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.5}
      onDragEnd={handleDragEnd}
      style={{
        x,
        y,
        rotate,
        touchAction: active ? 'none' : 'auto'
      }}
      className={`relative w-full md:max-w-sm h-[80vh] md:h-[70vh] bg-white shadow-sm overflow-hidden flex flex-col justify-between ${
        active ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
      whileTap={active ? { scale: 0.98 } : {}}
      whileDrag={active ? { 
        scale: 1.02,
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
      } : {}}
    >
      {product.discountPercentage > 0 && (
        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs z-10">
          {product.discountPercentage}% OFF
        </div>
      )}

      <div className="h-auto md:h-[70%] w-full bg-gray-100 flex items-center justify-center">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="h-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="p-4 md:h-[30%] flex flex-col">
        <div className="mb-1">
          <span className="text-xs font-bold tracking-widest text-gray-400">
            {product.brand.toUpperCase()}
          </span>
        </div>
        <h2 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h2>
        
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;