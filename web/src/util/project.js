let compareProjects = (projectA, projectB) => {
	let projectKeysA = Object.keys(projectA);
	let projectKeysB = Object.keys(projectB);
	if (projectKeysA.length < projectKeysB.length) {
		return -1;
	} else if (projectKeysA.length > projectKeysB.length) {
		return 1;
	}
	projectKeysA = projectKeysA.sort();
	projectKeysB = projectKeysB.sort();
	let index;
	let compare;
	for (index = 0; index < projectKeysA.length; index++) {
		compare = projectKeysA[index].localeCompare(projectKeysB[index]);
		if (compare !== 0) {
			return compare;
		}
	}
	for (index = 0; index < projectKeysA.length; index++) {
		compare = projectA[projectKeysA[index]].localeCompare(projectB[projectKeysB[index]]);
		if (compare !== 0) {
			return compare;
		}
	}
	return 0;
}

let projectEquals = (projectA, projectB) => {
	let projectKeysA = Object.keys(projectA);
	let projectKeysB = Object.keys(projectB);
	if (projectKeysA.length !== projectKeysB.length) {
		return false;
	}
	projectKeysA = projectKeysA.sort();
	projectKeysB = projectKeysA.sort();
	let index;
	for (index = 0; index < projectKeysA.length; index++) {
		if (projectKeysA[index] !== projectKeysB[index]) {
			return false;
		}
	}
	for (index = 0; index < projectKeysA.length; index++) {
		if (projectA[projectKeysA[index]] !== projectB[projectKeysB[index]]) {
			return false;
		}
	}
	return true;
}

let projectToString = (project, index) => Object.entries(project).reduce(
	(previousString, currentEntry) => previousString + '\t\t' + currentEntry[0] + ((index === 0) ? 0 : (index || '')) + ' = ' + currentEntry[1] + '\n', ''
);

export {
	compareProjects,
	projectEquals,
	projectToString
}
