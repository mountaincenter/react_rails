import React, { useContext } from "react"
import { AuthContext } from "App"
import { Link } from "react-router-dom"
import PostList from "components/posts/PostList"
import UserHome from "components/users/Home"
import Comments from "components/comments/Comments"
const LinkStyle = {
  textDecoration: "none",
}

const Home: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)
  return(
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <UserHome />
            <PostList />
          </>
        ) : (
          <>
            <h1>Not signed in</h1>
          </>
        )
      }
    </>
  )
}

export default Home