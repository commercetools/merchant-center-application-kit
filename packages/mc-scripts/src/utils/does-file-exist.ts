import fs from 'node:fs';

function doesFileExist(path: string): boolean {
  try {
    fs.accessSync(path);
    return true;
  } catch (error) {
    return false;
  }
}

export default doesFileExist;
