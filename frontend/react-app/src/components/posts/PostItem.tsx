import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Divider} from "@mui/material"

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import Avatar from "boring-avatars"

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
  const [like, setLike] = useState<boolean>(false)
  const handleDeletePost = async(id: string) => {
    await deletePost(id)
    .then(() => {
      handleGetPosts()
    })
  }
  return(
    <>
      <Card sx={{ ...CardStyles }}>
        <CardHeader
          avatar={
            <Link to="/users">
              <Avatar
                name={post.user.name}
                variant="beam"
              />
            </Link>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Link to="/posts" style={{ textDecoration: "none"}}>
              {post.user.name}
            </Link>
          }
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="span">
            { post.content.split("\n").map((body: string, index: number) => {
                return (
                  <p key={index}>{body}</p>
                )
              })
            }
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={() => like ? setLike(false) : setLike(true)}>
            { like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
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