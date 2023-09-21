// Function to combine and trim an array of CSS class names
export const getClasses = (classes) =>
  classes
    .filter((item) => item !== '') // Remove any empty class names
    .join(' ') // Join class names with a space separator
    .trim(); // Trim any leading/trailing whitespace
