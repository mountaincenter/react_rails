import React from "react"
import { NumberLiteralType } from "typescript"

interface Comment {
  id: number
  content: string
  images?: Array<{
    url: string
  }>
}

interface Image {
  url: string
}

interface CommentItemProps {
  comment: Comment
}

const comments: Comment[] = [
  {id: 1, content: "test1", images: [{url: "http//localhost:3000" }] },
  {id: 2, content: "test2"}
]

const Comments: (Comment)[] = comments.filter(
  (comment: any): comment is Exclude<typeof comment, undefined > => comment !== undefined
)
console.log(Comments[0].images.length)
// console.log(comments)
// console.log(typeof(comments))
// console.log(typeof(comments[0]))

const CommentList: React.FC = () => {
  return(
    <>
      <p>comment</p><br/>
    </>
  )
}

export default CommentList