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
  profile: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
  createdAt?: Date
  updateAt?: Date
}

export interface Post {
  id: string
  content: string
  images: Image[]
  user: {
    id: number | string
    name: string
    email: string
  }
  createdAt? : any
}


export interface Image {
  url: string
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
export interface UpdateUserData {
  id?: number | undefined | null
  name?: string
  profile?: string
}

export interface UpdateUserFormData extends FormData {
  append(name: keyof UpdateUserData, value: String | Blob, fileName?: string): any
}

export interface ChatRoom {
  chatRoom: {
    id: number
  }
  otherUser: User
  lastMessage: Message
}

export interface Message {
  chatRoomId: number
  userId: number | undefined
  content: string
  createAt?: Date
}

export interface ChatRoomUser {
  userId: number | undefined
}
export interface UserId {
  userId: number | undefined
}

export interface UserIdJson {
  [key: string]: UserId
}