import { useContext, useState } from "react"

import { Card, CardContent, CardActions, IconButton, Typography, Divider } from "@mui/material"


import { Link } from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete'

import { AuthContext } from "App"

import { Post } from "interfaces"

import { deletePost } from "lib/api/posts"

import Header from "components/posts/Header"
import CarouselImage from "components/posts/CarouselImage"
import Comments from "components/comments/Comments"
import Like from "components/likes/Like"
import Bookmark from "components/bookmarks/Bookmark"

// import { TextToLink } from "components/utils/Hashtag"

const CardStyles = {
  width: 400,
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
  const { currentUser } = useContext(AuthContext)

  const handleDeletePost = async(id: string) => {
    await deletePost(id)
    .then(() => {
      handleGetPosts()
    })
  }
  const TextToLink = (comment :any) => {
    const regexp_hash = /#+([a-zA-Z0-9亜-熙ぁ-んァ-ヶー-龥朗-鶴.\-_]+)/g;
    let linkedComment = comment.replace(
      regexp_hash,
      '<a href="/search?q=$1&type=hash">#$1</a>'
      // "<Link to=`/hashtag/#{$1}`>#$1</Link>"
      // '#$1'
      )
    return linkedComment
  }
  const text = "create from react #test"
  return(
    <>
      <Typography variant="body2" color="textSecondary">
        {TextToLink(text)}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="span">
            <div
              dangerouslySetInnerHTML={{
                __html: TextToLink(text)
              }}
            />
          </Typography>
      <Card sx={{ ...CardStyles }}>
        <Header post={post} currentUser={currentUser}/>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="span">
            { post.content.split("\n").map((body: string, index: number) => {
                return (
                  <p key={index}>{body}</p>
                )
              })
            }
            {/* {TextToLink(post.content)} */}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="span">
            <div
              dangerouslySetInnerHTML={{
                __html: TextToLink(post.content)
              }}
            />
          </Typography> */}
          <CarouselImage post={post} />
        </CardContent>
        <CardActions disableSpacing>
            <Like post={post} currentUser={currentUser} />
            <Comments post={post} currentUser={currentUser} />
            <Bookmark post={post} currentUser={currentUser}/>
          <IconButton
            sx={{ marginLeft: "auto"}}
            onClick={() => handleDeletePost(post.id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Divider />
    </>
  )
}

export default PostItem