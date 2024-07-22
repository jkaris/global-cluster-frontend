export const convertStandardDate = strDate => {
    if (!strDate) return '';
    const date = new Date(strDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  export   function DecreaseDescription(description) {
    if (!description) return '';
    return description.length > 50
      ? `${description.slice(0, 40)}...`
      : description;
  }