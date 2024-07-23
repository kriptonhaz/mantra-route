import {ThemeProvider} from '@emotion/react';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom';
import './App.css';
import LoadingPage from './components/LoadingPage/LoadingPage';
import {ModalError} from './components/Modal';
import {DashboardPage} from './pages/dashboard';
import Error404 from './pages/error/404';
import {Error500} from './pages/error/500';
import Outlets from './routes/dashboard/outlets/page';
import Home from './routes/dashboard/home/page';
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
                <Route path='frontliners' element={<Frontliners />} />
                <Route path='outlet' element={<Outlets />} />
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
