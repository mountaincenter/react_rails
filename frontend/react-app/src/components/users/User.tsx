import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "App"
import { getPosts } from "lib/api/posts"
import { getFollowingUsers } from "lib/api/users"
import { Post, User } from "interfaces"
import PostItem from "components/posts/PostItem"
import UserItem from "./UserItem"


const UserShow: React.FC = () => {
  const { currentUser } = useContext(AuthContext)
  const [posts, setPosts] = useState<Post[]>([])
  const [followingUsers, setFollowingUsers] = useState([])
  const handleGetPosts = async() => {
    const {data} = await getPosts()
    setPosts(data.posts)
  }

  const handleGetgetFollowingUsers = async() => {
    const res = await getFollowingUsers(currentUser?.id)
    console.log(res)
  }
  useEffect(() => {
    handleGetPosts()
    handleGetgetFollowingUsers()
  }, [])

  let userId  = useParams()
  let userIdNum = Number(userId.id)


  return(
    <>
      <UserItem
        userId = {userIdNum}
      />
      { posts?.map((post: Post) => {
        return(
          <>
            { post.user.id === userIdNum ? (
              <>
                  <PostItem
                    key={post.id}
                    post={post}
                    handleGetPosts={handleGetPosts}
                    />
                </>
              ): <></>
            }
          </>
        )
      })}
    </>
  )
}

export default UserShow