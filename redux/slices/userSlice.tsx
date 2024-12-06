import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string;
    username: string;
    password: string;
    fullname: string;
    age: number;
    email: string;
    avatar: string;
    phonenumber: string;
    balance: number;
    PIN: string;
    status_provider: string;
    provider_id: string;
    role: string;
    created_at: string;
    updated_at: string;
    discription_user: string;
}

interface UserState {
    user: User | null;
    data: DataUser | null;
}

interface DataUser {
    id: string | number;
    role: string;
    email: string;
}

const initialState: UserState = {
    user: null,
    data: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        update: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = {
                    ...state.user,
                    ...action.payload,
                };
            }
        },
        put: (state, action: PayloadAction<DataUser>) => {
            state.data = action.payload
        },
        clear: (state) => {
            state.data = null
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { login, logout, update, put, clear } = userSlice.actions;
export default userSlice.reducer;
export type { UserState }; 
