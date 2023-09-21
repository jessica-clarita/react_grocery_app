import React, { useEffect, useState } from 'react';
import { format } from 'date-fns/esm';
import { MdAdd, MdDelete, MdEdit, MdRemove } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import styles from '../styles/modules/item.module.scss';
import { getClasses } from '../utils/getClasses';
import {
  deleteItem,
  editItem,
  incrementItemQuantity,
  decrementItemQuantity,
} from '../slices/itemSlice';
import Modal from './Modal';
import Checkbox from './Checkbox';

// Custom motion animation
const child = {
  hidden: { y: 20, opacity: 0 }, // Initial state: item is slightly moved down and invisible
  visible: { y: 0, opacity: 1 }, // Transition to visible state with no movement and full opacity
};

function Item({ item }) {
  // Create a dispatch function to dispatch actions to Redux
  const dispatch = useDispatch();

  // State to manage the checked/unchecked state of the checkbox
  const [checked, setChecked] = useState(false);

  // State to manage the open/closed state of the edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    // Check the checkbox if the item status is 'purchased'
    if (item.status === 'purchased') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [item.id, item.status]);

  // Handle item deletion
  const handleDelete = () => {
    dispatch(deleteItem(item.id));
    toast.success('Item deleted successfully');
  };

  // Handle item editing
  const handleEdit = () => {
    setEditModalOpen(true);
  };

  // Handle item quantity increment
  const handleIncrement = () => {
    dispatch(incrementItemQuantity(item.id));
  };

  // Handle item quantity decrement
  const handleDecrement = () => {
    dispatch(decrementItemQuantity(item.id));
  };

  // Handle checkbox
  const handleCheckbox = () => {
    // Switch the state of the checkbox
    setChecked(!checked);
    // Update the item status in Redux
    dispatch(
      editItem({
        ...item,
        status: checked ? 'unpurchased' : 'purchased',
      })
    );
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.itemActions}>
          <div
            className={styles.icon}
            onClick={handleDecrement}
            onKeyDown={handleDecrement}
            role="button"
            tabIndex={0}
          >
            <MdRemove />
          </div>
          <div
            className={styles.icon}
            onClick={handleIncrement}
            onKeyDown={handleIncrement}
            role="button"
            tabIndex={0}
          >
            <MdAdd />
          </div>
        </div>
        <div className={styles.itemDetails}>
          <Checkbox checked={checked} handleCheckbox={handleCheckbox} />
          <div className={styles.text}>
            <p
              className={getClasses([
                styles.itemText,
                item.status === 'purchased' && styles['itemText--completed'],
              ])}
            >
              <span>[{item.quantity}]</span> {item.name}
            </p>
            <p className={styles.time}>
              {format(new Date(item.time), 'p, MM/dd/yyyy')}
            </p>
          </div>
        </div>
        <div className={styles.itemActions}>
          <div
            className={styles.icon}
            onClick={handleDelete}
            onKeyDown={handleDelete}
            role="button"
            tabIndex={0}
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={handleEdit}
            onKeyDown={handleEdit}
            role="button"
            tabIndex={0}
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <Modal
        type="edit"
        item={item}
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
      />
    </>
  );
}

export default Item;
