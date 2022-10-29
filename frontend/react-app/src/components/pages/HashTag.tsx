import React, { useState, useEffect} from "react"
import { getHashtag } from "lib/api/hashtags"
import { useParams } from "react-router-dom"
import PostItem from "components/posts/PostItem"

const HashTag = () => {
  const [hashPosts, setHashPosts] = useState([])
  const  hashName  = useParams()
  console.log(hashName)

  const handleGetHashtag = async() => {
    const res = await getHashtag(hashName.hashName)
    console.log(res.data)
    setHashPosts(res.data.posts)
  }
  useEffect(() => {
    handleGetHashtag()
  },[])
  return(
    <>
      test{hashName.hashName}
      {hashPosts.map((hashPost, index) => {
        return(
          <PostItem
            key={index}
            post={hashPost}
            handleGetPosts={handleGetHashtag}
          />
        )
      })}
    </>
  )
}

export default HashTag