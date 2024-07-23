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


// Derive a key from the secret string
export function deriveKey(secret) {
  const salt = crypto.randomBytes(16); // Salt should be random and unique
  const key = crypto.pbkdf2Sync(secret, salt, 100000, 32, 'sha256'); // Derive a 32-byte key
  return { key, salt };
}

// Encryption function
export function encrypt(text, secret) {
  const { key, salt } = deriveKey(secret);
  const iv = crypto.randomBytes(16); // Initialization vector
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return salt.toString('hex') + ':' + iv.toString('hex') + ':' + encrypted;
}

// Decryption function
export function decrypt(text, secret) {
  const textParts = text.split(':');
  const salt = Buffer.from(textParts.shift(), 'hex');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = textParts.join(':');
  
  const key = crypto.pbkdf2Sync(secret, salt, 100000, 32, 'sha256'); // Derive the key using the same salt
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
