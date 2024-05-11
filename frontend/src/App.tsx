import {ThemeProvider} from '@emotion/react';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom';
import './App.css';
import LoadingPage from './components/LoadingPage/LoadingPage';
import {ModalError} from './components/Modal';
import {ActivityDetail} from './pages/Activity/ActivityDetail';
import {VolunteerDetail} from './pages/Volunteer/VolunteerDetail';
import VolunteerSubmissionSuccessPage from './pages/Volunteer/submission-success';
import VolunteerYourDetails from './pages/Volunteer/your-details';
import {BreadRunPage} from './pages/breadrun';
import {DeliveryOrders} from './pages/breadrun/Delivery';
import {DeliveryDetail} from './pages/breadrun/Detail/DeliveryDetail';
import {RouteDetail} from './pages/breadrun/Detail/RouteDetail';
import {History} from './pages/breadrun/History';
import {Overview} from './pages/breadrun/Overview';
import {DeliveryRoutes} from './pages/breadrun/Routes';
import {DashboardPage} from './pages/dashboard';
import DonationPage from './pages/donate';
import PaynowPage from './pages/donate/paynow';
import DonationResultPage from './pages/donate/result';
import DonateReviewPage from './pages/donate/review';
import Error404 from './pages/error/404';
import {Error500} from './pages/error/500';
import Attendance from './routes/dashboard/attendance/page';
import Calendar from './routes/dashboard/calendar/page';
import Home from './routes/dashboard/home/page';
import Notification from './routes/dashboard/notification/page';
import Profile from './routes/dashboard/profile/page';
import Schedule from './routes/dashboard/schedule/page';
import Upcoming from './routes/dashboard/upcoming/page';
import VolunteerOrganisationPage from './routes/dashboard/volunteer/organisation';
import Volunteer from './routes/dashboard/volunteer/page';
import {Forgot, ResetPassword} from './routes/forget/page';
import LoginAdmin from './routes/login/admin';
import Login from './routes/login/page';
import {Orientation, OrientationInvitation} from './routes/orientation/page';
import {ProgrammeEventAttendance, ProgrammeInvitation} from './routes/programme/page';
import {VolunteerRequest, VolunteerRequestInvitation} from './routes/volunteer/page';
import {queryClient} from './service/QueryClient';
import useErrorStore from './store/use-error.store';
import useTokenStore from './store/use-token.store';
import {theme} from './themes/ts/theme';

function App() {
  const accessToken = useTokenStore((state) => state.accessToken);
  const errorStore = useErrorStore((state) => state);
  const tokenStore = useTokenStore((state) => state);

  const ProtectedRoute = () => {
    if (accessToken === null) {
      return <Navigate to='/login' replace />;
    } else if (tokenStore.isLogin === false) {
      return <Navigate to='/login' replace />;
    }

    return <Outlet />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<DonationPage />} />
            <Route path='/donate' element={<DonationPage />} />
            <Route path='/donate-review' element={<DonateReviewPage />} />
            <Route path='/donate-result' element={<DonationResultPage />} />
            <Route path='/donate-paynow' element={<PaynowPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/login-admin' element={<LoginAdmin />} />
            <Route path='/forget' element={<Forgot />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/orientation-event/:idEvent' element={<Orientation />} />
            <Route path='/invitation-event/:idEvent' element={<OrientationInvitation />} />
            <Route path='/invitation-programme/:idParticipant' element={<ProgrammeInvitation />} />
            <Route
              path='/programme-attendance/:programmeId'
              element={<ProgrammeEventAttendance />}
            />
            <Route path='/volunteer-request/:sessionId' element={<VolunteerRequest />} />
            <Route
              path='/volunteer-invitation/:assignedId'
              element={<VolunteerRequestInvitation />}
            />
            <Route path='/your-details' element={<VolunteerYourDetails />} />
            <Route path='/submission-success' element={<VolunteerSubmissionSuccessPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/dashboard' element={<DashboardPage />}>
                <Route path='' element={<Navigate to='/dashboard/home' replace />} />
                <Route path='home' element={<Home />} />
                <Route path='schedule' element={<Schedule />} />
                <Route path='calendar' element={<Calendar />} />
                <Route path='upload' element={<Schedule />} />
                <Route path='upcoming' element={<Upcoming />} />
                <Route path='upcoming/:idProgramme' element={<ActivityDetail />} />
                <Route path='volunteer' element={<Volunteer />} />
                <Route path='notification' element={<Notification />} />
                <Route path='volunteer/:idVr' element={<VolunteerDetail />} />
                <Route
                  path='volunteer/:sessionId/assignment'
                  element={<VolunteerOrganisationPage />}
                />
                <Route path='attendance' element={<Attendance />} />
                <Route path='breadrun' element={<Outlet />}>
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
                </Route>
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
