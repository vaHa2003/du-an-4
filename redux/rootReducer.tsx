import { combineReducers } from 'redux';
import userSlice, { UserState } from './slices/userSlice';


export interface RootState {
    user: UserState; 
}

const rootReducer = combineReducers({
  user: userSlice,
});

export default rootReducer;
