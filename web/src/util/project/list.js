import { projectEquals, projectToString } from '../project';

let exportToString = list => list.reduce((previousString, currentProject, index) => previousString + projectToString(currentProject, index + 1), '');

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
