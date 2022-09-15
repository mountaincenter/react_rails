import React,{ useEffect, useState } from "react"
import { Container, Grid } from "@mui/material"
// import PostForm from "./PostForm"
import PostItem from "./PostItem"

import { getPosts } from "lib/api/posts"
import { Post } from "interfaces"

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const handleGetPosts = async () => {
    const {data}  = await getPosts()
    setPosts(data.posts)
    console.log(data.posts)
  }

  useEffect(() => {
    handleGetPosts()
  }, [])

  return(
    <>
      <Container maxWidth="xl" sx={{ marginTop: "3rem"}}>
        <Grid container direction="row" justifyContent="center">
          <Grid item>
            { posts?.map((post: Post) => {
              return(
                <PostItem
                  key={post.id}
                  post={post}
                  handleGetPosts={handleGetPosts}
                />
              )
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default PostList