import React from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import Item from './Item';
import styles from '../styles/modules/app.module.scss';

// Custom motion animation for the container
const container = {
  hidden: { opacity: 1 }, // Initially, set the opacity to 1 (fully visible)
  visible: {
    opacity: 1, // Transition to full opacity (remain visible)
    scale: 1, // Transition to original scale
    transition: {
      staggerChildren: 0.2, // Apply staggered animation to children with a delay of 0.2 seconds
    },
  },
};

// Custom motion animation for children (individual items)
const child = {
  hidden: { y: 20, opacity: 0 }, // Initial state: children are slightly moved up and invisible
  visible: { y: 0, opacity: 1 }, // Transition to visible state with no movement and full opacity
};

function Content() {
  // Retrieve the item list and filter status from Redux store
  const itemList = useSelector((state) => state.item.itemList);
  const filterStatus = useSelector((state) => state.item.filterStatus);

  // Create a sorted copy of the item list based on time
  const sortedItems = [...itemList];
  sortedItems.sort((a, b) => new Date(b.time) - new Date(a.time));

  // Filter the sorted items based on the selected filter status
  const filteredItemList = sortedItems.filter((item) => {
    // Show all items when the filter status is 'all'
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <motion.div
      className={styles.content_wrapper} // Apply styles to the content wrapper
      variants={container} // Use the animation variants defined earlier
      initial="hidden" // Set the initial animation state to "hidden"
      animate="visible" // Animate to the "visible" state
    >
      <AnimatePresence>
        {/* Check if there are filtered items to display */}
        {filteredItemList && filteredItemList.length > 0 ? (
          // Render each item with a unique key
          filteredItemList.map((item) => <Item key={item.id} item={item} />)
        ) : (
          // Display a message when no items match the filter
          <motion.p className={styles.emptyText} variants={child}>
            No item found
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Content;
