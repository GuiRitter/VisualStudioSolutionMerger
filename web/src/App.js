import React, { useEffect, useRef } from 'react';

import './App.css';

import * as work from './util/project/work';

function componentDidMount(props) {
	document.body.classList.add('container');
}

function App(props) {

	const didMountRef = useRef(false);

	useEffect(() => {
		if (didMountRef.current) {
			// componentDidUpdate(props, prevProps);
		} else {
			didMountRef.current = true;
			componentDidMount(props);
		}
	});
	
	let diff = () => {
		let leftInput = document.getElementById("left");
		let rightInput = document.getElementById("right");
		let output = document.getElementById("output");

		output.value = work.diff(leftInput.value, rightInput.value);

		numberOfProjectsSetter();
	}

	let numberOfProjectsSetter = numberOfProjects => {

		if (numberOfProjects) {
			numberOfProjects = `SccNumberOfProjects = ${numberOfProjects}`
		} else {
			numberOfProjects = '';
		}

		document.getElementById('number_of_projects').innerHTML = numberOfProjects;
	}
	
	let merge = () => {
		let leftInput = document.getElementById("left");
		let rightInput = document.getElementById("right");
		let output = document.getElementById("output");

		output.value = work.merge(leftInput.value, rightInput.value, numberOfProjectsSetter);
	}

	return <><h1>Visual Studio Solution Merger</h1><textarea
		className='left' id='left'
	/><textarea
		className='output' id='output'
	/><textarea
		className='right' id='right'
	/><input
		className='diff' onClick={() => diff()} type='button' value='diff'
	/><input
		className='merge' onClick={() => merge()} type='button' value='merge'
	/><p className='number_of_projects' id='number_of_projects'></p><p className='by'>by Guilherme Alan Ritter</p></>;
}

export default App;
