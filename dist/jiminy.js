(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("datalib"));
	else if(typeof define === 'function' && define.amd)
		define(["datalib"], factory);
	else if(typeof exports === 'object')
		exports["Jiminy"] = factory(require("datalib"));
	else
		root["Jiminy"] = factory(root["dl"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dataset = __webpack_require__(1);
	
	var _dataset2 = _interopRequireDefault(_dataset);
	
	var _fields = __webpack_require__(2);
	
	var _fields2 = _interopRequireDefault(_fields);
	
	var _charts = __webpack_require__(7);
	
	var _charts2 = _interopRequireDefault(_charts);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Vizz = function () {
	  function Vizz(json) {
	    _classCallCheck(this, Vizz);
	
	    this._dataset = new _dataset2.default(json);
	    this._fields = new _fields2.default(this._dataset);
	    this._charts = new _charts2.default(this._fields);
	  }
	
	  _createClass(Vizz, [{
	    key: 'recommendation',
	    value: function recommendation() {
	      this._availableCharts = this._charts.getAvailable();
	      return this._availableCharts.map(function (chart) {
	        return chart.name;
	      });
	    }
	  }, {
	    key: 'name',
	    get: function get() {
	      return 'Jiminy';
	    }
	  }, {
	    key: 'version',
	    get: function get() {
	      return '0.0.1';
	    }
	  }]);
	
	  return Vizz;
	}();
	
	exports.default = Vizz;
	;
	
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Dataset = function () {
	  function Dataset(dataset) {
	    _classCallCheck(this, Dataset);
	
	    this._data = dataset;
	    if (!this.valid) {
	      throw new Error('The dataset must be a non-empty array.');
	    }
	  }
	
	  _createClass(Dataset, [{
	    key: 'getFirstValidValue',
	
	
	    /* Return the first valid value of the column named fieldName */
	    value: function getFirstValidValue(fieldName) {
	      for (var i = 0, j = this._data.length; i < j; i++) {
	        var value = this._data[i][fieldName];
	
	        if (this._validValue(value)) return value;
	      }
	      return null;
	    }
	
	    /* Return true if the column contains at least 5 different valid values */
	
	  }, {
	    key: 'atLeast5DistinctValues',
	    value: function atLeast5DistinctValues(fieldName) {
	      var values = new Set();
	
	      for (var i = 0, j = this._data.length; i < j; i++) {
	        var value = this._data[i][fieldName];
	
	        if (this._validValue(value)) values.add(value);
	        if (values.size >= 5) return true;
	      }
	
	      return false;
	    }
	
	    /* Return the name of the columns from the first row */
	
	  }, {
	    key: 'getColumnNames',
	    value: function getColumnNames() {
	      var row = this._data[0];
	      var columns = [];
	
	      for (var column in row) {
	        columns.push(column);
	      }
	
	      return columns;
	    }
	
	    /* Return true if the passed value is different from null, undefined and
	     * NaN */
	
	  }, {
	    key: '_validValue',
	    value: function _validValue(value) {
	      return value !== null && value !== undefined && !Number.isNaN(value) && !Array.isArray(value) && !((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object');
	    }
	  }, {
	    key: 'data',
	    get: function get() {
	      return this._data;
	    }
	  }, {
	    key: 'valid',
	    get: function get() {
	      return this._data && Array.isArray(this._data) && this._data.length > 0;
	    }
	  }]);
	
	  return Dataset;
	}();

	exports.default = Dataset;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _field = __webpack_require__(3);
	
	var _field2 = _interopRequireDefault(_field);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Fields = function () {
	  function Fields(dataset) {
	    _classCallCheck(this, Fields);
	
	    if (!dataset || !dataset.valid) {
	      throw new Error('Fields expects a valid dataset');
	    } else {
	      this._fields = this.getFields(dataset);
	    }
	  }
	
	  _createClass(Fields, [{
	    key: 'getFields',
	
	
	    /* Return the fields of the dataset */
	    value: function getFields(dataset) {
	      var columnNames = dataset.getColumnNames();
	      var fields = [];
	
	      for (var i = 0, j = columnNames.length; i < j; i++) {
	        fields.push(new _field2.default(columnNames[i], dataset));
	      }
	
	      return fields;
	    }
	  }, {
	    key: 'fields',
	    get: function get() {
	      return this._fields;
	    }
	  }]);
	
	  return Fields;
	}();
	
	exports.default = Fields;
	;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _type = __webpack_require__(4);
	
	var _type2 = _interopRequireDefault(_type);
	
	var _stattype = __webpack_require__(6);
	
	var _stattype2 = _interopRequireDefault(_stattype);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Field = function () {
	  function Field(name, dataset) {
	    _classCallCheck(this, Field);
	
	    if (!name || !dataset || !dataset.valid) {
	      throw new Error('Fields must be instanciated with a name and with the ' + 'dataset');
	    }
	
	    this._name = name;
	    this._type = new _type2.default(name, dataset);
	    this._stats = this._computeStats(dataset);
	    this._statType = new _stattype2.default(this._type, this._stats);
	  }
	
	  _createClass(Field, [{
	    key: '_computeStats',
	
	
	    /* Return some statistics about the field */
	    value: function _computeStats(dataset) {
	      return {
	        atLeast5DistinctValues: dataset.atLeast5DistinctValues(this._name)
	      };
	    }
	  }, {
	    key: 'equals',
	    value: function equals(o) {
	      return o.constructor && o.constructor === this.constructor && o.name === this._name && o.type.equals(this._type) && o.statType.equals(this._statType);
	    }
	  }, {
	    key: 'name',
	    get: function get() {
	      return this._name;
	    }
	  }, {
	    key: 'type',
	    get: function get() {
	      return this._type;
	    }
	  }, {
	    key: 'statType',
	    get: function get() {
	      return this._statType;
	    }
	  }]);
	
	  return Field;
	}();
	
	exports.default = Field;
	;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _datalib = __webpack_require__(5);
	
	var _datalib2 = _interopRequireDefault(_datalib);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TYPES = ['number', 'integer', 'string', 'date', 'boolean'];
	
	var Type = function () {
	  function Type(fieldName, dataset) {
	    _classCallCheck(this, Type);
	
	    this._types = TYPES;
	
	    if (!_datalib2.default) {
	      throw new Error('Make sure to include the dependency \'datalib\'');
	    }
	
	    if (fieldName && dataset && dataset.valid) {
	      this._name = this._inferType(fieldName, dataset);
	    } else {
	      throw new Error('A type requires the dataset and the field name.');
	    }
	  }
	
	  _createClass(Type, [{
	    key: '_inferType',
	
	
	    /* Infer the type of the column by checking the first row whose value is
	     * valid. If no value can be inferred, the type will be set to a string by
	     * default. */
	    value: function _inferType(fieldName, dataset) {
	      var sampleValue = dataset.getFirstValidValue(fieldName);
	
	      return sampleValue !== null ? _datalib2.default.type.infer([sampleValue]) : this._types[2];
	    }
	
	    /* Return true if the passed value is different from null, undefined and
	     * NaN */
	
	  }, {
	    key: '_validValue',
	    value: function _validValue(value) {
	      return value !== null && value !== undefined && !Number.isNaN(value);
	    }
	  }, {
	    key: 'equals',
	    value: function equals(o) {
	      return o.constructor && o.constructor === this.constructor && o.name === this._name;
	    }
	  }, {
	    key: 'name',
	    get: function get() {
	      return this._name;
	    }
	  }, {
	    key: 'isNumber',
	    get: function get() {
	      return this._types.indexOf(this._name) === 0;
	    }
	  }, {
	    key: 'isInteger',
	    get: function get() {
	      return this._types.indexOf(this._name) === 1;
	    }
	  }, {
	    key: 'isString',
	    get: function get() {
	      return this._types.indexOf(this._name) === 2;
	    }
	  }, {
	    key: 'isDate',
	    get: function get() {
	      return this._types.indexOf(this._name) === 3;
	    }
	  }, {
	    key: 'isBoolean',
	    get: function get() {
	      return this._types.indexOf(this._name) === 4;
	    }
	  }]);
	
	  return Type;
	}();
	
	exports.default = Type;
	;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TYPES = ['quantitative', 'nominal', 'ordinal', 'temporal'];
	
	var StatType = function () {
	
	  /* An instance can be created or with a type (number, string, etc.) and stats
	   * about that column, or directly the name of the statistical type */
	
	  function StatType(type, stats) {
	    _classCallCheck(this, StatType);
	
	    this._types = TYPES;
	
	    if (type && stats && stats.hasOwnProperty('atLeast5DistinctValues')) {
	      this._name = this._inferType(type, stats);
	    } else {
	      throw new Error('Statistical types must be instanciated with the ' + 'field\'s type and the stats.');
	    }
	  }
	
	  _createClass(StatType, [{
	    key: '_inferType',
	
	
	    /* Infer the statistical type depending on the type of data and the statistics
	     * of the field */
	    value: function _inferType(type, stats) {
	      var statType = this._types[2];
	
	      if (type.isBoolean || type.isString) {
	        statType = this._types[1];
	      } else if (type.isDate) {
	        statType = this._types[3];
	      } else if ((type.isNumber || type.isInteger) && stats.atLeast5DistinctValues) {
	        statType = this._types[0];
	      }
	
	      return statType;
	    }
	  }, {
	    key: 'equals',
	    value: function equals(o) {
	      return o.constructor && o.constructor === this.constructor && o.name === this._name;
	    }
	  }, {
	    key: 'types',
	    get: function get() {
	      return this._types;
	    }
	  }, {
	    key: 'name',
	    get: function get() {
	      return this._name;
	    }
	  }, {
	    key: 'isQuantitative',
	    get: function get() {
	      return this._name === this._types[0];
	    }
	  }, {
	    key: 'isNominal',
	    get: function get() {
	      return this._name === this._types[1];
	    }
	  }, {
	    key: 'isOrdinal',
	    get: function get() {
	      return this._name === this._types[2];
	    }
	  }, {
	    key: 'isTemporal',
	    get: function get() {
	      return this._name === this._types[3];
	    }
	  }]);
	
	  return StatType;
	}();
	
	exports.default = StatType;
	;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _chart = __webpack_require__(8);
	
	var _chart2 = _interopRequireDefault(_chart);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CONFIG = [{
	  name: 'bar',
	  acceptedStatTypes: [['nominal'], ['ordinal'], ['quantitative', 'nominal'], ['quantitative', 'temporal'], ['quantitative', 'ordinal']]
	}, {
	  name: 'line',
	  acceptedStatTypes: [['quantitative', 'temporal'], ['quantitative', 'ordinal']]
	}, {
	  name: 'pie',
	  acceptedStatTypes: [['nominal'], ['ordinal']]
	}, {
	  name: 'scatter',
	  acceptedStatTypes: [['quantitative', 'quantitative'], ['nominal', 'nominal'], ['nominal', 'ordinal'], ['ordinal', 'ordinal']]
	}, {
	  name: '1d_scatter',
	  acceptedStatTypes: [['quantitative'], ['temporal']]
	}, {
	  name: '1d_tick',
	  acceptedStatTypes: [['quantitative'], ['temporal']]
	}];
	
	var Charts = function () {
	  function Charts(fields) {
	    _classCallCheck(this, Charts);
	
	    this._config = CONFIG;
	    this._charts = this._createCharts();
	
	    if (fields && fields.fields.length > 0) {
	      this._fields = fields.fields;
	    } else {
	      throw new Error('Charts must be instancianted with at least one field.');
	    }
	  }
	
	  _createClass(Charts, [{
	    key: '_createCharts',
	
	
	    /* Create the Chart instances */
	    value: function _createCharts() {
	      var charts = [];
	
	      for (var i = 0, j = this._config.length; i < j; i++) {
	        charts.push(new _chart2.default(this._config[i]));
	      }
	
	      return charts;
	    }
	  }, {
	    key: 'getAvailable',
	    value: function getAvailable() {
	      var available = [];
	
	      for (var i = 0, j = this._charts.length; i < j; i++) {
	        if (this._charts[i].isAvailable(this._fields)) {
	          available.push(this._charts[i]);
	        }
	      }
	
	      return available;
	    }
	  }, {
	    key: 'charts',
	    get: function get() {
	      return this._charts;
	    }
	  }]);
	
	  return Charts;
	}();

	exports.default = Charts;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Chart = function () {
	  function Chart(config) {
	    _classCallCheck(this, Chart);
	
	    if (!config || !config.hasOwnProperty('name') || !config.hasOwnProperty('acceptedStatTypes')) {
	      throw new Error('Charts must be instanciated with a correct ' + 'configuration ie. with a name and a list of accepted statistical ' + 'types.');
	    } else {
	      this._name = config.name;
	      this._acceptedStatTypes = config.acceptedStatTypes;
	    }
	  }
	
	  _createClass(Chart, [{
	    key: 'isAvailable',
	
	
	    /* Return true if the chart can be rendered depending on the fields available
	     * and the statistical types required by the chart */
	    value: function isAvailable(fields) {
	      var available = false;
	
	      for (var i = 0, j = this._acceptedStatTypes.length; i < j; i++) {
	        var condition = this._acceptedStatTypes[i];
	
	        /* If the requirement is just one statistical type  */
	        if (condition.length === 1) {
	          available = this._existFields(fields, condition[0], 1);
	        } else {
	          /* If the requirement are two same statistical types */
	          if (condition[0] === condition[1]) {
	            available = this._existFields(fields, condition[0], 2);
	
	            /* If the requirement are two different statistical types */
	          } else {
	              available = this._existFields(fields, condition[0], 1) && this._existFields(fields, condition[1], 1);
	            }
	        }
	
	        if (available) break;
	      }
	
	      return available;
	    }
	
	    /* Return the string with its first letter capitalized */
	
	  }, {
	    key: '_capitalize',
	    value: function _capitalize(string) {
	      return string ? string[0].toUpperCase() + string.slice(1, string.length) : string;
	    }
	
	    /* Return true if among the fields, there are at least count ones of the
	     * specified statistical type */
	
	  }, {
	    key: '_existFields',
	    value: function _existFields(fields, statTypeName, count) {
	      return fields.filter(function (field) {
	        return field.statType['is' + this._capitalize(statTypeName)];
	      }.bind(this)).length >= count;
	    }
	  }, {
	    key: 'equals',
	    value: function equals(o) {
	      return o.constructor && o.constructor === this.constructor && o.name === this._name && o.acceptedStatTypes === this._acceptedStatTypes;
	    }
	  }, {
	    key: 'name',
	    get: function get() {
	      return this._name;
	    }
	  }, {
	    key: 'acceptedStatTypes',
	    get: function get() {
	      return this._acceptedStatTypes;
	    }
	  }]);
	
	  return Chart;
	}();
	
	exports.default = Chart;
	;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=jiminy.js.map