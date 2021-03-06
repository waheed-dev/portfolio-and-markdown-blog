import { Box, Flex, Grid, Heading, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
import {BlogMeta}  from './Media'
import {BlogMedia} from "./BlogMedia";
import Link from 'next/link'
const PortBlogCard = ({title,excerpt,author,date,category,coverImg,slug}) => {
    return (
        <Link href={`/blog/${slug}`} passhref>
            <Box as="section" _hover={{cursor : 'pointer'}} bg={mode('blackAlpha.200', 'whiteAlpha.200')} borderRadius={'lg'} mt={'12'} py="15">
                <Box
                    maxW={{
                        base: 'xl',
                        md: '7xl'
                    }}
                    mx="auto"
                    px={{
                        base: '6',
                        md: '8',
                    }}
                >
                    <Grid
                        templateColumns={{
                            base: '1fr',
                            md: '1fr 24rem',
                        }}
                        columnGap={{
                            base: '12',
                            lg: '20',
                        }}
                        rowGap="10"
                    >
                        <Flex direction="column" h="full">
                            <Box flex="1">
                                <Heading size="xl" mt={['2','4','6','6']} mb={['6','10','12','20']}>
                                    From the Blog
                                </Heading>
          <BlogMeta type={category} />
                                <Heading fontSize={['2xl','2xl','3xl','3xl']} mt={['1','2','4','4']}  mb="4">
                                    {title}
                                </Heading>
                                <Text fontSize="lg" color={mode('gray.600', 'gray.400')} lineHeight="tall">
                                    {excerpt}
                                </Text>
                            </Box>
                        </Flex>

                        <BlogMedia
                            alt={'cover Iamge'}
                            src={coverImg}
                        />
                    </Grid>
                </Box>
            </Box>
        </Link>

    )
}
export default PortBlogCard