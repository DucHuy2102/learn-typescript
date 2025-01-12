import { FormEventHandler, useState } from 'react';
import { FaHome, FaSpinner } from 'react-icons/fa';
import { IoIosMail, IoIosSend } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isSentEmail, setIsSentEmail] = useState<boolean>(false);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!email) return toast.error('Email is required');
        try {
            setLoading(true);
            console.log(email);
            setIsSentEmail(true);
        } catch (error) {
            console.log('Forgot-Password error', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`flex flex-col items-start justify-center h-screen pl-[10vw]
            bg-[url('/forgot.jpg')] bg-cover bg-center bg-no-repeat bg-fixed bg-opacity-50
        `}
        >
            {/* header */}
            <div className='font-serif flex flex-col items-center w-[20vw]'>
                <h1 className='text-center text-white text-3xl font-semibold'>Forgot Password</h1>
                <h2 className='italic text-sm text-gray-300'>
                    Enter your email to reset your password
                </h2>
            </div>

            {/* form input */}
            {isSentEmail ? (
                <div className='w-[20vw] flex flex-col items-center justify-center mt-5 space-y-3'>
                    <p className='text-gray-300 font-serif rounded-lg py-2 px-5 border border-gray-300 w-full text-center'>
                        We have sent an email to{' '}
                        <span className='text-blue-500'>duchuytv@gmail.com</span>. Please check your
                        email to reset your password
                    </p>
                    <button
                        className='bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all duration-200 w-full 
                    text-white font-serif rounded-lg py-2 px-5 flex items-center justify-center gap-x-2'
                    >
                        <IoIosMail className='text-lg' />
                        <a href='https://mail.google.com/mail/u/0/#inbox' target='_blank'>
                            Your Email Inbox
                        </a>
                    </button>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className='mt-5 flex flex-col justify-center items-center space-y-2'
                >
                    <input
                        autoFocus
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-gray-100 outline-none rounded-lg py-2 px-5 border border-gray-300 w-[20vw]'
                    />
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
                            Send Now
                        </button>
                    )}
                </form>
            )}

            {/* footer */}
            {!loading && (
                <div className='space-y-2'>
                    <p className='text-gray-300 mt-5 font-serif'>
                        Already have an account?{' '}
                        <span
                            onClick={() => navigate('/login')}
                            className='text-blue-500 cursor-pointer hover:underline'
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
                        <span>Go to Home</span>
                    </button>
                </div>
            )}
        </div>
    );
}
