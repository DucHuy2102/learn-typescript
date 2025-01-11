import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface ThemeProviderProps {
    children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
    const { theme } = useSelector((state: RootState) => state.theme);

    return (
        <div className={theme}>
            <div
                className={`min-h-screen ${
                    theme === 'light'
                        ? 'bg-[#fbfcfc] text-[#141a21]'
                        : 'bg-[#141a21] text-[#fbfcfc]'
                }  `}
            >
                {children}
            </div>
        </div>
    );
}
