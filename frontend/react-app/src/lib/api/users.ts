import client, { auth } from "lib/api/client"
import { UpdateUserData } from "interfaces"
import Cookies from "js-cookie"

export const getUsers = () => {
  return client.get("users", auth)
}

export const getUser = (id: number | undefined) => {
  return client.get(`users/${id}`, auth)
}

export const updateUser = (id: number | undefined | null, data: UpdateUserData) => {
  return client.put(`users/${id}`, data)
}

export const getFollowingUsers = (id: number | undefined) => {
  return client.get(`users/${id}/following`, auth)
}
export const getFollowersUsers = (id: number | undefined) => {
  return client.get(`users/${id}/followers`, auth)
}