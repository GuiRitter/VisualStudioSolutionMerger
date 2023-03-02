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
	}
	
	let merge = () => {
		let leftInput = document.getElementById("left");
		let rightInput = document.getElementById("right");
		let output = document.getElementById("output");

		output.value = work.merge(leftInput.value, rightInput.value);
	}

	return <><textarea
		className='left' id='left'
	/><textarea
		className='output' id='output'
	/><textarea
		className='right' id='right'
	/><input
		className='diff' onClick={() => diff()} type='button' value='diff'
	/><input
		className='merge' onClick={() => merge()} type='button' value='merge'
	/></>;
}

export default App;
