import { FormEventHandler, useState } from 'react';
import { FaHome, FaSpinner } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ResetPasswordProps {
    password: string;
    confirmPassword: string;
}

export default function ResetPassword() {
    // send this token and new password to the server to verify the user
    // const { token } = useParams();
    const navigate = useNavigate();
    const [resetPassword, setResetPassword] = useState<ResetPasswordProps>({
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!resetPassword.password) return toast.error('Password is required');
        if (!resetPassword.confirmPassword) return toast.error('Confirm password is required');
        if (resetPassword.password !== resetPassword.confirmPassword)
            return toast.error('Confirm password not match');
        try {
            setLoading(true);
            console.log(resetPassword);
        } catch (error) {
            console.log('Reset password error', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`flex flex-col items-start justify-center h-screen pl-[10vw]
            bg-[url('/reset.jpg')] bg-cover bg-center bg-no-repeat bg-fixed bg-opacity-50
        `}
        >
            {/* header */}
            <div className='font-serif flex flex-col items-center w-[20vw]'>
                <h1 className='text-center text-3xl font-semibold text-gray-200'>Reset Password</h1>
                <h2 className='italic text-sm text-gray-400'>
                    Enter your new password to reset your account
                </h2>
            </div>

            {/* form input */}
            <form
                onSubmit={handleSubmit}
                className='mt-5 flex flex-col justify-center items-center space-y-2'
            >
                <input
                    autoFocus
                    type='password'
                    placeholder='Password'
                    value={resetPassword.password}
                    onChange={(e) =>
                        setResetPassword({ ...resetPassword, password: e.target.value })
                    }
                    className='outline-none rounded-lg py-2 px-5 w-[20vw]'
                />
                <input
                    type='password'
                    placeholder='Confirm password'
                    value={resetPassword.confirmPassword}
                    onChange={(e) =>
                        setResetPassword({ ...resetPassword, confirmPassword: e.target.value })
                    }
                    className='outline-none rounded-lg py-2 px-5 w-[20vw]'
                />

                {/* submit button */}
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

            {/* footer */}
            {!loading && (
                <div className='space-y-2'>
                    <p className='text-gray-200 mt-5 font-serif'>
                        Don't want to reset password?{' '}
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
