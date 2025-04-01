/* eslint-disable react-hooks/rules-of-hooks */
import { AppointmentCardsOthers, AppointmentCardsTop } from "./AppointmentCards";
import { Box, Button, Flex, Skeleton, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { BiCheckShield } from "react-icons/bi";
import { MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { GET } from "../../Controllers/ApiControllers";

import useAppointmentData from "../../Hooks/UseAppointmentData";
import useUserData from "../../Hooks/Users";
import useTransactionData from "../../Hooks/UseTransaction";
import WelcomeCard from "./WelcomeCard";
import usePatientData from "../../Hooks/UsePatientsData";
import AppointmentChart from "./AppointmentChart";
import StatusPieChart from "./AppointmentStatusPieChart";
import TransactionChart from "./TransactionChart";
import TransactionPieChart from "./TransactionPieChart";
import AddMedicine from "../Medicines/AddMedicine";
import AddNewAppointment from "../Appointments/AddNewAppointment";
import UsersReg from "./UsersReg";
import PatientsReg from "./PatientsReg";
import AppointmentReg from "./AppointmentReg";
import AddPatients from "../Patients/AddPatients";
import admin from "../../Controllers/admin";
import ClockWithCountdown from "../../Components/LiveClock";
import useHasPermission from "../../Hooks/HasPermission";
import CancellationReqStatsics from "./CancellationReqStatsics";
import CancellationPieChart from "./CancelationReqChart";
import AppointmentsCalendar from "./Calender";
import AddCheckin from "../Checkin/Add";

const getData = async () => {
  const res = await GET(admin.token, "get_dashboard_count");
  if (res.response !== 200) {
    throw new Error(res.message);
  }
  return res.data;
};

const getDataByDoct = async () => {
  const res = await GET(admin.token, `get_dashboard_count/doctor/${admin.id}`);
  if (res.response !== 200) {
    throw new Error(res.message);
  }
  return res.data;
};

export default function DashboardMain() {
  const { t } = useTranslation();
  const { appointmentsData } = useAppointmentData();
  const { usersData } = useUserData();
  const { transactionsData } = useTransactionData();
  const { patientsData } = usePatientData();
  const { hasPermission } = useHasPermission();

  // @ts-ignore
  const { data, isLoading } = useQuery({ queryKey: ["dashboard"], queryFn: admin.role.name === "Doctor" ? getDataByDoct : getData });

  // @ts-ignore
  const completedAppointment = appointmentsData?.filter((appointment) => appointment.status === t("dashboard.charts.appointments.completed") || appointment.status === "Visited");

  // @ts-ignore
  const CancelledAppointments = appointmentsData?.filter((appointment) => appointment.status === t("dashboard.charts.appointments.cancelled"));

  // @ts-ignore
  const confirmAppointments = appointmentsData?.filter(
    (appointment) => appointment.status !== t("dashboard.charts.appointments.cancelled") || appointment.status !== "Rejected" || appointment.status !== "Pending"
  );

  // transaction
  const debitTxn = transactionsData?.filter(
    // @ts-ignore
    (item) => item.transaction_type === t("dashboard.charts.transactions.debited")
  );
  const creditTxn = transactionsData?.filter(
    // @ts-ignore
    (item) => item.transaction_type === t("dashboard.charts.transactions.credited")
  );

  return (
    <Box >
      <Buttons />
      <Flex gap={2.5} mt={5} >
        <Box width={"35%"} minH={"100%"} flex={1}>
          {isLoading ? <Skeleton w={"100%"} h={260} /> : <WelcomeCard data={data} />}
        </Box>
        <Box width={"70%"} flex={1.8} >
          {isLoading ? (
            <>
              <Flex gap={5}>
                {" "}
                <>
                  <Skeleton flex={1} w={"100%"} h={24}></Skeleton>
                  <Skeleton flex={1} w={"100%"} h={24}></Skeleton>
                </>
              </Flex>
              <Flex gap={5} mt={8}>
                {" "}
                <>
                  <Skeleton flex={1} w={"100%"} h={24}></Skeleton>
                  <Skeleton flex={1} w={"100%"} h={24}></Skeleton>
                </>
              </Flex>
            </>
          ) : (
            <Flex gap={2.5} flexDirection={"column"} >
              <AppointmentCardsTop data={data} />
              <AppointmentCardsOthers data={data} />
            </Flex>
          )}
        </Box>
      </Flex>
      <Flex gap={2} mt={5} >
        {admin.role.name === "Admin" ? (
          <Box border={'1px solid rgba(0,0,0,0.5)'} flex={1} bg={useColorModeValue("#fff", "gray.900")} borderRadius={8}>
            <UsersReg Users={usersData} />
          </Box>
        ) : hasPermission("USER_VIEW") ? (
          <Box border={'1px solid rgba(0,0,0,0.5)'} flex={1} bg={useColorModeValue("#fff", "gray.900")} borderRadius={8}>
            <UsersReg Users={usersData} />
          </Box>
        ) : null}{" "}
        {admin.role.name === "Admin" ? (
          <Box border={'1px solid rgba(0,0,0,0.5)'} flex={1} bg={useColorModeValue("#fff", "gray.900")} borderRadius={8}>
            <PatientsReg Patients={patientsData} />
          </Box>
        ) : hasPermission("PATIENT_VIEW") ? (
          <Box border={'1px solid rgba(0,0,0,0.5)'} flex={1} bg={useColorModeValue("#fff", "gray.900")} borderRadius={8}>
            <PatientsReg Patients={patientsData} />
          </Box>
        ) : null}{" "}
      </Flex>
      {/* calender */}
      {hasPermission("APPOINTMENT_VIEW") && (
        <Box mt={5} >
          <AppointmentsCalendar
            // @ts-ignore
            title={t("dashboard.calendar.title")}
            appointments={appointmentsData}
          />
        </Box>
      )}
      {/* appointment in last 15 days */}
      {admin.role.name === "Admin" ? (
        <Box mt={5} >
          <AppointmentReg Appointments={appointmentsData} />
        </Box>
      ) : hasPermission("APPOINTMENT_VIEW") ? (
        <Box mt={5}>
          <AppointmentReg Appointments={appointmentsData} />
        </Box>
      ) : null}{" "}
      {/* charts */}
      {admin.role.name === "Admin" ? (
        <Flex gap={2.5} mt={5}>
          <Box maxW={"68%"} flex={2} bg={useColorModeValue("#fff", "gray.900")} borderRadius={8}>
            <AppointmentChart
              // @ts-ignore
              title={t("dashboard.charts.appointments.title")}
              completedAppointment={completedAppointment}
              CancelledAppointments={CancelledAppointments}
              confirmAppointments={confirmAppointments}
            />
          </Box>
          <Box border={'1px solid rgba(0,0,0,0.5)'} maxW={"30%"} flex={1} bg={useColorModeValue("#fff", "gray.900")} borderRadius={8}>
            <StatusPieChart appointments={appointmentsData} />
          </Box>
        </Flex>
      ) : hasPermission("APPOINTMENT_VIEW") ? (
        <Flex gap={5} mt={5}>
          <Box maxW={"68%"} flex={2} bg={useColorModeValue("#fff", "gray.900")} borderRadius={8} >
            <AppointmentChart
              // @ts-ignore
              title={t("dashboard.charts.appointments.title")}
              completedAppointment={completedAppointment}
              CancelledAppointments={CancelledAppointments}
              confirmAppointments={confirmAppointments}
            />
          </Box>
          <Box maxW={"30%"} flex={1} bg={useColorModeValue("#fff", "gray.900")} borderRadius={8}>
            <StatusPieChart appointments={appointmentsData} />
          </Box>
        </Flex>
      ) : null}{" "}
      {admin.role.name === "Admin" ? (
        <Flex gap={5} mt={5} >
          <Box maxW={"68%"} flex={2} bg={useColorModeValue("#fff", "gray.900")} borderRadius={8} border={'1px solid rgba(0,0,0,0.5)'}>
            <TransactionChart creditTransactions={creditTxn} debitTransactions={debitTxn} />
          </Box>
          <Box maxW={"30%"} flex={1} bg={useColorModeValue("#fff", "gray.900")} borderRadius={8} border={'1px solid rgba(0,0,0,0.5)'}>
            <TransactionPieChart transactions={transactionsData} />
          </Box>
        </Flex>
      ) : hasPermission("ALL_TRANSACTION_VIEW") ? (
        <Flex gap={5} mt={5} >
          <Box maxW={"68%"}  flex={2} bg={useColorModeValue("#fff", "gray.900")} borderRadius={8}>
            <TransactionChart creditTransactions={creditTxn} debitTransactions={debitTxn} />
          </Box>
          <Box maxW={"30%"} flex={1} bg={useColorModeValue("#fff", "gray.900")} borderRadius={8}>
            <TransactionPieChart transactions={transactionsData} />
          </Box>
        </Flex>
      ) : null}{" "}
      <Flex gap={5} mt={5}>
        <Box maxW={"68%"} flex={2} >
          <CancellationReqStatsics
            // @ts-ignore
            title={t("dashboard.cancellation.title")}
            appointments={appointmentsData}
          />
        </Box>
        <Box maxW={"30%"} flex={1} bg={useColorModeValue("#fff", "gray.900")} borderRadius={8}>
          <CancellationPieChart
            // @ts-ignore
            title={t("dashboard.cancellation.chart")}
            appointments={appointmentsData}
          />
        </Box>
      </Flex>
    </Box>
  );
}

const Buttons = () => {
  const { hasPermission } = useHasPermission();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: appointmentisOpen, onOpen: appointmentonOpen, onClose: appointmentonClose } = useDisclosure();
  const { isOpen: patientisOpen, onOpen: patientonOpen, onClose: patientonClose } = useDisclosure();
  const { isOpen: checkinisOpen, onOpen: checkinonOpen, onClose: checkinonClose } = useDisclosure();
  const { t } = useTranslation();
  return (
    <>
      {admin.role.name === "Admin" ? (
        <Flex gap={5} justify={"space-between"}>
          <Flex gap={5} justify={"start"}>
            <Button
              size={"xs"}
              colorScheme={"blue"}
              bg={"blue.700"}
              _hover={{
                bg: "blue.700",
              }}
              color={"#fff"}
              leftIcon={<MdAddCircleOutline fontSize={18} />}
              onClick={() => {
                appointmentonOpen();
              }}
              borderRadius={6}
              padding={4}
            >
              {t("buttons.addNewAppointment")}
            </Button>
            <Button
              size={"xs"}
              colorScheme={"blue"}
              bg={"blue.700"}
              _hover={{
                bg: "blue.700",
              }}
              color={"#fff"}
              leftIcon={<MdAddCircleOutline fontSize={18} />}
              onClick={() => {
                navigate("/doctors/add");
              }}
              borderRadius={6}
              padding={4}
            >
              {t("buttons.addDoctor")}
            </Button>
            <Button
              size={"xs"}
              colorScheme={"blue"}
              bg={"blue.700"}
              _hover={{
                bg: "blue.700",
              }}
              color={"#fff"}
              leftIcon={<MdAddCircleOutline fontSize={18} />}
              onClick={() => {
                patientonOpen();
              }}
              borderRadius={6}
              padding={4}
            >
              {t("buttons.addPatient")}
            </Button>
            <Button
              size={"xs"}
              colorScheme={"blue"}
              bg={"blue.700"}
              _hover={{
                bg: "blue.700",
              }}
              color={"#fff"}
              leftIcon={<MdAddCircleOutline fontSize={18} />}
              onClick={() => {
                onOpen();
              }}
              borderRadius={6}
              padding={4}
            >
              {t("buttons.addMedicine")}
            </Button>
            <Button
              size={"xs"}
              colorScheme={"blue"}
              bg={"blue.700"}
              _hover={{
                bg: "blue.700",
              }}
              color={"#fff"}
              leftIcon={<BiCheckShield fontSize={18} />}
              onClick={() => {
                checkinonOpen();
              }}
              borderRadius={6}
              padding={4}
            >
              {t("buttons.newCheckin")}
            </Button>
          </Flex>
          <ClockWithCountdown />
        </Flex>
      ) : (
        <Flex gap={5} justify={"space-between"}>
          <Flex gap={5} justify={"start"}>
            {hasPermission("APPOINTMENT_ADD") && (
              <Button
                size={"xs"}
                colorScheme={"blue"}
                bg={"blue.700"}
                _hover={{
                  bg: "blue.700",
                }}
                color={"#fff"}
                leftIcon={<MdAddCircleOutline fontSize={18} />}
                onClick={() => {
                  appointmentonOpen();
                }}
                borderRadius={6}
                padding={4}
              >
                {t("buttons.addNewAppointment")}
              </Button>
            )}
            {hasPermission("DOCTOR_ADD") && (
              <Button
                size={"xs"}
                colorScheme={"blue"}
                bg={"blue.700"}
                _hover={{
                  bg: "blue.700",
                }}
                color={"#fff"}
                leftIcon={<MdAddCircleOutline fontSize={18} />}
                onClick={() => {
                  navigate("/doctors/add");
                }}
                borderRadius={6}
                padding={4}
              >
                {t("buttons.addDoctor")}
              </Button>
            )}
            {hasPermission("PATIENT_ADD") && (
              <Button
                size={"xs"}
                colorScheme={"blue"}
                bg={"blue.700"}
                _hover={{
                  bg: "blue.700",
                }}
                color={"#fff"}
                leftIcon={<MdAddCircleOutline fontSize={18} />}
                onClick={() => {
                  patientonOpen();
                }}
                borderRadius={6}
                padding={4}
              >
                {t("buttons.addPatient")}
              </Button>
            )}
            {hasPermission("MEDICINE_ADD") && (
              <Button
                size={"xs"}
                colorScheme={"blue"}
                bg={"blue.700"}
                _hover={{
                  bg: "blue.700",
                }}
                color={"#fff"}
                leftIcon={<MdAddCircleOutline fontSize={18} />}
                onClick={() => {
                  onOpen();
                }}
                borderRadius={6}
                padding={4}
              >
                {t("buttons.addMedicine")}
              </Button>
            )}
            {hasPermission("CHECKIN_ADD") && (
              <Button
                size={"xs"}
                colorScheme={"blue"}
                bg={"blue.700"}
                _hover={{
                  bg: "blue.700",
                }}
                color={"#fff"}
                leftIcon={<BiCheckShield fontSize={18} />}
                onClick={() => {
                  onOpen();
                }}
                borderRadius={6}
                padding={4}
              >
                {t("buttons.addMedicine")}
              </Button>
            )}
          </Flex>
          <ClockWithCountdown />
        </Flex>
      )}{" "}
      <AddMedicine isOpen={isOpen} onClose={onClose} />
      {/* @ts-ignore */}
      <AddNewAppointment isOpen={appointmentisOpen} onClose={appointmentonClose} />
      <AddPatients nextFn={() => {}} onClose={patientonClose} isOpen={patientisOpen} />
      <AddCheckin isOpen={checkinisOpen} onClose={checkinonClose} />
    </>
  );
};
