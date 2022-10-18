import React, { useContext,  useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "App"
import { Container, Grid, Card, CardHeader, CardContent, TextField, IconButton, Button, Typography, Divider, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings'
import Avatar from "boring-avatars"
import { UpdateUserFormData, User } from "interfaces"
import { getUser, updateUser, getFollowingUsers, getFollowersUsers } from "lib/api/users"
import { Title } from "@mui/icons-material"

const UserHome = () => {
  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [editFormOpen, setEditFormOpen] = useState<boolean>(false)
  const [name, setName] = useState<string | undefined>(currentUser?.name)
  const [profile, setProfile ] = useState<string | undefined>(currentUser?.profile)
  const [following, setFollowing] = useState<User[]>([])
  const [followers, setFollowers] = useState<User[]>([])


  // とりあえずany型後で変更
  const createFormData = (): any => {
    const formData = new FormData()
    formData.append("name", name || "")
    formData.append("profile", profile || "")
    return formData
  }

  const handleGetFollowingUsers = async() => {
    try{
      const res = await getFollowingUsers(currentUser?.id)
      setFollowing(res.data.users)
      // console.log(res)
    } catch(err) {
      console.log(err)
    }
  }

  const handleGetFollowersUsers = async() => {
    try{
      const res = await getFollowersUsers(currentUser?.id)
      setFollowers(res.data.users)
      // console.log(res)
    } catch(err) {
      console.log(err)
    }
  }
  useEffect(() => {
    handleGetFollowingUsers()
    handleGetFollowersUsers()
  }, [])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const data = createFormData()
    try {
      const res = await updateUser(currentUser?.id, data)
      console.log(res)
      if (res.status === 200) {
        setEditFormOpen(false)
        setCurrentUser(res.data.user)
        console.log("Update user successfully!")
      } else {
        console.log(res.data.message)
      }
    } catch(err) {
      console.log(err)
      console.log("Failed in updating user!")
    }
  }
  return(
    <>
      <Container maxWidth="xl" sx={{ marginTop: "3rem"}}>
        <Grid container direction="row" justifyContent="center">
          <Grid item>
            { isSignedIn && currentUser ? (
              <>
                <Card sx={{ width: 320 }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        name={currentUser.name}
                        variant="beam"
                      />
                    }
                    subheader={
                      <>
                        <small>
                          {following.length}フォロー中 &nbsp;
                          {followers.length}フォロワー
                        </small>
                      </>
                    }
                    title={currentUser.name}
                    action={
                      <IconButton
                        onClick={() => setEditFormOpen(true)}
                      >
                        <SettingsIcon
                          color="action"
                          fontSize="small"
                        />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    { currentUser.profile ? (
                      <Typography
                        variant="body2"
                        component="p"
                        color="textSecondary"
                      >
                        {currentUser.profile}
                      </Typography>
                    ) : (
                      <Typography
                        variant="body2"
                        component="p"
                        color="textSecondary"
                      >
                        よろしくお願いします
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : <></>
            }
          </Grid>
        </Grid>
      </Container>
      <form noValidate autoComplete="">
        <Dialog
          open={editFormOpen}
          keepMounted
          onClose={() => setEditFormOpen(false)}
        >
          <DialogTitle style={{ textAlign:"center"}}>
            プロフィールの変更
          </DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="名前"
              value={name}
              margin="dense"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            <TextField
              placeholder="1000文字以内で書いてください。"
              variant="outlined"
              multiline
              fullWidth
              label="自己紹介"
              rows="8"
              value={profile}
              margin="dense"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setProfile(e.target.value)
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSubmit}
              color="primary"
              disabled={!name || !profile ? true : false}
            >
              送信
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  )
}

export default UserHome