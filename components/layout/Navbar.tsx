import React from "react";
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
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import AddEmployeeModal from "../modals/AddEmployeeModal";
import AddDepartmentModal from "../modals/AddDepartmentModal";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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
        <AddEmployeeModal />
        <AddDepartmentModal />
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
              <AddEmployeeModal />
              <AddDepartmentModal />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Flex>
  );
};

export default Navbar;
