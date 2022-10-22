import React from "react"
import { CardMedia } from "@mui/material"
import { Image } from "interfaces"

interface ImageItemProps {
  image: Image
}

const ImageItem = ({ image } : ImageItemProps) => {
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

export default ImageItem