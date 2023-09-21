import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { AnimatePresence, motion } from 'framer-motion';
import { addItem, editItem } from '../slices/itemSlice';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';

// Custom motion animation
const dropIn = {
  hidden: {
    opacity: 0, // Initially, set the opacity to 0 (invisible)
    transform: 'scale(0.9)', // Scale down the element slightly
  },
  visible: {
    transform: 'scale(1)', // Transition to the original scale (1)
    opacity: 1, // Transition to full opacity (1)
    transition: {
      duration: 0.1, // Duration of the animation (in seconds)
      type: 'spring', // Spring animation type for smooth motion
      damping: 25, // Damping controls the bounciness of the animation
      stiffness: 500, // Stiffness controls how fast the animation snaps into place
    },
  },
  exit: {
    transform: 'scale(0.9)', // When exiting, scale down slightly
    opacity: 0, // When exiting, set opacity to 0 (invisible)
  },
};

function Modal({ type, item, modalOpen, setModalOpen }) {
  // Create a dispatch function to dispatch actions to Redux
  const dispatch = useDispatch();

  // State to manage the name input field value
  const [name, setName] = useState('');

  // / State to manage the status input field value
  const [status, setStatus] = useState('unpurchased');

  // State to manage the quantity input field value
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Save the item's name, status, and quantity values after finished editing
    if (type === 'edit' && item) {
      setName(item.name);
      setStatus(item.status);
      setQuantity(item.quantity);
    } else {
      setName('');
      setStatus('unpurchased');
      setQuantity(1);
    }
  }, [type, item, modalOpen]);

  // Handle item quantity increment
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  // Handle item quantity decrement
  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
  };

  // Handle update or add modal form when submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '') {
      toast.error('Item name should not be empty');
      return;
    }

    // Check if there's empty input in the form, and add the item if it's not
    if (name && quantity > 0) {
      if (type === 'add') {
        // Add the new item
        dispatch(
          addItem({
            id: uuid(),
            name,
            quantity,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success('Item added successfully');
      }

      // Check if there are any changes made
      if (type === 'edit') {
        if (
          item.name !== name ||
          item.quantity !== quantity ||
          item.status !== status
        ) {
          // Update the item details
          dispatch(
            editItem({
              ...item,
              name,
              quantity,
              status,
              time: new Date().toLocaleString(),
            })
          );
          toast.success('Item edited successfully');
        } else {
          toast.error('No changes were made');
          return;
        }
      }

      // Close the modal
      setModalOpen(false);
    }
  };
  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onClick={() => setModalOpen(false)}
              onKeyDown={() => setModalOpen(false)}
              tabIndex={0}
              role="button"
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === 'edit' ? 'Edit Item' : 'Add Item'}
              </h1>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <div className={styles.rows}>
                <label htmlFor="quantity">
                  Quantity
                  <div className={styles.quantityContainer}>
                    <span>{quantity}</span>
                    <div className={styles.quantityControl}>
                      <Button
                        type="button"
                        variant="circle"
                        onClick={handleDecrement}
                      >
                        -
                      </Button>
                      <Button
                        type="button"
                        variant="circle"
                        onClick={handleIncrement}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </label>
              </div>
              <label htmlFor="status">
                Status
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="unpurchased">Unpurchased</option>
                  <option value="purchased">Purchased</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                  onKeyDown={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  {type === 'edit' ? 'Edit Item' : 'Add Item'}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
