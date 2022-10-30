import React, { useEffect, useState, createContext } from "react"
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import CommonLayout from "components/layouts/CommonLayout"
import { User } from "interfaces"
import Home from "components/pages/Home"
import SignIn from "components/pages/SignIn"
import SignUp from "components/pages/SignUp"
import ChatRooms from "components/pages/ChatRooms"
import ChatRoom from "components/pages/ChatRoom"
import NotFound from "components/pages/NotFound"
import { getCurrentUser } from "lib/api/auth"

import UserHome from "components/users/Home"
import UserShow from "components/users/User"

import HashTag from "components/pages/HashTag"

import Draft from "components/draftjs/Draft"


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
  const [currentUser, setCurrentUser] = useState<User>()

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
              {/* <Route path="/" element={<Draft />}/> */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/users/:id" element={<Private children={<UserShow />} />} />
              <Route path="/chat_rooms" element={<Private children={<ChatRooms />} />} />
              {/* <Route path="/chat_rooms/:id" element={<Private children={<ChatRoom />} />} /> */}
              <Route path="/hashtag/:hashName" element={<Private children={<HashTag/>} />}/>
              <Route path="/hashtag/:hashName" element={<HashTag/>}/>
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </CommonLayout>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App