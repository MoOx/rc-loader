import { readFile as readFileFS } from 'fs';
import findConfig from './find-config';
import find from 'find-up';
import yaml from 'js-yaml';
import evalModule from "eval"
import pify from 'pify';

const readFile = pify(readFileFS);

export default name => {
  let filename;

  return find('package.json')
  .then(file => file ? readFile(file) : null )
  .then(file => {
    if (file) {
      let json = JSON.parse(file);
      if (json[name]) {
        return json[name];
      }
    }

    return findConfig('.' + name + 'rc')
    .then(file => file ? readFile(file) : null )
    .then(file => {
      if (file) {
        return yaml.safeLoad(file);
      }

      return findConfig(name + '.config.js')
      .then(file => file ? readFile(file) : null )
      .then(file => {
        if (file) {
          return evalModule(file);
        }

        return null;
      });
    });
  });
}
