# Angular 2 Seed
A seed project for [Angular 2](https://angular.io) using [WebPack](https://webpack.github.io), [TypeScript](http://www.typescriptlang.org), and [SASS](http://sass-lang.com).

## Seed Includes
- Angular 2 packages
- SASS Compilation for Global Styles
- SASS Compilation for Component Styles
- SASS Lint
- TypeScript Compilation
- TSLint
- Typings
- Image Minification
- Global environment variables injected from the contents of the `json` files in `config/`
- Cache busting hashes on all required assets

## NPM Scripts
- `npm start` or `npm run server`: Start a local development server based on [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html)
- `npm run build`: Create a production build in `dist/`

## NPM Packages
When adding a new NPM package to the project, add an import statement for it in either `src/polyfills.ts` or `src/vendor.ts` as appropriate. This will ensure that WebPack will split out polyfills and vendor packages into their own bundles. Also be sure that you add the TypeScript definitions using [typings](https://github.com/typings/typings).

## Public Folder
The `public/` folder will be copied as is during the build process. Unless the asset has been required in the code, which will put it through WebPack's loader pipeline, it will not be transformed in any way (cache busting hash, minification, etc.).