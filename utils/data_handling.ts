export function xorEncrypt(text: string, key: string): string {
  let encrypted = "";
  for (let i = 0; i < text.length; i++) {
    encrypted += String.fromCharCode(
      text.charCodeAt(i) ^ key.charCodeAt(i % key.length),
    );
  }
  return Buffer.from(encrypted).toString("base64");
}

export function xorDecrypt(encryptedText: string, key: string): string {
  let encrypted = Buffer.from(encryptedText, "base64").toString();
  let decrypted = "";
  for (let i = 0; i < encrypted.length; i++) {
    decrypted += String.fromCharCode(
      encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length),
    );
  }
  return decrypted;
}

// Example usage:
// const text = "Hello, TypeScript!";
// const key = "mysecretkey";
//
// const encryptedText = xorEncrypt(text, key);
// console.log("Encrypted:", encryptedText);
//
// const decryptedText = xorDecrypt(encryptedText, key);
// console.log("Decrypted:", decryptedText);
