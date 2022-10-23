import client, { auth } from "lib/api/client"
import { Bookmark } from "interfaces"

export const createBookmark = (data: string | number | undefined) => {
  return client.post("/bookmarks", data, auth)
}

export const deleteBookmark = (id: any) => {
  return client.delete(`/bookmarks/${id}`, auth)
}