import React from "react";
import {
  Box,
  Flex,
  Text,
  Spacer,
  useTheme,
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
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import CreateEmployeeModal from "../modals/CreateEmployeeModal";

const Navbar = () => {
  const theme = useTheme();
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
        <CreateEmployeeModal />
        <Button variant="green">Add department</Button>
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
              <CreateEmployeeModal />
              <Button>Add department</Button>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Flex>
  );
};

export default Navbar;
