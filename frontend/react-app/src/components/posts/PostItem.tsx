import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardContent, CardActions, IconButton, Typography, Divider} from "@mui/material"


import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import Avatar from "boring-avatars"

import { AuthContext } from "App"

import { Post, Image } from "interfaces"
import { deletePost } from "lib/api/posts"

import { createLike, deleteLike } from "lib/api/likes"

import { formatDistance, format } from "date-fns"
import { ja } from "date-fns/locale"

import Comments from "components/comments/Comments"
import CarouselImage from "components/posts/CarouselImage"
import Header from "components/posts/Header"


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
  const value = post.likes.some(like => like.userId === currentUser?.id)
  const islikeId = value ? post.likes.find(like => like.userId === currentUser?.id)?.id : false
  const [liked, setLiked] = useState<boolean>(value)
  const [likeId, setLikeId] = useState(islikeId)
  const [likeCount, setLikeCount] =useState<number>(post.likes.length)
  // console.log(likeCount)

  const handleDeletePost = async(id: string) => {
    await deletePost(id)
    .then(() => {
      handleGetPosts()
    })
  }
  // console.log(post.id)

  const handleCreateLikeSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const data: any = {
        postId: post.id
      }
      const res = await createLike(data)
      if (res.status === 200) {
        handleGetPosts()
        setLiked(true)
        setLikeCount((prev) => prev + 1)
        const last = res.data.post.likes.slice(-1)[0]
        setLikeId(last.id)
      } else {
        console.log("Could not create")
      }
    } catch(err) {
      console.log(err)
    }
  }

  const handleDeleteLikeSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await deleteLike(likeId)
      if (res.status === 200) {
        handleGetPosts()
        setLiked(false)
        setLikeCount((prev) => prev - 1)
        console.log(res)
      } else {
        console.log("Could not delete Like")
      }
    } catch(err) {
      console.log(err)
    }
  }
  return(
    <>
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
          </Typography>
          <CarouselImage post={post} />
        </CardContent>
        <CardActions disableSpacing>
          { liked ? (
              <IconButton onClick={handleDeleteLikeSubmit}>
                <FavoriteIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleCreateLikeSubmit}>
                <FavoriteBorderIcon />
              </IconButton>
            )
          } {likeCount}
            <Comments post={post} currentUser={currentUser}/>
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