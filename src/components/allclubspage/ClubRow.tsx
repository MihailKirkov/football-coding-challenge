import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { t } from "../../i18n/util"; 

interface Club {
    id: string;
    name: string;
    country: string;
    value: number;
    image: string;
    european_titles?: number;
}

interface clubRowProps {
    club: Club;
}

const ClubRow = (props: clubRowProps) => {
    const { club } = props;
    return (
        <Box style={{
            maxWidth:'100%',
            height:'6rem',
            borderBottom:'1px solid lightgray',
            margin:0,
            padding:24, 
            display:'flex',
            gap:24,
            alignItems:'center',
            justifyContent:'flex-start'
        }}>
            <img src={club.image} alt={club.name} style={{
                height:'100%', width:'50px'
            }} />
            <Box className=''>
                    <Typography variant="h6" fontWeight={600}>
                        <Link to={`/detailsview/${club.id}`} style={{textDecoration:'none', color:'inherit'}}>
                            {club.name || t("error.unknownName")}
                        </Link>
                    </Typography>
                <Typography variant="body1" className=''>
                    <strong>{club?.country || t("error.unknownCountry")}</strong> ${club?.value || t("error.unknownValue")}  { t("club.value")}
                </Typography>
            </Box>
        </Box>
    )
}

export default ClubRow