import { INVALID_INDEX } from '../../constant';

import { projectEquals, projectToString } from '../project';
import { listAdd } from '../list';
import { exportToString, parse } from './list';

let diff = (leftInput, rightInput) => {
	let leftList = parse(leftInput);
	let rightList = parse(rightInput);

	let result = 'lines only in left:\n\n';

	leftList.forEach(leftProject => {
		if (rightList.findIndex(rightProject => projectEquals(leftProject, rightProject)) < 0) {
			result += projectToString(leftProject) + '\n';
		}
	});

	result += 'lines only in right:\n\n';

	rightList.forEach(rightProject => {
		if (leftList.findIndex(leftProject => projectEquals(rightProject, leftProject)) < 0) {
			result += projectToString(rightProject) + '\n';
		}
	});

	return result;
};

let merge = (leftInput, rightInput, numberOfProjectsSetter) => {
	let leftList = parse(leftInput);
	let rightList = parse(rightInput);

	let thisI;
	let otherI;

	let thisProject = null;
	let otherProject = null;

	let thisList = leftList;
	let otherList = rightList;
	let tempList;

	// let thisDone = false;
	let otherDone = false;

	for (thisI = 0; thisI < thisList.length; thisI++) {

		thisProject = thisList[thisI];

		let otherFound = INVALID_INDEX; // 0 5

		for (otherI = 0; otherI < otherList.length; otherI++) {

			otherProject = otherList[otherI]; // 1 2 6 7

			if (projectEquals(thisProject, otherProject)) {

				otherFound = otherI; // 3
				break;
			}
		}

		if (otherFound > INVALID_INDEX) {

			if (otherFound === thisI) {
				if ((thisI + 1) === thisList.length) {
					// thisDone = true;
					if (otherDone) {
						break;
					} else {
						// thisDone = false;
						otherDone = true;
						tempList = thisList;
						thisList = otherList;
						otherList = tempList;
						thisI = INVALID_INDEX;
						continue;
					}
				}
				continue;
			} else {
				otherList = otherList.filter((_, index) => otherFound !== index); // 4
				otherList = listAdd(otherList, thisI, otherProject);
				thisI = INVALID_INDEX;
				continue;
			}
		} else {
			otherList = listAdd(otherList, thisI, { ...thisProject });
			// thisDone = false;
			otherDone = false;
			tempList = thisList;
			thisList = otherList;
			otherList = tempList;
			thisI = INVALID_INDEX;
			continue;
		}
	}

	return exportToString(thisList, numberOfProjectsSetter);
};

export {
	diff,
	merge
}
