import path from 'path';

import { copyContents, exists, emptyFolder, rmDir } from '../../index';

const src = path.resolve(__dirname, '../mocks/recursive');
const dest = path.resolve(__dirname, '../mocks/recursive-copy');
const insideFolder = path.resolve(dest, 'path-1');

/**
 * Method should copy folders and files recursively
 */
test('Copy contents should copy folders recursively', async (): Promise<void> => {
  expect(await exists(dest)).toBe(false);
  await copyContents(src, dest);
  expect(await exists(dest)).toBe(true);
  expect(await exists(insideFolder)).toBe(true);
});

/**
 * Method should copy folders and files recursively
 */
test('Copy contents should avoid copying existing', async (): Promise<void> => {
  await copyContents(src, dest);
  await copyContents(src, dest, false);
});

afterAll(async (): Promise<void> => {
  await emptyFolder(dest);
  await rmDir(dest);
});