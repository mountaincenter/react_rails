import React from "react"

type Props = {
  data: string
}

const SignIn:React.FC<Props> = ({data}) => {
  return(
    <>{data} page</>
  )
}

export default SignIn