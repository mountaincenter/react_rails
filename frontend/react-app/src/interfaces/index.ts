export interface SignUpData {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface SignInData {
  email: string
  password: string
}

export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
  post: {
    id: string
    content: string
    image?: {
      url: string[]
    }
  }
}

export interface Post {
  id: string
  content: string
  images?: ImageApiJson
  user: {
    id: number
    name: string
    email: string
  }
  createdAt? : Date
}


export interface Image {
  url: string | undefined
}
export interface PostApiJson {
  posts: Post[]
}

export interface ImageApiJson{
  images: Image[]
}

export interface UserApiJson {
  users: User[]
}