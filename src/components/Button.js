import React from 'react';
import styles from '../styles/modules/button.module.scss';
import { getClasses } from '../utils/getClasses';

// Define button types as constants
const buttonTypes = {
  primary: 'primary',
  secondary: 'secondary',
  circle: 'circle',
};

function Button({ children, type, variant, ...rest }) {
  return (
    <button
      className={getClasses([
        styles.button, // Apply base button styles using getClasses method
        styles[`button--${buttonTypes[variant]}`], // Apply variant-specific styles using getClasses method
      ])} // Select button variants using getClasses method
      type={type === 'submit' ? 'submit' : 'button'} // Set button type based on props
      {...rest} // Spread other props to make them available in the button
    >
      {children}
    </button>
  );
}

function SelectButton({ children, ...rest }) {
  return (
    <select
      className={getClasses([styles.button, styles.button__select])} // Apply select button styles using getClasses method
      {...rest} // Spread other props to make them available in the select button
    >
      {children}
    </select>
  );
}

export { SelectButton };
export default Button;
