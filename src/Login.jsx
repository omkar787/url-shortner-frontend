"use client";

// import {
//   Button,
//   Checkbox,
//   Flex,
//   Text,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
//   Stack,
//   Image,
// } from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = e.target.elements["email"].value;
      const password = e.target.elements["password"].value;

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email, password },
      );

      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
        return navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.msg);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Login
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" id="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Login
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Don't have a account?{" "}
                  <Link color={"blue.400"}>
                    <RouterLink to="/register">Register</RouterLink>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
    // <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
    //   <form onSubmit={handleSubmit}>
    //     <Flex p={8} flex={1} align={"center"} justify={"center"}>
    //       <Stack spacing={4} w={"full"} maxW={"md"}>
    //         <Heading fontSize={"2xl"}>Sign in to your account</Heading>
    //         <FormControl id="email">
    //           <FormLabel>Email address</FormLabel>
    //           <Input type="email" id="email" />
    //         </FormControl>
    //         <FormControl id="password">
    //           <FormLabel>Password</FormLabel>
    //           <Input type="password" id="password" />
    //         </FormControl>
    //         <Stack spacing={6}>
    //           <Stack
    //             direction={{ base: "column", sm: "row" }}
    //             align={"start"}
    //             justify={"space-between"}
    //           >
    //             <Checkbox>Remember me</Checkbox>
    //             <Text color={"blue.500"}>
    //               <RouterLink to="/register">Register</RouterLink>
    //             </Text>
    //           </Stack>
    //           <Button type="submit" colorScheme={"blue"} variant={"solid"}>
    //             Sign in
    //           </Button>
    //         </Stack>
    //       </Stack>
    //     </Flex>
    //   </form>
    // </Stack>
  );
}
