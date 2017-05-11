Alpha Front-End
===
The new Front-End Application for Printi

Requirements
===
- node ^6.x
- npm ^3.x

Installation
===

All packages are installable via NPM. Just run:

`npm install`

Development
===

Alpha Front-End uses Webpack for transpiling and as dev-server. To start the application run:

`npm start`

Testing
===

We uses Jest with Enzyme for writing tests.

`npm test` Runs tests and generate code coverage  
`npm run test:watch` Watch file changes and retest them

Known issues
===

- `ERROR in ./path/to/image.png
Module build failed: Error: spawn /path/to/project/node_modules/pngquant-bin/vendor/pngquant ENOENT`

This is a common bug with node-sass. This usually happens on new instalations or when node version is updated. Run `npm rebuild node-sass`to fix it.

If the problem persists, delete `/node_modules` folder and execute `npm install` again.
