import {ThemeProvider} from '@emotion/react';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom';
import './App.css';
import LoadingPage from './components/LoadingPage/LoadingPage';
import {ModalError} from './components/Modal';
import {ActivityDetail} from './pages/Activity/ActivityDetail';
import {BreadRunPage} from './pages/breadrun';
import {DeliveryOrders} from './pages/breadrun/Delivery';
import {DeliveryDetail} from './pages/breadrun/Detail/DeliveryDetail';
import {RouteDetail} from './pages/breadrun/Detail/RouteDetail';
import {History} from './pages/breadrun/History';
import {Overview} from './pages/breadrun/Overview';
import {DeliveryRoutes} from './pages/breadrun/Routes';
import {DashboardPage} from './pages/dashboard';
import Error404 from './pages/error/404';
import {Error500} from './pages/error/500';
import Outlets from './routes/dashboard/outlets/page';
import Calendar from './routes/dashboard/calendar/page';
import Home from './routes/dashboard/home/page';
import Notification from './routes/dashboard/notification/page';
import Profile from './routes/dashboard/profile/page';
import Schedule from './routes/dashboard/schedule/page';
import Upcoming from './routes/dashboard/upcoming/page';
import VolunteerOrganisationPage from './routes/dashboard/frontliners/organisation';
import Frontliners from './routes/dashboard/frontliners/page';
import Company from './routes/dashboard/company/page';
import {Forgot, ResetPassword} from './routes/forget/page';
import Login from './routes/login/page';
import {queryClient} from './service/QueryClient';
import useErrorStore from './store/use-error.store';
import useTokenStore from './store/use-token.store';
import {theme} from './themes/ts/theme';

function App() {
  const accessToken = useTokenStore((state) => state.accessToken);
  const errorStore = useErrorStore((state) => state);
  const tokenStore = useTokenStore((state) => state);

  const ProtectedRoute = () => {
    // TODO: will activate after it's being wired
    // if (accessToken === null) {
    //   return <Navigate to='/login' replace />;
    // } else if (tokenStore.isLogin === false) {
    //   return <Navigate to='/login' replace />;
    // }

    return <Outlet />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/forget' element={<Forgot />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/dashboard' element={<DashboardPage />}>
                <Route path='' element={<Navigate to='/dashboard/home' replace />} />
                <Route path='home' element={<Home />} />
                <Route path='company' element={<Company />} />
                <Route path='schedule' element={<Schedule />} />
                <Route path='calendar' element={<Calendar />} />
                <Route path='upload' element={<Schedule />} />
                <Route path='upcoming' element={<Upcoming />} />
                <Route path='upcoming/:idProgramme' element={<ActivityDetail />} />
                <Route path='frontliners' element={<Frontliners />} />
                <Route path='outlet' element={<Outlets />} />
                <Route path='notification' element={<Notification />} />
                <Route
                  path='volunteer/:sessionId/assignment'
                  element={<VolunteerOrganisationPage />}
                />
                {/* <Route path='breadrun' element={<Outlet />}>
                  <Route path='' element={<BreadRunPage />}>
                    <Route path='' element={<Overview isRegistered />} />
                    <Route path='routes' element={<DeliveryRoutes />} />
                    <Route path='delivery' element={<DeliveryOrders />} />
                    <Route path='history' element={<History />} />
                  </Route>
                  <Route path='routedetail' element={<Outlet />}>
                    <Route path=':id' element={<RouteDetail />} />
                  </Route>
                  <Route path='deliverydetail' element={<Outlet />}>
                    <Route path=':id' element={<DeliveryDetail />} />
                  </Route>
                </Route> */}
                <Route path='profile' element={<Profile />} />
              </Route>
            </Route>
            <Route path='/loading' element={<LoadingPage />} />
            <Route path='/error/500' element={<Error500 />} />
            <Route path='*' element={<Error404 type='page' />} />
          </Routes>
        </BrowserRouter>
        <ModalError open={errorStore.show} onClose={errorStore.close} error={errorStore.error} />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
