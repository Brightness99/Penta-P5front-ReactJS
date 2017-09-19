/**
 * Configuration
 * @module config
 */

// TODO: Update from basePath to cdn link

import NPMPackage from '../../package.json';

const apiUrl = 'http://dev-cms.printi.com.br';
const basePath = 'http://dev-cms.printi.com.br/';

const config = {
  name: NPMPackage.name,
  title: NPMPackage.title,
  description: NPMPackage.description,
  startReactotron: false,
  apiUrl,
  apiKey: '9009f95101bf48b01a50928a2a71ed1ae9083',
  basePath,
};

export default config;
