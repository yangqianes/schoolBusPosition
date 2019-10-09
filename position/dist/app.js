;require('./runtime');(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([[1],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_camelCase__WEBPACK_IMPORTED_MODULE_0__);

App({
  BASE_URL: "https://bus.duanlv.ltd",
  onLaunch: function onLaunch() {
    var _this = this;

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    this.request = __webpack_require__(19).request; // //测试moment

    console.log("-------------------------------------------x"); // let sFromNowText = moment(new Date().getTime()-360000).fromNow();
    // console.log(sFromNowText)
    // //测试lodash

    console.log(lodash_camelCase__WEBPACK_IMPORTED_MODULE_0___default()('OnLaunch')); // 登录

    wx.login({
      success: function success(res) {// 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    }); // 获取用户信息

    wx.getSetting({
      success: function success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: function success(res) {
              // 可以将 res 发送给后台解码出 unionId
              _this.globalData.userInfo = res.userInfo; // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况

              if (_this.userInfoReadyCallback) {
                _this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  },
  globalData: {
    userInfo: null
  }
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var capitalize = __webpack_require__(2),
    createCompounder = __webpack_require__(12);
/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * _.camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * _.camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * _.camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */


var camelCase = createCompounder(function (result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});
module.exports = camelCase;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var toString = __webpack_require__(3),
    upperFirst = __webpack_require__(4);
/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */


function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}

module.exports = capitalize;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var createCaseFirst = __webpack_require__(5);
/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */


var upperFirst = createCaseFirst('toUpperCase');
module.exports = upperFirst;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var castSlice = __webpack_require__(6),
    hasUnicode = __webpack_require__(8),
    stringToArray = __webpack_require__(9),
    toString = __webpack_require__(3);
/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */


function createCaseFirst(methodName) {
  return function (string) {
    string = toString(string);
    var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined;
    var chr = strSymbols ? strSymbols[0] : string.charAt(0);
    var trailing = strSymbols ? castSlice(strSymbols, 1).join('') : string.slice(1);
    return chr[methodName]() + trailing;
  };
}

module.exports = createCaseFirst;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var baseSlice = __webpack_require__(7);
/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */


function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return !start && end >= length ? array : baseSlice(array, start, end);
}

module.exports = castSlice;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }

  end = end > length ? length : end;

  if (end < 0) {
    end += length;
  }

  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);

  while (++index < length) {
    result[index] = array[index + start];
  }

  return result;
}

module.exports = baseSlice;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';
/** Used to compose unicode capture groups. */

var rsZWJ = '\\u200d';
/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */

var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');
/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */

function hasUnicode(string) {
  return reHasUnicode.test(string);
}

module.exports = hasUnicode;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var asciiToArray = __webpack_require__(10),
    hasUnicode = __webpack_require__(8),
    unicodeToArray = __webpack_require__(11);
/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */


function stringToArray(string) {
  return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}

module.exports = stringToArray;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

module.exports = asciiToArray;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';
/** Used to compose unicode capture groups. */

var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';
/** Used to compose unicode regexes. */

var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */

var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */

function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

module.exports = unicodeToArray;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var arrayReduce = __webpack_require__(13),
    deburr = __webpack_require__(14),
    words = __webpack_require__(15);
/** Used to compose unicode capture groups. */


var rsApos = "['\u2019]";
/** Used to match apostrophes. */

var reApos = RegExp(rsApos, 'g');
/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */

function createCompounder(callback) {
  return function (string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

module.exports = createCompounder;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }

  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }

  return accumulator;
}

module.exports = arrayReduce;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var asciiWords = __webpack_require__(16),
    hasUnicodeWord = __webpack_require__(17),
    toString = __webpack_require__(3),
    unicodeWords = __webpack_require__(18);
/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */


function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }

  return string.match(pattern) || [];
}

module.exports = words;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */

function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

module.exports = asciiWords;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */

function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

module.exports = hasUnicodeWord;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
/** Used to compose unicode capture groups. */

var rsApos = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';
/** Used to compose unicode regexes. */

var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
    rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;
/** Used to match complex or compound words. */

var reUnicodeWord = RegExp([rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')', rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')', rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower, rsUpper + '+' + rsOptContrUpper, rsOrdUpper, rsOrdLower, rsDigits, rsEmoji].join('|'), 'g');
/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */

function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

module.exports = unicodeWords;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

var request = function request(url, method, data, succ, _fail, header, dataType) {
  wx.request({
    url: url,
    data: data,
    dataType: dataType,
    header: header,
    method: method,
    success: function success(res) {
      if (succ) succ(res);
    },
    fail: function fail(err) {
      if (_fail) _fail(err);
    }
  });
};

module.exports = {
  request: request
};

/***/ })
],[[0,0]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvY2FtZWxDYXNlLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL2NhcGl0YWxpemUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvdXBwZXJGaXJzdC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fY3JlYXRlQ2FzZUZpcnN0LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL19jYXN0U2xpY2UuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VTbGljZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9faGFzVW5pY29kZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RyaW5nVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXNjaWlUb0FycmF5LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL191bmljb2RlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fY3JlYXRlQ29tcG91bmRlci5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlSZWR1Y2UuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvd29yZHMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FzY2lpV29yZHMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc1VuaWNvZGVXb3JkLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvbG9kYXNoL191bmljb2RlV29yZHMuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvcmVxdWVzdC5qcyJdLCJuYW1lcyI6WyJBcHAiLCJCQVNFX1VSTCIsIm9uTGF1bmNoIiwibG9ncyIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJ1bnNoaWZ0IiwiRGF0ZSIsIm5vdyIsInNldFN0b3JhZ2VTeW5jIiwicmVxdWVzdCIsInJlcXVpcmUiLCJjb25zb2xlIiwibG9nIiwibG9naW4iLCJzdWNjZXNzIiwicmVzIiwiZ2V0U2V0dGluZyIsImF1dGhTZXR0aW5nIiwiZ2V0VXNlckluZm8iLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ1c2VySW5mb1JlYWR5Q2FsbGJhY2siLCJjYXBpdGFsaXplIiwiY3JlYXRlQ29tcG91bmRlciIsImNhbWVsQ2FzZSIsInJlc3VsdCIsIndvcmQiLCJpbmRleCIsInRvTG93ZXJDYXNlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRvU3RyaW5nIiwidXBwZXJGaXJzdCIsInN0cmluZyIsImlkZW50aXR5IiwidmFsdWUiLCJjcmVhdGVDYXNlRmlyc3QiLCJjYXN0U2xpY2UiLCJoYXNVbmljb2RlIiwic3RyaW5nVG9BcnJheSIsIm1ldGhvZE5hbWUiLCJzdHJTeW1ib2xzIiwidW5kZWZpbmVkIiwiY2hyIiwiY2hhckF0IiwidHJhaWxpbmciLCJqb2luIiwic2xpY2UiLCJiYXNlU2xpY2UiLCJhcnJheSIsInN0YXJ0IiwiZW5kIiwibGVuZ3RoIiwiQXJyYXkiLCJyc0FzdHJhbFJhbmdlIiwicnNDb21ib01hcmtzUmFuZ2UiLCJyZUNvbWJvSGFsZk1hcmtzUmFuZ2UiLCJyc0NvbWJvU3ltYm9sc1JhbmdlIiwicnNDb21ib1JhbmdlIiwicnNWYXJSYW5nZSIsInJzWldKIiwicmVIYXNVbmljb2RlIiwiUmVnRXhwIiwidGVzdCIsImFzY2lpVG9BcnJheSIsInVuaWNvZGVUb0FycmF5Iiwic3BsaXQiLCJyc0FzdHJhbCIsInJzQ29tYm8iLCJyc0ZpdHoiLCJyc01vZGlmaWVyIiwicnNOb25Bc3RyYWwiLCJyc1JlZ2lvbmFsIiwicnNTdXJyUGFpciIsInJlT3B0TW9kIiwicnNPcHRWYXIiLCJyc09wdEpvaW4iLCJyc1NlcSIsInJzU3ltYm9sIiwicmVVbmljb2RlIiwibWF0Y2giLCJhcnJheVJlZHVjZSIsImRlYnVyciIsIndvcmRzIiwicnNBcG9zIiwicmVBcG9zIiwiY2FsbGJhY2siLCJyZXBsYWNlIiwiaXRlcmF0ZWUiLCJhY2N1bXVsYXRvciIsImluaXRBY2N1bSIsImFzY2lpV29yZHMiLCJoYXNVbmljb2RlV29yZCIsInVuaWNvZGVXb3JkcyIsInBhdHRlcm4iLCJndWFyZCIsInJlQXNjaWlXb3JkIiwicmVIYXNVbmljb2RlV29yZCIsInJzRGluZ2JhdFJhbmdlIiwicnNMb3dlclJhbmdlIiwicnNNYXRoT3BSYW5nZSIsInJzTm9uQ2hhclJhbmdlIiwicnNQdW5jdHVhdGlvblJhbmdlIiwicnNTcGFjZVJhbmdlIiwicnNVcHBlclJhbmdlIiwicnNCcmVha1JhbmdlIiwicnNCcmVhayIsInJzRGlnaXRzIiwicnNEaW5nYmF0IiwicnNMb3dlciIsInJzTWlzYyIsInJzVXBwZXIiLCJyc01pc2NMb3dlciIsInJzTWlzY1VwcGVyIiwicnNPcHRDb250ckxvd2VyIiwicnNPcHRDb250clVwcGVyIiwicnNPcmRMb3dlciIsInJzT3JkVXBwZXIiLCJyc0Vtb2ppIiwicmVVbmljb2RlV29yZCIsInVybCIsIm1ldGhvZCIsImRhdGEiLCJzdWNjIiwiZmFpbCIsImhlYWRlciIsImRhdGFUeXBlIiwiZXJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFJQUEsR0FBRyxDQUFDO0FBQ0ZDLFVBQVEsRUFBRSx3QkFEUjtBQUVGQyxVQUFRLEVBQUUsb0JBQVk7QUFBQTs7QUFDcEI7QUFDQSxRQUFJQyxJQUFJLEdBQUdDLEVBQUUsQ0FBQ0MsY0FBSCxDQUFrQixNQUFsQixLQUE2QixFQUF4QztBQUNBRixRQUFJLENBQUNHLE9BQUwsQ0FBYUMsSUFBSSxDQUFDQyxHQUFMLEVBQWI7QUFDQUosTUFBRSxDQUFDSyxjQUFILENBQWtCLE1BQWxCLEVBQTBCTixJQUExQjtBQUVBLFNBQUtPLE9BQUwsR0FBZUMsbUJBQU8sQ0FBQyxFQUFELENBQVAsQ0FBOEJELE9BQTdDLENBTm9CLENBUXBCOztBQUNBRSxXQUFPLENBQUNDLEdBQVIsQ0FBWSw4Q0FBWixFQVRvQixDQVVwQjtBQUNBO0FBQ0E7O0FBQ0FELFdBQU8sQ0FBQ0MsR0FBUixDQUFZLHdEQUFVLFVBQVYsQ0FBWixFQWJvQixDQWdCcEI7O0FBQ0FULE1BQUUsQ0FBQ1UsS0FBSCxDQUFTO0FBQ1BDLGFBQU8sRUFBRSxpQkFBQUMsR0FBRyxFQUFJLENBQ2Q7QUFDRDtBQUhNLEtBQVQsRUFqQm9CLENBc0JwQjs7QUFDQVosTUFBRSxDQUFDYSxVQUFILENBQWM7QUFDWkYsYUFBTyxFQUFFLGlCQUFBQyxHQUFHLEVBQUk7QUFDZCxZQUFJQSxHQUFHLENBQUNFLFdBQUosQ0FBZ0IsZ0JBQWhCLENBQUosRUFBdUM7QUFDckM7QUFDQWQsWUFBRSxDQUFDZSxXQUFILENBQWU7QUFDYkosbUJBQU8sRUFBRSxpQkFBQUMsR0FBRyxFQUFJO0FBQ2Q7QUFDQSxtQkFBSSxDQUFDSSxVQUFMLENBQWdCQyxRQUFoQixHQUEyQkwsR0FBRyxDQUFDSyxRQUEvQixDQUZjLENBSWQ7QUFDQTs7QUFDQSxrQkFBSSxLQUFJLENBQUNDLHFCQUFULEVBQWdDO0FBQzlCLHFCQUFJLENBQUNBLHFCQUFMLENBQTJCTixHQUEzQjtBQUNEO0FBQ0Y7QUFWWSxXQUFmO0FBWUQ7QUFDRjtBQWpCVyxLQUFkO0FBbUJELEdBNUNDO0FBNkNGSSxZQUFVLEVBQUU7QUFDVkMsWUFBUSxFQUFFO0FBREE7QUE3Q1YsQ0FBRCxDQUFILEM7Ozs7OztBQ0pBLElBQUlFLFVBQVUsR0FBR1osbUJBQU8sQ0FBQyxDQUFELENBQXhCO0FBQUEsSUFDSWEsZ0JBQWdCLEdBQUdiLG1CQUFPLENBQUMsRUFBRCxDQUQ5QjtBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLElBQUljLFNBQVMsR0FBR0QsZ0JBQWdCLENBQUMsVUFBU0UsTUFBVCxFQUFpQkMsSUFBakIsRUFBdUJDLEtBQXZCLEVBQThCO0FBQzdERCxNQUFJLEdBQUdBLElBQUksQ0FBQ0UsV0FBTCxFQUFQO0FBQ0EsU0FBT0gsTUFBTSxJQUFJRSxLQUFLLEdBQUdMLFVBQVUsQ0FBQ0ksSUFBRCxDQUFiLEdBQXNCQSxJQUEvQixDQUFiO0FBQ0QsQ0FIK0IsQ0FBaEM7QUFLQUcsTUFBTSxDQUFDQyxPQUFQLEdBQWlCTixTQUFqQixDOzs7Ozs7QUM1QkEsSUFBSU8sUUFBUSxHQUFHckIsbUJBQU8sQ0FBQyxDQUFELENBQXRCO0FBQUEsSUFDSXNCLFVBQVUsR0FBR3RCLG1CQUFPLENBQUMsQ0FBRCxDQUR4QjtBQUdBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWVBLFNBQVNZLFVBQVQsQ0FBb0JXLE1BQXBCLEVBQTRCO0FBQzFCLFNBQU9ELFVBQVUsQ0FBQ0QsUUFBUSxDQUFDRSxNQUFELENBQVIsQ0FBaUJMLFdBQWpCLEVBQUQsQ0FBakI7QUFDRDs7QUFFREMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCUixVQUFqQixDOzs7Ozs7QUN0QkE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsU0FBU1ksUUFBVCxDQUFrQkMsS0FBbEIsRUFBeUI7QUFDdkIsU0FBT0EsS0FBUDtBQUNEOztBQUVETixNQUFNLENBQUNDLE9BQVAsR0FBaUJJLFFBQWpCLEM7Ozs7OztBQ3BCQSxJQUFJRSxlQUFlLEdBQUcxQixtQkFBTyxDQUFDLENBQUQsQ0FBN0I7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxJQUFJc0IsVUFBVSxHQUFHSSxlQUFlLENBQUMsYUFBRCxDQUFoQztBQUVBUCxNQUFNLENBQUNDLE9BQVAsR0FBaUJFLFVBQWpCLEM7Ozs7OztBQ3JCQSxJQUFJSyxTQUFTLEdBQUczQixtQkFBTyxDQUFDLENBQUQsQ0FBdkI7QUFBQSxJQUNJNEIsVUFBVSxHQUFHNUIsbUJBQU8sQ0FBQyxDQUFELENBRHhCO0FBQUEsSUFFSTZCLGFBQWEsR0FBRzdCLG1CQUFPLENBQUMsQ0FBRCxDQUYzQjtBQUFBLElBR0lxQixRQUFRLEdBQUdyQixtQkFBTyxDQUFDLENBQUQsQ0FIdEI7QUFLQTs7Ozs7Ozs7O0FBT0EsU0FBUzBCLGVBQVQsQ0FBeUJJLFVBQXpCLEVBQXFDO0FBQ25DLFNBQU8sVUFBU1AsTUFBVCxFQUFpQjtBQUN0QkEsVUFBTSxHQUFHRixRQUFRLENBQUNFLE1BQUQsQ0FBakI7QUFFQSxRQUFJUSxVQUFVLEdBQUdILFVBQVUsQ0FBQ0wsTUFBRCxDQUFWLEdBQ2JNLGFBQWEsQ0FBQ04sTUFBRCxDQURBLEdBRWJTLFNBRko7QUFJQSxRQUFJQyxHQUFHLEdBQUdGLFVBQVUsR0FDaEJBLFVBQVUsQ0FBQyxDQUFELENBRE0sR0FFaEJSLE1BQU0sQ0FBQ1csTUFBUCxDQUFjLENBQWQsQ0FGSjtBQUlBLFFBQUlDLFFBQVEsR0FBR0osVUFBVSxHQUNyQkosU0FBUyxDQUFDSSxVQUFELEVBQWEsQ0FBYixDQUFULENBQXlCSyxJQUF6QixDQUE4QixFQUE5QixDQURxQixHQUVyQmIsTUFBTSxDQUFDYyxLQUFQLENBQWEsQ0FBYixDQUZKO0FBSUEsV0FBT0osR0FBRyxDQUFDSCxVQUFELENBQUgsS0FBb0JLLFFBQTNCO0FBQ0QsR0FoQkQ7QUFpQkQ7O0FBRURoQixNQUFNLENBQUNDLE9BQVAsR0FBaUJNLGVBQWpCLEM7Ozs7OztBQ2hDQSxJQUFJWSxTQUFTLEdBQUd0QyxtQkFBTyxDQUFDLENBQUQsQ0FBdkI7QUFFQTs7Ozs7Ozs7Ozs7QUFTQSxTQUFTMkIsU0FBVCxDQUFtQlksS0FBbkIsRUFBMEJDLEtBQTFCLEVBQWlDQyxHQUFqQyxFQUFzQztBQUNwQyxNQUFJQyxNQUFNLEdBQUdILEtBQUssQ0FBQ0csTUFBbkI7QUFDQUQsS0FBRyxHQUFHQSxHQUFHLEtBQUtULFNBQVIsR0FBb0JVLE1BQXBCLEdBQTZCRCxHQUFuQztBQUNBLFNBQVEsQ0FBQ0QsS0FBRCxJQUFVQyxHQUFHLElBQUlDLE1BQWxCLEdBQTRCSCxLQUE1QixHQUFvQ0QsU0FBUyxDQUFDQyxLQUFELEVBQVFDLEtBQVIsRUFBZUMsR0FBZixDQUFwRDtBQUNEOztBQUVEdEIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCTyxTQUFqQixDOzs7Ozs7QUNqQkE7Ozs7Ozs7OztBQVNBLFNBQVNXLFNBQVQsQ0FBbUJDLEtBQW5CLEVBQTBCQyxLQUExQixFQUFpQ0MsR0FBakMsRUFBc0M7QUFDcEMsTUFBSXhCLEtBQUssR0FBRyxDQUFDLENBQWI7QUFBQSxNQUNJeUIsTUFBTSxHQUFHSCxLQUFLLENBQUNHLE1BRG5COztBQUdBLE1BQUlGLEtBQUssR0FBRyxDQUFaLEVBQWU7QUFDYkEsU0FBSyxHQUFHLENBQUNBLEtBQUQsR0FBU0UsTUFBVCxHQUFrQixDQUFsQixHQUF1QkEsTUFBTSxHQUFHRixLQUF4QztBQUNEOztBQUNEQyxLQUFHLEdBQUdBLEdBQUcsR0FBR0MsTUFBTixHQUFlQSxNQUFmLEdBQXdCRCxHQUE5Qjs7QUFDQSxNQUFJQSxHQUFHLEdBQUcsQ0FBVixFQUFhO0FBQ1hBLE9BQUcsSUFBSUMsTUFBUDtBQUNEOztBQUNEQSxRQUFNLEdBQUdGLEtBQUssR0FBR0MsR0FBUixHQUFjLENBQWQsR0FBb0JBLEdBQUcsR0FBR0QsS0FBUCxLQUFrQixDQUE5QztBQUNBQSxPQUFLLE1BQU0sQ0FBWDtBQUVBLE1BQUl6QixNQUFNLEdBQUc0QixLQUFLLENBQUNELE1BQUQsQ0FBbEI7O0FBQ0EsU0FBTyxFQUFFekIsS0FBRixHQUFVeUIsTUFBakIsRUFBeUI7QUFDdkIzQixVQUFNLENBQUNFLEtBQUQsQ0FBTixHQUFnQnNCLEtBQUssQ0FBQ3RCLEtBQUssR0FBR3VCLEtBQVQsQ0FBckI7QUFDRDs7QUFDRCxTQUFPekIsTUFBUDtBQUNEOztBQUVESSxNQUFNLENBQUNDLE9BQVAsR0FBaUJrQixTQUFqQixDOzs7Ozs7QUM5QkE7QUFDQSxJQUFJTSxhQUFhLEdBQUcsaUJBQXBCO0FBQUEsSUFDSUMsaUJBQWlCLEdBQUcsaUJBRHhCO0FBQUEsSUFFSUMscUJBQXFCLEdBQUcsaUJBRjVCO0FBQUEsSUFHSUMsbUJBQW1CLEdBQUcsaUJBSDFCO0FBQUEsSUFJSUMsWUFBWSxHQUFHSCxpQkFBaUIsR0FBR0MscUJBQXBCLEdBQTRDQyxtQkFKL0Q7QUFBQSxJQUtJRSxVQUFVLEdBQUcsZ0JBTGpCO0FBT0E7O0FBQ0EsSUFBSUMsS0FBSyxHQUFHLFNBQVo7QUFFQTs7QUFDQSxJQUFJQyxZQUFZLEdBQUdDLE1BQU0sQ0FBQyxNQUFNRixLQUFOLEdBQWNOLGFBQWQsR0FBK0JJLFlBQS9CLEdBQThDQyxVQUE5QyxHQUEyRCxHQUE1RCxDQUF6QjtBQUVBOzs7Ozs7OztBQU9BLFNBQVNyQixVQUFULENBQW9CTCxNQUFwQixFQUE0QjtBQUMxQixTQUFPNEIsWUFBWSxDQUFDRSxJQUFiLENBQWtCOUIsTUFBbEIsQ0FBUDtBQUNEOztBQUVESixNQUFNLENBQUNDLE9BQVAsR0FBaUJRLFVBQWpCLEM7Ozs7OztBQ3pCQSxJQUFJMEIsWUFBWSxHQUFHdEQsbUJBQU8sQ0FBQyxFQUFELENBQTFCO0FBQUEsSUFDSTRCLFVBQVUsR0FBRzVCLG1CQUFPLENBQUMsQ0FBRCxDQUR4QjtBQUFBLElBRUl1RCxjQUFjLEdBQUd2RCxtQkFBTyxDQUFDLEVBQUQsQ0FGNUI7QUFJQTs7Ozs7Ozs7O0FBT0EsU0FBUzZCLGFBQVQsQ0FBdUJOLE1BQXZCLEVBQStCO0FBQzdCLFNBQU9LLFVBQVUsQ0FBQ0wsTUFBRCxDQUFWLEdBQ0hnQyxjQUFjLENBQUNoQyxNQUFELENBRFgsR0FFSCtCLFlBQVksQ0FBQy9CLE1BQUQsQ0FGaEI7QUFHRDs7QUFFREosTUFBTSxDQUFDQyxPQUFQLEdBQWlCUyxhQUFqQixDOzs7Ozs7QUNqQkE7Ozs7Ozs7QUFPQSxTQUFTeUIsWUFBVCxDQUFzQi9CLE1BQXRCLEVBQThCO0FBQzVCLFNBQU9BLE1BQU0sQ0FBQ2lDLEtBQVAsQ0FBYSxFQUFiLENBQVA7QUFDRDs7QUFFRHJDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmtDLFlBQWpCLEM7Ozs7OztBQ1hBO0FBQ0EsSUFBSVYsYUFBYSxHQUFHLGlCQUFwQjtBQUFBLElBQ0lDLGlCQUFpQixHQUFHLGlCQUR4QjtBQUFBLElBRUlDLHFCQUFxQixHQUFHLGlCQUY1QjtBQUFBLElBR0lDLG1CQUFtQixHQUFHLGlCQUgxQjtBQUFBLElBSUlDLFlBQVksR0FBR0gsaUJBQWlCLEdBQUdDLHFCQUFwQixHQUE0Q0MsbUJBSi9EO0FBQUEsSUFLSUUsVUFBVSxHQUFHLGdCQUxqQjtBQU9BOztBQUNBLElBQUlRLFFBQVEsR0FBRyxNQUFNYixhQUFOLEdBQXNCLEdBQXJDO0FBQUEsSUFDSWMsT0FBTyxHQUFHLE1BQU1WLFlBQU4sR0FBcUIsR0FEbkM7QUFBQSxJQUVJVyxNQUFNLEdBQUcsMEJBRmI7QUFBQSxJQUdJQyxVQUFVLEdBQUcsUUFBUUYsT0FBUixHQUFrQixHQUFsQixHQUF3QkMsTUFBeEIsR0FBaUMsR0FIbEQ7QUFBQSxJQUlJRSxXQUFXLEdBQUcsT0FBT2pCLGFBQVAsR0FBdUIsR0FKekM7QUFBQSxJQUtJa0IsVUFBVSxHQUFHLGlDQUxqQjtBQUFBLElBTUlDLFVBQVUsR0FBRyxvQ0FOakI7QUFBQSxJQU9JYixLQUFLLEdBQUcsU0FQWjtBQVNBOztBQUNBLElBQUljLFFBQVEsR0FBR0osVUFBVSxHQUFHLEdBQTVCO0FBQUEsSUFDSUssUUFBUSxHQUFHLE1BQU1oQixVQUFOLEdBQW1CLElBRGxDO0FBQUEsSUFFSWlCLFNBQVMsR0FBRyxRQUFRaEIsS0FBUixHQUFnQixLQUFoQixHQUF3QixDQUFDVyxXQUFELEVBQWNDLFVBQWQsRUFBMEJDLFVBQTFCLEVBQXNDM0IsSUFBdEMsQ0FBMkMsR0FBM0MsQ0FBeEIsR0FBMEUsR0FBMUUsR0FBZ0Y2QixRQUFoRixHQUEyRkQsUUFBM0YsR0FBc0csSUFGdEg7QUFBQSxJQUdJRyxLQUFLLEdBQUdGLFFBQVEsR0FBR0QsUUFBWCxHQUFzQkUsU0FIbEM7QUFBQSxJQUlJRSxRQUFRLEdBQUcsUUFBUSxDQUFDUCxXQUFXLEdBQUdILE9BQWQsR0FBd0IsR0FBekIsRUFBOEJBLE9BQTlCLEVBQXVDSSxVQUF2QyxFQUFtREMsVUFBbkQsRUFBK0ROLFFBQS9ELEVBQXlFckIsSUFBekUsQ0FBOEUsR0FBOUUsQ0FBUixHQUE2RixHQUo1RztBQU1BOztBQUNBLElBQUlpQyxTQUFTLEdBQUdqQixNQUFNLENBQUNPLE1BQU0sR0FBRyxLQUFULEdBQWlCQSxNQUFqQixHQUEwQixJQUExQixHQUFpQ1MsUUFBakMsR0FBNENELEtBQTdDLEVBQW9ELEdBQXBELENBQXRCO0FBRUE7Ozs7Ozs7O0FBT0EsU0FBU1osY0FBVCxDQUF3QmhDLE1BQXhCLEVBQWdDO0FBQzlCLFNBQU9BLE1BQU0sQ0FBQytDLEtBQVAsQ0FBYUQsU0FBYixLQUEyQixFQUFsQztBQUNEOztBQUVEbEQsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbUMsY0FBakIsQzs7Ozs7O0FDdkNBLElBQUlnQixXQUFXLEdBQUd2RSxtQkFBTyxDQUFDLEVBQUQsQ0FBekI7QUFBQSxJQUNJd0UsTUFBTSxHQUFHeEUsbUJBQU8sQ0FBQyxFQUFELENBRHBCO0FBQUEsSUFFSXlFLEtBQUssR0FBR3pFLG1CQUFPLENBQUMsRUFBRCxDQUZuQjtBQUlBOzs7QUFDQSxJQUFJMEUsTUFBTSxHQUFHLFdBQWI7QUFFQTs7QUFDQSxJQUFJQyxNQUFNLEdBQUd2QixNQUFNLENBQUNzQixNQUFELEVBQVMsR0FBVCxDQUFuQjtBQUVBOzs7Ozs7OztBQU9BLFNBQVM3RCxnQkFBVCxDQUEwQitELFFBQTFCLEVBQW9DO0FBQ2xDLFNBQU8sVUFBU3JELE1BQVQsRUFBaUI7QUFDdEIsV0FBT2dELFdBQVcsQ0FBQ0UsS0FBSyxDQUFDRCxNQUFNLENBQUNqRCxNQUFELENBQU4sQ0FBZXNELE9BQWYsQ0FBdUJGLE1BQXZCLEVBQStCLEVBQS9CLENBQUQsQ0FBTixFQUE0Q0MsUUFBNUMsRUFBc0QsRUFBdEQsQ0FBbEI7QUFDRCxHQUZEO0FBR0Q7O0FBRUR6RCxNQUFNLENBQUNDLE9BQVAsR0FBaUJQLGdCQUFqQixDOzs7Ozs7QUN2QkE7Ozs7Ozs7Ozs7OztBQVlBLFNBQVMwRCxXQUFULENBQXFCaEMsS0FBckIsRUFBNEJ1QyxRQUE1QixFQUFzQ0MsV0FBdEMsRUFBbURDLFNBQW5ELEVBQThEO0FBQzVELE1BQUkvRCxLQUFLLEdBQUcsQ0FBQyxDQUFiO0FBQUEsTUFDSXlCLE1BQU0sR0FBR0gsS0FBSyxJQUFJLElBQVQsR0FBZ0IsQ0FBaEIsR0FBb0JBLEtBQUssQ0FBQ0csTUFEdkM7O0FBR0EsTUFBSXNDLFNBQVMsSUFBSXRDLE1BQWpCLEVBQXlCO0FBQ3ZCcUMsZUFBVyxHQUFHeEMsS0FBSyxDQUFDLEVBQUV0QixLQUFILENBQW5CO0FBQ0Q7O0FBQ0QsU0FBTyxFQUFFQSxLQUFGLEdBQVV5QixNQUFqQixFQUF5QjtBQUN2QnFDLGVBQVcsR0FBR0QsUUFBUSxDQUFDQyxXQUFELEVBQWN4QyxLQUFLLENBQUN0QixLQUFELENBQW5CLEVBQTRCQSxLQUE1QixFQUFtQ3NCLEtBQW5DLENBQXRCO0FBQ0Q7O0FBQ0QsU0FBT3dDLFdBQVA7QUFDRDs7QUFFRDVELE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQm1ELFdBQWpCLEM7Ozs7OztBVnpCQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxTQUFTL0MsUUFBVCxDQUFrQkMsS0FBbEIsRUFBeUI7QUFDdkIsU0FBT0EsS0FBUDtBQUNEOztBQUVETixNQUFNLENBQUNDLE9BQVAsR0FBaUJJLFFBQWpCLEM7Ozs7OztBV3BCQSxJQUFJeUQsVUFBVSxHQUFHakYsbUJBQU8sQ0FBQyxFQUFELENBQXhCO0FBQUEsSUFDSWtGLGNBQWMsR0FBR2xGLG1CQUFPLENBQUMsRUFBRCxDQUQ1QjtBQUFBLElBRUlxQixRQUFRLEdBQUdyQixtQkFBTyxDQUFDLENBQUQsQ0FGdEI7QUFBQSxJQUdJbUYsWUFBWSxHQUFHbkYsbUJBQU8sQ0FBQyxFQUFELENBSDFCO0FBS0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxTQUFTeUUsS0FBVCxDQUFlbEQsTUFBZixFQUF1QjZELE9BQXZCLEVBQWdDQyxLQUFoQyxFQUF1QztBQUNyQzlELFFBQU0sR0FBR0YsUUFBUSxDQUFDRSxNQUFELENBQWpCO0FBQ0E2RCxTQUFPLEdBQUdDLEtBQUssR0FBR3JELFNBQUgsR0FBZW9ELE9BQTlCOztBQUVBLE1BQUlBLE9BQU8sS0FBS3BELFNBQWhCLEVBQTJCO0FBQ3pCLFdBQU9rRCxjQUFjLENBQUMzRCxNQUFELENBQWQsR0FBeUI0RCxZQUFZLENBQUM1RCxNQUFELENBQXJDLEdBQWdEMEQsVUFBVSxDQUFDMUQsTUFBRCxDQUFqRTtBQUNEOztBQUNELFNBQU9BLE1BQU0sQ0FBQytDLEtBQVAsQ0FBYWMsT0FBYixLQUF5QixFQUFoQztBQUNEOztBQUVEakUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCcUQsS0FBakIsQzs7Ozs7O0FDbENBO0FBQ0EsSUFBSWEsV0FBVyxHQUFHLDJDQUFsQjtBQUVBOzs7Ozs7OztBQU9BLFNBQVNMLFVBQVQsQ0FBb0IxRCxNQUFwQixFQUE0QjtBQUMxQixTQUFPQSxNQUFNLENBQUMrQyxLQUFQLENBQWFnQixXQUFiLEtBQTZCLEVBQXBDO0FBQ0Q7O0FBRURuRSxNQUFNLENBQUNDLE9BQVAsR0FBaUI2RCxVQUFqQixDOzs7Ozs7QUNkQTtBQUNBLElBQUlNLGdCQUFnQixHQUFHLG9FQUF2QjtBQUVBOzs7Ozs7OztBQU9BLFNBQVNMLGNBQVQsQ0FBd0IzRCxNQUF4QixFQUFnQztBQUM5QixTQUFPZ0UsZ0JBQWdCLENBQUNsQyxJQUFqQixDQUFzQjlCLE1BQXRCLENBQVA7QUFDRDs7QUFFREosTUFBTSxDQUFDQyxPQUFQLEdBQWlCOEQsY0FBakIsQzs7Ozs7O0FDZEE7QUFDQSxJQUFJdEMsYUFBYSxHQUFHLGlCQUFwQjtBQUFBLElBQ0lDLGlCQUFpQixHQUFHLGlCQUR4QjtBQUFBLElBRUlDLHFCQUFxQixHQUFHLGlCQUY1QjtBQUFBLElBR0lDLG1CQUFtQixHQUFHLGlCQUgxQjtBQUFBLElBSUlDLFlBQVksR0FBR0gsaUJBQWlCLEdBQUdDLHFCQUFwQixHQUE0Q0MsbUJBSi9EO0FBQUEsSUFLSXlDLGNBQWMsR0FBRyxpQkFMckI7QUFBQSxJQU1JQyxZQUFZLEdBQUcsMkJBTm5CO0FBQUEsSUFPSUMsYUFBYSxHQUFHLHNCQVBwQjtBQUFBLElBUUlDLGNBQWMsR0FBRyw4Q0FSckI7QUFBQSxJQVNJQyxrQkFBa0IsR0FBRyxpQkFUekI7QUFBQSxJQVVJQyxZQUFZLEdBQUcsOEpBVm5CO0FBQUEsSUFXSUMsWUFBWSxHQUFHLDJCQVhuQjtBQUFBLElBWUk3QyxVQUFVLEdBQUcsZ0JBWmpCO0FBQUEsSUFhSThDLFlBQVksR0FBR0wsYUFBYSxHQUFHQyxjQUFoQixHQUFpQ0Msa0JBQWpDLEdBQXNEQyxZQWJ6RTtBQWVBOztBQUNBLElBQUluQixNQUFNLEdBQUcsV0FBYjtBQUFBLElBQ0lzQixPQUFPLEdBQUcsTUFBTUQsWUFBTixHQUFxQixHQURuQztBQUFBLElBRUlyQyxPQUFPLEdBQUcsTUFBTVYsWUFBTixHQUFxQixHQUZuQztBQUFBLElBR0lpRCxRQUFRLEdBQUcsTUFIZjtBQUFBLElBSUlDLFNBQVMsR0FBRyxNQUFNVixjQUFOLEdBQXVCLEdBSnZDO0FBQUEsSUFLSVcsT0FBTyxHQUFHLE1BQU1WLFlBQU4sR0FBcUIsR0FMbkM7QUFBQSxJQU1JVyxNQUFNLEdBQUcsT0FBT3hELGFBQVAsR0FBdUJtRCxZQUF2QixHQUFzQ0UsUUFBdEMsR0FBaURULGNBQWpELEdBQWtFQyxZQUFsRSxHQUFpRkssWUFBakYsR0FBZ0csR0FON0c7QUFBQSxJQU9JbkMsTUFBTSxHQUFHLDBCQVBiO0FBQUEsSUFRSUMsVUFBVSxHQUFHLFFBQVFGLE9BQVIsR0FBa0IsR0FBbEIsR0FBd0JDLE1BQXhCLEdBQWlDLEdBUmxEO0FBQUEsSUFTSUUsV0FBVyxHQUFHLE9BQU9qQixhQUFQLEdBQXVCLEdBVHpDO0FBQUEsSUFVSWtCLFVBQVUsR0FBRyxpQ0FWakI7QUFBQSxJQVdJQyxVQUFVLEdBQUcsb0NBWGpCO0FBQUEsSUFZSXNDLE9BQU8sR0FBRyxNQUFNUCxZQUFOLEdBQXFCLEdBWm5DO0FBQUEsSUFhSTVDLEtBQUssR0FBRyxTQWJaO0FBZUE7O0FBQ0EsSUFBSW9ELFdBQVcsR0FBRyxRQUFRSCxPQUFSLEdBQWtCLEdBQWxCLEdBQXdCQyxNQUF4QixHQUFpQyxHQUFuRDtBQUFBLElBQ0lHLFdBQVcsR0FBRyxRQUFRRixPQUFSLEdBQWtCLEdBQWxCLEdBQXdCRCxNQUF4QixHQUFpQyxHQURuRDtBQUFBLElBRUlJLGVBQWUsR0FBRyxRQUFROUIsTUFBUixHQUFpQix3QkFGdkM7QUFBQSxJQUdJK0IsZUFBZSxHQUFHLFFBQVEvQixNQUFSLEdBQWlCLHdCQUh2QztBQUFBLElBSUlWLFFBQVEsR0FBR0osVUFBVSxHQUFHLEdBSjVCO0FBQUEsSUFLSUssUUFBUSxHQUFHLE1BQU1oQixVQUFOLEdBQW1CLElBTGxDO0FBQUEsSUFNSWlCLFNBQVMsR0FBRyxRQUFRaEIsS0FBUixHQUFnQixLQUFoQixHQUF3QixDQUFDVyxXQUFELEVBQWNDLFVBQWQsRUFBMEJDLFVBQTFCLEVBQXNDM0IsSUFBdEMsQ0FBMkMsR0FBM0MsQ0FBeEIsR0FBMEUsR0FBMUUsR0FBZ0Y2QixRQUFoRixHQUEyRkQsUUFBM0YsR0FBc0csSUFOdEg7QUFBQSxJQU9JMEMsVUFBVSxHQUFHLGtEQVBqQjtBQUFBLElBUUlDLFVBQVUsR0FBRyxrREFSakI7QUFBQSxJQVNJeEMsS0FBSyxHQUFHRixRQUFRLEdBQUdELFFBQVgsR0FBc0JFLFNBVGxDO0FBQUEsSUFVSTBDLE9BQU8sR0FBRyxRQUFRLENBQUNWLFNBQUQsRUFBWXBDLFVBQVosRUFBd0JDLFVBQXhCLEVBQW9DM0IsSUFBcEMsQ0FBeUMsR0FBekMsQ0FBUixHQUF3RCxHQUF4RCxHQUE4RCtCLEtBVjVFO0FBWUE7O0FBQ0EsSUFBSTBDLGFBQWEsR0FBR3pELE1BQU0sQ0FBQyxDQUN6QmlELE9BQU8sR0FBRyxHQUFWLEdBQWdCRixPQUFoQixHQUEwQixHQUExQixHQUFnQ0ssZUFBaEMsR0FBa0QsS0FBbEQsR0FBMEQsQ0FBQ1IsT0FBRCxFQUFVSyxPQUFWLEVBQW1CLEdBQW5CLEVBQXdCakUsSUFBeEIsQ0FBNkIsR0FBN0IsQ0FBMUQsR0FBOEYsR0FEckUsRUFFekJtRSxXQUFXLEdBQUcsR0FBZCxHQUFvQkUsZUFBcEIsR0FBc0MsS0FBdEMsR0FBOEMsQ0FBQ1QsT0FBRCxFQUFVSyxPQUFPLEdBQUdDLFdBQXBCLEVBQWlDLEdBQWpDLEVBQXNDbEUsSUFBdEMsQ0FBMkMsR0FBM0MsQ0FBOUMsR0FBZ0csR0FGdkUsRUFHekJpRSxPQUFPLEdBQUcsR0FBVixHQUFnQkMsV0FBaEIsR0FBOEIsR0FBOUIsR0FBb0NFLGVBSFgsRUFJekJILE9BQU8sR0FBRyxHQUFWLEdBQWdCSSxlQUpTLEVBS3pCRSxVQUx5QixFQU16QkQsVUFOeUIsRUFPekJULFFBUHlCLEVBUXpCVyxPQVJ5QixFQVN6QnhFLElBVHlCLENBU3BCLEdBVG9CLENBQUQsRUFTYixHQVRhLENBQTFCO0FBV0E7Ozs7Ozs7O0FBT0EsU0FBUytDLFlBQVQsQ0FBc0I1RCxNQUF0QixFQUE4QjtBQUM1QixTQUFPQSxNQUFNLENBQUMrQyxLQUFQLENBQWF1QyxhQUFiLEtBQStCLEVBQXRDO0FBQ0Q7O0FBRUQxRixNQUFNLENBQUNDLE9BQVAsR0FBaUIrRCxZQUFqQixDOzs7Ozs7QUNwRUEsSUFBTXBGLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQVUrRyxHQUFWLEVBQWVDLE1BQWYsRUFBdUJDLElBQXZCLEVBQTZCQyxJQUE3QixFQUFtQ0MsS0FBbkMsRUFBeUNDLE1BQXpDLEVBQWlEQyxRQUFqRCxFQUEyRDtBQUN6RTNILElBQUUsQ0FBQ00sT0FBSCxDQUFXO0FBQ1QrRyxPQUFHLEVBQUVBLEdBREk7QUFFVEUsUUFBSSxFQUFFQSxJQUZHO0FBR1RJLFlBQVEsRUFBRUEsUUFIRDtBQUlURCxVQUFNLEVBQUVBLE1BSkM7QUFLVEosVUFBTSxFQUFFQSxNQUxDO0FBTVQzRyxXQUFPLEVBQUUsaUJBQUFDLEdBQUcsRUFBSTtBQUNkLFVBQUk0RyxJQUFKLEVBQVVBLElBQUksQ0FBQzVHLEdBQUQsQ0FBSjtBQUNYLEtBUlE7QUFTVDZHLFFBQUksRUFBRSxjQUFBRyxHQUFHLEVBQUk7QUFDWCxVQUFJSCxLQUFKLEVBQVVBLEtBQUksQ0FBQ0csR0FBRCxDQUFKO0FBQ1g7QUFYUSxHQUFYO0FBYUQsQ0FkRDs7QUFlQWxHLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNmckIsU0FBTyxFQUFQQTtBQURlLENBQWpCLEMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9hcHAuanNcbi8vIGltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IGNhbWVsQ2FzZSB9IGZyb20gJ2xvZGFzaCc7XG5cbkFwcCh7XG4gIEJBU0VfVVJMOiBcImh0dHBzOi8vYnVzLmR1YW5sdi5sdGRcIixcbiAgb25MYXVuY2g6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyDlsZXnpLrmnKzlnLDlrZjlgqjog73liptcbiAgICB2YXIgbG9ncyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdsb2dzJykgfHwgW11cbiAgICBsb2dzLnVuc2hpZnQoRGF0ZS5ub3coKSlcbiAgICB3eC5zZXRTdG9yYWdlU3luYygnbG9ncycsIGxvZ3MpXG5cbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1aXJlKCcuL3V0aWxzL3JlcXVlc3QuanMnKS5yZXF1ZXN0O1xuXG4gICAgLy8gLy/mtYvor5Vtb21lbnRcbiAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS14XCIpO1xuICAgIC8vIGxldCBzRnJvbU5vd1RleHQgPSBtb21lbnQobmV3IERhdGUoKS5nZXRUaW1lKCktMzYwMDAwKS5mcm9tTm93KCk7XG4gICAgLy8gY29uc29sZS5sb2coc0Zyb21Ob3dUZXh0KVxuICAgIC8vIC8v5rWL6K+VbG9kYXNoXG4gICAgY29uc29sZS5sb2coY2FtZWxDYXNlKCdPbkxhdW5jaCcpKVxuXG5cbiAgICAvLyDnmbvlvZVcbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAvLyDlj5HpgIEgcmVzLmNvZGUg5Yiw5ZCO5Y+w5o2i5Y+WIG9wZW5JZCwgc2Vzc2lvbktleSwgdW5pb25JZFxuICAgICAgfVxuICAgIH0pXG4gICAgLy8g6I635Y+W55So5oi35L+h5oGvXG4gICAgd3guZ2V0U2V0dGluZyh7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM5Y+v5Lul55u05o6l6LCD55SoIGdldFVzZXJJbmZvIOiOt+WPluWktOWDj+aYteensO+8jOS4jeS8muW8ueahhlxuICAgICAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgIC8vIOWPr+S7peWwhiByZXMg5Y+R6YCB57uZ5ZCO5Y+w6Kej56CB5Ye6IHVuaW9uSWRcbiAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG5cbiAgICAgICAgICAgICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cbiAgICAgICAgICAgICAgLy8g5omA5Lul5q2k5aSE5Yqg5YWlIGNhbGxiYWNrIOS7pemYsuatoui/meenjeaDheWGtVxuICAgICAgICAgICAgICBpZiAodGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJbmZvUmVhZHlDYWxsYmFjayhyZXMpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgZ2xvYmFsRGF0YToge1xuICAgIHVzZXJJbmZvOiBudWxsXG4gIH1cbn0pIiwidmFyIGNhcGl0YWxpemUgPSByZXF1aXJlKCcuL2NhcGl0YWxpemUnKSxcbiAgICBjcmVhdGVDb21wb3VuZGVyID0gcmVxdWlyZSgnLi9fY3JlYXRlQ29tcG91bmRlcicpO1xuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIFtjYW1lbCBjYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DYW1lbENhc2UpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjYW1lbCBjYXNlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uY2FtZWxDYXNlKCdGb28gQmFyJyk7XG4gKiAvLyA9PiAnZm9vQmFyJ1xuICpcbiAqIF8uY2FtZWxDYXNlKCctLWZvby1iYXItLScpO1xuICogLy8gPT4gJ2Zvb0JhcidcbiAqXG4gKiBfLmNhbWVsQ2FzZSgnX19GT09fQkFSX18nKTtcbiAqIC8vID0+ICdmb29CYXInXG4gKi9cbnZhciBjYW1lbENhc2UgPSBjcmVhdGVDb21wb3VuZGVyKGZ1bmN0aW9uKHJlc3VsdCwgd29yZCwgaW5kZXgpIHtcbiAgd29yZCA9IHdvcmQudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIHJlc3VsdCArIChpbmRleCA/IGNhcGl0YWxpemUod29yZCkgOiB3b3JkKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNhbWVsQ2FzZTtcbiIsInZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdG9TdHJpbmcnKSxcbiAgICB1cHBlckZpcnN0ID0gcmVxdWlyZSgnLi91cHBlckZpcnN0Jyk7XG5cbi8qKlxuICogQ29udmVydHMgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBgc3RyaW5nYCB0byB1cHBlciBjYXNlIGFuZCB0aGUgcmVtYWluaW5nXG4gKiB0byBsb3dlciBjYXNlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGNhcGl0YWxpemUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjYXBpdGFsaXplZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uY2FwaXRhbGl6ZSgnRlJFRCcpO1xuICogLy8gPT4gJ0ZyZWQnXG4gKi9cbmZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKSB7XG4gIHJldHVybiB1cHBlckZpcnN0KHRvU3RyaW5nKHN0cmluZykudG9Mb3dlckNhc2UoKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FwaXRhbGl6ZTtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpdHk7XG4iLCJ2YXIgY3JlYXRlQ2FzZUZpcnN0ID0gcmVxdWlyZSgnLi9fY3JlYXRlQ2FzZUZpcnN0Jyk7XG5cbi8qKlxuICogQ29udmVydHMgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBgc3RyaW5nYCB0byB1cHBlciBjYXNlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnVwcGVyRmlyc3QoJ2ZyZWQnKTtcbiAqIC8vID0+ICdGcmVkJ1xuICpcbiAqIF8udXBwZXJGaXJzdCgnRlJFRCcpO1xuICogLy8gPT4gJ0ZSRUQnXG4gKi9cbnZhciB1cHBlckZpcnN0ID0gY3JlYXRlQ2FzZUZpcnN0KCd0b1VwcGVyQ2FzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVwcGVyRmlyc3Q7XG4iLCJ2YXIgY2FzdFNsaWNlID0gcmVxdWlyZSgnLi9fY2FzdFNsaWNlJyksXG4gICAgaGFzVW5pY29kZSA9IHJlcXVpcmUoJy4vX2hhc1VuaWNvZGUnKSxcbiAgICBzdHJpbmdUb0FycmF5ID0gcmVxdWlyZSgnLi9fc3RyaW5nVG9BcnJheScpLFxuICAgIHRvU3RyaW5nID0gcmVxdWlyZSgnLi90b1N0cmluZycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiBsaWtlIGBfLmxvd2VyRmlyc3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kTmFtZSBUaGUgbmFtZSBvZiB0aGUgYFN0cmluZ2AgY2FzZSBtZXRob2QgdG8gdXNlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2FzZUZpcnN0KG1ldGhvZE5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0cmluZykge1xuICAgIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG5cbiAgICB2YXIgc3RyU3ltYm9scyA9IGhhc1VuaWNvZGUoc3RyaW5nKVxuICAgICAgPyBzdHJpbmdUb0FycmF5KHN0cmluZylcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgdmFyIGNociA9IHN0clN5bWJvbHNcbiAgICAgID8gc3RyU3ltYm9sc1swXVxuICAgICAgOiBzdHJpbmcuY2hhckF0KDApO1xuXG4gICAgdmFyIHRyYWlsaW5nID0gc3RyU3ltYm9sc1xuICAgICAgPyBjYXN0U2xpY2Uoc3RyU3ltYm9scywgMSkuam9pbignJylcbiAgICAgIDogc3RyaW5nLnNsaWNlKDEpO1xuXG4gICAgcmV0dXJuIGNoclttZXRob2ROYW1lXSgpICsgdHJhaWxpbmc7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQ2FzZUZpcnN0O1xuIiwidmFyIGJhc2VTbGljZSA9IHJlcXVpcmUoJy4vX2Jhc2VTbGljZScpO1xuXG4vKipcbiAqIENhc3RzIGBhcnJheWAgdG8gYSBzbGljZSBpZiBpdCdzIG5lZWRlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgVGhlIHN0YXJ0IHBvc2l0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IFtlbmQ9YXJyYXkubGVuZ3RoXSBUaGUgZW5kIHBvc2l0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjYXN0IHNsaWNlLlxuICovXG5mdW5jdGlvbiBjYXN0U2xpY2UoYXJyYXksIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiBlbmQ7XG4gIHJldHVybiAoIXN0YXJ0ICYmIGVuZCA+PSBsZW5ndGgpID8gYXJyYXkgOiBiYXNlU2xpY2UoYXJyYXksIHN0YXJ0LCBlbmQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhc3RTbGljZTtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uc2xpY2VgIHdpdGhvdXQgYW4gaXRlcmF0ZWUgY2FsbCBndWFyZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNsaWNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD0wXSBUaGUgc3RhcnQgcG9zaXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gW2VuZD1hcnJheS5sZW5ndGhdIFRoZSBlbmQgcG9zaXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHNsaWNlIG9mIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VTbGljZShhcnJheSwgc3RhcnQsIGVuZCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAtc3RhcnQgPiBsZW5ndGggPyAwIDogKGxlbmd0aCArIHN0YXJ0KTtcbiAgfVxuICBlbmQgPSBlbmQgPiBsZW5ndGggPyBsZW5ndGggOiBlbmQ7XG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlbmd0aDtcbiAgfVxuICBsZW5ndGggPSBzdGFydCA+IGVuZCA/IDAgOiAoKGVuZCAtIHN0YXJ0KSA+Pj4gMCk7XG4gIHN0YXJ0ID4+Pj0gMDtcblxuICB2YXIgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gYXJyYXlbaW5kZXggKyBzdGFydF07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlU2xpY2U7XG4iLCIvKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2hhcmFjdGVyIGNsYXNzZXMuICovXG52YXIgcnNBc3RyYWxSYW5nZSA9ICdcXFxcdWQ4MDAtXFxcXHVkZmZmJyxcbiAgICByc0NvbWJvTWFya3NSYW5nZSA9ICdcXFxcdTAzMDAtXFxcXHUwMzZmJyxcbiAgICByZUNvbWJvSGFsZk1hcmtzUmFuZ2UgPSAnXFxcXHVmZTIwLVxcXFx1ZmUyZicsXG4gICAgcnNDb21ib1N5bWJvbHNSYW5nZSA9ICdcXFxcdTIwZDAtXFxcXHUyMGZmJyxcbiAgICByc0NvbWJvUmFuZ2UgPSByc0NvbWJvTWFya3NSYW5nZSArIHJlQ29tYm9IYWxmTWFya3NSYW5nZSArIHJzQ29tYm9TeW1ib2xzUmFuZ2UsXG4gICAgcnNWYXJSYW5nZSA9ICdcXFxcdWZlMGVcXFxcdWZlMGYnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2FwdHVyZSBncm91cHMuICovXG52YXIgcnNaV0ogPSAnXFxcXHUyMDBkJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHN0cmluZ3Mgd2l0aCBbemVyby13aWR0aCBqb2luZXJzIG9yIGNvZGUgcG9pbnRzIGZyb20gdGhlIGFzdHJhbCBwbGFuZXNdKGh0dHA6Ly9lZXYuZWUvYmxvZy8yMDE1LzA5LzEyL2RhcmstY29ybmVycy1vZi11bmljb2RlLykuICovXG52YXIgcmVIYXNVbmljb2RlID0gUmVnRXhwKCdbJyArIHJzWldKICsgcnNBc3RyYWxSYW5nZSAgKyByc0NvbWJvUmFuZ2UgKyByc1ZhclJhbmdlICsgJ10nKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHN0cmluZ2AgY29udGFpbnMgVW5pY29kZSBzeW1ib2xzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhIHN5bWJvbCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNVbmljb2RlKHN0cmluZykge1xuICByZXR1cm4gcmVIYXNVbmljb2RlLnRlc3Qoc3RyaW5nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNVbmljb2RlO1xuIiwidmFyIGFzY2lpVG9BcnJheSA9IHJlcXVpcmUoJy4vX2FzY2lpVG9BcnJheScpLFxuICAgIGhhc1VuaWNvZGUgPSByZXF1aXJlKCcuL19oYXNVbmljb2RlJyksXG4gICAgdW5pY29kZVRvQXJyYXkgPSByZXF1aXJlKCcuL191bmljb2RlVG9BcnJheScpO1xuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBzdHJpbmdUb0FycmF5KHN0cmluZykge1xuICByZXR1cm4gaGFzVW5pY29kZShzdHJpbmcpXG4gICAgPyB1bmljb2RlVG9BcnJheShzdHJpbmcpXG4gICAgOiBhc2NpaVRvQXJyYXkoc3RyaW5nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHJpbmdUb0FycmF5O1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBhbiBBU0NJSSBgc3RyaW5nYCB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXNjaWlUb0FycmF5KHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnNwbGl0KCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc2NpaVRvQXJyYXk7XG4iLCIvKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2hhcmFjdGVyIGNsYXNzZXMuICovXG52YXIgcnNBc3RyYWxSYW5nZSA9ICdcXFxcdWQ4MDAtXFxcXHVkZmZmJyxcbiAgICByc0NvbWJvTWFya3NSYW5nZSA9ICdcXFxcdTAzMDAtXFxcXHUwMzZmJyxcbiAgICByZUNvbWJvSGFsZk1hcmtzUmFuZ2UgPSAnXFxcXHVmZTIwLVxcXFx1ZmUyZicsXG4gICAgcnNDb21ib1N5bWJvbHNSYW5nZSA9ICdcXFxcdTIwZDAtXFxcXHUyMGZmJyxcbiAgICByc0NvbWJvUmFuZ2UgPSByc0NvbWJvTWFya3NSYW5nZSArIHJlQ29tYm9IYWxmTWFya3NSYW5nZSArIHJzQ29tYm9TeW1ib2xzUmFuZ2UsXG4gICAgcnNWYXJSYW5nZSA9ICdcXFxcdWZlMGVcXFxcdWZlMGYnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2FwdHVyZSBncm91cHMuICovXG52YXIgcnNBc3RyYWwgPSAnWycgKyByc0FzdHJhbFJhbmdlICsgJ10nLFxuICAgIHJzQ29tYm8gPSAnWycgKyByc0NvbWJvUmFuZ2UgKyAnXScsXG4gICAgcnNGaXR6ID0gJ1xcXFx1ZDgzY1tcXFxcdWRmZmItXFxcXHVkZmZmXScsXG4gICAgcnNNb2RpZmllciA9ICcoPzonICsgcnNDb21ibyArICd8JyArIHJzRml0eiArICcpJyxcbiAgICByc05vbkFzdHJhbCA9ICdbXicgKyByc0FzdHJhbFJhbmdlICsgJ10nLFxuICAgIHJzUmVnaW9uYWwgPSAnKD86XFxcXHVkODNjW1xcXFx1ZGRlNi1cXFxcdWRkZmZdKXsyfScsXG4gICAgcnNTdXJyUGFpciA9ICdbXFxcXHVkODAwLVxcXFx1ZGJmZl1bXFxcXHVkYzAwLVxcXFx1ZGZmZl0nLFxuICAgIHJzWldKID0gJ1xcXFx1MjAwZCc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSByZWdleGVzLiAqL1xudmFyIHJlT3B0TW9kID0gcnNNb2RpZmllciArICc/JyxcbiAgICByc09wdFZhciA9ICdbJyArIHJzVmFyUmFuZ2UgKyAnXT8nLFxuICAgIHJzT3B0Sm9pbiA9ICcoPzonICsgcnNaV0ogKyAnKD86JyArIFtyc05vbkFzdHJhbCwgcnNSZWdpb25hbCwgcnNTdXJyUGFpcl0uam9pbignfCcpICsgJyknICsgcnNPcHRWYXIgKyByZU9wdE1vZCArICcpKicsXG4gICAgcnNTZXEgPSByc09wdFZhciArIHJlT3B0TW9kICsgcnNPcHRKb2luLFxuICAgIHJzU3ltYm9sID0gJyg/OicgKyBbcnNOb25Bc3RyYWwgKyByc0NvbWJvICsgJz8nLCByc0NvbWJvLCByc1JlZ2lvbmFsLCByc1N1cnJQYWlyLCByc0FzdHJhbF0uam9pbignfCcpICsgJyknO1xuXG4vKiogVXNlZCB0byBtYXRjaCBbc3RyaW5nIHN5bWJvbHNdKGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LXVuaWNvZGUpLiAqL1xudmFyIHJlVW5pY29kZSA9IFJlZ0V4cChyc0ZpdHogKyAnKD89JyArIHJzRml0eiArICcpfCcgKyByc1N5bWJvbCArIHJzU2VxLCAnZycpO1xuXG4vKipcbiAqIENvbnZlcnRzIGEgVW5pY29kZSBgc3RyaW5nYCB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gdW5pY29kZVRvQXJyYXkoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcubWF0Y2gocmVVbmljb2RlKSB8fCBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmljb2RlVG9BcnJheTtcbiIsInZhciBhcnJheVJlZHVjZSA9IHJlcXVpcmUoJy4vX2FycmF5UmVkdWNlJyksXG4gICAgZGVidXJyID0gcmVxdWlyZSgnLi9kZWJ1cnInKSxcbiAgICB3b3JkcyA9IHJlcXVpcmUoJy4vd29yZHMnKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNhcHR1cmUgZ3JvdXBzLiAqL1xudmFyIHJzQXBvcyA9IFwiWydcXHUyMDE5XVwiO1xuXG4vKiogVXNlZCB0byBtYXRjaCBhcG9zdHJvcGhlcy4gKi9cbnZhciByZUFwb3MgPSBSZWdFeHAocnNBcG9zLCAnZycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiBsaWtlIGBfLmNhbWVsQ2FzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0byBjb21iaW5lIGVhY2ggd29yZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNvbXBvdW5kZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvdW5kZXIoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0cmluZykge1xuICAgIHJldHVybiBhcnJheVJlZHVjZSh3b3JkcyhkZWJ1cnIoc3RyaW5nKS5yZXBsYWNlKHJlQXBvcywgJycpKSwgY2FsbGJhY2ssICcnKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVDb21wb3VuZGVyO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ucmVkdWNlYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0geyp9IFthY2N1bXVsYXRvcl0gVGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpbml0QWNjdW1dIFNwZWNpZnkgdXNpbmcgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYGFycmF5YCBhc1xuICogIHRoZSBpbml0aWFsIHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGFjY3VtdWxhdGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBhcnJheVJlZHVjZShhcnJheSwgaXRlcmF0ZWUsIGFjY3VtdWxhdG9yLCBpbml0QWNjdW0pIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcblxuICBpZiAoaW5pdEFjY3VtICYmIGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gYXJyYXlbKytpbmRleF07XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhY2N1bXVsYXRvciA9IGl0ZXJhdGVlKGFjY3VtdWxhdG9yLCBhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIGFjY3VtdWxhdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5UmVkdWNlO1xuIiwidmFyIGFzY2lpV29yZHMgPSByZXF1aXJlKCcuL19hc2NpaVdvcmRzJyksXG4gICAgaGFzVW5pY29kZVdvcmQgPSByZXF1aXJlKCcuL19oYXNVbmljb2RlV29yZCcpLFxuICAgIHRvU3RyaW5nID0gcmVxdWlyZSgnLi90b1N0cmluZycpLFxuICAgIHVuaWNvZGVXb3JkcyA9IHJlcXVpcmUoJy4vX3VuaWNvZGVXb3JkcycpO1xuXG4vKipcbiAqIFNwbGl0cyBgc3RyaW5nYCBpbnRvIGFuIGFycmF5IG9mIGl0cyB3b3Jkcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtSZWdFeHB8c3RyaW5nfSBbcGF0dGVybl0gVGhlIHBhdHRlcm4gdG8gbWF0Y2ggd29yZHMuXG4gKiBAcGFyYW0tIHtPYmplY3R9IFtndWFyZF0gRW5hYmxlcyB1c2UgYXMgYW4gaXRlcmF0ZWUgZm9yIG1ldGhvZHMgbGlrZSBgXy5tYXBgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB3b3JkcyBvZiBgc3RyaW5nYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy53b3JkcygnZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnKTtcbiAqIC8vID0+IFsnZnJlZCcsICdiYXJuZXknLCAncGViYmxlcyddXG4gKlxuICogXy53b3JkcygnZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnLCAvW14sIF0rL2cpO1xuICogLy8gPT4gWydmcmVkJywgJ2Jhcm5leScsICcmJywgJ3BlYmJsZXMnXVxuICovXG5mdW5jdGlvbiB3b3JkcyhzdHJpbmcsIHBhdHRlcm4sIGd1YXJkKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHBhdHRlcm4gPSBndWFyZCA/IHVuZGVmaW5lZCA6IHBhdHRlcm47XG5cbiAgaWYgKHBhdHRlcm4gPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBoYXNVbmljb2RlV29yZChzdHJpbmcpID8gdW5pY29kZVdvcmRzKHN0cmluZykgOiBhc2NpaVdvcmRzKHN0cmluZyk7XG4gIH1cbiAgcmV0dXJuIHN0cmluZy5tYXRjaChwYXR0ZXJuKSB8fCBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3b3JkcztcbiIsIi8qKiBVc2VkIHRvIG1hdGNoIHdvcmRzIGNvbXBvc2VkIG9mIGFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzLiAqL1xudmFyIHJlQXNjaWlXb3JkID0gL1teXFx4MDAtXFx4MmZcXHgzYS1cXHg0MFxceDViLVxceDYwXFx4N2ItXFx4N2ZdKy9nO1xuXG4vKipcbiAqIFNwbGl0cyBhbiBBU0NJSSBgc3RyaW5nYCBpbnRvIGFuIGFycmF5IG9mIGl0cyB3b3Jkcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgd29yZHMgb2YgYHN0cmluZ2AuXG4gKi9cbmZ1bmN0aW9uIGFzY2lpV29yZHMoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcubWF0Y2gocmVBc2NpaVdvcmQpIHx8IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzY2lpV29yZHM7XG4iLCIvKiogVXNlZCB0byBkZXRlY3Qgc3RyaW5ncyB0aGF0IG5lZWQgYSBtb3JlIHJvYnVzdCByZWdleHAgdG8gbWF0Y2ggd29yZHMuICovXG52YXIgcmVIYXNVbmljb2RlV29yZCA9IC9bYS16XVtBLVpdfFtBLVpdezJ9W2Etel18WzAtOV1bYS16QS1aXXxbYS16QS1aXVswLTldfFteYS16QS1aMC05IF0vO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgc3RyaW5nYCBjb250YWlucyBhIHdvcmQgY29tcG9zZWQgb2YgVW5pY29kZSBzeW1ib2xzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhIHdvcmQgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzVW5pY29kZVdvcmQoc3RyaW5nKSB7XG4gIHJldHVybiByZUhhc1VuaWNvZGVXb3JkLnRlc3Qoc3RyaW5nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNVbmljb2RlV29yZDtcbiIsIi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjaGFyYWN0ZXIgY2xhc3Nlcy4gKi9cbnZhciByc0FzdHJhbFJhbmdlID0gJ1xcXFx1ZDgwMC1cXFxcdWRmZmYnLFxuICAgIHJzQ29tYm9NYXJrc1JhbmdlID0gJ1xcXFx1MDMwMC1cXFxcdTAzNmYnLFxuICAgIHJlQ29tYm9IYWxmTWFya3NSYW5nZSA9ICdcXFxcdWZlMjAtXFxcXHVmZTJmJyxcbiAgICByc0NvbWJvU3ltYm9sc1JhbmdlID0gJ1xcXFx1MjBkMC1cXFxcdTIwZmYnLFxuICAgIHJzQ29tYm9SYW5nZSA9IHJzQ29tYm9NYXJrc1JhbmdlICsgcmVDb21ib0hhbGZNYXJrc1JhbmdlICsgcnNDb21ib1N5bWJvbHNSYW5nZSxcbiAgICByc0RpbmdiYXRSYW5nZSA9ICdcXFxcdTI3MDAtXFxcXHUyN2JmJyxcbiAgICByc0xvd2VyUmFuZ2UgPSAnYS16XFxcXHhkZi1cXFxceGY2XFxcXHhmOC1cXFxceGZmJyxcbiAgICByc01hdGhPcFJhbmdlID0gJ1xcXFx4YWNcXFxceGIxXFxcXHhkN1xcXFx4ZjcnLFxuICAgIHJzTm9uQ2hhclJhbmdlID0gJ1xcXFx4MDAtXFxcXHgyZlxcXFx4M2EtXFxcXHg0MFxcXFx4NWItXFxcXHg2MFxcXFx4N2ItXFxcXHhiZicsXG4gICAgcnNQdW5jdHVhdGlvblJhbmdlID0gJ1xcXFx1MjAwMC1cXFxcdTIwNmYnLFxuICAgIHJzU3BhY2VSYW5nZSA9ICcgXFxcXHRcXFxceDBiXFxcXGZcXFxceGEwXFxcXHVmZWZmXFxcXG5cXFxcclxcXFx1MjAyOFxcXFx1MjAyOVxcXFx1MTY4MFxcXFx1MTgwZVxcXFx1MjAwMFxcXFx1MjAwMVxcXFx1MjAwMlxcXFx1MjAwM1xcXFx1MjAwNFxcXFx1MjAwNVxcXFx1MjAwNlxcXFx1MjAwN1xcXFx1MjAwOFxcXFx1MjAwOVxcXFx1MjAwYVxcXFx1MjAyZlxcXFx1MjA1ZlxcXFx1MzAwMCcsXG4gICAgcnNVcHBlclJhbmdlID0gJ0EtWlxcXFx4YzAtXFxcXHhkNlxcXFx4ZDgtXFxcXHhkZScsXG4gICAgcnNWYXJSYW5nZSA9ICdcXFxcdWZlMGVcXFxcdWZlMGYnLFxuICAgIHJzQnJlYWtSYW5nZSA9IHJzTWF0aE9wUmFuZ2UgKyByc05vbkNoYXJSYW5nZSArIHJzUHVuY3R1YXRpb25SYW5nZSArIHJzU3BhY2VSYW5nZTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNhcHR1cmUgZ3JvdXBzLiAqL1xudmFyIHJzQXBvcyA9IFwiWydcXHUyMDE5XVwiLFxuICAgIHJzQnJlYWsgPSAnWycgKyByc0JyZWFrUmFuZ2UgKyAnXScsXG4gICAgcnNDb21ibyA9ICdbJyArIHJzQ29tYm9SYW5nZSArICddJyxcbiAgICByc0RpZ2l0cyA9ICdcXFxcZCsnLFxuICAgIHJzRGluZ2JhdCA9ICdbJyArIHJzRGluZ2JhdFJhbmdlICsgJ10nLFxuICAgIHJzTG93ZXIgPSAnWycgKyByc0xvd2VyUmFuZ2UgKyAnXScsXG4gICAgcnNNaXNjID0gJ1teJyArIHJzQXN0cmFsUmFuZ2UgKyByc0JyZWFrUmFuZ2UgKyByc0RpZ2l0cyArIHJzRGluZ2JhdFJhbmdlICsgcnNMb3dlclJhbmdlICsgcnNVcHBlclJhbmdlICsgJ10nLFxuICAgIHJzRml0eiA9ICdcXFxcdWQ4M2NbXFxcXHVkZmZiLVxcXFx1ZGZmZl0nLFxuICAgIHJzTW9kaWZpZXIgPSAnKD86JyArIHJzQ29tYm8gKyAnfCcgKyByc0ZpdHogKyAnKScsXG4gICAgcnNOb25Bc3RyYWwgPSAnW14nICsgcnNBc3RyYWxSYW5nZSArICddJyxcbiAgICByc1JlZ2lvbmFsID0gJyg/OlxcXFx1ZDgzY1tcXFxcdWRkZTYtXFxcXHVkZGZmXSl7Mn0nLFxuICAgIHJzU3VyclBhaXIgPSAnW1xcXFx1ZDgwMC1cXFxcdWRiZmZdW1xcXFx1ZGMwMC1cXFxcdWRmZmZdJyxcbiAgICByc1VwcGVyID0gJ1snICsgcnNVcHBlclJhbmdlICsgJ10nLFxuICAgIHJzWldKID0gJ1xcXFx1MjAwZCc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSByZWdleGVzLiAqL1xudmFyIHJzTWlzY0xvd2VyID0gJyg/OicgKyByc0xvd2VyICsgJ3wnICsgcnNNaXNjICsgJyknLFxuICAgIHJzTWlzY1VwcGVyID0gJyg/OicgKyByc1VwcGVyICsgJ3wnICsgcnNNaXNjICsgJyknLFxuICAgIHJzT3B0Q29udHJMb3dlciA9ICcoPzonICsgcnNBcG9zICsgJyg/OmR8bGx8bXxyZXxzfHR8dmUpKT8nLFxuICAgIHJzT3B0Q29udHJVcHBlciA9ICcoPzonICsgcnNBcG9zICsgJyg/OkR8TEx8TXxSRXxTfFR8VkUpKT8nLFxuICAgIHJlT3B0TW9kID0gcnNNb2RpZmllciArICc/JyxcbiAgICByc09wdFZhciA9ICdbJyArIHJzVmFyUmFuZ2UgKyAnXT8nLFxuICAgIHJzT3B0Sm9pbiA9ICcoPzonICsgcnNaV0ogKyAnKD86JyArIFtyc05vbkFzdHJhbCwgcnNSZWdpb25hbCwgcnNTdXJyUGFpcl0uam9pbignfCcpICsgJyknICsgcnNPcHRWYXIgKyByZU9wdE1vZCArICcpKicsXG4gICAgcnNPcmRMb3dlciA9ICdcXFxcZCooPzoxc3R8Mm5kfDNyZHwoPyFbMTIzXSlcXFxcZHRoKSg/PVxcXFxifFtBLVpfXSknLFxuICAgIHJzT3JkVXBwZXIgPSAnXFxcXGQqKD86MVNUfDJORHwzUkR8KD8hWzEyM10pXFxcXGRUSCkoPz1cXFxcYnxbYS16X10pJyxcbiAgICByc1NlcSA9IHJzT3B0VmFyICsgcmVPcHRNb2QgKyByc09wdEpvaW4sXG4gICAgcnNFbW9qaSA9ICcoPzonICsgW3JzRGluZ2JhdCwgcnNSZWdpb25hbCwgcnNTdXJyUGFpcl0uam9pbignfCcpICsgJyknICsgcnNTZXE7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGNvbXBsZXggb3IgY29tcG91bmQgd29yZHMuICovXG52YXIgcmVVbmljb2RlV29yZCA9IFJlZ0V4cChbXG4gIHJzVXBwZXIgKyAnPycgKyByc0xvd2VyICsgJysnICsgcnNPcHRDb250ckxvd2VyICsgJyg/PScgKyBbcnNCcmVhaywgcnNVcHBlciwgJyQnXS5qb2luKCd8JykgKyAnKScsXG4gIHJzTWlzY1VwcGVyICsgJysnICsgcnNPcHRDb250clVwcGVyICsgJyg/PScgKyBbcnNCcmVhaywgcnNVcHBlciArIHJzTWlzY0xvd2VyLCAnJCddLmpvaW4oJ3wnKSArICcpJyxcbiAgcnNVcHBlciArICc/JyArIHJzTWlzY0xvd2VyICsgJysnICsgcnNPcHRDb250ckxvd2VyLFxuICByc1VwcGVyICsgJysnICsgcnNPcHRDb250clVwcGVyLFxuICByc09yZFVwcGVyLFxuICByc09yZExvd2VyLFxuICByc0RpZ2l0cyxcbiAgcnNFbW9qaVxuXS5qb2luKCd8JyksICdnJyk7XG5cbi8qKlxuICogU3BsaXRzIGEgVW5pY29kZSBgc3RyaW5nYCBpbnRvIGFuIGFycmF5IG9mIGl0cyB3b3Jkcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgd29yZHMgb2YgYHN0cmluZ2AuXG4gKi9cbmZ1bmN0aW9uIHVuaWNvZGVXb3JkcyhzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5tYXRjaChyZVVuaWNvZGVXb3JkKSB8fCBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmljb2RlV29yZHM7XG4iLCJjb25zdCByZXF1ZXN0ID0gZnVuY3Rpb24gKHVybCwgbWV0aG9kLCBkYXRhLCBzdWNjLCBmYWlsLCBoZWFkZXIsIGRhdGFUeXBlKSB7XHJcbiAgd3gucmVxdWVzdCh7XHJcbiAgICB1cmw6IHVybCxcclxuICAgIGRhdGE6IGRhdGEsXHJcbiAgICBkYXRhVHlwZTogZGF0YVR5cGUsXHJcbiAgICBoZWFkZXI6IGhlYWRlcixcclxuICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgaWYgKHN1Y2MpIHN1Y2MocmVzKTtcclxuICAgIH0sXHJcbiAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICBpZiAoZmFpbCkgZmFpbChlcnIpO1xyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgcmVxdWVzdFxyXG59OyJdLCJzb3VyY2VSb290IjoiIn0=