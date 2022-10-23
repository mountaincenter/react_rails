import React, { useState } from "react"

import { IconButton } from "@mui/material"

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

import { PostProps } from "interfaces"
import { createLike, deleteLike } from "lib/api/likes"

const Like = ({post, currentUser}: PostProps) => {

  const isLiked: boolean = post.likes.some(like => like.userId === currentUser?.id)
  const islikeId = isLiked ? post.likes.find(like => like.userId === currentUser?.id)?.id : false

  const [liked, setLiked] = useState<boolean>(isLiked)
  const [likeId, setLikeId] = useState(islikeId)
  const [likeCount, setLikeCount] = useState<number>(post.likesCount)

  const handleCreateSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const data: any = {
        postId: post.id
      }
      const res = await createLike(data)
      if (res.status === 200) {
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

  const handleDeleteSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await deleteLike(likeId)
      if (res.status === 200) {
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
      { liked ? (
          <IconButton onClick={handleDeleteSubmit}>
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleCreateSubmit}>
            <FavoriteBorderIcon />
          </IconButton>
        )
      } {likeCount}
    </>
  )
}

export default Like