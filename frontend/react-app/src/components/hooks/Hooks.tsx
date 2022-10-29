import React, { useState } from "react"
import { Link } from "react-router-dom"

const Hooks = () => {
  return(
    <>
      <div>
        <Link to="test1?name3=1">
          テスト1
        </Link>
        <Link to="test2">
          テスト2
        </Link>
      </div>
      <h1>Test hooks</h1>
    </>
  )
}

export default Hooks