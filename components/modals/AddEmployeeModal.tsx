import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  useDisclosure,
  Flex,
  HStack,
} from "@chakra-ui/react";
import AppFormInput from "../forms/AppFormInput";

import DragAndDropFileInput from "../forms/DragAndDropFileInput";
import { createEmployeeAPI } from "@/api/employeeApi";

import { DepartmentListItem } from "@/types";
import ModalWrapper from "./ModalWrapper";
import { FormModalProps } from "@/types";

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

interface Props extends FormModalProps {
  departmentList: DepartmentListItem[];
}

const AddEmployeeModal: React.FC<Props> = ({
  createOnSubmitHandler,
  departmentList,
}) => {
  const { onClose: onModalClose } = useDisclosure();

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
    onSubmit: createOnSubmitHandler(
      createEmployeeAPI,
      "Employee was added successfully",
      "An error occurred while adding the employee."
    ),
  });

  const onClose = () => {
    formik.resetForm();
    onModalClose();
  };

  return (
    <>
      <ModalWrapper buttonText="Add Employee" title="Add Employee">
        <form onSubmit={formik.handleSubmit}>
          <Flex gap={4} flexDirection="column">
            <Flex flexDirection={["column", null, "row"]} gap={4}>
              <AppFormInput
                type="select"
                id="title"
                name="title"
                label="Title"
                options={[
                  { value: "", label: "Select" },
                  { value: "Mr.", label: "Mr." },
                  { value: "Mrs.", label: "Mrs." },
                  { value: "Miss", label: "Miss" },
                  { value: "Ms.", label: "Ms." },
                  { value: "Dr.", label: "Dr." },
                ]}
              />

              <AppFormInput
                type="text"
                id="firstName"
                name="firstName"
                label="First Name"
              />

              <AppFormInput
                type="text"
                id="lastName"
                name="lastName"
                label="Last Name"
              />

              <AppFormInput
                type="text"
                id="empNo"
                name="empNo"
                label="Employee Number"
              />
            </Flex>

            <Flex flexDirection={["column", null, "row"]} gap={4}>
              <AppFormInput
                type="text"
                id="jobTitle"
                name="jobTitle"
                label="Job Title"
              />

              <AppFormInput
                type="select"
                id="departmentId"
                name="departmentId"
                label="Department"
                options={departmentList.map((department) => ({
                  value: department.id,
                  label: department.departmentName,
                }))}
              />
            </Flex>

            <Flex flexDirection={["column", null, "row"]} gap={4}>
              <AppFormInput
                type="text"
                id="telephone"
                name="telephone"
                label="Telephone"
              />

              <AppFormInput
                type="email"
                id="email"
                name="email"
                label="Email"
              />
            </Flex>

            <FormControl
              isInvalid={
                formik.touched.profilePicture && !!formik.errors.profilePicture
              }
            >
              <FormLabel htmlFor="profilePicture">Profile Picture</FormLabel>
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
      </ModalWrapper>
    </>
  );
};

export default AddEmployeeModal;
