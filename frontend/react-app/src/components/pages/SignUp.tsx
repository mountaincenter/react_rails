import React from "react"

type Props = {
  data: string
}

const SignUp:React.FC<Props> = ({data}) => {
  return(
    <>{data} page</>
  )
}

export default SignUp