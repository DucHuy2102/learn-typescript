import { Todos } from './pages/exportPages';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    return (
        <>
            <Todos />

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
