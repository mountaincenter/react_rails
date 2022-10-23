import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from "App"
import { Grid, List, ListItem, ListItemAvatar, ListItemText, Typography, Divider } from "@mui/material"
import { Link } from "react-router-dom"
import { getChatRoom, getChatRooms } from "lib/api/chat_rooms"
import UserItem from "components/users/UserItem"
import { ChatRoom } from "interfaces"
import Avatar from "boring-avatars"

const rootStyle = {
  flexGrow: 1,
  minWidth: 340,
  maxWidth: "100%"
}

const ChatRooms: React.FC = () => {
  const {currentUser} = useContext(AuthContext)
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const handleGetChatRooms = async() => {
    try {
      const res = await getChatRooms()
      if(res.status === 200) {
        setChatRooms(res.data.chatRooms)
      } else {
        console.log("No chat rooms")
      }
    } catch(err) {
      console.log(err)
    }
  }
  useEffect(() => {
    handleGetChatRooms()
  }, [])

  return(
    <>
      {
        chatRooms.length > 0 ? (
          chatRooms.map((chatRoom: ChatRoom, index: number) => {
            return(
              <Grid container key={index} justifyContent="center">
                <List>
                  <Link to={`/chat_rooms/${chatRoom.chatRoom?.id}`} style={{ textDecoration: "none", color: "inherit"}}>
                    <div style={{ ...rootStyle }}>
                      <ListItem alignItems="flex-start" sx={{ padding: 0 }}>
                        <ListItemAvatar>
                          <Avatar
                            name={chatRoom.otherUser.name}
                            variant="beam"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={chatRoom.otherUser?.name}
                          secondary= {
                            <div style={{ marginTop: "0.5rem" }}>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textSecondary"
                              >
                                {chatRoom.lastMessage === null ? "まだメッセージはありません" : chatRoom.lastMessage.content.length > 30 ? chatRoom.lastMessage.content.substring(0, 30) + "..." : chatRoom.lastMessage.content }
                              </Typography>
                            </div>
                          }
                        />
                      </ListItem>
                    </div>
                  </Link>
                  <Divider component="li" />
                </List>
              </Grid>
            )
          })
        ) : (
          <></>
        )
      }
    </>
  )
}

export default ChatRooms