import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { fetchClubById } from '../../lib/api';
import ClubPageNavbar from './ClubPageNavbar';
import { t, tHtml } from "../../i18n/util"; 

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
        return <Typography variant="h3" color="error">{error}</Typography>;
    }

    if (!club) {
        return <Typography variant="h3">Club not found</Typography>;
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
                    {/* Der Club <b>{club.name}</b> aus {club.country} hat einen Wert von {club.value} Millionen Euro. */}
                    {tHtml("club.detail.text", {
                        name: club.name || t("error.unknownName"),
                        country: club.country || t("error.unknownCountry"),
                        value: club.value || t("error.unknownValue"),
                    })}
                </Typography>
                
                {club?.european_titles && club?.european_titles > 0 &&
                    <Typography variant="body1">
                        {tHtml("club.detail.european_titles", { name: club.name, europeanTitles: club.european_titles })}
                    </Typography>
                }
            </Box>
        </Box>
    );
};

export default ClubPage;
