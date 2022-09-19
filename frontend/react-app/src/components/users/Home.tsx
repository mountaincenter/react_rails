import React, { useContext, useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "App"
import { Grid, Card, CardContent, CardActions, TextField, IconButton, Button, Typography, Divider, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings'
import Avatar from "boring-avatars"
import { UpdateUserFormData } from "interfaces"
import { updateUser } from "lib/api/users"

const UserHome = () => {
  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [editFormOpen, setEditFormOpen] = useState<boolean>(false)
  const [name, setName] = useState<string | undefined>(currentUser?.name)
  const [profile, setProfile ] = useState<string | undefined>(currentUser?.profile)
  console.log(currentUser)

  const createFormData = (): UpdateUserFormData => {
    const formData = new FormData()
    formData.append("name", name || "")
    formData.append("profile", profile || "")
    return formData
  }

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
      { isSignedIn && currentUser ? (
        <>
          <Card sx={{ width: 340 }}>
            <CardContent>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <IconButton
                    onClick={() => setEditFormOpen(true)}
                  >
                    <SettingsIcon
                      color="action"
                      fontSize="small"
                    />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-start">
                <Grid item>
                  <Avatar
                    name={currentUser.name}
                    variant="beam"
                  />
                </Grid>
                <Grid item sx={{ marginLeft: "1rem", marginTop: "0.5rem"}}>
                  <Typography
                    variant="body1"
                    component="p"
                    gutterBottom
                  >
                    {currentUser?.name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-start">
                <Grid item sx={{ marginTop: "1.5rem"}}>
                  <Divider/>
                  <Typography
                    variant="body2"
                    component="p"
                    gutterBottom
                    sx={{ marginTop:"0.5rem", fontWeight: "bold"}}
                  >
                    自己紹介
                  </Typography>
                  { currentUser.profile !== null ? (
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
                </Grid>
              </Grid>
            </CardContent>
          </Card>
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
        ): <></>
      }
    </>
  )
}

export default UserHome