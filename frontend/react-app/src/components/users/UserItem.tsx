import React, { useState, useEffect } from "react"

import { Card, CardHeader, CardContent, Divider, Typography, Button, IconButton } from "@mui/material"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AddIcon from '@mui/icons-material/Add';

import { Link } from "react-router-dom"

import { User, ChatRoom as ChatRoomInterface } from "interfaces"

import { getUser } from "lib/api/users"
import { getChatRooms, createChatRoom } from "lib/api/chat_rooms"
import { deleteFollow, createFollow } from "lib/api/relationships";

import Avatar from "boring-avatars"

const UserItem = ({userId}: { userId: number}) => {
  const [user, setUser] = useState<User>()
  const [isRoom, setIsRoom] = useState<boolean>(false)
  const [isFollowing, setIsFollowing] = useState<boolean>(false)

  const [following, setFollowing] = useState<User[]>([])
  const [followers, setFollowers] = useState<User[]>([])

  const [chatRooms, setChatRooms] = useState<ChatRoomInterface[]>([])

  const handleGetUser = async() => {
    try {
      const res = await getUser(userId)
      if (res.status === 200) {
        setUser(res.data.user)
        setIsRoom(res.data.isRoom)
        setIsFollowing(res.data.isFollowing)
        setFollowing(res.data.following)
        setFollowers(res.data.followers)
        // console.log(res.data)
      } else {
        console.log("No user")
      }
    } catch(err) {
      console.log(err)
    }
  }
  const handleGetChatRooms = async() => {
    try {
      const res = await getChatRooms()
      if(res.status === 200) {
        setChatRooms(res.data.chatRooms)
      } else {
        console.log("No ChatRooms")
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleGetUser()
    handleGetChatRooms()
  }, [])

  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const data: any = {
      userId: userId
    }
    try {
      const res = await createChatRoom(data)
      if(res.status === 200) {
        console.log(res)
        setIsRoom(true)
      }
    } catch(err) {
      console.log(err)
    }
  }

  const handleCreateSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const data: any = {
        followedId: userId
      }
      const res = await createFollow(data)
      if (res.status === 200) {
        setIsFollowing(true)
        setFollowers(res.data.followers)
        // console.log(res)
      } else {
        console.log("Could not create.")
      }
    } catch(err) {
      console.log(err)
    }
  }

  const handleDeleteSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await deleteFollow(userId)
      if(res.status === 200) {
        setIsFollowing(false)
        setFollowers(res.data.followers)
        // console.log(res)
      } else {
        console.log("Could not delete.")
      }
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <>
      {user ? (
        <>
          <Card sx={{ width: 400 }}>
            <CardHeader
              avatar={
                <Avatar
                  name={user.name}
                  variant="beam"
                />
              }
              subheader={
                <>
                  <small>
                    {following.length}フォロー中
                    {followers.length}フォロワー
                  </small>
                </>
              }
              action={
                <>
                  { isRoom ? (
                    <>
                      { chatRooms.map((chatRoom, index) => {
                        return(
                          <>
                            { chatRoom.otherUser.id === userId ?
                              (
                                <Link to={`/chat_rooms/${chatRoom.chatRoom.id}`} >
                                  <IconButton>
                                    <MailOutlineIcon />
                                  </IconButton>
                                </Link>
                              ) : (
                                <></>
                              )
                            }
                          </>
                        )
                      })}
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={handleSubmit}
                      >
                        <AddIcon />
                      </IconButton>
                    </>
                  )}
                  { isFollowing ? (
                      <>
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          onClick={handleDeleteSubmit}
                        >
                          フォロー解除
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={handleCreateSubmit}
                        >
                          フォロー
                        </Button>
                      </>
                  )}
                </>
              }
              title={user.name}
            />
            <Divider />
            <CardContent>
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
              >
                {user.profile}
              </Typography>
            </CardContent>
          </Card>
        </>
      ): <></>}
    </>
  )
}

export default UserItem