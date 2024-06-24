import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { BASE_NAME, DEBUG_PUBLIC_DASHBOARD, LOADING_INDICATOR_DELAY_MS } from "../../../config";
import { IDebugTab, useDebugStore } from "../../../stores/debugStore";
import { useGeneralStore } from "../../../stores/generalStore";
import { AllClubsPage } from "../../allclubspage/AllClubsPage";
import { DashboardRoutes } from "../../dashboard/router/DashboardRoutes";
import { DashboardSite } from "../../dashboard/sites/DashboardSite";
import { Debug } from "../../debug/Debug";
import { DebugButton } from "../../debug/DebugButton";
import { NotFoundSite } from "../../shared/sites/NotFoundSite";
import { ErrorToast } from "../../ui/ErrorToast";
import { LoadingOverlay } from "../../ui/LoadingOverlay";
import { BaseRoutes } from "./BaseRoutes";
import { NoAuthOnlyRoute } from "./NoAuthOnlyRoute";
import { PrivateRoute } from "./PrivateRoute";
import { RoutingManager } from "./RoutingManager";
import ScrollToTop from "./ScrollToTop";
import { useQueryParams } from "../../../hooks/useQueryParams";

import ClubPage from "../../clubpage/ClubPage";

export const AppRouter = () => {
    const isLoading = useGeneralStore((state) => state.isLoading);
    const debugEnabled = useDebugStore((state) => state.enabled);
    const debugDialogOpen = useDebugStore((state) => state.dialogOpen);
    const reactQueryDevtoolsEnabled = useDebugStore((state) => state.reactQueryDevtoolsEnabled);
    const { debugTab } = useQueryParams<{ debugTab?: IDebugTab }>();

    return (
        <>
            <BrowserRouter basename={BASE_NAME || "/"}>
                <ScrollToTop />
                <RoutingManager>

                    <Routes>
                        <Route path={BaseRoutes.ROOT} element={<NoAuthOnlyRoute />}>
                            <Route index element={<AllClubsPage />} />
                        </Route>

                        {/* PrivateRoute for Dashboard */}
                        <Route element={DEBUG_PUBLIC_DASHBOARD ? <Outlet /> : <PrivateRoute />}>
                            <Route path={DashboardRoutes.ROOT} element={<DashboardSite />} />
                        </Route>

                        {/* Route for /:clubIndex */}
                        <Route path="detailsview/:clubId" element={<ClubPage />}>
                        </Route>

                        {/* Fallback route for 404 Not Found */}
                        <Route path="*" element={<NotFoundSite />} />
                    </Routes>
                </RoutingManager>

                {/* Render debug components if enabled */}
                {debugEnabled && (
                    <>
                        {(debugDialogOpen || !!debugTab) && <Debug debugTab={debugTab} />}
                        <DebugButton />
                        {reactQueryDevtoolsEnabled && <ReactQueryDevtools initialIsOpen={false} />}
                    </>
                )}
            </BrowserRouter>

            {isLoading && <LoadingOverlay delayMs={LOADING_INDICATOR_DELAY_MS} />}

            <ErrorToast />
        </>
    );
};
