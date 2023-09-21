import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button, { SelectButton } from './Button';
import Modal from './Modal';
import styles from '../styles/modules/app.module.scss';
import { updateFilterStatus } from '../slices/itemSlice';

function Header() {
  // State to manage the open/closed state of the modal
  const [modalOpen, setModalOpen] = useState(false);

  // Get the filter status from Redux store
  const filterStatus = useSelector((state) => state.item.filterStatus);

  // Create a dispatch function to dispatch actions to Redux
  const dispatch = useDispatch();

  // Update the filter status when the dropdown value changes
  const updateFilter = (e) => {
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <div className={styles.header}>
      {/* Button to open the Add Item modal */}
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Item
      </Button>

      {/* Dropdown to select filter status */}
      <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
        <option value="all">All</option>
        <option value="unpurchased">Unpurchased</option>
        <option value="purchased">Purchased</option>
      </SelectButton>

      {/* Modal for adding new items */}
      <Modal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default Header;
