import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ChevronDown, Calendar, Clock, MapPin, Truck, Check, X } from 'lucide-react';

const statusColors = {
  Delivered: { bg: 'bg-green-500/10', text: 'text-green-500', icon: Check },
  Shipped: { bg: 'bg-blue-500/10', text: 'text-blue-500', icon: Truck },
  Pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', icon: Clock },
  Cancelled: { bg: 'bg-red-500/10', text: 'text-red-500', icon: X },
  'In Branch': { bg: 'bg-purple-500/10', text: 'text-purple-500', icon: MapPin }
};

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const StatusIcon = statusColors[order.status]?.icon || Package;
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      layout
      className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors"
    >
      {/* Header Section */}
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${statusColors[order.status]?.bg || 'bg-gray-500/10'}`}>
              <StatusIcon className={`w-5 h-5 ${statusColors[order.status]?.text || 'text-gray-500'}`} />
            </div>
            <div>
              <p className={`font-medium ${statusColors[order.status]?.text || 'text-gray-500'}`}>
                {order.status}
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(order.order_date)}</span>
                <span>•</span>
                <Clock className="w-4 h-4" />
                <span>{formatTime(order.order_date)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-lg font-semibold">${order.total_amount}</p>
              <p className="text-sm text-gray-400">{order.items?.length || 0} items</p>
            </div>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-800"
          >
            <div className="p-6 space-y-4">
              {order.items && order.items.length > 0 ? (
                order.items.map((item) => (
                  <div 
                    key={item.item_id}
                    className="flex items-center space-x-4 bg-gray-800/30 rounded-lg p-3"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image_link
                          .replace(/^".\/?/, '/public/')
                          .replace(/"$/, '')|| "/api/placeholder/64/64"}
                        alt={item.product_Name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-100">{item.product_Name}</h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                        <span>Qty: {item.quantity}</span>
                        <span>•</span>
                        <span>${item.price} each</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 py-4">No items found in this order.</p>
              )}
              
              <div className="mt-6 pt-4 border-t border-gray-800">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span>${order.total_amount}</span>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-400">
                  <span>Delivery Fee</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-800 font-medium text-white">
                  <span>Total</span>
                  <span>${order.total_amount}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OrderCard;