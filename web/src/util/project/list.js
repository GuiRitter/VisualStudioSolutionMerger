import { projectEquals, projectToString } from '../project';

let exportToString = (list, numberOfProjectsSetter) => list.reduce((previousString, currentProject, index) => {
	let indexIncremented = index + 1;
	numberOfProjectsSetter(indexIncremented + 1);
	return previousString + projectToString(currentProject, indexIncremented);
}, '');

let parse = input => removeProjectDuplicates(Object.values(input.split('\n').reduce((previousObject, currentLine) => {
	currentLine = currentLine.trim();
	let match = currentLine.match(/([A-Za-z]+)([0-9]+) = (.+)/);
	if (!match) {
		return previousObject;
	}
	let key = match[1];
	let index = match[2];
	let value = match[3];
	previousObject[index] = {
		...(previousObject[index] || {}),
		[key]: value
	};
	return previousObject;
}, {})));

let removeProjectDuplicates = projectList => projectList.reduce((previousList, currentProject) => {
	if (previousList.findIndex(project => projectEquals(project, currentProject)) < 0) {
		return previousList.concat(currentProject);
	}
	return previousList;
}, []);

export {
	exportToString,
	parse,
	removeProjectDuplicates
}
