import React, { useState, useEffect } from "react";
import { Box, Text, Heading, SimpleGrid, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { getEmployeesOverviewAPI } from "../api/employeeApi";
import { EmployeeOverview } from "../types";

const MotionBox = motion(Box);

const Index = () => {
  const [employees, setEmployees] = useState<EmployeeOverview[]>([]);
  const [loaded, setLoaded] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployeesOverviewAPI();
      if (data) {
        setEmployees(data);
        setLoaded(new Array(data.length).fill(false));
      }
    };

    fetchEmployees();
  }, []);

  const handleImageLoad = (index: number) => {
    setLoaded((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  return (
    <Box p={5} bg="medPBlue">
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={5}
        position="relative"
      >
        {employees.map((employee, index) => (
          <MotionBox
            key={employee.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded[index] ? 1 : 0 }}
            transition={{ duration: Math.random() * 1 }}
          >
            <Box
              bg="white"
              p={5}
              shadow="md"
              borderWidth="1px"
              transition="all 0.25s"
              transform="scale(1)"
              zIndex={0}
              position="relative"
              _hover={{
                transform: "scale(1.05)",
                shadow: "xl",
                zIndex: 10,
              }}
            >
              <Flex justifyContent="space-between">
                <Box>
                  <Heading fontSize="xl">
                    {employee.firstName} {employee.lastName}
                  </Heading>
                  <Text mt={2}>{employee.jobTitle}</Text>
                </Box>
                <Box mr={4}>
                  <Image
                    borderRadius="full"
                    boxSize="100px"
                    src={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS!}${
                      employee.profilePictureUrl || "/placeholder.png"
                    }`}
                    alt={employee.firstName + " " + employee.lastName}
                    fallbackSrc="/placeholder.png"
                    onLoad={() => handleImageLoad(index)}
                  />
                </Box>
              </Flex>
            </Box>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Index;
