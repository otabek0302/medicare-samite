import { BsBookmarkStar } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { MdMobileScreenShare } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { BiFolderOpen } from "react-icons/bi";
import { RiCoupon2Fill } from "react-icons/ri";
import { BiCalendar, BiCheckShield } from "react-icons/bi";
import { MdFamilyRestroom } from "react-icons/md";
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { FaFileAlt, FaHospitalUser, FaPills } from "react-icons/fa";
import { RiStethoscopeFill } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { FaUserMd } from "react-icons/fa";
import { FaMedkit } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { FaHospital } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Box, Flex, Icon, IconButton, Input, InputGroup, InputRightElement, Text, Tooltip, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom"; // Import the custom hook
import useHasPermission from "../Hooks/HasPermission";
import admin from "../Controllers/admin";
import useSettingsData from "../Hooks/SettingData";
import { useTranslation } from "react-i18next";


export default function Sidebar() {
  const { t } = useTranslation();

  const LinkItems = [
    { name: t("sidebar.Dashboard"), key: "dashboard", path: "Dashboard", icon: AiFillDashboard },
    { name: t("sidebar.Checkins"), key: "checkins", path: "Checkins", icon: BiCheckShield, permission: "CHECKIN_VIEW" },
    { name: t("sidebar.Appointments"), key: "appointments", path: "Appointments", icon: RiStethoscopeFill, permission: "APPOINTMENT_VIEW" },
    { name: t("sidebar.Appointment Status Log"), key: "appointment_status_log", path: "Appointment-Status-Log", icon: RiStethoscopeFill, permission: "APPOINTMENT_VIEW" },
    { name: t("sidebar.Appointments Calendar"), key: "appointments_calendar", path: "Appointments-Calender", icon: BiCalendar, permission: "APPOINTMENT_VIEW" },
    { name: t("sidebar.Transactions"), key: "transactions", path: "Transactions", icon: CgArrowsExchangeAlt, permission: "ALL_TRANSACTION_VIEW" },
    { name: t("sidebar.Departments"), key: "departments", path: "Departments", icon: FaHospital, permission: "DEPARTMENT_VIEW" },
    { name: t("sidebar.Specialization"), key: "specialization", path: "Specialization", icon: FaMedkit, permission: "SPECIALIZATION_VIEW" },
    { name: t("sidebar.Doctors"), key: "doctors", path: "Doctors", icon: FaUserMd, permission: "DOCTOR_VIEW" },
    { name: t("sidebar.Patients"), key: "patients", path: "Patients", icon: FaHospitalUser, permission: "PATIENT_VIEW" },
    { name: t("sidebar.Users"), key: "users", path: "Users", icon: ImUsers, permission: "USER_VIEW" },
    { name: t("sidebar.Prescriptions"), key: "prescriptions", path: "Prescriptions", icon: FaFileAlt, permission: "PRESCRIPTION_VIEW" },
    { name: t("sidebar.Patient Files"), key: "patient_files", path: "Patient-Files", icon: BiFolderOpen, permission: "FILE_VIEW" },
    { name: t("sidebar.Medicines"), key: "medicines", path: "Medicines", icon: FaPills, permission: "MEDICINE_VIEW" },
    { name: t("sidebar.Family Members"), key: "family_members", path: "Family-Members", icon: MdFamilyRestroom, permission: "FAMILY_VIEW" },
    { name: t("sidebar.Coupons"), key: "coupons", path: "Coupons", icon: RiCoupon2Fill, permission: "COUPON_VIEW" },
    { name: t("sidebar.Doctor Reviews"), key: "doctor_reviews", path: "Doctor-Reviews", icon: BsBookmarkStar, permission: "REVIEW_VIEW" },
    { name: t("sidebar.Notification"), key: "notification", path: "Notification", icon: IoIosNotifications, permission: "NOTIFICATION_VIEW" },
    { name: t("sidebar.Testimonials"), key: "testimonials", path: "Testimonials", icon: MdRateReview, permission: "TESTIMONIAL_VIEW" },
    { name: t("sidebar.Login Screen"), key: "login_screen", path: "Login-Screen", icon: MdMobileScreenShare, permission: "LOGINSCREEN_VIEW" },
    { name: t("sidebar.Roles"), key: "roles", path: "Roles", icon: MdAdminPanelSettings, permission: "ROLE_VIEW" },
    { name: t("sidebar.Settings"), key: "settings", path: "Settings", icon: FiSettings, permission: "SETTING_VIEW" }
  ];



  const [isLarge] = useMediaQuery("(min-width: 998px)");
  const Uselocation = useLocation();
  const location = Uselocation.pathname.split("/")[1];
  const [isOpen, setisOpen] = useState(!isLarge);
  const [activeTab, setActiveTab] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const { hasPermission } = useHasPermission(); // Use the custom hook
  const { settingsData } = useSettingsData();
  const title = settingsData?.find((value) => value.id_name === "clinic_name");

  const filteredLinks = LinkItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    handleTabClick(location ? location : "Dashboard");
  }, [location]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <Box
      maxH="100vh"
      minH={"100vh"}
      overflowY={"scroll"}
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
        overflowY: "scroll",
        height: "200px",
      }}
    >
      {/* Sidebar */}
      <Box bg={"#2D3748"} w={isOpen ? 60 : 16} overflow={"hidden"} minH="100vh" borderRightColor={useColorModeValue("gray.200", "gray.700")} color={"#FFF"} transition={"0.4s ease"}>
        <Flex h="16" alignItems="center" mx={isOpen ? 4 : 2} justifyContent={isOpen ? "space-between" : "center"}>
          {isOpen && (
            <Text fontSize="xl" fontFamily="monospace" fontWeight="semi-bold">
              {title?.value || admin?.role.name}
            </Text>
          )}
          <IconButton
            onClick={() => {
              setisOpen(!isOpen);
            }}
            icon={<GiHamburgerMenu fontSize="20" />}
            color={"#fff"}
            background={"none"}
            _hover={{
              background: "none",
            }}
          />
        </Flex>

        {isOpen && (
          <Box p={2} pt={0} mb={2}>
            <InputGroup size={"sm"} colorScheme="blackAlpha">
              <InputRightElement pointerEvents="none">
                <AiOutlineSearch size={"20"} />
              </InputRightElement>
              <Input
                onChange={handleSearchChange}
                focusBorderColor="#fff"
                type="tel"
                outline={"none"}
                placeholder="Search"
                borderRadius={6}
                borderColor={"#fff"}
                _placeholder={{
                  color: "#fff",
                }}
              />
            </InputGroup>
          </Box>
        )}

        {filteredLinks.map((link) => {
          // Check if the user is an admin or super-admin
          if (admin.role.name === "admin" || admin.role.name === "Admin" || admin.role.name === "super-admin") {
            return (
              <Link to={`/${link.path.toLowerCase()}`} key={link.path}>
                <NavItem
                  icon={link.icon}
                  isActive={activeTab === link.path.toLowerCase()}
                  onClick={() => {
                    handleTabClick(link.path);
                    setSearchQuery("");
                  }}
                  isOpen={isOpen}
                >
                  {link.name}
                </NavItem>
              </Link>
            );
          } else {
            return link.permission ? (
              hasPermission(link.permission) && ( // Use hasPermission hook to check permissions
                <Link to={`/${link.path.toLowerCase()}`} key={link.name}>
                  <NavItem
                    icon={link.icon}
                    isActive={activeTab === link.path.toLowerCase()}
                    onClick={() => {
                      handleTabClick(link.path);
                      setSearchQuery("");
                    }}
                    isOpen={isOpen}
                  >
                    {link.name}
                  </NavItem>
                </Link>
              )
            ) : (
              <Link to={`/${link.path.toLowerCase()}`} key={link.path}>
                <NavItem
                  icon={link.icon}
                  isActive={activeTab === link.path.toLowerCase()}
                  onClick={() => {
                    handleTabClick(link.path);
                    setSearchQuery("");
                  }}
                  isOpen={isOpen}
                >
                  {link.name}
                </NavItem>
              </Link>
            );
            // Check for specific permissions for non-admin users
          }
        })}
      </Box>
    </Box>
  );
}

function NavItem({ icon: IconComponent, children, isActive, onClick, isOpen }) {
  return (
    <Tooltip label={isOpen ? null : children} placement="right">
      <Box as="a" href="#" style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }} onClick={onClick}>
        <Flex
          fontSize={14}
          align="center"
          p="2"
          ml={isOpen ? 4 : 0}
          mb={2}
          borderRadius={isOpen && "6px"}
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
          role="group"
          cursor="pointer"
          bg={isActive ? "blue.500" : "transparent"} // Updated active background color
          boxShadow={isActive ? "0px 4px 10px rgba(0, 0, 0, 0.3)" : "transparent"} // Updated shadow for active items
          color={isActive ? "white" : "inherit"}
          _hover={{
            bg: "blue.600", // Updated hover color for active items
            color: "white",
          }}
          fontWeight={isActive ? "bold" : 500} // Bold font for active items
          justifyContent={isOpen ? "start" : "center"}
        >
          {IconComponent && (
            <Icon
              mr={isOpen && 4}
              fontSize={isOpen ? 16 : 20}
              _groupHover={{
                color: "white",
              }}
              as={IconComponent}
            />
          )}

          {isOpen && children}
        </Flex>
      </Box>
    </Tooltip>
  );
}
