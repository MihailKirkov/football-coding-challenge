// import { Button } from "@mui/material";
// import { Field, Form, Formik } from "formik";
import * as React from "react";
// import * as Yup from "yup";
// import { t } from "../../i18n/util";
// import { useLogin } from "../../network/api/useLogin";
import { useAuthStore } from "../../stores/authStore";
// import { useGeneralStore } from "../../stores/generalStore";
// import { usePushRoute } from "../app/router/history";
// import { DashboardRoutes } from "../dashboard/router/DashboardRoutes";
// import { CustomInputField } from "../ui/CustomInputField";
// import { Colors } from "../util/Colors";
// import { ImageLogo } from "../util/Images";
import Navbar from "./AllClubsNavbar";
import ClubRow from "./ClubRow";
import { fetchClubsData } from "../../lib/api";

// interface ILoginValues {
//     email: string;
//     password: string;
// }

interface Club {
    id: string;
    name: string;
    country: string;
    value: number;
    image: string;
    european_titles?: number;
}


export const AllClubsPage = () => {
    // const [error, setError] = React.useState<string>();
    const [clubs, setClubs] = React.useState<Club[]>();
    const [currentSort, setCurrentSort] = React.useState<"name" | "value">(() => {
        return localStorage.getItem("currentSort") as "name" | "value" || "name";
    });
    // const pushRoute = usePushRoute();

    const isRehydrated = useAuthStore.persist.hasHydrated();

    // const loginMutation = useLogin();

    // const setIsLoading = useGeneralStore((state) => state.setIsLoading);

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
                    // Default to sorting by name if currentSort is undefined or unexpected
                    const defaultSorted = [...clubs].sort((a, b) => a.name.localeCompare(b.name));
                    setClubs(defaultSorted);
                    break;
            }
        }
        // setIsLoading(true);
        // setError("");

        // try {
        //     await loginMutation.mutateAsync({ username: model.email, password: model.password });
        //     pushRoute(DashboardRoutes.ROOT);
        // } catch (error) {
        //     if (error instanceof AxiosError) {
        //         setError(`${t("screen.login.error_during_login")}: ${error.response?.status}`);
        //     }
        // }

        // setIsLoading(false);
    };

    const changeSortType = () => {
        setCurrentSort((prevSort) => {
            const newSort = prevSort === "name" ? "value" : "name";
            localStorage.setItem("currentSort", newSort);
            return newSort;
        });
    }

    const fetchData = async () => {
        try {
            const data = await fetchClubsData();
            setClubs(data);
            console.log('d', data);
        } catch (error) {
            console.error('Fetching clubs data failed:', error);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, [])

    React.useEffect(() => {
        if (clubs && clubs?.length > 0) handleSort();
    }, [currentSort, clubs])

    if (!isRehydrated) {
        return null;
    }

    return (
        <main
        style={{
            margin:0,
            padding:0,
            width:'100vw',
        }}
        >
            <Navbar onSortClick={changeSortType}/>
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
