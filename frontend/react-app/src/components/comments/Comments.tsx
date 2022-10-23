import React, { useState, useEffect } from "react"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography  } from "@mui/material"

  import { FixedSizeList, ListChildComponentProps } from 'react-window';
import CarouselImage from "components/posts/CarouselImage"

import FavoriteIcon from '@mui/icons-material/Favorite'

import CommentIcon from '@mui/icons-material/Comment'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SendIcon from '@mui/icons-material/Send'

import Avatar from "boring-avatars"

import { Post, User} from "interfaces"
import { createComment, getComments } from "lib/api/comments"


interface PostProps {
  post: Post
  currentUser: User | undefined
}

const Comments = ({post, currentUser}: PostProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [comments, setComments] = useState<any[]>([])
  const [content, setContent] = useState<string>("")
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleGetComments = async() => {
    try {
      const res = await getComments(post.id)
      if (res.status === 200) {
        setComments(res.data.comments)
      } else {
        console.log("No comments")
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleGetComments()
  }, [])


  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const data: any = {
      userId: currentUser?.id,
      postId: post.id,
      content: content
    }

    try {
      const res = await createComment(data)
      console.log(res)
      if (res.status === 200) {
        console.log(res.data)
        setComments([...comments, res.data.comment])
      } else {
        console.log("Could not create Comment.")
      }
    } catch(err) {
      console.log(err)
    }
  }
  const CommentList = () => {
    const renderRow = (props: ListChildComponentProps) => {
      const { index, style } = props
      return(
        <>
          <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemAvatar>
              <Avatar
                name={comments[index].user.name}
                variant="beam"
              />
            </ListItemAvatar>
            <ListItemText primary={comments[index].user.name} secondary={comments[index].content}/>
          </ListItem>
        </>
      )
    }
    return(
      <>
        <FixedSizeList
          height={500}
          width={400}
          itemCount={comments.length}
          itemSize={60}
        >
          {renderRow}
        </FixedSizeList>
      </>
    )
  }
  return(
    <>
      <IconButton onClick={handleOpen}>
        <CommentIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"md"}
        scroll={"body"}
      >
        <DialogContent sx={{ padding: 0 }} >
          <Card sx={{ width: 900, height:800, paddingTop: "2rem" }}>
            <Grid container alignItems="center">
              <Grid item xs={6} >
                <CarouselImage post={post}/>
              </Grid>
              <Grid item xs={6}>
                <CardHeader
                  avatar = {
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
                  title={post.user.name}
                  subheader={post.content}
                />
                <Divider />
                <CardContent sx={{ height: 500 }}>
                  <CommentList />
                </CardContent>
                <Divider />
                <CardActions>
                  <IconButton>
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
                <Divider />
                  <CardContent>
                    <form action="">
                      <Grid container>
                        <Grid item xs={10}>
                          <TextField
                            multiline
                            label="コメントを追加"
                            variant="standard"
                            value={content}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
                            sx={{ padding: 0, width:"100%" }}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            variant="contained"
                            color="primary"
                            disabled={!content || content.length > 140 ? true : false}
                            sx={{ marginLeft: "0.5rem" }}
                            onClick={handleSubmit}
                          >
                            <SendIcon />
                          </Button>
                        </Grid>
                      </Grid>
                  </form>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Comments