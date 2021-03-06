import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import {Box, Divider, SimpleGrid} from "@chakra-ui/react";
import Header from "../../../components/header/Header";
import Search from "../../../components/Search";
import PostCard from "../../../components/PostCard";
import { sortByDate } from "../../../Helpers";
import Pagination from "../../../components/Pagination";
import {POST_PER_PAGE} from "../../../config";
import Footer from "../../../components/Footer";
import SearchResults from "../../../components/SearchResult";

export default function Home({ posts,currentPage,numPages }) {
    return (
      <div>
        <Head>
          <title>Blog</title>
          <meta name="Blog"/>
        </Head>
        <Box paddingX={['6','10','50','160']} mt={['6','8','10','10']}>
            <Header />
        </Box>
          <Search />
          <Box paddingX={['8','12','16','20']} mt={"12"}>
            <SimpleGrid columns={['1','1','2','3']} spacing={6}>
              {posts.map((post) => (
                <PostCard
                    key={Math.random()}
                  title={post.postData.title}
                  date={post.postData.date}
                  author={post.postData.author}
                  coverImg={post.postData.cover_image}
                  category={post.postData.category}
                  excerpt={post.postData.excerpt}
                  slug={post.slug}
                />
              ))}
            </SimpleGrid>
            <Box mt={6} mb={'8'}>
              <Pagination currentPage={currentPage} numPages={numPages} />
            </Box>
              <Divider mb={['10','10','18','20']}/>
            <Footer />
          </Box>
      </div>
    );
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join("posts"));
    const pageNum = Math.ceil(files.length / POST_PER_PAGE)
    let paths = []
    for (let i =1;i <= pageNum; i++) {
        paths.push({
            params : {page_index: i.toString()}
        })
    }
    return {
        paths,
        fallback : false
    }
}
export async function getStaticProps({params}) {
    const page = parseInt((params && params.page_index) || 1)
    const files = fs.readdirSync(path.join("posts"));
    const posts = files.map((post) => {
        const slug = post.replace(".md", "");
        const markdownWithMatter = fs.readFileSync(
            path.join("posts", post),
            "utf-8"
        );
        const { data: postData } = matter(markdownWithMatter);
        return {
            slug,
            postData,
        };
    });
    const numPages = Math.ceil(files.length / POST_PER_PAGE)
    const pageIndex = page-1
    const orderPosts =  posts.sort(sortByDate).slice(pageIndex * POST_PER_PAGE,(pageIndex +1)* POST_PER_PAGE)
    return {
        props: {
            posts: orderPosts,
            numPages,
            currentPage : page

        },
    };
}
