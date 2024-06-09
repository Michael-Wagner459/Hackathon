'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchRecipe } from '@/app/store/slices/recipes';

export default function RecipeDisplay() {
	const { id } = useParams();

	const dispatch = useDispatch();

	//makes api request to get specific information on an individual recipe by ID
	useEffect(() => {
		dispatch(fetchRecipe(id));
	}, [dispatch, id]);

	//sets state
	const recipe = useSelector((state) => state.recipes.individualRecipe);

	//formats the ingredients into a list form
	const listIngredients = recipe.ingredients?.map((ingredient, index) => (
		<li key={index}>
			<span>{ingredient}</span>
		</li>
	));
	//formats the instructions into list form
	const listInstructions = recipe.instructions?.map((direction, index) => (
		<li key={index}>
			<span>{direction}</span>
		</li>
	));
	//formats the nutrition facts into list form with a fail safe incase they are not provided
	const listNutritionFacts = recipe.nutritionFacts?.length ? (
		recipe.nutritionFacts.map((fact, index) => (
			<li key={index}>
				<span>{fact}</span>
			</li>
		))
	) : (
		<li>There are no Nutrition Facts listed</li>
	);

	//formats video components and has a fail safe in case video url is not provided
	const displayVideo = () => {
		if (recipe.video) {
			return (
				<video width='640' height='480' controls>
					<source src={recipe.video} type='video/mp4' />
					Your browser does not support the video tag.
				</video>
			);
		} else {
			return <h2>Sorry a video was not provided.</h2>;
		}
	};

	//ui of the individual recipe that is being displayed
	return (
		<body id='background-image'>
			<div className='text-center container'>
				<div className='row'>
					<div className='col-9'>
						<br />
						<img src={recipe.thumbnail} id='recipePicture' />
						<br />
						<h3>
							<span>Ingredients</span>
						</h3>
						{listIngredients}
					</div>
					<div className='col-3'>
						<br />
						<br />
						<h2>
							<span>Nutrition Facts</span>
						</h2>
						{listNutritionFacts}
					</div>
				</div>
				<div>
					<br />
					<h1>{recipe.name}</h1>
					<br />
					<br />
					<h3>Directions</h3>
					{listInstructions}
					<br />
					<br />
					{displayVideo()}
				</div>
				<div className='col-3 offset-5 text-center' id='back'>
					<span>
						<Link href='/displayFood'>Back</Link>
					</span>
				</div>
			</div>
		</body>
	);
}
