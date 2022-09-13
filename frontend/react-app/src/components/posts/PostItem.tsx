import React, { useState } from "react"

import { Post } from "interfaces"
import { deletePost } from "lib/api/posts"

const CardStyles = {
  width: 320,
  marginTop: "2rem",
  trantision: "all 0.3s",
  "&:hover": {
    boxShadow:
      "1px 0px 20px -1px rgba(0,0,0,0.2), 0px 0px 20px 5px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
      transform: "translateY(-3px)"
  }
}

interface PostItemProps {
  post: Post
  handleGetPosts: Function
}

const PostItem = ({post, handleGetPosts}: PostItemProps) => {
  return(
    <>PostItem</>
  )
}

export default PostItem