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
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import DragAndDropFileInput from "./DragAndDropFileInput";

import { createEmployeeAPI } from "@/api/employeeApi";

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

const EmployeeForm = () => {
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
      profilePicture: "",
    },
    validationSchema,
    onSubmit: (values) => {
      createEmployeeAPI(values);
    },
  });

  return (
    <Box p={4} gap={10} mx="auto">
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
              isInvalid={formik.touched.firstName && !!formik.errors.firstName}
            >
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                id="firstName"
                name="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={formik.touched.lastName && !!formik.errors.lastName}
            >
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input
                id="lastName"
                name="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
              <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
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
              isInvalid={formik.touched.jobTitle && !!formik.errors.jobTitle}
            >
              <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
              <Input
                id="jobTitle"
                name="jobTitle"
                onChange={formik.handleChange}
                value={formik.values.jobTitle}
              />
              <FormErrorMessage>{formik.errors.jobTitle}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={
                formik.touched.departmentId && !!formik.errors.departmentId
              }
            >
              <FormLabel htmlFor="departmentId">Department</FormLabel>
              <Select
                id="title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.departmentId}
              >
                <option value="">TBD</option>
              </Select>
              <FormErrorMessage>{formik.errors.departmentId}</FormErrorMessage>
            </FormControl>
          </Flex>

          <Flex flexDirection={["column", null, "row"]} gap={4}>
            <FormControl
              isInvalid={formik.touched.telephone && !!formik.errors.telephone}
            >
              <FormLabel htmlFor="telephone">Telephone</FormLabel>
              <Input
                id="telephone"
                name="telephone"
                onChange={formik.handleChange}
                value={formik.values.telephone}
              />
              <FormErrorMessage>{formik.errors.telephone}</FormErrorMessage>
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

          {/* <FormControl
            isInvalid={
              formik.touched.profilePicture && !!formik.errors.profilePicture
            }
          >
            <FormLabel htmlFor="profilePicture">Profile Picture</FormLabel>
            <input
              id="profilePicture"
              name="profilePicture"
              type="file"
              onChange={(event) => {
                if (event.currentTarget.files) {
                  formik.setFieldValue(
                    "profilePicture",
                    event.currentTarget.files[0]
                  );
                }
              }}
            />
            <FormErrorMessage>
              {formik.getFieldMeta("profilePicture").error}
            </FormErrorMessage>
          </FormControl> */}

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
            <FormErrorMessage>{formik.errors.profilePicture}</FormErrorMessage>
          </FormControl>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={formik.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default EmployeeForm;
