import { join } from 'path';
import { stat } from 'fs';
import find from 'find-up';

const home = process.platform === 'win32'
           ? process.env.USERPROFILE
           : process.env.HOME

export default filename => {
  let globalPath = join(home, filename);

  return Promise.all([
    find(filename, {
      cwd: process.cwd()
    }),
    new Promise(resolve => {
      stat(globalPath, (err, stats) => {
        resolve(!err && stats.isFile() ? globalPath : null);
      });
    })
  ]).then(files => files[0] || files[1] );
}
