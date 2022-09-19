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
          <Grid container justifyContent="center">
            <Grid item>
              <Avatar
                name={currentUser?.name}
                variant="beam"
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item sx={{ marginTop: "1.5rem"}}>
              <Typography variant="body1" component="p" gutterBottom>
                {currentUser?.name}
              </Typography>
              <Divider style={{ marginTop: "0.5rem"}} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default UserHome