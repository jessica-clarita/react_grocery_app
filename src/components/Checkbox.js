import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import styles from '../styles/modules/item.module.scss';

// Variants for the checkmark animation
const checkVariants = {
  initial: {
    color: '#fff', // Initial color of the checkmark (white)
  },
  checked: {
    pathLength: 1, // Animate the path length to 1 (full length)
  },
  unchecked: {
    pathLength: 0, // Animate the path length to 0 (hidden)
  },
};

// Variants for the checkbox background animation
const boxVariants = {
  checked: {
    background: 'var(--darkGreen)',
    transition: { duration: 0.1 },
  },
  unchecked: {
    background: 'var(--mediumGrey)',
    transition: { duration: 0.1 },
  },
};

function Checkbox({ checked, handleCheckbox }) {
  // Create a motion value for path length and opacity
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);
  return (
    // Checkbox
    <motion.div
      className={styles.svgBox} // Apply styles to the checkbox
      variants={boxVariants} // Use boxVariants for animation
      animate={checked ? 'checked' : 'unchecked'} // Animate based on checked state
      onClick={handleCheckbox} // Handle checkbox click
    >
      {/* Checkmark */}
      <motion.svg
        className={styles.svg} // Apply styles to the SVG element
        viewBox="0 0 53 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          variants={checkVariants} // Use checkVariants for animation
          animate={checked ? 'checked' : 'unchecked'} // Animate based on checked state
          style={{ pathLength, opacity }} // Apply motion values to path length and opacity
          fill="none" // No fill color, making the path transparent
          strokeMiterlimit="10" // Set the miter limit for stroke joins
          strokeWidth="6" // Set the stroke width to 6 units
          d="M1.5 22L16 36.5L51.5 1" // Define the path's shape with move and line commands
          strokeLinejoin="round" // Use round line joins for smoother edges
          strokeLinecap="round" // Use round line caps for smoother ends
        />
      </motion.svg>
    </motion.div>
  );
}

export default Checkbox;
