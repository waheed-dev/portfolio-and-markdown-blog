import fs from 'fs'
import path from 'path'
import Head from "next/head";
import {Box, Divider} from "@chakra-ui/react";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import matter from "gray-matter";
import {sortByDate} from "../Helpers";
import PortBlogCard from "../components/PortBlogCard";
import PortCta from "../components/PortCta";
import SelfInfo from "../components/SelfInfo";
import Projects from "../components/Projects/Projects";
import Skills from "../components/skills/Skills";
import Testimonials from "../components/testemonials/Testimonials";
import {ContactForm} from "../components/contact-form/ContactForm";

export default function Home({posts}) {
  return (
    <div>
          <html style={{scrollBehavior : 'smooth'}}>
          <Head>
        <title>Waheed-portfolio</title>
              <link rel="shortcut icon" href="favicon.jpg" />
      </Head>
          </html>
      <Box>
          <Box paddingX={['6','10','50','160']} mt={['6','8','10','10']}>
        <Header />

          <PortCta/>
                {posts.map((post) => (
                    <PortBlogCard
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
            <SelfInfo/>
            <Projects/>
            <Skills/>
              <Testimonials/>
              <ContactForm/>
              <Divider mb={['10','10','18','20']}/>
          <Footer/>
        </Box>


        </Box>
    </div>
  );
}

export async function getStaticProps() {
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
    return {
        props: {
            posts: posts.sort(sortByDate).slice(0, 1)
        },
    };
}
