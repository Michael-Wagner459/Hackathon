import { combineReducers } from 'redux';
import recipeReducer from './slices/recipes';

const rootReducer = combineReducers({
	recipes: recipeReducer,
});

export default rootReducer;
