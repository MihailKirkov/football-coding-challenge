import * as React from "react";
import AllClubsNavbar from "./AllClubsNavbar";
import ClubRow from "./ClubRow";
import { fetchClubsData } from "../../lib/api";
import { useGeneralStore } from "../../stores/generalStore";
import { t } from "../../i18n/util";
import { Typography } from "@mui/material";


interface Club {
    id: string;
    name: string;
    country: string;
    value: number;
    image: string;
    european_titles?: number;
}


export const AllClubsPage = () => {
    const [error, setError] = React.useState<string>();
    const [clubs, setClubs] = React.useState<Club[]>();
    const [currentSort, setCurrentSort] = React.useState<"name" | "value">(() => {
        return localStorage.getItem("currentSort") as "name" | "value" || "name";
    });

    const setIsLoading = useGeneralStore((state) => state.setIsLoading);

    const handleSort = () => {
        if (clubs) {
            switch (currentSort) {
                case "name": 
                    const sortedByName = [...clubs].sort((a, b) => a.name.localeCompare(b.name));
                    setClubs(sortedByName);
                    break;
                case "value":
                    const sortedByValue = [...clubs].sort((a, b) => a.value - b.value);
                    setClubs(sortedByValue);
                    break;
                default:
                    // Default to sorting by name
                    const defaultSorted = [...clubs].sort((a, b) => a.name.localeCompare(b.name));
                    setClubs(defaultSorted);
                    break;
            }
        }

    };
    
    const changeSortType = () => {
        setCurrentSort((prevSort) => {
            const newSort = prevSort === "name" ? "value" : "name";
            localStorage.setItem("currentSort", newSort);
            return newSort;
        });
    }
    
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await fetchClubsData();
            setClubs(data);
            // console.log('data', data);
        } catch (error) {
            console.error('Fetching clubs data failed:', error);
            setError(t("error.fetching_clubs"));
        }
        setIsLoading(false);
    };

    React.useEffect(() => {
        fetchData();
    }, [])

    React.useEffect(() => {
        if (clubs && clubs?.length > 0) handleSort();
    }, [currentSort])

    if (error) {
        return <Typography variant="h3" color="error">{error}</Typography>;
    }

    return (
        <main
        style={{
            margin:0,
            padding:0,
            width:'100%',
        }}
        >
            <AllClubsNavbar onSortClick={changeSortType}/>
            {clubs && clubs?.length > 0 &&
            <div style={{width:'100%', display:'flex', flexDirection:'column'}}>
                {clubs.map((club, index) => (
                    <ClubRow key={index} club={club}/>
                ))}
            </div>
            }
        </main>
    );
};
