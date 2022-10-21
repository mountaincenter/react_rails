import client, { auth } from "lib/api/client"
import { Like } from "interfaces"

export const createLike = (data: string | number | undefined) => {
  return client.post("/likes", data, auth)
}

export const deleteLike = (id: any) => {
  return client.delete(`/likes/${id}`, auth)
}