import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { fetchClubById } from '../../lib/api';
import ClubPageNavbar from './ClubPageNavbar';

interface Club {
    id: string;
    name: string;
    country: string;
    value: number;
    image: string;
    european_titles?: number;
}

const ClubPage = () => {
    const { clubId } = useParams<{ clubId: string }>();
    const [club, setClub] = useState<Club | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getClub = async () => {
            try {
                setLoading(true);
                console.log('fetching with id:', clubId);
                if (clubId) {
                  const clubData = await fetchClubById(clubId);
                  if (clubData) setClub(clubData);
                }
            } catch (error) {
                setError('Failed to fetch club data');
            } finally {
                setLoading(false);
            }
        };
        getClub();
    }, [clubId]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    if (!club) {
        return <Typography variant="h6">Club not found</Typography>;
    }

    return (
        <Box>
            <ClubPageNavbar clubName={club.name}/>
            <Box style={{ padding: '1rem', backgroundColor: '#333', color: '#fff' }}>
                <Box style={{ textAlign: 'center' }}>
                    <img src={club.image} alt={club.name} style={{ width: '200px', margin: '1rem auto' }} />
                </Box>
                <Typography variant="h5">{club.country}</Typography>
            </Box>
            <Box style={{ padding: '1rem' }}>
                <Typography variant="body1">
                    Der Club <strong>{club.name}</strong> aus {club.country} hat einen Wert von <strong>{club.value} Millionen Euro</strong>.
                </Typography>
                {/* {club.european_titles !== undefined && (
                    <Typography variant="body1">
                        {`Der Club ${club.name} hat so far ${club.european_titles} victories at European level.`}
                    </Typography>
                )} */}
            </Box>
            
        </Box>
    );
};

export default ClubPage;
