'use client';
import FoodSearch from './components/foodSearch';
import FoodSlideShow from './components/foodSlideShow';

//ui for application
export default function Home() {
	return (
		<body id='background-image'>
			<div className='text-center'>
				<h1>Find Your Recipe</h1>
			</div>
			<br />
			<br />
			<div className='text-center'>
				<FoodSearch />
				<br />
				<br />
				<FoodSlideShow />
			</div>
		</body>
	);
}
