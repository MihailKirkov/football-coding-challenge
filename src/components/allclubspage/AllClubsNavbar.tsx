import SortIcon from '@mui/icons-material/Sort';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { t } from "../../i18n/util"; 

interface navbarProps {
    onSortClick: () => void;
}

const AllClubsNavbar = (props: navbarProps) => {
    const {onSortClick} = props;


    return (
        <Box sx={{ position:'sticky', height:'6dvh' }}>
        <AppBar sx={{ backgroundColor: '#01C13B', color:'white' }}>
            <Toolbar sx={{display: 'flex', justifyContent:'space-between'}}>
                <Typography variant='h6'>
                {t("app.navbarTitle")}
                </Typography>

                <IconButton style={{color:'inherit'}}>
                    <SortIcon onClick={onSortClick} style={{cursor:'pointer'}}/>
                </IconButton>
            </Toolbar>
        </AppBar>
        </Box>
        
    )
}

export default AllClubsNavbar