/**
 * Configuration
 * @module config
 */

import NPMPackage from '../../package.json';

const apiUrl = 'http://localhost';

const config = {
  name: NPMPackage.name,
  title: NPMPackage.title,
  description: NPMPackage.description,
  startReactotron: false,
  apiUrl,
  apiKey: '9009f95101bf48b01a50928a2a71ed1ae9083',
};

export default config;
