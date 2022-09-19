import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardContent, Divider, Typography, Chip, IconButton } from "@mui/material"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Link } from "react-router-dom"
import { User } from "interfaces"
import { getUser } from "lib/api/users"

import Avatar from "boring-avatars"

const UserItem = ({userId}: any) => {
  console.log(typeof(userId))
  const [user, setUser] = useState<User>()
  const handleGetUser = async() => {
    const { data } = await getUser(userId)
    setUser(data.user)
    console.log(data.user)
  }
  useEffect(() => {
    handleGetUser()
  }, [])
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
                  <IconButton>
                    <MailOutlineIcon />
                  </IconButton>
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
            </CardContent>s
          </Card>
        </>
      ): <></>}
    </>
  )
}

export default UserItem