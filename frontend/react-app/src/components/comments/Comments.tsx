import React, { useState } from "react"
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  CardActions,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField  } from "@mui/material"

import Carousal from "react-material-ui-carousel"

import FavoriteIcon from '@mui/icons-material/Favorite'

import Avatar from "boring-avatars"

import CommentIcon from '@mui/icons-material/Comment'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SendIcon from '@mui/icons-material/Send'

import Default from "public/images/empty.jpeg"



const Comments = ({post, liked, setLiked}: {post: any, liked: boolean, setLiked: Function}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [content, setContent] = useState<string>("")
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const renderRow = (props: any) => {
    const {index, style} = props
    return(
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText
            primary={`Item ${index + 1}`}
            secondary={`Content test${index + 1}`}
          />
        </ListItemButton>
      </ListItem>
    )
  }

  const thumnail: any = post.images[0]
  const ImageItem = ({ image }: {image: any}) => {
    return(
      <>
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
          <Card sx={{ width: 800, height:500, paddingTop: "2rem" }}>
            <Grid container>
              <Grid item xs={6} >
              { post.images.length > 0 ? (
                <></>
              ) : (
                <CardMedia
                  component="img"
                  src={Default}
                  alt="defult"
                />
              )}
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
                />
                <Divider />
                <CardContent sx={{ height: 180 }}>
                  <>
                  </>
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