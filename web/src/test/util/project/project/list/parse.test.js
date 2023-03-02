import { render, screen } from '@testing-library/react';
import { parse } from '../../../../../util/project/list';

test('common scenario', () => {
	expect(parse(`\t\tSccProjectUniqueName1 = Source\\\\DB\\\\Company.Software.Section.DB.csproj
\t\tSccProjectTopLevelParentUniqueName1 = Company.Software.Section.sln
\t\tSccProjectName1 = Source/DB
\t\tSccLocalPath1 = Source\\\\DB
\t\tSccProjectUniqueName2 = Source\\\\Domain\\\\Company.Software.Section.Domain.csproj
\t\tSccProjectTopLevelParentUniqueName2 = Company.Software.Section.sln
\t\tSccProjectName2 = Source/Domain
\t\tSccLocalPath2 = Source\\\\Domain`)).toStrictEqual([{
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB',
	}, {
		SccProjectUniqueName: 'Source\\\\Domain\\\\Company.Software.Section.Domain.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/Domain',
		SccLocalPath: 'Source\\\\Domain'
	}]);
});
