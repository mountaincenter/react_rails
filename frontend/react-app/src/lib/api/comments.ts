import { ClientRequest } from "http"
import client, { auth } from "lib/api/client"

export const getComments = (id: number | string | undefined ) => {
  return client.get(`comments/${id}`, auth)
}

export const createComment = (data: any) => {
  return client.post("comments", data, auth)
}