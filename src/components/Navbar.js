import { Button } from "@chakra-ui/button";
import { useBoolean, useOutsideClick } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/layout";
import { useEffect, useRef, useState } from "react";

const Navbar = ({ handler }) => {
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const [toggle, setToggle] = useBoolean(false);

  useOutsideClick({
    handler() {
      setToggle.off();
    },
    ref: inputRef,
  });

  const handleSearch = (e) => {
    // onsubmit function for search
    e.preventDefault();

    const query = e.target[0].value;
    setToggle.off();

    setSuggestions([...suggestions, query]); // suggestions logic to save in localstorage
    localStorage.setItem(
      "suggestions",
      JSON.stringify([...suggestions, query])
    );

    handler(e.target[0].value); // useApi handlesearch function call
  };

  const handleClick = (e) => {
    setToggle.off();
    handler(e.target.innerText);
  };

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem("suggestions"));
    if (value) setSuggestions(value);
  }, []);

  return (
    <Box
      zIndex="sticky"
      bg="blackAlpha.900"
      w="full"
      p="8"
      position="sticky"
      top="0"
    >
      <Center flexDirection="column">
        <Heading color="white">Search Photos</Heading>
        <Flex as="form" my="4" onSubmit={handleSearch}>
          <Box pos="relative" mx="2">
            <Input
              colorScheme="whiteAlpha"
              variant="filled"
              onClick={setToggle.on}
              _focusWithin={{ color: "white" }}
              size="lg"
              placeholder="search here..."
            />
            {toggle && (
              <Box
                ref={inputRef}
                pos="absolute"
                top="14"
                shadow="lg"
                rounded="sm"
                bg="white"
                color="black"
                w="full"
              >
                {suggestions.map((item) => (
                  <Text
                    cursor="pointer"
                    _hover={{
                      background: "#0003",
                    }}
                    onClick={handleClick}
                    p="4"
                  >
                    {item}
                  </Text>
                ))}
                {suggestions.length > 0 && (
                  <Button
                    colorScheme="red"
                    float="right"
                    onClick={() => {
                      localStorage.clear();
                      setToggle.off();
                      setSuggestions([]);
                    }}
                  >
                    Clear all
                  </Button>
                )}
              </Box>
            )}
          </Box>
          <Button colorScheme="orange" size="lg" type="submit" mx="2">
            Search
          </Button>
        </Flex>
      </Center>
    </Box>
  );
};

export default Navbar;
