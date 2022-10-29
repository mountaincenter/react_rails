import React from "react"
import { useSearchParams } from "react-router-dom"

const Test1 = () => {
  const [searchParams] = useSearchParams()

  return(
    <>
      <ul>
        <li>name1: {searchParams.getAll("name1").join()}</li>
        <li>name2: {searchParams.get("name2")}</li>
        <li>searchParamsから取得した値は{searchParams.get("name3")}です</li>
      </ul>
    </>
  )
}

export default Test1