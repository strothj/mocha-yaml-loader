# mocha-yaml-loader
A `babel/register` style hook to load yaml files.

It allows your mocha tests to use code with imports like:  
```js
import swaggerDoc from './swagger.yaml';
```

## Installation
```shell
$ npm install --save-dev mocha-yaml-loader
```
```shell
$ yarn add --dev mocha-yaml-loader
```

## Usage
`mocha --require mocha-yaml-loader`
