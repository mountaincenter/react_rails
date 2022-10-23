import client, { auth } from "lib/api/client"

export const createFollow = (data: number | undefined) => {
  return client.post("/relationships", data, auth)
}

export const deleteFollow = (id: number | undefined) => {
  return client.delete(`/relationships/${id}`, auth)
}