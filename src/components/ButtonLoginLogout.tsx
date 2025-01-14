import { CiLogin, CiLogout } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { toast } from 'react-toastify';
import { userLogout } from '../redux/slices/userSlice';

export default function ButtonLoginLogout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state: RootState) => state.user);

    // function to handle navigate to login page or logout
    const handleNavigate = () => {
        if (!token) {
            navigate('/login');
        } else {
            dispatch(userLogout());
            toast.success('Logout successfully!');
        }
    };

    return (
        <div>
            <button
                onClick={handleNavigate}
                className={`py-2 w-[7vw] outline-none rounded-lg flex items-center justify-center space-x-2 
                    hover:scale-105 transition-transform duration-200 ${
                        token
                            ? 'bg-red-500 hover:bg-red-600 '
                            : 'bg-transparent border border-gray-500 hover:border-none hover:bg-[#071a20]'
                    }
                `}
            >
                {token ? (
                    <>
                        <CiLogout className='text-gray-200 font-medium text-lg' />
                        <span className='text-gray-200 font-serif text-lg'>Logout</span>
                    </>
                ) : (
                    <>
                        <CiLogin className='text-gray-200 font-medium text-lg' />
                        <span className='text-gray-200 font-serif text-lg'>Login</span>
                    </>
                )}
            </button>
        </div>
    );
}
