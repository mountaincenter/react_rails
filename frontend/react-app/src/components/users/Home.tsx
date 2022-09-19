import React, { useContext, useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "App"
import { Grid, Card, CardContent, CardActions, IconButton, Typography, Divider} from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings'
import Avatar from "boring-avatars"

const UserHome = () => {
  const { isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext)
  console.log(currentUser)
  return(
    <>
      { isSignedIn && currentUser ? (
        <Card sx={{ width: 340 }}>
          <CardContent>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <IconButton
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
        </Card> ): <></>
      }
    </>
  )
}

export default UserHome