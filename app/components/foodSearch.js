'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchRecipes } from '../store/slices/recipes';

export default function FoodSearch() {
	const dispatch = useDispatch();
	const router = useRouter();
	const [food, setFood] = useState('');

	//submit form function that uses fetchRecipes to make an API requeest then routes the page to display food where it will display a list of recipes
	const handleFormSubmit = (event) => {
		event.preventDefault();
		dispatch(fetchRecipes(food));
		router.push('/displayFood');
	};

	//ui of the form section to enter in the ingredient or food you want
	return (
		<form onSubmit={handleFormSubmit}>
			<div className='col-6 offset-3'>
				<label>Please Enter Ingredient or Meal</label>
				<input
					className='form-control'
					value={food}
					onChange={(event) => setFood(event.target.value)}
				></input>
				<br />
				<button className='btn btn-primary' type='submit'>
					Submit
				</button>
			</div>
		</form>
	);
}
