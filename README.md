# Jiminy

[![Build Status](https://travis-ci.org/Vizzuality/jiminy.svg?branch=master)](https://travis-ci.org/Vizzuality/jiminy)

Jiminy is a lightweight library, ~3.3 kB (gzipped + minified), whose aim is to infer which type of charts can be obtained from a dataset. It's only dependency is [Datalib](https://github.com/vega/datalib).

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
/* First, you need a valid dataset: an array of objects not containing any
 * array nor nested object. For example: */
const data = [
  { city: 'Madrid', country: 'Spain', population: 3141992 },
  { city: 'Barcelona', country: 'Spain', population: 1604555 },
  { city: 'Sevilla', country: 'Spain', population: 703021 },
  { city: 'Bilbao', country: 'Spain', population: 346574 },
  { city: 'Granada', country: 'Spain', population: 237540 },
  { city: 'Malaga', country: 'Spain', population: 568479 },
  { city: 'Montpellier', country: 'France', population: 268456 },
  { city: 'Rome', country: 'Italy', population: 2869461 }
];

/* Then, you have to define what are the existing charts and what type of data
 * they accept */
const chartConfig = [
  {
    name: 'bar',
    acceptedStatTypes: [
      [ 'nominal', 'quantitative' ],
      [ 'ordinal', 'quantitative' ]
    ]
  },
  {
    name: 'pie',
    acceptedStatTypes: [
      [ 'nominal' ],
      [ 'ordinal' ]
    ]
  }
];

/* Finally, you instantiate Jiminy with both the objects */
let jiminy = new Jiminy(data, chartConfig);

/* You can get recommendations: what graphs you can build with the data: */
jiminy.recommendation();
/*
  Returns:
  [
    'bar',
    'pie'
  ]
 */

/* You can ask for the possible graphs which must use (only) some columns: */
jiminy.recommendation([ 'city' ]);
/*
  Returns:
  [
    'pie'
  ]
 */

/* If you already know which graph you want, you can ask Jiminy to give you
 * the columns necessary to build it: */
jiminy.columns('bar'); /* Returns the choices for the first column */
/*
  Returns:
  [
    'city',
    'country',
    'population'
  ]
 */

jiminy.columns('bar', 'country'); /* And for the second */
/*
  Returns:
  [
    'population'
  ]
 */

```

## API

### new Jiminy( dataset, chartConfig )

To initialize the library, you need to instantiate it with a *valid* dataset. By valid, we understand an array of objects, each of them being restricted to this subset of values:
- String
- Boolean
- Integer
- Float

Any other value (`undefined`, `null`, `NaN` or objects or nested arrays) will simply be ignored. Also, the dataset requires at least one non-empty row (ie. one object within the array).

Additionally, you must pass the configuration of the charts. A configuration is a array of charts, each of them defined by a name and by the combinations of statistical types they accept. Currently, *no more than two* statistical types can be used at once in a rule (ie. you can only build 2D charts).
The available statistical types are:
- `'nominal'`: a string or a boolean
- `'temporal'`: a date string
- `'ordinal'`: a number which has less than 5 different values in the column
- `'quantitative'`: a number with more than 5 different values in the column

You can see a starting point of configuration in the section [Example of charts configuration](#example-of-charts-configuration).

### Jiminy.recommendation( [ columnNames ]? )

`Jiminy.recommendation` returns an array of the charts that can be obtained with the dataset you provided to the constructor. The available types of charts depends on the configuration you provided to the constructor.

If an array of column names is provided, `recommendation` returns only the charts that can be obtained with the combination of all the specified columns. Note that it won't return the ones obtained with *just one (or a part)* of the columns.

### Jiminy.columns( chart , columnName? )

This method accepts as first parameter the name of a chart, and as second, the name of a column (optional).

If you just pass the name of a chart, it returns the dataset's column names that can be used to compute it. It doesn't return combinations of columns (arrays) but instead a list of columns that can be used, by their own, to render the chart, or one of a combination of two. It's useful when letting the user choose, from a list of columns, what is the (first) one he/she can select to render a selected chart. Then, if your chart needs two columns and you want to know which second one can be chosen, then also pass the first column the user has chosen (see below).

If a column name is passed as second argument, the method returns all the columns that can be used, in combination of the passed one, to compute the selected chart.

If the method returns an empty array, it can mean two things: one, that the chart can't be computed with the dataset or with the passed column; two, that the chart is unidimensional so it's useless to ask for a second column to render it. For the first case, you could preferably check before the available types of charts making a call to `recommendation`.

## Example of charts configuration

If you're looking for a basic configuration of your charts, you can use this one:
```javascript
const config = [
  {
    name: 'bar',
    acceptedStatTypes: [
      [ 'nominal' ],
      [ 'ordinal' ],
      [ 'quantitative', 'nominal' ],
      [ 'quantitative', 'temporal' ],
      [ 'quantitative', 'ordinal' ]
    ]
  },
  {
    name: 'line',
    acceptedStatTypes: [
      [ 'quantitative', 'temporal' ],
      [ 'quantitative', 'ordinal' ]
    ]
  },
  {
    name: 'pie',
    acceptedStatTypes: [
      [ 'nominal' ],
      [ 'ordinal' ]
    ]
  },
  {
    name: 'scatter',
    acceptedStatTypes: [
      [ 'quantitative', 'quantitative' ],
      [ 'nominal', 'nominal' ],
      [ 'nominal', 'ordinal' ],
      [ 'ordinal', 'ordinal' ]
    ]
  },
  {
    name: '1d_scatter',
    acceptedStatTypes: [
      [ 'quantitative' ],
      [ 'temporal' ]
    ]
  },
  {
    name: '1d_tick',
    acceptedStatTypes: [
      [ 'quantitative' ],
      [ 'temporal' ]
    ]
  }
];
```

## Troubleshooting

### Why does `Jiminy.recommendation()` seem to recommend me wrong charts or to not take into account one of the dataset's columns?

The library tries as best as it can to leverage the use of the first row in order to provide better performance. This means that if you have a dataset whose *first* row doesn't have all the columns set to a "valid" value (see the [API](#new-jiminy-dataset-)), the result won't be accurate.

### Why do I get the warning "Unable to find the column XXX inside the dataset"?

This message means that the library couldn't find the column called "XXX" within the dataset. If you're sure you didn't misspelled the name, then it's because the first dataset's row doesn't contain this column. Learn why Jiminy only checks the first row [here](#why-does-jiminyrecommendation-seem-to-recommend-me-wrong-charts-or-to-not-take-into-account-one-of-the-datasets-columns).

### Why does Jiminy warns me that a part of my charts configuration is wrong because a rule owns more than two statistical types?

Because the library is still under development, some of its features have been limited in favor of a higher quality code, well tested. For now, only two-dimensional (or one-dimensional) charts can be specified. This means that if one of the rules of a chart is an array of three statistical types (or more), Jiminy will ignore it.

## FAQ

### How does the library works?

In order to infer the available types of charts, Jiminy analyzes the columns of the dataset. It first guesses the types of data they host (string, number, etc.) and then their statistical types (nominal, ordinal, etc.). From here, the library uses the set of rules you define to determine each possible chart.

### Why does Jiminy need Datalib?

The idea behind Jiminy is based on the work of the [Interactive Data Lab](http://idl.cs.washington.edu). They not only provide the main concepts but also some of the algorithms, for example for the type inference. In that sense, the library needs some of the key components of their work.

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
