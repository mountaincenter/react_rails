import React from "react"

type Props = {
  data: string
}

const Home:React.FC<Props> = ({data}) => {
  return(
    <>{data} page</>
  )
}

export default Home