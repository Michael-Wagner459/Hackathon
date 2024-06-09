'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

//styling of the container the slideshow is in
const SlideshowContainer = styled.div`
	width: 100%;
	max-width: 600px;
	margin: auto;
	overflow: hidden;
	position: relative;
`;
//styling of the slide component of the slide show
const Slide = styled.div`
	display: ${(props) => (props.active ? 'block' : 'none')};
	width: 100%;
	height: 100%; /* Adjust the height as needed */
	background-image: url(${(props) => props.image});
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
`;

//makes a slide show of pictures that rotate through on the home page
const Slideshow = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const images = [
		'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D',
		'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fHw%3D',
		'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjV8fHxlbnwwfHx8fHw%3D',
		'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzJ8fHxlbnwwfHx8fHw%3D',
		'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzR8fHxlbnwwfHx8fHw%3D',
		'https://images.unsplash.com/photo-1496412705862-e0088f16f791?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NDR8fHxlbnwwfHx8fHw%3D',
	];
	//length of how long each picture shows in the slide show in MS
	const interval = 5000;

	//changes the picture in the slide show based on the time entered in the interval parameter
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex === images.length - 1 ? 0 : prevIndex + 1
			);
		}, interval);

		return () => clearInterval(timer); // Cleanup the interval on component unmount
	}, [images.length, interval]);

	//ui of the slide show
	return (
		<SlideshowContainer>
			{images.map((image, index) => (
				<Slide key={index} active={index === currentIndex}>
					<div style={{ width: '500px', height: '700px' }}>
						<img
							src={image}
							alt={`Slide ${index}`}
							style={{ width: '100%' }}
						/>
					</div>
				</Slide>
			))}
		</SlideshowContainer>
	);
};

export default Slideshow;
