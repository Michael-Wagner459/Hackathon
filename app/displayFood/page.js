'use client';
import { useEffect } from 'react';
import { fetchRecipes } from '../store/slices/recipes';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

export default function Home() {
	const recipes = useSelector((state) => state.recipes.recipes);

	//renders a list of recipes that is recieved from the API request. Each recipe row is linked to the individual recipe page
	const renderRecipes = () => {
		if (recipes.length > 0) {
			return recipes.map((recipe, index) => {
				return (
					<div key={index}>
						<Link href={`/displayFood/${recipe.id}`}>
							<div className='row'>
								<div className='col'></div>
								<div className='col'>
									<img
										style={{
											height: 200,
											width: 200,
											borderRadius: '25%',
										}}
										src={recipe.thumbnail}
										alt='...'
									></img>
								</div>
								<div className='col'>
									<p id='recipe-name'>
										<span>{recipe.name}</span>
									</p>
								</div>
								<div className='col'></div>
							</div>
						</Link>
						<br />
					</div>
				);
			});
		} else return <h1>Sorry there are no recipes!</h1>;
	};

	//ui of recipe list page
	return (
		<body id='background-image'>
			<div>
				<h1 className='text-center'>List of Recipes</h1>
				<div className='container'>{renderRecipes()}</div>
			</div>
			<br />
			<br />
			<br />
			<div className='col-3 offset-5 text-center' id='back'>
				<span>
					<Link href='/'>Back</Link>
				</span>
			</div>
		</body>
	);
}
