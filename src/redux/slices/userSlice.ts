import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
    token: string | null;
    userInfo: {
        name: string;
        email: string;
        avatar: string;
        address?: string;
        occupation?: string;
    };
}

const initialState: UserState = {
    token: null,
    userInfo: {
        name: '',
        email: '',
        avatar: '',
        address: '',
        occupation: '',
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.token = action.payload.token;
            state.userInfo = action.payload.userInfo;
        },
        userLogout: (state) => {
            state.token = null;
            state.userInfo = {
                name: '',
                email: '',
                avatar: '',
                address: '',
                occupation: '',
            };
        },
    },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
