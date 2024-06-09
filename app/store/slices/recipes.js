import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//api options to get list of food items
const defaultOptionsRecipes = {
	method: 'GET',
	url: 'https://tasty.p.rapidapi.com/recipes/list',
	params: {
		from: '0',
		size: '20',
		q: '',
	},
	headers: {
		'X-RapidAPI-Key': '839bc4e0d1msh9f8f7b34f4d1bcdp101bd2jsn04f63142723a',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
	},
};
// api options to get specific details on one food by ID
const defaultOptionsRecipe = {
	method: 'GET',
	url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
	params: { id: null },
	headers: {
		'x-rapidapi-key': '839bc4e0d1msh9f8f7b34f4d1bcdp101bd2jsn04f63142723a',
		'x-rapidapi-host': 'tasty.p.rapidapi.com',
	},
};

//function to format the data request of a list of foods
const processRecipes = (data) => {
	return data.results.map((data) => ({
		name: data.name,
		thumbnail: data.thumbnail_url,
		id: data.id,
	}));
};

//function that formats the API data for an individual recipe
const processRecipe = (data) => {
	const name = data.name || 'No name was provided';
	const thumbnail = data.thumbnail_url || null;
	const instructions =
		data.instructions || null
			? data.instructions.map(
					(instruction) => instruction.display_text || null
				)
			: ['No instructions available'];
	const video = data.original_video_url || null;
	const numServings = data.num_servings;
	const nutritionFacts =
		Object.entries(data.nutrition).map(
			([key, value]) => `${key}: ${value}`
		) || null;
	const ingredients = data.sections.flatMap(
		(section) =>
			section.components.map((component) => component.raw_text) || null
	);
	const time =
		data.total_time_tier?.display_tier || 'No cooking time was provided.';

	return {
		name: name,
		thumbnail: thumbnail,
		instructions: instructions,
		video: video,
		numServings: numServings,
		nutritionFacts: nutritionFacts,
		ingredients: ingredients,
		time: time,
	};
};

//makes api request for individual recipe
export const fetchRecipe = createAsyncThunk(
	'recipes/fetchRecipe',
	async (id) => {
		const options = Object.assign({}, defaultOptionsRecipe);
		options.params.id = id;
		const response = await axios.request(options);
		return processRecipe(response.data);
	}
);
// makes api request for list of recipes
export const fetchRecipes = createAsyncThunk(
	'recipes/fetchRecipes',
	async (ingredient) => {
		const options = Object.assign({}, defaultOptionsRecipes);
		options.params.q = ingredient;
		const response = await axios.request(options);
		return processRecipes(response.data);
	}
);

//slice to keep track of state
export const recipeSlice = createSlice({
	name: 'recipes',
	initialState: {
		recipes: [],
		individualRecipe: {},
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRecipes.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchRecipes.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.recipes = action.payload;
			})
			.addCase(fetchRecipes.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
		builder
			.addCase(fetchRecipe.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchRecipe.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.individualRecipe = action.payload;
			})
			.addCase(fetchRecipe.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default recipeSlice.reducer;
