import { CiLogin, CiLogout } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

export default function ButtonLoginLogout() {
    const navigate = useNavigate();
    const isLogged = false;

    return (
        <div>
            {isLogged ? (
                <button
                    className='py-2 w-[7vw] rounded-lg bg-green-500 
                flex items-center justify-center space-x-2 hover:scale-105 transition-transform duration-200'
                >
                    <CiLogout className='text-gray-200 font-medium text-lg' />
                    <span className='text-gray-200 font-serif text-lg'>Logout</span>
                </button>
            ) : (
                <button
                    onClick={() => navigate('/login')}
                    className='py-2 w-[7vw] rounded-lg dark:border-blue-500 bg-blue-500
                    flex items-center justify-center space-x-2 hover:scale-105 transition-transform duration-200'
                >
                    <CiLogin className='text-gray-200 font-medium text-lg' />
                    <span className='text-gray-200 font-serif text-lg'>Login</span>
                </button>
            )}
        </div>
    );
}
