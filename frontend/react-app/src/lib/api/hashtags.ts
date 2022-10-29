import client from "lib/api/client"

export const getHashtag = (hashName: string | undefined) => {
  return client.get(`/post/hashtag/${hashName}`)
}