/* eslint-disable react/prop-types */
import admin from "../../Controllers/admin";
import { Box, Divider, Flex, Heading, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

/**
 * @typedef {Object} WelcomeCardData
 * @property {number} [total_active_doctors]
 * @property {number} [total_appointments]
 * @property {number} [total_patients]
 * @property {number} [total_users]
 */

/**
 * @param {Object} props
 * @param {WelcomeCardData} [props.data]
 */
export default function WelcomeCard({ data }) {
  const { t } = useTranslation();

  return (
    <Box w={"100%"} borderRadius={8} overflow={"hidden"} boxShadow={"lg"} minH={"100%"} bg={useColorModeValue("#fff", "gray.900")} border={'1px solid rgba(0,0,0,0.5)'}>
      <Box padding={3} bg={"main.900"} pb={10} color={"#fff"} backgroundColor={"#1C325B"}>
        <Heading fontSize={"md"}>{t("welcome.title")}</Heading>
        <Text fontSize={"sm"}>
          {admin.role.name} - {admin.f_name} {admin.l_name}
        </Text>
      </Box>
      <Box p={3} pos={"relative"} bg={useColorModeValue("#fff", "gray.900")}>
        <Image src="/admin/profile.png" w={16} top={"-8"} pos={"absolute"} />
        <Heading fontSize={"sm"} mt={6} ml={1}>
          {admin.role.name}
        </Heading>
        <Text fontSize={"sm"} ml={1}>
          {admin.email}
        </Text>
        <Box mt={2} ml={1}>
          <Flex justify={"space-between"} gap={3}>
            <Box
              flex={1}
              border={"1px solid #1C325B"}
              bg={useColorModeValue("#fff", "#1C325B")}
              borderRadius={6}
              paddingX={2.5}
              justifyContent={"space-between"}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              <Text fontSize={"sm"} fontWeight={500}>
                {t("welcome.stats.activeDoctors")}
              </Text>
              <Text fontSize={"xl"} color={"blue.600"} fontWeight={700}>
                {data?.total_active_doctors}
              </Text>
            </Box>
            <Box
              flex={1}
              border={"1px solid #1C325B"}
              bg={useColorModeValue("#fff", "#1C325B")}
              borderRadius={6}
              paddingX={2.5}
              justifyContent={"space-between"}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              <Text fontSize={"sm"} fontWeight={500}>
                {t("welcome.stats.appointments")}
              </Text>
              <Text fontSize={"xl"} color={"blue.600"} fontWeight={700}>
                {data?.total_appointments}
              </Text>
            </Box>
          </Flex>
          <Flex justify={"space-between"} gap={3} mt={2}>
            <Box
              flex={1}
              border={"1px solid #1C325B"}
              bg={useColorModeValue("#fff", "#1C325B")}
              borderRadius={6}
              paddingX={2.5}
              justifyContent={"space-between"}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              <Text fontSize={"sm"} fontWeight={500}>
                {t("welcome.stats.patients")}
              </Text>
              <Text fontSize={"xl"} color={"blue.600"} fontWeight={700}>
                {data?.total_patients}
              </Text>
            </Box>
            <Box
              flex={1}
              border={"1px solid #1C325B"}
              bg={useColorModeValue("#fff", "#1C325B")}
              borderRadius={6}
              paddingX={2.5}
              justifyContent={"space-between"}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              <Text fontSize={"sm"} fontWeight={500}>
                {t("welcome.stats.users")}
              </Text>
              <Text fontSize={"xl"} color={"blue.600"} fontWeight={700}>
                {data?.total_users}
              </Text>
            </Box>
          </Flex>
          <Divider my={2} />
          <Flex justify={"space-between"} gap={3}>
            <Box
              flex={1}
              border={"1px solid #1C325B"}
              bg={useColorModeValue("#fff", "#1C325B")}
              borderRadius={6}
              paddingX={2.5}
              justifyContent={"space-between"}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              <Text fontSize={"sm"} fontWeight={500}>
                {t("welcome.stats.departments")}
              </Text>
              <Text fontSize={"xl"} color={"blue.600"} fontWeight={700}>
                {/* @ts-ignore */}
                {data?.total_departments}
              </Text>
            </Box>
            <Box
              flex={1}
              border={"1px solid #1C325B"}
              bg={useColorModeValue("#fff", "#1C325B")}
              borderRadius={6}
              paddingX={2.5}
              justifyContent={"space-between"}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              <Text fontSize={"sm"} fontWeight={500}>
                {t("welcome.stats.prescriptions")}
              </Text>
              <Text fontSize={"xl"} color={"blue.600"} fontWeight={700}>
                {/* @ts-ignore */}
                {data?.total_prescriptions}
              </Text>
            </Box>
          </Flex>
          <Flex justify={"space-between"} gap={3} mt={2}>
            <Box
              flex={1}
              border={"1px solid #1C325B"}
              bg={useColorModeValue("#fff", "#1C325B")}
              borderRadius={6}
              paddingX={2.5}
              justifyContent={"space-between"}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              <Text fontSize={"sm"} fontWeight={500}>
                {t("welcome.stats.medicine")}
              </Text>
              <Text fontSize={"xl"} color={"blue.600"} fontWeight={700}>
                {/* @ts-ignore */}
                {data?.total_medicine}
              </Text>
            </Box>
            <Box
              flex={1}
              border={"1px solid #1C325B"}
              bg={useColorModeValue("#fff", "#1C325B")}
              borderRadius={6}
              paddingX={2.5}
              justifyContent={"space-between"}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              <Text fontSize={"sm"} fontWeight={500}>
                {t("welcome.stats.doctorReviews")}
              </Text>
              <Text fontSize={"xl"} color={"blue.600"} fontWeight={700}>
                {/* @ts-ignore */}
                {data?.total_doctors_review}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
