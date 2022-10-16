import React, { useState, useEffect, useContext } from "react"

import { Card, CardHeader, CardContent, Divider, Typography, Chip, IconButton } from "@mui/material"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AddIcon from '@mui/icons-material/Add';

import { Link } from "react-router-dom"
import { User, UserIdJson, ChatRoomUser,  ChatRoom as ChatRoomInterface } from "interfaces"
import { getUser } from "lib/api/users"
import { getChatRooms, createChatRoom } from "lib/api/chat_rooms"

import { AuthContext } from "App";

import Avatar from "boring-avatars"
import ChatRoom from "components/pages/ChatRoom";
import ChatRooms from "components/pages/ChatRooms";

const UserItem = ({userId}: { userId: number}) => {
  const { currentUser } = useContext(AuthContext)
  const [user, setUser] = useState<User>()
  const [isRoom, setIsRoom] = useState<boolean>(false)
  const [chatRooms, setChatRooms] = useState<ChatRoomInterface[]>([])
  const handleGetUser = async() => {
    try {
      const res = await getUser(userId)
      if (res.status === 200) {
        setUser(res.data.user)
        setIsRoom(res.data.isRoom)
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
  return(
    <>
      {user ? (
        <>
          <Card sx={{ width: 340 }}>
            <CardHeader
              avatar={
                <Avatar
                  name={user.name}
                  variant="beam"
                />
              }
              action={
                <>
                  { isRoom ? (
                    <>
                      {chatRooms.map((chatRoom, index) => {
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
                  <Chip label="フォロー" />
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