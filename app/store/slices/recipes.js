import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

const defaultOptionsRecipe = {
	method: 'GET',
	url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
	params: { id: null },
	headers: {
		'x-rapidapi-key': '839bc4e0d1msh9f8f7b34f4d1bcdp101bd2jsn04f63142723a',
		'x-rapidapi-host': 'tasty.p.rapidapi.com',
	},
};
const processRecipes = (data) => {
	return data.results.map((data) => ({
		name: data.name,
		thumbnail: data.thumbnail_url,
		id: data.id,
	}));
};

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

export const fetchRecipe = createAsyncThunk(
	'recipes/fetchRecipe',
	async (id) => {
		const options = Object.assign({}, defaultOptionsRecipe);
		options.params.id = id;
		const response = await axios.request(options);
		return processRecipe(response.data);
	}
);

export const fetchRecipes = createAsyncThunk(
	'recipes/fetchRecipes',
	async (ingredient) => {
		const options = Object.assign({}, defaultOptionsRecipes);
		options.params.q = ingredient;
		const response = await axios.request(options);
		return processRecipes(response.data);
	}
);

export const recipeSlice = createSlice({
	name: 'recipes',
	initialState: {
		recipes: [
			// {
			// 	name: 'How To Make Classic French Toast',
			// 	thumbnail:
			// 		'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/341495.jpg',
			// 	id: 8110,
			// 	servings: 'Servings: 4',
			// },
			// {
			// 	name: 'Easy Beef Hand Pies',
			// 	thumbnail:
			// 		'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/11e6176999dd4d3fa7444224e8891cdb.jpeg',
			// 	id: 8107,
			// 	servings: 'Servings: 4',
			// },
		],
		individualRecipe: {
			// name: 'Easy Beef Hand Pies',
			// thumbnail:
			// 	'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/11e6176999dd4d3fa7444224e8891cdb.jpeg',
			// instructions: [
			// 	'Preheat the oven to 200°C.',
			// 	'Combine the onion, green pepper, spices, and soy sauce together in a medium bowl. Add the mince and the egg to the other bowl and mix well until all the ingredients are well-combined.',
			// 	'Roll out the thawed puff pastry until it measures approximately 33 x 27 cm. Once this is done, cut the puff pastry into 4 equal pieces (approximately 8cm in size).',
			// 	'Fill each piece of puff pastry with approximately 55g of the mince mixture. Spread the mixture generously onto the puff pastry, making sure to leave enough space around the edges for folding.',
			// 	'Dab some water around the edges of the puff pastry and fold to make a “pie shape”. Use a fork to help you seal the edges, if necessary. Brush the top of the pies with a beaten egg. Make slight incisions on the top of each hand pie to allow the steam to escape.',
			// 	'Bake for 20-25 minutes, or until the crust is golden-brown and crispy.',
			// 	'Serve alongside tomato sauce.',
			// ],
			// video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
			// numServings: 4,
			// nutritionFacts: [
			// 	'calories:820',
			// 	'carbohydrates:58',
			// 	'fat:54',
			// 	'fiber:2',
			// 	'protein:25',
			// 	'sugar:3',
			// ],
			// ingredients: [
			// 	'1 large onion, diced and chopped',
			// 	'½ green pepper, diced and chopped',
			// 	'320 grams ground beef mince, fully defrosted',
			// 	'1 tsp sweet basil, dried',
			// 	'½ tsp chili flakes',
			// 	'1 tsp cinnamon',
			// 	'½ tsp salt',
			// 	'2 tsp dried mixed herbs',
			// 	'1 tbsp beef seasoning',
			// 	'400 grams puff pastry, fully thawed',
			// 	'2 eggs',
			// 	'2 tsp soy sauce',
			// 	'1 tsp crushed garlic',
			// ],
			// time: 'Under 1 hour',
		},
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
