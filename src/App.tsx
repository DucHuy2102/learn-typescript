import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    ForgotPassword,
    Login,
    Register,
    ResetPassword,
    Todos,
    VerifyEmail,
} from './pages/exportPages';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import PrivateRoute from './components/PrivateRoute';

export default function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Todos />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/verify-email' element={<VerifyEmail />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/reset-password/:token' element={<ResetPassword />} />
                    {/* <Route element={<PrivateRoute />}></Route> */}
                </Routes>
            </Router>

            <ToastContainer
                position='bottom-right'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
                transition={Zoom}
            />
        </>
    );
}
