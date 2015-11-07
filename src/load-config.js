import { readFile as readFileFS } from 'fs';
import findConfig from './find-config';
import find from 'find-up';
import yaml from 'js-yaml';
import pify from 'pify';
import requireFromString from 'require-from-string';

const readFile = pify(readFileFS);

export default name => {
  let filename;

  return find('package.json')
  .then(file => (filename = file) ? readFile(file, 'utf-8') : null )
  .then(file => {
    if (file) {
      let json = JSON.parse(file);
      if (json[name]) {
        return json[name];
      }
    }

    return findConfig('.' + name + 'rc')
    .then(file => (filename = file) ? readFile(file, 'utf-8') : null )
    .then(file => {
      if (file) {
        return yaml.safeLoad(file, { filename });
      }

      return findConfig(name + '.config.js')
      .then(file => (filename = file) ? readFile(file, 'utf-8') : null )
      .then(file => {
        if (file) {
          return requireFromString(file, filename);
        }

        return null;
      });
    });
  });
}
