# format-duration-time
This is a package to format duration, written in TypeScript.<br>
[![Build Status](https://travis-ci.org/gigosa/format-duration-time.svg?branch=master)](https://travis-ci.org/gigosa/format-duration-time)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/gigosa/format-duration-time/master.svg?style=)](https://codecov.io/gh/gigosa/format-duration-time/)

## Install
npm
```
npm i format-duration-time
```
yarn
```
yarn add format-duration-time
```

## Usage
You can import this package to your code as below in JavaScript and TypeScript.

```
import duration from 'format-duration-time';
```

or

```
var duration = require("format-duration-time").default
```

The followings are some sample codes to use this package.
```
duration(3600000).format('h')// 1
duration(9000000).format('h:mm')// 2:30
duration(60, 's').format('m')// 1
```

duration and format methods should be called with following arguments.
```
duration(value, unit).format(template);
```
Default input unit is milli second.<br>
To escape your token in the template you can use square brackets.
```
duration(1, 'h').format('m[minute]ss[second]')//60minute00second'
```

### Avalable duration unit
||unit argument|
|-|-|
|Hour|h|
|Minute|m|
|Second|s|
|Milli second|S(default)|

### Avalable format templates

||token|examples|
|-|-|-|
|Hour|h <br> hh|1, 2, 3, ... <br> 01, 02, 03|
|Minute|m <br> mm|1, 2, 3, ...  <br> 01, 02, 03, ...|
|Second|s <br> ss|1, 2, 3, ... <br> 01, 02, 03, ...|
|Milli second|S|1, 2, 3, ...|
