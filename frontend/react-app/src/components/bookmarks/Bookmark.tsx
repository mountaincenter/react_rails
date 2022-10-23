import React, { useState } from "react"

import { IconButton } from "@mui/material";

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import { PostProps } from "interfaces"
import { createBookmark, deleteBookmark } from "lib/api/bookmarks";

const Bookmark = ({post, currentUser}: PostProps) => {
  const isbookmarked: boolean = post.bookmarks.some(bookmark => bookmark.userId === currentUser?.id)
  const isbookmarkId = isbookmarked ? post.bookmarks.find(bookmark => bookmark.userId === currentUser?.id)?.id : false

  const [bookmarked, setBookmarked] = useState<boolean>(isbookmarked)
  const [bookmarkId, setBookmarkId] = useState(isbookmarkId)

  const handleCreateSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const data: any = {
        postId: post.id
      }
      const res = await createBookmark(data)
      if (res.status === 200) {
        setBookmarked(true)
        const last = res.data.post.bookmarks.slice(-1)[0]
        setBookmarkId(last.id)
      } else {
        console.log("Could not create")
      }
    } catch(err) {
      console.log(err)
    }
  }

  const handleDeleteSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await deleteBookmark(bookmarkId)
      if (res.status === 200) {
        setBookmarked(false)
        console.log(res)
      } else {
        console.log("Could not delete Bookmark")
      }
    } catch(err) {
      console.log(err)
    }
  }
  return(
    <>
      { bookmarked ? (
          <IconButton onClick={handleDeleteSubmit}>
            <BookmarkIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleCreateSubmit}>
            <BookmarkBorderIcon />
          </IconButton>
        )
      }
    </>
  )
}

export default Bookmark