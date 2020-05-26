import path from 'path';

import { ensureDir, mkDir, exists, rimraf } from '../../index';

const ensurePath = path.resolve(__dirname, '../../mocks/ensure');
const okPath = path.resolve(ensurePath, 'ok');
const failPath = path.resolve(ensurePath, 'fail');

test('Ensure dir should create folder', async (): Promise<void> => {
  await ensureDir(okPath, {}, true);
  expect(await exists(ensurePath)).toBe(true);
  expect(await exists(okPath)).toBe(true);
});

/**
 * Function should fail when being asked to ensure a folder whose parent doesn't exists with `recursive` set to `false`
 */
test('Ensure dir should fail', async (): Promise<void> => {
  expect(ensureDir(failPath, {}, false)).rejects.toThrow();
  expect(ensureDir(failPath, {}, false)).rejects.toHaveProperty('code');
  expect(ensureDir(failPath, {}, false)).rejects.not.toHaveProperty('code', 'EEXIST');
  await mkDir(ensurePath, { mode: 0o000 });
  expect(await exists(ensurePath)).toBe(true);
  expect(ensureDir(failPath, {}, false)).rejects.not.toHaveProperty('code', 'EEXIST');
});

afterEach(async (): Promise<void> => {
  await rimraf(ensurePath);
});