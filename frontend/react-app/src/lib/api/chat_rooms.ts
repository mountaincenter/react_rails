import client, { auth } from "lib/api/client"
import Cookies from "js-cookie"
import { ChatRoomUser } from "interfaces"

export const getChatRooms = () => {
  return client.get("chat_rooms", auth)
}

export const getChatRoom = (id: number | undefined) => {
  return client.get(`chat_rooms/${id}`, auth)
}

// export const createChatRoom = () => {
//   return client.post("chat_rooms", { headers: {
//     "access-token": Cookies.get("_access_token") || "",
//     "client": Cookies.get("_client") || "",
//     "uid": Cookies.get("_uid") || ""
//   }})
// }

export const createChatRoom = (data: ChatRoomUser) => {
  return client.post("chat_rooms", data, auth)
}
