import React, { useEffect, useState, createContext } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import CommonLayout from "components/layouts/CommonLayout"
import { User } from "interfaces"
import Home from "components/pages/Home"
import SignIn from "components/pages/SignIn"
import SignUp from "components/pages/SignUp"
import { getCurrentUser } from "lib/api/auth"

import PostList from "components/posts/PostList"
import CommentList from "components/comment/Comment"

export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)

        console.log(res?.data.data)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  const Private = ({ children }: { children: React.ReactElement}) => {
    if(!loading) {
      if(isSignedIn) {
        return children
      } else {
        return <Navigate to="/signin" replace />
      }
    } else {
      return <></>
    }
  }

  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
          <CommonLayout>
            <Routes>
              <Route path="/" element={<Private children={<Home />} />}/>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/posts" element={<PostList />} />
              <Route path="/map" element={<CommentList />} />
            </Routes>
          </CommonLayout>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App