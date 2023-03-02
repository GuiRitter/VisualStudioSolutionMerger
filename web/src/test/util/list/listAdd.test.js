import { render, screen } from '@testing-library/react';
import { listAdd } from '../../../util/list';

test('empty list: [a]', () => {
    expect(listAdd([], 0, 'a')).toStrictEqual(['a']);
});

test('[a] adding at 0: [ba]', () => {
    expect(listAdd(['a'], 0, 'b')).toStrictEqual(['b', 'a']);
});

test('[a] adding at 1: [ab]', () => {
    expect(listAdd(['a'], 1, 'b')).toStrictEqual(['a', 'b']);
});

test('[ab] adding at 0: [cab]', () => {
    expect(listAdd(['a', 'b'], 0, 'c')).toStrictEqual(['c', 'a', 'b']);
});

test('[ab] adding at 1: [acb]', () => {
    expect(listAdd(['a', 'b'], 1, 'c')).toStrictEqual(['a', 'c', 'b']);
});

test('[ab] adding at 2: [abc]', () => {
    expect(listAdd(['a', 'b'], 2, 'c')).toStrictEqual(['a', 'b', 'c']);
});
