import { Box, Typography } from "@mui/material";

interface clubRowProps {
    club: any;
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
                height:'100%'
            }} />
            <Box className=''>
                <Typography variant="h6" fontWeight={600} >
                    {club?.name || 'Unknown name'}
                </Typography>
                <Typography variant="body1" className=''>
                    {club?.country || 'Unknown country'} ${club?.value || 'Unknown value'} Millionen Euro
                </Typography>
            </Box>
        </Box>
    )
}

export default ClubRow