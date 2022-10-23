import React, { useState, useContext } from "react"
import { CardHeader, IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Avatar from "boring-avatars"
import { PostProps } from "interfaces"
import { formatDistance, format } from "date-fns"
import { ja } from "date-fns/locale"

const Header = ({post, currentUser}: PostProps) => {
  return(
    <>
      <CardHeader
        avatar={
          <Link to={`/users/${post.user.id}`} >
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
          <>
            { post.user.id === currentUser?.id ? (
                <>{post.user.name}</>
              ) : (
                <Link style={{ textDecoration: "none"}} to={`/users/${post.user.id}`}>
                  {post.user.name}
                </Link>
              )
            }
          </>
        }
        subheader={
          formatDistance(
            new Date(),
            Date.parse(post.createdAt), {locale:ja}
          )
        }
      />
    </>
  )
}

export default Header