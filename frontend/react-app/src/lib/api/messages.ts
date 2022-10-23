import client, { auth } from "lib/api/client"
import { Message } from "interfaces"

export const createMessage = (data: Message) => {
  return client.post("messages", data, auth)
}