import {
  ChakraProvider,
  CircularProgress,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import ImageComponent from "./components/ImageComponent";
import Navbar from "./components/Navbar";
import useApi from "./hooks/useApi";
import { nanoid } from "nanoid";

function App() {
  const { photoList, loading, setPage, handleSearch } = useApi();

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        console.log(entries);
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <ChakraProvider>
      <Navbar handler={handleSearch} />
      <Flex w="full" flexDirection="column" alignItems="center">
        <SimpleGrid columns={[2, 3, 4, 6]} w={4 / 5} my="4" spacing="10">
          {photoList.map((photo, index) =>
            photoList.length === index + 1 ? (
              <ImageComponent
                key={nanoid()}
                {...photo}
                ref={lastBookElementRef}
              />
            ) : (
              <ImageComponent key={nanoid()} {...photo} />
            )
          )}
        </SimpleGrid>
        {loading && <CircularProgress isIndeterminate color="green.300" />}
      </Flex>
    </ChakraProvider>
  );
}

export default App;
