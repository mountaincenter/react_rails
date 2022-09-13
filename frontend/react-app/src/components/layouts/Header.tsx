import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { signOut } from "lib/api/auth"
// import { AuthContext } from "App"
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"


const Header: React.FC = () => {
  const AuthButtons:any = () => {
    return (
      <>
        <Button
          component={Link}
          to="/signin"
          color="inherit"
          sx={{ textTransform: "none" }}
        >
          Sign in
        </Button>
        <Button
          component={Link}
          to="/signup"
          color="inherit"
          sx={{ textTransform: "none" }}
        >
          Sign up
        </Button>
      </>
    )
  }
  return(
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            sx={{ marginRight: 2}}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit"}}
          >
            Sample
          </Typography>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header