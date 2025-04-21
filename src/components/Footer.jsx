import { motion } from 'framer-motion';
import { 
  FiHeart, 
  FiX, 
  FiShoppingCart,
  FiBookmark,
  FiHome,
  FiUser 
} from 'react-icons/fi';

const Footer = ({ onAction }) => {
  const buttons = [
    { icon: <FiX size={24} />, action: 'dislike', color: 'text-red-500' },
    { icon: <FiBookmark size={20} />, action: 'save', color: 'text-yellow-500' },
    { icon: <FiHome size={20} />, action: 'home', color: 'text-gray-600' },
    { icon: <FiShoppingCart size={20} />, action: 'cart', color: 'text-blue-500' },
    { icon: <FiHeart size={20} />, action: 'like', color: 'text-pink-500' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-around items-center">
          {buttons.map((btn, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className={`p-3 rounded-full ${btn.color} relative`}
              onClick={() => onAction(btn.action)}
            >
              {btn.action === 'dislike' && (
                <motion.span 
                  className="absolute -top-2 -right-2 bg-red-100 text-red-500 text-xs rounded-full px-2 py-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  PASS
                </motion.span>
              )}
              {btn.icon}
            </motion.button>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mt-2">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-pink-500 to-blue-500"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, repeat: 0, ease: 'linear' }}
            />
          </div>
          <p className="text-xs text-center mt-1 text-gray-500">
            Swipe to discover more products
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;