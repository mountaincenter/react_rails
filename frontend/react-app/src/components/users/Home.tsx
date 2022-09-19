import React, { useContext } from "react"
import { AuthContext } from "App"

const UserHome = () => {
  const { isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext)
  console.log(currentUser)
  return(
    <>
      <p>{currentUser?.name}</p>
    </>
  )
}

export default UserHome