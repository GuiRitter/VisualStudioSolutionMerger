import { render, screen } from '@testing-library/react';
import { projectEquals } from '../../../util/project';

test('different lenghts, returns false', () => {
	expect(projectEquals({
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB',
	}, {
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB',
		extraKey: 'extraValue'
	})).toStrictEqual(false);
});

test('different lenghts, returns false', () => {
	expect(projectEquals({
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB',
		extraKey: 'extraValue'
	}, {
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB'
	})).toStrictEqual(false);
});

test('different keys, returns false', () => {
	expect(projectEquals({
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB'
	}, {
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueNameExtra: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB'
	})).toStrictEqual(false);
});

test('different keys, returns false', () => {
	expect(projectEquals({
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueNameExtra: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB'
	}, {
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB'
	})).toStrictEqual(false);
});

test('different values, returns false', () => {
	expect(projectEquals({
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB'
	}, {
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectUniqueName: 'Source\\\\Domain\\\\Company.Software.Section.Domain.csproj',
		SccProjectName: 'Source/Domain',
		SccLocalPath: 'Source\\\\Domain'
	})).toStrictEqual(false);
});

test('different values, returns false', () => {
	expect(projectEquals({
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectUniqueName: 'Source\\\\Domain\\\\Company.Software.Section.Domain.csproj',
		SccProjectName: 'Source/Domain',
		SccLocalPath: 'Source\\\\Domain'
	}, {
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB'
	})).toStrictEqual(false);
});

test('same projects, returns true', () => {
	expect(projectEquals({
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB'
	}, {
		SccLocalPath: 'Source\\\\DB',
		SccProjectName: 'Source/DB',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj'
	})).toStrictEqual(true);
});
