// path-to-your-redux-store.ts
import {createStore, combineReducers} from 'redux';
import authReducer from '../auth/authSlice.ts'; // Assuming you have an authSlice

const rootReducer = combineReducers({
    auth: authReducer,
    // Add other reducers as needed
});

const store = createStore(rootReducer);

export default store;
