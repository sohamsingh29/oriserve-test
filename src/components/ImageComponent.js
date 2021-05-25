import { Image } from "@chakra-ui/image";
import React from "react";
import { Box, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { CircularProgress } from "@chakra-ui/progress";

const ImageComponent = React.forwardRef(
  ({ id, secret, server, title }, ref) => {
    const src = `https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`;
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Box cursor="pointer" onClick={onOpen} p="1" width="full">
          {/*aspect ratio component for images to give them all same ratios */}
          <img
            alt={title}
            ref={ref}
            src={src}
            fallback={<CircularProgress isIndeterminate color="green.300" />}
            style={{ width: "100%" }}
          />
        </Box>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text>{title}</Text>
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
              <Image src={src} objectFit="cover" />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }
);

export default ImageComponent;
