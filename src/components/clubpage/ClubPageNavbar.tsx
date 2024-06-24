import { ArrowBack } from "@mui/icons-material"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"

interface ClubPageNavbarProps {
    clubName: string;
}

const ClubPageNavbar = ( props: ClubPageNavbarProps  ) => {
    const { clubName } = props;
  return (
    <AppBar position="static" style={{ backgroundColor: '#01C13B', color:'white' }}>
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="back" component={Link} to="/">
                <ArrowBack />
            </IconButton>
            <Typography variant="h6">
                {clubName}
            </Typography>
        </Toolbar>
    </AppBar>
  )
}

export default ClubPageNavbar