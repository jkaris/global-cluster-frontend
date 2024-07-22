/**
 * Converts a standard date string into a formatted date string.
 * @param {string} strDate - The standard date string to convert.
 * @returns {string} The formatted date string in the format "Month Day, Year".
 */
export const convertStandardDate = strDate => {
    if (!strDate) return '';
    const date = new Date(strDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  /**
   * Truncates a given description if it exceeds 50 characters, returning a shortened version.
   * If the description is already 50 characters or less, it is returned as is.
   * @param {string} description - The description to be potentially truncated.
   * @returns {string} The truncated or original description.
   */
  export   function DecreaseDescription(description) {
    if (!description) return '';
    return description.length > 50
      ? `${description.slice(0, 40)}...`
      : description;
  }