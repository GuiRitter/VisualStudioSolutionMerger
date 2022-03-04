import { render, screen } from '@testing-library/react';
import { compareProjects } from '../../../util/project';

test('different lenghts, first before', () => {
	expect(compareProjects({
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
	})).toStrictEqual(-1);
});

test('different lenghts, first after', () => {
	expect(compareProjects({
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
	})).toStrictEqual(1);
});

test('different keys, first before', () => {
	expect(compareProjects({
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB'
	}, {
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueNameExtra: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB'
	})).toStrictEqual(-1);
});

test('different keys, first after', () => {
	expect(compareProjects({
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueNameExtra: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB'
	}, {
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB'
	})).toStrictEqual(1);
});

test('different values, first before', () => {
	expect(compareProjects({
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB'
	}, {
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectUniqueName: 'Source\\\\Domain\\\\Company.Software.Section.Domain.csproj',
		SccProjectName: 'Source/Domain',
		SccLocalPath: 'Source\\\\Domain'
	})).toStrictEqual(-1);
});

test('different values, first after', () => {
	expect(compareProjects({
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectUniqueName: 'Source\\\\Domain\\\\Company.Software.Section.Domain.csproj',
		SccProjectName: 'Source/Domain',
		SccLocalPath: 'Source\\\\Domain'
	}, {
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB'
	})).toStrictEqual(1);
});

test('same projects, returns zero', () => {
	expect(compareProjects({
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectName: 'Source/DB',
		SccLocalPath: 'Source\\\\DB'
	}, {
		SccLocalPath: 'Source\\\\DB',
		SccProjectName: 'Source/DB',
		SccProjectTopLevelParentUniqueName: 'Company.Software.Section.sln',
		SccProjectUniqueName: 'Source\\\\DB\\\\Company.Software.Section.DB.csproj'
	})).toStrictEqual(0);
});
