import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key";

export const setEncryptedItem = (key: string, value: string) => {
  const encryptedValue = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
  localStorage.setItem(key, encryptedValue);
};

export const getDecryptedItem = (key: string): string | null => {
  const encryptedValue = localStorage.getItem(key);
  console.log(`Fetching item with key: ${key}`);
  console.log(`Encrypted value: ${encryptedValue}`);

  if (!encryptedValue) {
    console.log(`No value found for key: ${key}`);
    return null;
  }

  try {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
    const decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);
    console.log(`Decrypted value: ${decryptedValue}`);
    return decryptedValue;
  } catch (error) {
    console.error(`Error decrypting value for key ${key}:`, error);
    return null;
  }
};
