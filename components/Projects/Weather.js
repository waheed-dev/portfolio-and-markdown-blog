import {Box, Image, Text, Heading, Button, Link,useColorModeValue as mode} from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import {
  boxVariants,
  imageVariants,
  MotionBox,
  MotionImage,
  outerboxVariants,
  outerimageVariants
} from "../helpers/helpers";
import {useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";

const Weather = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <Box
      mt={"20"}
      pb={"6"}
      display={["block", "flex", "flex", "flex"]}
      justifyContent={"space-evenly"}
      gap={"4"}
    >
      <MotionImage
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={imageVariants}
        src="/Weather.svg"
        alt="Picture of the author"
        boxSize={["150", "240", "240", "240"]}
        mx={"auto"}
        mb={"2"}
      />
      <MotionBox
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={boxVariants} width={["", "md", "lg", "lg"]}>
        <Heading>Weather Application</Heading>
        <Text fontSize={["xl", "xl", "2xl", "2xl"]} fontWeight={"bold"} color={"gray.500"}>
          Next js,Material ui,openMapWeatherApi
        </Text>
        <Text fontSize={"lg"} mt={"4"} mb={"10"}>
          This web application fetches real time weather data from openMapWeatherApi of user entered location and then displays result.
        </Text>
        <Box display={"flex"} gap={"12"}>
          <Button
            bgColor={"green.500"}
            _hover={{ backgroundColor: "green.600" }}
            color={"white"}
            _dark={{ backgroundColor: "green.400" }}
          >
              <Link _hover={{textDecoration:'none'}} href={'https://weather-application-dev.vercel.app/'} isExternal={true}>

                  Live preview
              </Link>
          </Button>
          <Link _hover={{textDecoration:'none'}} href={'https://github.com/waheed-dev/Weather-app'} isExternal={true}>
          <AiFillGithub size={"40"} />
          </Link>
        </Box>
      </MotionBox>
    </Box>
  );
};
export default Weather