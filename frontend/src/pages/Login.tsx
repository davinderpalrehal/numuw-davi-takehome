import { useState } from "react";
import {
  Center,
  Box,
  Input,
  Stack,
  InputGroup,
  InputLeftAddon,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {setToken} from "../state/user/userSlice.ts";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("handling login");
    try {
      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access);
        console.log({
          msg: "Login successfully",
          data,
        });
        dispatch(setToken(data.access));
        navigate('/dashboard')
      } else {
        setError("Login failed, You don't have an account!");
      }
    } catch (error) {
      setError("Login error ->", JSON.stringify(error));
    }
  };

  return (
    <Center h="100vh">
      <Box borderRadius="lg" borderWidth="10px" w="400px" p="1em" pt="3em">
        <Stack spacing={3}>
          <InputGroup size="lg">
            <InputLeftAddon>Username</InputLeftAddon>
            <Input
              placeholder="johndoe"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
          <InputGroup size="lg">
            <InputLeftAddon>Password</InputLeftAddon>
            <Input
              placeholder="johndoe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          <ButtonGroup gap="4">
            <Button
              ml="auto"
              colorScheme="red"
              variant="outline"
              onClick={handleLogin}
            >
              Login
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
      <div className="login-page">
        <div>{error && <p>{error}</p>}</div>
      </div>
    </Center>
  );
}

export default Login;
