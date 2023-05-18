import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
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
import { createDepartmentAPI } from "@/api/departmentAPI";

import ConfirmationModal from "./ConfirmationModal";

const validationSchema = Yup.object({
  departmentName: Yup.string().required("Department Name is a required field."),
  addressLineOne: Yup.string().required("Address Line 1 is a required field."),
  addressLineTwo: Yup.string(),
  town: Yup.string().required("Town is a required field."),
  county: Yup.string().required("County is a required field."),
  postcode: Yup.string().required("Postcode is a required field."),
});

interface AddDepartmentModalProps {
  handleDepartmentAdded: () => void;
}

const AddDepartmentModal: React.FC<AddDepartmentModalProps> = ({
  handleDepartmentAdded,
}) => {
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
    setConfirmationMessage("An error occurred while adding the department.");
    onConfirmationOpen();
  };

  const showSuccesModal = () => {
    setConfirmationStatus("success");
    setConfirmationMessage("Department was added successfully");
    onConfirmationOpen();
  };

  const formik = useFormik({
    initialValues: {
      departmentName: "",
      addressLineOne: "",
      addressLineTwo: "",
      town: "",
      county: "",
      postcode: "",
    },
    validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await createDepartmentAPI(values);
        if (response == 200) {
          showSuccesModal();
          handleDepartmentAdded();
        } else {
          showErrorModal();
        }
      } catch (error) {
        console.error(error);
        showErrorModal();
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
        Add Department
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
              Add Department
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
            <form onSubmit={formik.handleSubmit}>
              <Flex p={4} gap={4} flexDirection="column">
                <FormControl
                  isInvalid={
                    formik.touched.departmentName &&
                    !!formik.errors.departmentName
                  }
                >
                  <FormLabel htmlFor="departmentName">
                    Department Name
                  </FormLabel>
                  <Input
                    id="departmentName"
                    name="departmentName"
                    onChange={formik.handleChange}
                    value={formik.values.departmentName}
                  />
                  <FormErrorMessage>
                    {formik.errors.departmentName}
                  </FormErrorMessage>
                </FormControl>

                <Flex gap={4} flexDirection={["column", "row"]}>
                  <FormControl
                    isInvalid={
                      formik.touched.addressLineOne &&
                      !!formik.errors.addressLineOne
                    }
                  >
                    <FormLabel htmlFor="addressLineOne">
                      Address Line 1
                    </FormLabel>
                    <Input
                      id="addressLineOne"
                      name="addressLineOne"
                      onChange={formik.handleChange}
                      value={formik.values.addressLineOne}
                    />
                    <FormErrorMessage>
                      {formik.errors.addressLineOne}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isInvalid={
                      formik.touched.addressLineTwo &&
                      !!formik.errors.addressLineTwo
                    }
                  >
                    <FormLabel htmlFor="addressLineTwo">
                      Address Line 2
                    </FormLabel>
                    <Input
                      id="addressLineTwo"
                      name="addressLineTwo"
                      onChange={formik.handleChange}
                      value={formik.values.addressLineTwo}
                    />
                    <FormErrorMessage>
                      {formik.errors.addressLineTwo}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>

                <Flex gap={4} flexDirection={["column", "row"]}>
                  <FormControl
                    isInvalid={formik.touched.town && !!formik.errors.town}
                  >
                    <FormLabel htmlFor="town">Town</FormLabel>
                    <Input
                      id="town"
                      name="town"
                      onChange={formik.handleChange}
                      value={formik.values.town}
                    />
                    <FormErrorMessage>{formik.errors.town}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isInvalid={formik.touched.county && !!formik.errors.county}
                  >
                    <FormLabel htmlFor="county">County</FormLabel>
                    <Input
                      id="county"
                      name="county"
                      onChange={formik.handleChange}
                      value={formik.values.county}
                    />
                    <FormErrorMessage>{formik.errors.county}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      formik.touched.postcode && !!formik.errors.postcode
                    }
                  >
                    <FormLabel htmlFor="postcode">Postcode</FormLabel>
                    <Input
                      id="postcode"
                      name="postcode"
                      onChange={formik.handleChange}
                      value={formik.values.postcode}
                    />
                    <FormErrorMessage>
                      {formik.errors.postcode}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>

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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddDepartmentModal;
