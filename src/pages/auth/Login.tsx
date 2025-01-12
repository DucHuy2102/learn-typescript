import { FormEventHandler, useState } from 'react';
import { FaHome, FaSpinner } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface LoginProps {
    username: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState<LoginProps>({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!login.username) return toast.error('Username is required');
        if (!login.password) return toast.error('Password is required');
        try {
            setLoading(true);
            console.log(login);
        } catch (error) {
            console.log('Login error', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`flex flex-col items-end justify-center h-screen pr-[10vw]
            bg-[url('/login.jpg')] bg-cover bg-center bg-no-repeat bg-fixed bg-opacity-50
        `}
        >
            {/* header */}
            <div className='font-serif flex flex-col items-center w-[20vw]'>
                <h1 className='text-center text-3xl font-semibold'>Login Page</h1>
                <h2 className='italic text-sm text-gray-500'>
                    Using your username and password to login
                </h2>
            </div>

            {/* form input */}
            <form
                onSubmit={handleSubmit}
                className='mt-5 flex flex-col justify-center items-center space-y-2'
            >
                <input
                    autoFocus
                    type='text'
                    placeholder='Username'
                    value={login.username}
                    onChange={(e) => setLogin({ ...login, username: e.target.value })}
                    className='bg-gray-100/50 outline-none rounded-lg py-2 px-5 border border-gray-300 w-[20vw]'
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={login.password}
                    onChange={(e) => setLogin({ ...login, password: e.target.value })}
                    className='bg-gray-100/50 outline-none rounded-lg py-2 px-5 border border-gray-300 w-[20vw]'
                />
                {!loading && (
                    <div className='text-right w-[20vw]'>
                        <span
                            onClick={() => navigate('/forgot-password')}
                            className='text-gray-500 hover:text-blue-500 font-serif text-sm cursor-pointer hover:underline'
                        >
                            Forgot password?
                        </span>
                    </div>
                )}
                {loading ? (
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all duration-200 
                                   text-white font-serif rounded-lg py-2 px-5 w-[20vw] flex items-center justify-center gap-x-2'
                    >
                        <FaSpinner className='animate-spin' />
                        Loading...
                    </button>
                ) : (
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all duration-200 
                                   text-white font-serif rounded-lg py-2 px-5 w-[20vw] flex items-center justify-center gap-x-2'
                    >
                        <IoIosSend />
                        Login Now
                    </button>
                )}
            </form>

            {/* footer */}
            {!loading && (
                <div className='space-y-2'>
                    <p className='text-gray-500 mt-5 font-serif'>
                        Don't have an account?{' '}
                        <span
                            onClick={() => navigate('/register')}
                            className='text-blue-500 cursor-pointer hover:underline'
                        >
                            Register here
                        </span>
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className='bg-gray-200 hover:bg-gray-300 border border-gray-300 font-medium rounded-lg py-2 font-serif 
                    w-[20vw] hover:scale-105 transition-all duration-200
                    flex items-center justify-center gap-x-2'
                    >
                        <FaHome />
                        <span>Go to Home</span>
                    </button>
                </div>
            )}
        </div>
    );
}
