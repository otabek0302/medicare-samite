export const formatPhoneNumber = (input, selectedCountry) => {
  const digits = input.replace(/\D/g, "").slice(0, selectedCountry.maxLength);
  let formatted = "";
  const format = selectedCountry.format;
  let index = 0;

  for (const char of format) {
    if (char === "#") {
      formatted += digits[index] || "";
      index++;
    } else {
      formatted += char;
    }
    if (index >= digits.length) break;
  }
  return formatted;
};