import path from 'path';

import { emptyFolder, exists, rmDir } from '../../index';

const mocksPath = path.resolve(__dirname, '../../mocks');

/**
 * Empty folder should work even if path doesn't exist
 */
test(`Empty folder should work even if path doesn't exist`, async (): Promise<void> => {
  const newFolder = path.resolve(mocksPath, 'empty-new');
  expect(await exists(newFolder)).toBe(false);
  await emptyFolder(newFolder);
  expect(await exists(newFolder)).toBe(true);
  await rmDir(newFolder);
});
