import { useEffect, useState } from "react";
import { Box, Menu, MenuButton, MenuList, MenuItem, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { ChevronDownIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LanguageDropdown() {
  const { i18n } = useTranslation();
  const active = i18n.language
  
  const languages = [
    { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
    { code: "uz", name: "Uzbek", nativeName: "O'zbek", flag: "🇺🇿" },
    { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages.find((val) => val.code === active))

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language.code);
    localStorage.setItem("i18nextLng", language.code);

    // Here you would typically call a function to change the app's language
    // For example: changeAppLanguage(language.code)
  };

  useEffect(() => {
    console.log(selectedLanguage);

    // setSelectedLanguage();
    i18n.changeLanguage(localStorage.getItem("i18nextLng") || "uz");
  }, [i18n]);

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box position="relative">
      <Menu autoSelect={false}>
        <MenuButton as={Button} bg={bg} border="1px" borderColor={borderColor} borderRadius="8px" px={2} py={0} _hover={{ bg: hoverBg }} transition="all 0.2s" fontWeight="500">
          <Flex align="center">
            <Text fontSize="lg" mr={1}>
              {selectedLanguage.flag}
            </Text>
            <ChevronDownIcon size={16} />
          </Flex>
        </MenuButton>
        <MenuList border="1px" borderColor={borderColor} borderRadius="xl" shadow="lg" py={0} minW="160px" bg={bg} overflow="hidden" transition="all 0.2s">
          {languages.map((language) => (
            <MenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              bg={selectedLanguage.code === language.code ? hoverBg : "transparent"}
              _hover={{ bg: hoverBg }}
              transition="all 0.2s"
              px={4}
              py={3}
            >
              <Flex align="center" gap={3} w="full">
                <Text fontSize="lg">{language.flag}</Text>
                <Box>
                  <Text fontWeight="medium">{language.name}</Text>
                  <Text fontSize="xs" opacity={0.8}>
                    {language.nativeName}
                  </Text>
                </Box>
              </Flex>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
}
