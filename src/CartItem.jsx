import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0; // Initialize a variable to hold the cumulative sum
    
    // Iterate over the cart array using forEach
    cart.forEach(item => {
      // Extract quantity and cost for each item
      const { quantity, cost } = item;
      
      // Convert the cost string (e.g., "$10") to a number and multiply by quantity
      const itemCost = parseFloat(cost.substring(1)) * quantity;
      
      // Add the resulting value to total
      total += itemCost;
    });
    
    // Return the final total sum
    return total.toFixed(2);
  };

  // Handle continue shopping functionality
  const handleContinueShopping = (e) => {
    // Call the onContinueShopping function passed from the parent component
    onContinueShopping(e);
  };

  // Handle checkout functionality (placeholder for future implementation)
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // Handle increment of item quantity
  const handleIncrement = (item) => {
    // Dispatch updateQuantity action to increase quantity by 1
    dispatch(updateQuantity({ 
      name: item.name, 
      quantity: item.quantity + 1 
    }));
  };

  // Handle decrement of item quantity
  const handleDecrement = (item) => {
    // If quantity is greater than 1, decrease by 1
    if (item.quantity > 1) {
      dispatch(updateQuantity({ 
        name: item.name, 
        quantity: item.quantity - 1 
      }));
    } else {
      // If quantity would drop to 0, remove the item from cart
      dispatch(removeItem(item.name));
    }
  };

  // Handle removal of item from cart
  const handleRemove = (item) => {
    // Dispatch removeItem action to delete the item from cart
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // Extract the numeric value from the cost string and multiply by quantity
    const unitPrice = parseFloat(item.cost.substring(1));
    const totalCost = unitPrice * item.quantity;
    return totalCost.toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button 
                  className="cart-item-button cart-item-button-dec" 
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button 
                  className="cart-item-button cart-item-button-inc" 
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button 
                className="cart-item-delete" 
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button 
          className="get-started-button" 
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button 
          className="get-started-button1" 
          onClick={(e) => handleCheckoutShopping(e)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;