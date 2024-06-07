'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchRecipes } from '../store/slices/recipes';

export default function FoodSearch() {
	const dispatch = useDispatch();
	const router = useRouter();
	const [food, setFood] = useState('');

	const handleFormSubmit = (event) => {
		event.preventDefault();
		dispatch(fetchRecipes(food));
		router.push('/displayFood');
	};
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
