import { FormEventHandler, useState } from 'react';
import { FaHome, FaSpinner } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface RegisterProps {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Register() {
    const navigate = useNavigate();
    const [register, setRegister] = useState<RegisterProps>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!register.username) return toast.error('Username is required');
        if (!register.email) return toast.error('Email is required');
        if (!register.password) return toast.error('Password is required');
        if (!register.confirmPassword) return toast.error('Confirm Password is required');
        if (register.password !== register.confirmPassword)
            return toast.error('Password not match');
        try {
            setLoading(true);
            console.log(register);
        } catch (error) {
            console.log('Register error', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`flex flex-col items-start justify-center h-screen pl-[10vw]
            bg-[url('/register.jpg')] bg-cover bg-center bg-no-repeat bg-fixed bg-opacity-50
        `}
        >
            {/* header */}
            <div className='font-serif flex flex-col items-center w-[20vw]'>
                <h1 className='text-center text-3xl font-semibold'>Register Page</h1>
                <h2 className='italic text-sm text-gray-200'>
                    Please fill in the form to register an account
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
                    value={register.username}
                    onChange={(e) => setRegister({ ...register, username: e.target.value })}
                    className='outline-none rounded-lg py-2 px-5 w-[20vw] 
                    focus:border-gray-400'
                />
                <input
                    type='email'
                    placeholder='Email'
                    value={register.email}
                    onChange={(e) => setRegister({ ...register, email: e.target.value })}
                    className='outline-none rounded-lg py-2 px-5 w-[20vw] 
                    focus:border-gray-400'
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={register.password}
                    onChange={(e) => setRegister({ ...register, password: e.target.value })}
                    className='outline-none rounded-lg py-2 px-5 w-[20vw] 
                    focus:border-gray-400'
                />
                <input
                    type='password'
                    placeholder='Confirm Password'
                    value={register.confirmPassword}
                    onChange={(e) => setRegister({ ...register, confirmPassword: e.target.value })}
                    className='outline-none rounded-lg py-2 px-5 w-[20vw] 
                focus:border-gray-400'
                />

                <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all duration-200 
                    text-white font-serif rounded-lg py-2 px-5 w-[20vw] flex items-center justify-center gap-x-2'
                >
                    {loading ? (
                        <>
                            <FaSpinner className='animate-spin' />
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>
                            <IoIosSend />
                            <span>Submit Form</span>
                        </>
                    )}
                </button>
            </form>

            {/* footer */}
            {!loading && (
                <div className='space-y-2'>
                    <p className='text-gray-200 mt-5 font-serif'>
                        Already have an account?{' '}
                        <span
                            onClick={() => navigate('/login')}
                            className='text-yellow-400 cursor-pointer hover:underline'
                        >
                            Login here
                        </span>
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className='bg-gray-200 hover:bg-gray-300 border border-gray-300 font-medium rounded-lg py-2 font-serif 
                                   w-[20vw] hover:scale-105 transition-all duration-200
                                   flex items-center justify-center gap-x-2'
                    >
                        <FaHome />
                        Go to Home
                    </button>
                </div>
            )}
        </div>
    );
}
