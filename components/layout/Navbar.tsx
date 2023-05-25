import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Spacer,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import AddEmployeeModal from "../modals/AddEmployeeModal";
import AddDepartmentModal from "../modals/AddDepartmentModal";
import { getDepartmentsAPI } from "@/api/departmentAPI";
import { DepartmentListItem } from "@/types";
import { motion } from "framer-motion";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [departmentList, setDepartmentList] = useState<DepartmentListItem[]>(
    []
  );

  const toast = useToast();

  const MotionBox = motion(Box);

  const createDepartmentDropdownList = async () => {
    try {
      const departments = await getDepartmentsAPI();
      if (departments != null) {
        const newDepartmentsArray = departments.map((department) => ({
          id: department.id as number,
          departmentName: department.departmentName,
        }));
        setDepartmentList(newDepartmentsArray);
      }
    } catch (error: any) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleDepartmentAdded = () => {
    createDepartmentDropdownList();
  };

  useEffect(() => {
    createDepartmentDropdownList();
  }, []);

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="1rem"
        bg="pictonBlue"
        color="white"
        px={[2, null, 8, null, 24]}
      >
        <VStack alignItems="flex-start">
          <Text fontSize={["xl", null, "2xl", "4xl"]} color="white">
            Scroll-a-dex!
          </Text>
          <Text fontSize="xl" color="white" whiteSpace="nowrap">
            Your complete personnel directory
          </Text>
        </VStack>
        <Spacer />
        <HStack display={{ base: "none", md: "flex" }}>
          <AddEmployeeModal departmentList={departmentList} />
          <AddDepartmentModal handleDepartmentAdded={handleDepartmentAdded} />
        </HStack>
        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
          />
          <Drawer isOpen={isOpen} onClose={onClose} placement="right">
            <DrawerOverlay />
            <DrawerContent bg="blue">
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <AddEmployeeModal departmentList={departmentList} />
                <AddDepartmentModal
                  handleDepartmentAdded={handleDepartmentAdded}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </Flex>
    </MotionBox>
  );
};

export default Navbar;
