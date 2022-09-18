import React,{ useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {  Container, Grid } from "@mui/material"
import { getPosts } from "lib/api/posts"
import { Post, Image } from "interfaces"
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Divider} from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import Avatar from "boring-avatars"

import Default from "public/images/empty.jpeg"

import { formatDistance, format } from "date-fns"
import { ja } from "date-fns/locale"

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
// interfaces

interface ImageItemProps {
  image: Image
}

interface PostItemProps {
  post: Post
  handleGetPosts: Function
}


const CommentItem = ({post, handleGetPosts}: PostItemProps) => {
  const thumnail: any = post.images[0]
  console.log(thumnail !== undefined)
  const ImageItem = ({ image }: ImageItemProps) => {
    return(
      <>
        <CardMedia
          component="img"
          src={image.url}
          alt="post image"
        />
      </>
    )
  }
  return(
    <>
      <Card sx={{ ...CardStyles}}>
        <CardHeader
          avatar={
            <Avatar
              name={post.user.name}
              variant="beam"
            />
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
          subheader={formatDistance(new Date(), Date.parse(post.createdAt), {locale:ja})}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="span">
            { post.content.split("\n").map((content: string, index: number) => {
                return (
                  <p key={index}>{content}</p>
                )
              })
            }
          </Typography>
          { thumnail !== undefined ? (
            <CardMedia
              component="img"
              src={thumnail.url}
              alt="post image"
            />
          ) : (
            <CardMedia
              component="img"
              src={Default}
              alt="defult"
            />
          )
          }
          { post.images.map((image) => {
            return(
              <ImageItem
                key={image.url}
                image={image}
              />
            )
          })}
        </CardContent>
      </Card>
    </>
  )
}
// List(最終的に残すもの)

const CommentList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const handleGetPosts = async () => {
    const { data } = await getPosts()
    setPosts(data.posts)
  }
  useEffect(() => {
    handleGetPosts()
  }, [])
  return(
    <>
      <Container maxWidth="xl" sx={{ marginTop: "3rem"}}>
        <Grid container direction="row" justifyContent="center">
          <Grid item>
            { posts.map((post: Post) => {
              return(
                <>
                  <CommentItem
                    key={post.id}
                    post={post}
                    handleGetPosts={handleGetPosts}
                  />
                </>
              )
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default CommentList
