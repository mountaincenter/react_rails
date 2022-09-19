import client from "lib/api/client"
import { UpdateUserData } from "interfaces"


export const getUser = (id: number | undefined) => {
  return client.get(`users/${id}`)
}

export const updateUser = (id: number | undefined | null, data: UpdateUserData) => {
  return client.put(`users/${id}`, data)
}