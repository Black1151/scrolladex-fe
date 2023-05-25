import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import DragAndDropFileInput from "../forms/DragAndDropFileInput";
import { createEmployeeAPI } from "@/api/employeeApi";
import ConfirmationModal from "./ConfirmationModal";
import { DepartmentListItem } from "@/types";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is a required field."),
  firstName: Yup.string().required("First Name is a required field."),
  lastName: Yup.string().required("Last Name is a required field."),
  empNo: Yup.string().required("Employee Number is a required field."),
  jobTitle: Yup.string().required("Job Title is a required field."),
  departmentId: Yup.number().required("Department ID is a required field."),
  telephone: Yup.string().required("Telephone number is a required field."),
  email: Yup.string()
    .email("Please provide a valid email address.")
    .required("Email is a required field."),
  profilePicture: Yup.string().required(
    "Profile Picture URL is a required field."
  ),
});

interface Props {
  departmentList: DepartmentListItem[];
}

const AddEmployeeModal: React.FC<Props> = ({ departmentList }) => {
  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure();
  const {
    isOpen: isConfirmationOpen,
    onOpen: onConfirmationOpen,
    onClose: onConfirmationClose,
  } = useDisclosure();

  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmationStatus, setConfirmationStatus] = useState<
    "success" | "error"
  >("success");

  const showErrorModal = () => {
    setConfirmationStatus("error");
    setConfirmationMessage("An error occurred while adding the employee.");
    onConfirmationOpen();
  };

  const showSuccesModal = () => {
    setConfirmationStatus("success");
    setConfirmationMessage("Employee was added succesfully");
    onConfirmationOpen();
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      firstName: "",
      lastName: "",
      empNo: "",
      jobTitle: "",
      departmentId: "",
      telephone: "",
      email: "",
      profilePicture: null,
    },
    validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await createEmployeeAPI(values);
        showSuccesModal();
      } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
          setConfirmationStatus("error");
          setConfirmationMessage(
            error.message || "An unexpected error occurred."
          );
        }
        showErrorModal();
        onConfirmationOpen();
      } finally {
        actions.setSubmitting(false);
        onClose();
      }
    },
  });

  const onClose = () => {
    formik.resetForm();
    onModalClose();
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={onConfirmationClose}
        status={confirmationStatus}
        bodyText={confirmationMessage}
      />
      <Button variant="green" onClick={onOpen}>
        Add Employee
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={900} w="100%" borderTopRadius="lg">
          <Flex
            bg="emerald"
            borderTopRadius="md"
            justifyContent="space-between"
            alignItems="center"
            px={6}
            py={4}
          >
            <Text fontSize="3xl" color="white">
              Add Employee
            </Text>
            <Button
              bg="emerald"
              border="none"
              color="white"
              size="xl"
              _hover={{ bg: "emerald" }}
              onClick={onClose}
            >
              <FaTimes size={30} />
            </Button>
          </Flex>
          <ModalBody>
            <Box p={4}>
              <form onSubmit={formik.handleSubmit}>
                <Flex gap={4} flexDirection="column">
                  <Flex flexDirection={["column", null, "row"]} gap={4}>
                    <FormControl
                      isInvalid={formik.touched.title && !!formik.errors.title}
                      maxW="100px"
                    >
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <Select
                        id="title"
                        name="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                      >
                        <option value="">Select</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Miss">Miss</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Dr.">Dr.</option>
                      </Select>
                      <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={
                        formik.touched.firstName && !!formik.errors.firstName
                      }
                    >
                      <FormLabel htmlFor="firstName">First Name</FormLabel>
                      <Input
                        id="firstName"
                        name="firstName"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                      />
                      <FormErrorMessage>
                        {formik.errors.firstName}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={
                        formik.touched.lastName && !!formik.errors.lastName
                      }
                    >
                      <FormLabel htmlFor="lastName">Last Name</FormLabel>
                      <Input
                        id="lastName"
                        name="lastName"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                      />
                      <FormErrorMessage>
                        {formik.errors.lastName}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={formik.touched.empNo && !!formik.errors.empNo}
                    >
                      <FormLabel htmlFor="empNo" whiteSpace="nowrap">
                        Employee Number
                      </FormLabel>
                      <Input
                        id="empNo"
                        name="empNo"
                        onChange={formik.handleChange}
                        value={formik.values.empNo}
                      />
                      <FormErrorMessage>{formik.errors.empNo}</FormErrorMessage>
                    </FormControl>
                  </Flex>

                  <Flex flexDirection={["column", null, "row"]} gap={4}>
                    <FormControl
                      isInvalid={
                        formik.touched.jobTitle && !!formik.errors.jobTitle
                      }
                    >
                      <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
                      <Input
                        id="jobTitle"
                        name="jobTitle"
                        onChange={formik.handleChange}
                        value={formik.values.jobTitle}
                      />
                      <FormErrorMessage>
                        {formik.errors.jobTitle}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={
                        formik.touched.departmentId &&
                        !!formik.errors.departmentId
                      }
                    >
                      <FormLabel htmlFor="departmentId">Department</FormLabel>
                      <Select
                        id="departmentId"
                        name="departmentId"
                        onChange={formik.handleChange}
                        value={formik.values.departmentId}
                      >
                        <option value="">Select</option>
                        {departmentList.map((department) => (
                          <option key={department.id} value={department.id}>
                            {department.departmentName}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>
                        {formik.errors.departmentId}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>

                  <Flex flexDirection={["column", null, "row"]} gap={4}>
                    <FormControl
                      isInvalid={
                        formik.touched.telephone && !!formik.errors.telephone
                      }
                    >
                      <FormLabel htmlFor="telephone">Telephone</FormLabel>
                      <Input
                        id="telephone"
                        name="telephone"
                        onChange={formik.handleChange}
                        value={formik.values.telephone}
                      />
                      <FormErrorMessage>
                        {formik.errors.telephone}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={formik.touched.email && !!formik.errors.email}
                    >
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>
                  </Flex>

                  <FormControl
                    isInvalid={
                      formik.touched.profilePicture &&
                      !!formik.errors.profilePicture
                    }
                  >
                    <FormLabel htmlFor="profilePicture">
                      Profile Picture
                    </FormLabel>
                    <DragAndDropFileInput
                      onFile={(file) => {
                        formik.setFieldValue("profilePicture", file);
                      }}
                    />
                    <FormErrorMessage>
                      {formik.errors.profilePicture}
                    </FormErrorMessage>
                  </FormControl>
                  <HStack mt={4} gap={[0, 4]} flex={1}>
                    <Button flex={1} variant={"orange"} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      variant={"green"}
                      type="submit"
                      isLoading={formik.isSubmitting}
                      flex={1}
                    >
                      Submit
                    </Button>
                  </HStack>
                </Flex>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEmployeeModal;
