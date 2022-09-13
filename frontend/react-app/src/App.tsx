import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { execTest } from "./lib/api/test"
import CommonLayout from "./components/layouts/CommonLayout"

import Home from "./components/pages/Home"
import SignIn from "./components/pages/SignIn"
import SignUp from "./components/pages/SignUp"


const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <CommonLayout>
          <Routes>
            <Route path="/" element={<Home data="home" />}/>
            <Route path="signin" element={<SignIn data="signIn" />} />
            <Route path="signup" element={<SignUp data="signUp" />} />
          </Routes>
        </CommonLayout>
      </BrowserRouter>
    </>

  )
}

export default App