import client from "lib/api/client"
import { UpdateUserData } from "interfaces"
import Cookies from "js-cookie"

export const getUsers = () => {
  return client.get("users",{ headers: {
    "access-token": Cookies.get("_access_token") || "",
    "client": Cookies.get("_client") || "",
    "uid": Cookies.get("_uid") || ""
  }})
}

export const getUser = (id: number | undefined) => {
  return client.get(`users/${id}`,{ headers: {
    "access-token": Cookies.get("_access_token") || "",
    "client": Cookies.get("_client") || "",
    "uid": Cookies.get("_uid") || ""
  }})
}

export const updateUser = (id: number | undefined | null, data: UpdateUserData) => {
  return client.put(`users/${id}`, data)
}