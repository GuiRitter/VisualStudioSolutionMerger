import { render, screen } from '@testing-library/react';
import { removeProjectDuplicates } from '../../../../../util/project/list';

test('common scenario', () => {
	expect(removeProjectDuplicates([{
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB',
	}, {
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB',
	}, {
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB',
	}, {
		SccProjectUniqueName: 'Source\\\\Domain\\\\Company.Software.Section.Domain.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/Domain',
		SccLocalPath: 'Source\\\\Domain'
	}, {
		SccProjectUniqueName: 'Source\\\\Domain\\\\Company.Software.Section.Domain.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/Domain',
		SccLocalPath: 'Source\\\\Domain'
	}, {
		SccProjectUniqueName: 'Source\\\\Domain\\\\Company.Software.Section.Domain.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/Domain',
		SccLocalPath: 'Source\\\\Domain'
	}])).toStrictEqual([{
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
