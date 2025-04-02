import React, { useState } from "react";
import { Select } from "@chakra-ui/react";
import { countryOptions } from "../utils/CountryPhoneOptions";

export default function PhoneNumberInput({ register, errors, setValue }) {
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneChange = (input) => {
    const digits = input.replace(/\D/g, ""); // Remove non-numeric characters
    const format = selectedCountry.format;
    let formattedNumber = "";
    let index = 0;

    for (const char of format) {
      if (char === "#") {
        if (index < digits.length) {
          formattedNumber += digits[index];
          index++;
        } else {
          break;
        }
      } else {
        if (index < digits.length) {
          formattedNumber += char;
        }
      }
    }

    setPhoneNumber(formattedNumber); // Update the state with the formatted number
    setValue("phone", digits); // Update the raw value in react-hook-form
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    const rawDigits = phoneNumber.replace(/\D/g, ""); // Get the current raw digits
    const newDigits = input.replace(/\D/g, ""); // Get the new raw digits

    // Allow backspace by checking if the new input is shorter than the current raw digits
    if (newDigits.length <= rawDigits.length) {
      setPhoneNumber(input); // Temporarily set the input value
      setValue("phone", newDigits); // Update the raw value in react-hook-form
    } else {
      handlePhoneChange(input); // Format the input if it's not a backspace
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <Select
        w={150}
        value={selectedCountry.code}
        onChange={(e) => {
          const country = countryOptions.find(
            (option) => option.code === e.target.value
          );
          setSelectedCountry(country);
          setPhoneNumber(""); // Reset phone number on country change
          setValue("phone", ""); // Reset raw value in react-hook-form
        }}
      >
        {countryOptions.map((country) => (
          <option key={country.code} value={country.code}>
            {country.label}
          </option>
        ))}
      </Select>
      <input
        type="tel"
        placeholder={selectedCountry.format}
        value={phoneNumber} // Bind the state to the input value
        onChange={handleInputChange} // Use the new handler
        maxLength={
          selectedCountry.maxLength +
          selectedCountry.format.replace(/#/g, "").length
        }
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      />
      {errors.phone && (
        <span style={{ color: "red", fontSize: "12px" }}>
          {errors.phone.message}
        </span>
      )}
    </div>
  );
}
