// import { Button } from "@mui/material";
import axios, { AxiosError } from "axios";
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
import Navbar from "./Navbar";
import ClubRow from "./ClubRow";

// interface ILoginValues {
//     email: string;
//     password: string;
// }

export const AllClubsPage = () => {
    // const [error, setError] = React.useState<string>();
    const [clubs, setClubs] = React.useState<[]>();
    const [currentSort, setCurrentSort] = React.useState<"name" | "test">("name");
    // const pushRoute = usePushRoute();

    const isRehydrated = useAuthStore.persist.hasHydrated();

    // const loginMutation = useLogin();

    // const setIsLoading = useGeneralStore((state) => state.setIsLoading);

    const handleSort = () => {
        switch (currentSort) {
            case "name": 
                console.log('sort by name')
                break;
            case "test":
                console.log('sort by smth else')
                break;
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
        switch (currentSort) {
            case "name": 
                setCurrentSort('test')
                break;
            case "test":
                setCurrentSort('name');
                break;
            default:
                setCurrentSort('name');
                break;
        }
    }

    const fetchData = async () => {
        try {
            const url =  import.meta.env.VITE_API_BASE_URL + '/hiring/clubs.json';
            const res = await axios.get(url);
            console.log('data:',res?.data)
            setClubs(res?.data);
        } catch (error) {
            console.error('error:' ,error);
            if (error instanceof AxiosError) {
                // setError(`${t("screen.login.error_during_login")}: ${error.response?.status}`);
            }
        }
    }

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
