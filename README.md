# Jiminy

[![Build Status](https://travis-ci.org/Vizzuality/jiminy.svg?branch=master)](https://travis-ci.org/Vizzuality/jiminy)

Jiminy is a lightweight library, ~2.4 kB (gzipped + minified), whose aim is to infer which type of visualization can be rendered from a dataset. It's only dependency is [Datalib](https://github.com/vega/datalib).

## Installation

### To use in a browser

Install with Bower:
```
bower install jiminy --save
```

... or install with NPM:
```
npm install jiminy --save
```

... or directly download the library:
- [Minified (preferred)](https://raw.githubusercontent.com/Vizzuality/jiminy/master/dist/jiminy.min.js)
- [Standard](https://raw.githubusercontent.com/Vizzuality/jiminy/master/dist/jiminy.js)

After that, don't forget to include the two script tags inside your HTML:
```html
<script type="text/javascript" src="PATH_TO_FILE/datalib.min.js"></script>
<script type="text/javascript" src="PATH_TO_FILE/jiminy.min.js"></script>
```

### To use inside a Node app

Install the library:
```
npm install jiminy --save
```
And then, include it inside your app:
```javascript
const Jiminy = require('jiminy');
```

## Usage

```javascript
let data = [
  { city: 'Madrid', country: 'Spain', population: 3141992 },
  { city: 'Barcelona', country: 'Spain', population: 1604555 },
  { city: 'Sevilla', country: 'Spain', population: 703021 },
  { city: 'Bilbao', country: 'Spain', population: 346574 },
  { city: 'Granada', country: 'Spain', population: 237540 },
  { city: 'Malaga', country: 'Spain', population: 568479 },
  { city: 'Montpellier', country: 'France', population: 268456 },
  { city: 'Rome', country: 'Italy', population: 2869461 }
];

let jiminy = new Jiminy(data);

jiminy.recommendation();
/*
  Returns:
  [
    'bar',
    'pie',
    'scatter',
    '1d_scatter',
    '1d_tick'
  ]
*/
```

## API

### new Jiminy( dataset )

To initialize the library, you need to instantiate it with a *valid* dataset. By valid, we understand an array of objects, each of them being restricted to this subset of values:
- String
- Boolean
- Integer
- Float

Any other value (`undefined`, `null`, `NaN` or objects or nested arrays) will be simply ignored.

Additionally, the constructor requires at least one non-empty row (ie. one object within the array).

### Jiminy.recommendation()

`Jiminy.recommendation` returns an array of the charts that can be obtained with the dataset you provided to the constructor. The available type of charts are:
- `'bar'`
- `'line'`
- `'pie'`
- `'scatter'`
- `'1d_scatter'`
- `'1d_tick'`

Some of the possibilities (like `'pie'`) can be the result of a transformation made to a column (for example, grouping it by its values). This happens when only one column is needed to compute the chart.

## FAQ

### Why does `Jiminy.recommendation()` seem to recommend me wrong charts or to not take into account one of the dataset's columns?

The library tries as best as it can to leverage the use of the first row in order to provide better performance. This means that if you have a dataset whose *first* row doesn't have all the columns set to a "valid" value (see the [API](#new-jiminy-dataset-)), the result won't be accurate.

### How does the library works?

In order to infer the available types of charts, Jiminy analyzes the columns of the dataset. It first guesses the types of data they host (string, number, etc.) and then their statistical types (nominal, ordinal, etc.). From here, the library uses a set of rules to determine each possible chart. For example, a bar chart can be obtained by: grouping by the values a column of type nominal or by combining a column of type quantitative with another of type ordinal.

## Build the latest version or develop

To build the latest version of the code, run:
```
npm run build
```
To use the development environment, run:
```
npm run dev
```
To run the tests, write:
```
npm run test
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request :D
