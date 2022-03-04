import { render, screen } from '@testing-library/react';
import { projectToString } from '../../../util/project';

test('common scenario', () => {
	expect(projectToString({
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB',
	}, 1)).toStrictEqual(`\t\tSccProjectUniqueName1 = Source\\\\DB\\\\Company.Software.Section.DB.csproj
\t\tSccProjectTopLevelParentUniqueName1 = Company.Software.Section.sln
\t\tSccProjectName1 = Source/DB
\t\tSccLocalPath1 = Source\\\\DB
`);
});
