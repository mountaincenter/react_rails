import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"

const Test2 = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [key, setKey] = useState("")
  const [value, setValue] = useState("")
  const [word, setWord] = useState("")
  const [query, setQuery] = useState([])

  const handleKeyChange = (e: any) => {
    setKey(e.target.value)
  }

  const handleValueChange = (e: any) => {
    setValue(e.target.value)
  }

  const handleWordChange = (e: any) => {
    setWord(e.target.value)
  }

  const handleAppend = (e: any) => {
    if (key === "" || value === "" ) {
      return
    }
    let q = { [key]: value, ...query}
    setQuery(q)
    setSearchParams(q)
  }

  const queries = []
  for (const [name, val] of searchParams.entries()){
    queries.push(name + ": " + val)
  }
  return(
    <>
      <div>
          key <input type="text"  onChange={handleKeyChange}/>
          value <input type="text" onChange={handleValueChange} />
          <button onClick={handleAppend}>追加</button>
          <hr />
          <ul>
            {queries.map((s) => {
              return <li key={s}>{s}</li>
            })}
          </ul>
      </div>
    </>
  )
}

export default Test2