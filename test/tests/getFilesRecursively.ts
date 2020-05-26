import path from 'path';

import { getFilesRecursively } from '../../index';

const recursivePath = path.resolve(__dirname, '../mocks/recursive');

/**
 * Function should return all files recursively from path
 */
test('Get files recursively', async (): Promise<void> => {
  const files = await getFilesRecursively(recursivePath);
  const file1 = path.resolve(recursivePath, 'path-1', 'file-1.txt');
  const file2 = path.resolve(recursivePath, 'path-2', 'file-2.txt');
  expect(files.length).toBe(2);
  expect(files).toContain(file1);
  expect(files).toContain(file2);
});

/**
 * Function should return all files recursively from path as pattern list is empty
 */
test('Get files recursively with empty pattern list', async (): Promise<void> => {
  const files = await getFilesRecursively(recursivePath, []);
  const file1 = path.resolve(recursivePath, 'path-1', 'file-1.txt');
  const file2 = path.resolve(recursivePath, 'path-2', 'file-2.txt');
  expect(files.length).toBe(2);
  expect(files).toContain(file1);
  expect(files).toContain(file2);
});

/**
 * Function should return all files recursively from path when pattern matches files
 */
test('Get files recursively with matching pattern', async (): Promise<void> => {
  const files = await getFilesRecursively(recursivePath, ['.txt']);
  const file1 = path.resolve(recursivePath, 'path-1', 'file-1.txt');
  const file2 = path.resolve(recursivePath, 'path-2', 'file-2.txt');
  expect(files.length).toBe(2);
  expect(files).toContain(file1);
  expect(files).toContain(file2);
});

/**
 * Function should return no files as they don't match pattern
 */
test('Get files recursively with matching pattern', async (): Promise<void> => {
  const files = await getFilesRecursively(recursivePath, ['.ts']);
  expect(files.length).toBe(0);
});