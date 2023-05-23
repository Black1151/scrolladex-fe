import React, { useState, useEffect } from "react";
import { Box, Text, Heading, SimpleGrid, Flex, Image } from "@chakra-ui/react";
import { getEmployeesOverviewAPI } from "../api/employeeApi";
import { EmployeeOverview } from "../types";

const Index = () => {
  const [employees, setEmployees] = useState<EmployeeOverview[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployeesOverviewAPI();
      if (data) {
        setEmployees(data);
      }
    };

    fetchEmployees();
  }, []);

  // console.log(employees[0].profilePictureUrl);

  return (
    <Box p={5}>
      <Heading mb={5}>Employee Overview</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {employees.map((employee) => (
          <Box key={employee.id} p={5} shadow="md" borderWidth="1px">
            <Flex>
              <Box>
                <Heading fontSize="xl">
                  {employee.title} {employee.firstName} {employee.lastName}
                </Heading>
                <Text mt={2}>{employee.jobTitle}</Text>
              </Box>
              <Box mr={4}>
                <Image
                  borderRadius="full"
                  boxSize="100px"
                  src={employee.profilePictureUrl || "/placeholder.png"}
                  alt={employee.firstName + " " + employee.lastName}
                  fallbackSrc="/placeholder.png"
                />
              </Box>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Index;
