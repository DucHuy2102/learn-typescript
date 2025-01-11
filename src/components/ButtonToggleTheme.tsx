import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import { FaMoon } from 'react-icons/fa';
import { RootState } from '../redux/store';
import { IoIosSunny } from 'react-icons/io';

export default function ButtonToggleTheme() {
    const dispatch = useDispatch();
    const { theme } = useSelector((state: RootState) => state.theme);

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <button
            onClick={handleToggleTheme}
            className={`${
                theme === 'light' ? 'bg-[#141a21] text-[#fbfcfc]' : 'bg-[#fbfcfc] text-[#141a21]'
            } 
            border border-gray-300 shadow-md hover:shadow-none py-2 w-[7vw] rounded-lg
            hover:scale-105 transition-transform duration-200`}
        >
            {theme === 'light' ? (
                <div className='flex items-center justify-center space-x-2'>
                    <FaMoon className='text-[#fbfcfc]' />
                    <span className='font-serif font-medium'>Dark</span>
                </div>
            ) : (
                <div className='flex items-center justify-center space-x-2'>
                    <IoIosSunny className='text-yellow-500 text-xl' />
                    <span className='font-serif font-medium'>Light</span>
                </div>
            )}
        </button>
    );
}
