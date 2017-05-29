module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = options.computed || (options.computed = {})
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var listToStyles = __webpack_require__(131)

module.exports = function (parentId, list, isProduction) {
  if (typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
    var context = __VUE_SSR_CONTEXT__
    var styles = context._styles

    if (!styles) {
      styles = context._styles = {}
      Object.defineProperty(context, 'styles', {
        enumberable: true,
        get : function() {
          return (
            context._renderedStyles ||
            (context._renderedStyles = renderStyles(styles))
          )
        }
      })
    }

    list = listToStyles(parentId, list)
    if (isProduction) {
      addStyleProd(styles, list)
    } else {
      addStyleDev(styles, list)
    }
  }
}

// In production, render as few style tags as possible.
// (mostly because IE9 has a limit on number of style tags)
function addStyleProd (styles, list) {
  for (var i = 0; i < list.length; i++) {
    var parts = list[i].parts
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j]
      // group style tags by media types.
      var id = part.media || 'default'
      var style = styles[id]
      if (style) {
        style.ids.push(part.id)
        style.css += '\n' + part.css
      } else {
        styles[id] = {
          ids: [part.id],
          css: part.css,
          media: part.media
        }
      }
    }
  }
}

// In dev we use individual style tag for each module for hot-reload
// and source maps.
function addStyleDev (styles, list) {
  for (var i = 0; i < list.length; i++) {
    var parts = list[i].parts
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j]
      styles[part.id] = {
        ids: [part.id],
        css: part.css,
        media: part.media
      }
    }
  }
}

function renderStyles (styles) {
  var css = ''
  for (var key in styles) {
    var style = styles[key]
    css += '<style data-vue-ssr-id="' + style.ids.join(' ') + '"' +
        (style.media ? ( ' media="' + style.media + '"' ) : '') + '>' +
        style.css + '</style>'
  }
  return css
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("vuex");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_querystring__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_querystring___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_querystring__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_create_api__ = __webpack_require__(36);




var prefix = __WEBPACK_IMPORTED_MODULE_2_create_api__["a" /* default */].prefix;
var isServer = __WEBPACK_IMPORTED_MODULE_2_create_api__["a" /* default */].isServer;

/* harmony default export */ __webpack_exports__["a"] = ({
  fetchItem: function fetchItem(model, param, query) {
    var uri = prefix + '/' + model + '/' + param + '?' + __WEBPACK_IMPORTED_MODULE_1_querystring___default.a.stringify(query);

    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(uri).then(function (resp) {
      var json = resp.data;
      if (isServer) __WEBPACK_IMPORTED_MODULE_2_create_api__["a" /* default */].cache.set(uri, json);
      return json;
    });
  },
  fetchAll: function fetchAll(model, query) {
    var target = prefix + '/' + model;
    var key = target + JSON.stringify(query);

    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(target, { params: query }).then(function (resp) {
      var result = resp.data;
      if (isServer) __WEBPACK_IMPORTED_MODULE_2_create_api__["a" /* default */].cache.set(key, result);
      return result;
    });
  },
  post: function post(model, body) {
    var uri = prefix + '/' + model;
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(uri, body).then(function (resp) {
      return resp.data;
    });
  },
  patch: function patch(model, _ref) {
    var id = _ref.id,
        body = _ref.body;

    var uri = prefix + '/' + model + '/' + id;
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.patch(uri, body).then(function (resp) {
      return resp.data;
    });
  },
  follow_user: function follow_user(userId, action) {
    var uri = prefix + '/user/following/' + userId + '?action=' + action;
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.patch(uri).then(function (resp) {
      return resp.data;
    });
  },
  favorite_topic: function favorite_topic(topicId, action) {
    var uri = prefix + '/user/favorite/' + topicId + '?action=' + action;
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.patch(uri).then(function (resp) {
      return resp.data;
    });
  },
  join_group: function join_group(groupId, action) {
    var uri = prefix + '/user/group/' + groupId + '?action=' + action;

    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.patch(uri).then(function (resp) {
      return resp.data;
    });
  },
  is_following: function is_following(userId) {
    var uri = prefix + '/user/is_following/' + userId;
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(uri).then(function (resp) {
      return resp.data;
    });
  },
  is_favorited: function is_favorited(topicId) {
    var uri = prefix + '/topic/is_favorited/' + topicId;
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(uri).then(function (resp) {
      return resp.data;
    });
  },
  cdnToken: function cdnToken(name) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(prefix + '/cdn/token?name=' + name).then(function (resp) {
      return resp.data;
    });
  },
  cdnImgUpload: function cdnImgUpload(key, file, token) {
    var formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('key', key);
    formData.append('token', token);
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('//up.qbox.me/', formData).then(function (res) {
      return res.data;
    });
  },
  cdnVideoUpload: function cdnVideoUpload(key, file, token) {}
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export markedTOC */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return marked; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_marked__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_marked___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_marked__);



var renderer = new __WEBPACK_IMPORTED_MODULE_0_marked___default.a.Renderer();
var markedTOC = [];

renderer.heading = function (text, level) {
  var slug = text.toLowerCase().replace(/\s+/g, '-');
  markedTOC.push({
    level: level,
    slug: slug,
    title: text
  });
  return '<h' + level + '><a href=\'#' + slug + '\' id=\'' + slug + '\' class=\'anchor\'></a><a href=\'#' + slug + '\'>' + text + '</a></h' + level + '>';
};

var marked = function marked(text) {
  var tok = __WEBPACK_IMPORTED_MODULE_0_marked___default.a.lexer(text);
  text = __WEBPACK_IMPORTED_MODULE_0_marked___default.a.parser(tok).replace(/<pre>/ig, '<pre class="hljs">');
  return text;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {



exports.popupCenter = function (uri, w, h) {
  var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
  var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

  var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  var left = width / 2 - w / 2 + dualScreenLeft;
  var top = height / 2 - h / 2 + dualScreenTop;

  var win = window.open(uri, '_blank', 'width=' + w + ',height=' + h + ',top=' + top + ', left=' + left + ',\n\t\t\tdirectories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no');
  win.focus();
};

exports.fileReader = function (file, options) {
  options = options || {};
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();

    reader.onload = function () {
      resolve(reader);
    };
    reader.onerror = reject;

    if (options.accept && !new RegExp(options.accept).test(file.type)) {
      reject({
        code: 400,
        note: 'wrong file type'
      });
    }

    if (!file.type || /^text\//i.test(file.type)) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  });
};

exports.ifBtm = function () {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var dist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return el.innerHeight + el.scrollY >= document.body.scrollHeight - dist;
};

exports.smoothScroll = function (x, y) {
  var dom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;

  var isRoot = dom === window;
  var cY = isRoot ? window.scrollY : dom.scrollTop;
  var cX = isRoot ? window.scrollX : dom.scrollLeft;
  var sh = dom.scrollHeight;
  var dY = (cY - y) / 30;
  var dX = (cX - x) / 30;
  setTimeout(function () {
    requestAnimationFrame(fnScroll);
  }, 0);

  function fnScroll() {
    if (Math.abs(cY - y) > 0.1 || Math.abs(cX - x) > 0.1) {
      cY -= dY;
      cX -= dX;
      if (isRoot) {
        dom.scrollTo(cX, cY);
      } else {
        dom.scrollTop = cY;
        dom.scrollLeft = cX;
      }
      requestAnimationFrame(fnScroll);
    }
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(120)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(98),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return app; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__filters__ = __webpack_require__(33);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__router__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__store__["a"]; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__["sync"])(__WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__router__["a" /* default */]);

Object.keys(__WEBPACK_IMPORTED_MODULE_5__filters__).forEach(function (k) {
  return __WEBPACK_IMPORTED_MODULE_0_vue___default.a.filter(k, __WEBPACK_IMPORTED_MODULE_5__filters__[k]);
});

var app = _extends({
  router: __WEBPACK_IMPORTED_MODULE_3__router__["a" /* default */],
  store: __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */]
}, __WEBPACK_IMPORTED_MODULE_1__App_vue___default.a);



__WEBPACK_IMPORTED_MODULE_3__router__["a" /* default */].beforeEach(function (to, from, next) {
  var matched_rules = to.matched.find(function (record) {
    return record.meta.auth;
  });
  if (matched_rules) {
    var required = matched_rules.meta.auth;
    var login_user = __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].state.login_user;
    if (required === 'guest') {
      if (!login_user._id) next({
        path: '/login',
        query: { redirect: to.fullPath }
      });else next();
    } else if (required === 'editor') {
      if (login_user._id && login_user.role === 'editor') next();else next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_widget_NavBar_vue__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_widget_NavBar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_widget_NavBar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_widget_Footer_vue__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_widget_Footer_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_widget_Footer_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_widget_Dialog_vue__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_widget_Dialog_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_widget_Dialog_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);






/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'app',
	components: { NavBar: __WEBPACK_IMPORTED_MODULE_0__components_widget_NavBar_vue___default.a, FootBar: __WEBPACK_IMPORTED_MODULE_1__components_widget_Footer_vue___default.a, WDialog: __WEBPACK_IMPORTED_MODULE_2__components_widget_Dialog_vue___default.a },
	beforeMount: function beforeMount() {
		var _this = this;

		var token = window.localStorage.token;
		if (!token) return;
		__WEBPACK_IMPORTED_MODULE_3_axios___default.a.interceptors.request.use(function (config) {
			if (__WEBPACK_IMPORTED_MODULE_3_axios___default.a.method === 'get') return config;
			config.headers['authorization'] = token;
			return config;
		}, function (error) {
			return Promise.reject(error);
		});

		__WEBPACK_IMPORTED_MODULE_3_axios___default.a.get('/api/verify_token').then(function (resp) {
			if (resp.data.code > 200) return;
			_this.$store.dispatch('login', resp.data.data);
			return resp.data.data;
		}).then(function (data) {});
	}
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_marked__ = __webpack_require__(6);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




/* harmony default export */ __webpack_exports__["default"] = ({

	data: function data() {
		return {
			content: '',
			type: 'text',
			action: 'create',
			replyTo: 'Topic'
		};
	},
	computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])(['reply_curr', 'login_user', 'topic_curr'])),
	watch: {
		'reply_curr': function reply_curr() {
			if (this.reply_curr.replyToUsername) {
				this.content = '';
				this.type = 'text';
				this.replyTo = this.reply_curr.replyToUsername;
				this.action = 'create';
			} else if (this.reply_curr.type) {
				this.content = this.reply_curr.content;
				this.type = this.reply_curr.type;
				this.replyTo = 'Topic';
				this.action = 'update';
			} else {
				this.content = '';
				this.type = 'text';
				this.replyTo = 'Topic';
				this.action = 'create';
			}
			document.querySelector('.edit-reply-box textarea').focus();
		}
	},
	methods: {
		switchType: function switchType() {
			if (this.type === 'text') this.type = 'marked';else this.type = 'text';
		},
		replyTopic: function replyTopic() {
			var _this = this;

			if (this.login_user._id) {
				if (this.content === '') return this.$store.dispatch('logger', { code: 400, note: 'empty reply content' });
				var id = void 0;
				var body = {
					content: this.content,
					type: this.type,
					topicId: this.topic_curr._id
				};
				if (this.reply_curr.replyToUsername) body.replyToUsername = this.reply_curr.replyToUsername;
				if (this.action === 'update') id = this.reply_curr._id;

				this.$store.dispatch(this.action + '_reply', { id: id, body: body }).then(function (res) {
					if (res.code > 200) return;
					_this.content = '';
					_this.type = '';
					_this.$store.dispatch('edit_reply');
					var criteria = { topicId: body.topicId };
					return _this.$store.dispatch('fetch_topic_replys', { criteria: criteria });
				});
			} else {
				sessionStorage.redirect = location.href;
				sessionStorage.info = 'You need to login to reply a topic.';
				this.$router.push('/login');
			}
		}
	}
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuex__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['e', 'topicId'],
  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])(['login_user', 'user_curr']))
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_marked__ = __webpack_require__(6);



/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['e', 'author', 'mode'],
  computed: {
    login_user: function login_user() {
      return this.$store.getters.login_user;
    },
    avatar: function avatar() {
      return this.e.authorInfo.avatar;
    },
    username: function username() {
      return this.e.authorInfo.username;
    },
    content: function content() {
      return this.e.type === 'text' ? this.e.content : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_marked__["a" /* marked */])(this.e.content);
    }
  },
  methods: {
    replyTo: function replyTo(username) {
      this.$store.dispatch('reply_reply', username);
    },
    editReply: function editReply(id) {
      this.$store.dispatch('edit_reply', id);
    }
  }
});

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['e', 'mode']
});

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['e']
});

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['e', 'topic']
});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuex__);
var _name$data$computed$w;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


/* harmony default export */ __webpack_exports__["default"] = (_name$data$computed$w = {
  name: 'widget-dialog',
  data: function data() {
    return {
      tag: { name: '', path: '' },
      category: { name: '', path: '' }
    };
  },
  computed: {
    call: function call() {
      return this.$refs.add_category;
    }
  },
  watch: {
    'tag.name': function tagName() {
      this.tag.path = this.tag.name.toLowerCase().replace(/\s+/g, '-');
    },
    'category.name': function categoryName() {
      this.category.path = this.category.name.toLowerCase().replace(/\s+/g, '-');
    }
  }
}, _name$data$computed$w['computed'] = _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])(['dialog', 'tag_list', 'category_list'])), _name$data$computed$w.methods = {
  addTag: function addTag() {
    var _this = this;

    var name = this.tag.name,
        path = this.tag.path;
    this.$store.dispatch('create_tag', { name: name, path: path }).then(function (res) {
      if (res.code > 200) {
        _this.$store.dispatch('fetch_tags');
        _this.tag.name = '';
        _this.closeDialog();
      }
    });
  },
  addCategory: function addCategory() {
    var _this2 = this;

    var name = this.category.name,
        path = this.category.path;
    this.$store.dispatch('create_category', { name: name, path: path }).then(function (res) {
      if (res.code > 200) {
        _this2.category.name = '';
        _this2.$store.dispatch('fetch_categories');
        _this2.closeDialog();
      }
    });
  },
  closeDialog: function closeDialog() {
    this.$store.dispatch('dialog', '');
  }
}, _name$data$computed$w);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'foot-bar'
});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuex__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'nav-bar',
	data: function data() {
		return {
			show_user_list: false,
			show_notice_list: false
		};
	},
	computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])(['login_user', 'message_list'])),
	watch: {
		'$route.path': function $routePath() {
			this.show_user_list = false;
		}
	},
	methods: {
		toggleUserList: function toggleUserList() {
			this.show_user_list = !this.show_user_list;
		},
		toggleNoticeList: function toggleNoticeList() {
			this.show_notice_list = !this.show_notice_list;
		}
	}
});

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'page-404'
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_dom__);



/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'page-login',
	data: function data() {
		return {
			msg: ''
		};
	},
	methods: {
		login: function login(vendor) {
			var w = 600,
			    h = 400;
			var uri = 'https://' + location.host + '/api/auth/' + vendor;
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_dom__["popupCenter"])(uri, w, h);
		}
	},
	mounted: function mounted() {
		if (this.$route.query.redirect) {
			window.sessionStorage.redirect = this.$route.query.redirect;
		}
		this.msg = window.sessionStorage.info;
	}
});

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'page-logout',
	methods: {
		logout: function logout() {
			localStorage.removeItem('token');
			location.href = '/';
		}
	},
	beforeMount: function beforeMount() {
		this.logout();
	}
});

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
	name: ''
});

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
	name: ''
});

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_marked__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__utils_dom__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





function preFetch(store) {
	var path = store.state.route.params.path;
	if (path) {
		return Promise.all([store.dispatch('fetch_topic', { path: path, query: { origin: true } }), store.dispatch('fetch_categories'), store.dispatch('fetch_tags')]);
	} else {
		return Promise.all([store.dispatch('fetch_categories'), store.dispatch('fetch_tags')]);
	}
}

/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			title: '',
			path: '',
			thumbnail: '',
			dyn_thumbnail: '',
			content: '',
			type: 'md',

			toc: '',
			top: false,
			allowComment: true,
			hidden: false,

			category: '',
			selectedTags: [],

			enableToc: true,
			mode: 1,

			imgFiles: [],
			imgsBase64: [],
			imgsUrl: [],
			uploadQueue: [],
			foldUpload: false
		};
	},
	watch: {
		thumbnail: function thumbnail() {
			this.dyn_thumbnail = this.thumbnail;
		},
		'$route.params.path': function $routeParamsPath() {
			this.title = '';
			this.path = '';
			this.thumbnail = '';
			this.category = '';
			this.selectedTags = [];
			this.content = '';
			this.toc = '';
			this.top = false;
			this.allowComment = true;
			this.hidden = false;

			this.enableToc = true;
			this.mode = 1;
		}
	},
	computed: _extends({
		preview_content: function preview_content() {
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_marked__["a" /* marked */])(this.content);
		},
		categories: function categories() {
			return this.$store.getters.category_list;
		},
		tags: function tags() {
			return this.$store.getters.tag_list;
		},
		authorId: function authorId() {
			return this.$store.getters.login_user._id;
		},
		topicPath: function topicPath() {
			return this.$route.params.path;
		}
	}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])(['topic_curr', 'login_user'])),
	methods: {
		onFile: function onFile(ev) {
			var _this = this;

			var files = ev.target.files;
			var i = files.length - 1;
			var file = files[i];
			var name = new Date().toISOString().substr(0, 10).replace('-', '') + '/' + file.name;
			this.uploadQueue.push(1);
			var item = void 0;
			var width = void 0,
			    height = void 0;
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_dom__["fileReader"])(file).then(function (e) {
				_this.imgsBase64.push(e.result);
				return _this.$store.dispatch('cdn_token', name);
			}).then(function (res) {
				if (res.code > 200) return;
				item = {
					file: file, name: name,
					token: res.data.token,
					key: res.data.key,
					host: res.data.host
				};
				_this.imgFiles.push(item);
				return item;
			}).then(function (e) {
				return _this.$store.dispatch('cdn_img_upload', {
					key: e.key,
					file: e.file,
					token: e.token
				});
			}).then(function (res) {
				if (res.key) {
					var uri = _this.imgFiles[0].host + res.key;
					_this.imgsUrl.push(uri);
					_this.uploadQueue.pop();
					_this.content += '<p class="center"><img src="' + uri + '"></p>';
					var $preview = _this.$refs.preview;
					_this.$nextTick(function () {
						__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_dom__["smoothScroll"])(0, $preview.scrollHeight, $preview);
					});
				} else {}
			}).catch(function (e) {
				console.error(e);
			});
		},
		upload: function upload() {
			this.$refs.file.click();
		},
		setThumbnail: function setThumbnail(i) {
			this.thumbnail = this.thumbnail === this.imgsUrl[i] ? '' : this.imgsUrl[i];
		},
		removeImage: function removeImage(i) {
			this.imgsBase64.splice(i, 1);
		},
		switchCategory: function switchCategory(cate) {
			this.category = cate;
		},
		addTag: function addTag(id) {
			var i = this.selectedTags.indexOf(id);
			if (i > -1) this.selectedTags.splice(i, 1);else this.selectedTags.push(id);
		},
		save: function save() {
			var item = void 0;
			if (this.topic_curr._id) item = 'edit_topic_' + this.topic_curr._id;else item = 'new_topic';
			localStorage[item] = JSON.stringify({
				title: this.title,
				path: this.path,
				mode: this.mode,
				content: this.content,

				thumbnail: this.thumbnail,
				category: this.category,
				selectedTags: this.selectedTags,

				top: this.top,
				enableToc: this.enableToc,
				allowComment: this.allowComment,
				hidden: this.hidden

			});
		},
		publish: function publish() {
			var body = {
				title: this.title,
				path: this.path,
				authorId: this.authorId,
				content: this.content,

				thumbnail: this.thumbnail,
				category: this.category,
				tags: this.selectedTags,

				top: this.top,
				allowComment: this.allowComment,
				hidden: this.hidden
			};

			if (this.enableToc) body.toc = this.toc;

			if (this.topicPath) {
				var id = this.topic_curr._id;
				return this.$store.dispatch('update_topic', { id: id, body: body }).then(this.published);
			} else {
				return this.$store.dispatch('create_topic', body).then(this.published);
			}
		},
		published: function published(res) {
			if (res.code > 200) return this.$store.dispatch('logger', res);

			if (this.topic_curr._id) localStorage.removeItem('edit_topic_' + this.topic_curr._id);else localStorage.removeItem('new_topic');
			this.$store.dispatch('logger', res);
			this.$router.push('/topic/' + this.path);
		},
		openDialog: function openDialog(name) {
			this.$store.dispatch('dialog', name);
		},
		loadTopicFields: function loadTopicFields(o) {
			this.title = o.title;
			this.path = o.path;
			this.thumbnail = o.thumbnail;
			this.mode = o.mode || 1;
			this.content = o.content;

			this.category = o.category;
			this.selectedTags = o.selectedTags || o.tags;

			this.top = o.top;
			this.enableToc = o.enableToc;
			this.hidden = o.hidden;
		},
		loadExistingTopicFields: function loadExistingTopicFields(store) {
			var topic_curr = store.getters.topic_curr;
			var ls = void 0;
			if (!topic_curr._id) {
				ls = localStorage['new_topic'];
			} else {
				ls = localStorage['edit_topic_' + topic_curr._id];
			}
			if (ls) {
				try {
					this.loadTopicFields(JSON.parse(ls));
				} catch (e) {
					console.log(e);
					this.loadTopicFields(topic_curr);
				}
			} else this.loadTopicFields(topic_curr);
		}
	},
	beforeMount: function beforeMount() {
		var _this2 = this;

		var path = this.$route.params.path;
		preFetch(this.$store).then(function () {
			if (path) _this2.loadExistingTopicFields(_this2.$store);
		});
	}
});

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuex__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function preFetch(store) {}
/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			displayName: '',
			bio: ''
		};
	},
	computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])(['user_curr', 'login_user'])),
	methods: {
		update: function update() {
			var _this = this;

			var id = this.user_curr._id;
			var body = {
				bio: this.bio
			};
			this.$store.dispatch('update_user', { id: id, body: body }).then(function (res) {
				if (res.code > 200) return;else _this.$store.dispatch('update_token');
			});
		}
	},
	beforeMount: function beforeMount() {
		var _this2 = this;

		if (!this.$route.params.username) this.$router.push('/404');

		this.$store.dispatch('fetch_user', this.$route.params.username).then(function (res) {
			if (res.code > 200 || !res.data._id) {
				console.log(res);
			}
			_this2.bio = _this2.user_curr.bio;
		});
	}
});

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
	name: ''
});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
	name: ''
});

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_listItem_Reply_vue__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_listItem_Reply_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_listItem_Reply_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_item_UserBox_vue__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_item_UserBox_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_item_UserBox_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_item_EditReply_vue__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_item_EditReply_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_item_EditReply_vue__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






function preFetch(store) {
	var path = store.state.route.params.path;
	return store.dispatch('fetch_topic', { path: path }).then(function (res) {
		if (res.code > 399) return;
		var topicId = res.data._id;
		var username = res.data.authorInfo.username;
		if (username && topicId) return Promise.all([store.dispatch('fetch_topic_replys', { criteria: { topicId: topicId } })]);
	});
}

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'view-topic',
	components: { ReplyItem: __WEBPACK_IMPORTED_MODULE_1__components_listItem_Reply_vue___default.a, UserBox: __WEBPACK_IMPORTED_MODULE_2__components_item_UserBox_vue___default.a, EditReply: __WEBPACK_IMPORTED_MODULE_3__components_item_EditReply_vue___default.a },
	metaInfo: function metaInfo() {
		return {
			title: this.topic_curr.title,
			meta: [{ name: 'description', content: 'topic_curr.summary' }]
		};
	},

	preFetch: preFetch,
	computed: _extends({
		liked: function liked() {
			return this.login_user && this.topic_curr.likedUsers.includes(this.login_user._id);
		}
	}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])(['topic_curr', 'topic_prev', 'topic_next', 'topic_curr_replys', 'login_user', 'reply_list'])),
	watch: {
		'$route.params.path': function $routeParamsPath() {
			return preFetch(this.$store);
		}
	},
	methods: {
		favoriteTopic: function favoriteTopic() {
			var _this = this;

			if (this.login_user) {
				var id = this.topic_curr._id;
				var action = this.liked ? 'unfavorite' : 'favorite';
				this.$store.dispatch('favorite_topic', { id: id, action: action }).then(function (res) {
					if (res > 200) return;
					var userId = _this.login_user._id;
					_this.$store.dispatch('_favorite_topic', { userId: userId, action: action });
				});
			} else {
				sessionStorage.redirect = location.href;
				sessionStorage.info = 'You need to login to like your favorite topics.';
				this.$router.push('/login');
			}
		},
		openShareBox: function openShareBox() {}
	},
	beforeMount: function beforeMount() {
		var _this2 = this;

		if (this.$root._isMounted) {
			preFetch(this.$store).then(function () {
				if (!_this2.topic_curr._id) _this2.$router.push('/404');
			});
		} else {
			if (!this.topic_curr._id) this.$router.push('/404');
		}
	},
	mounted: function mounted() {
		if (typeof twttr !== 'undefined' && /twitter-tweet/.test(this.topic_curr.content)) twttr.widgets.load();
		if (typeof instgrm !== 'undefined' && /instagram-media/.test(this.topic_curr.content)) instgrm.Embeds.process();
	}
});

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_listItem_Topic_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_listItem_Topic_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_listItem_Topic_vue__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




function preFetch(store) {
	var path = store.state.route.params.path;
	var page = parseInt(store.state.route.query.page) || 1;
	var skip = (page - 1) * 30;
	var sort = JSON.stringify({ top: -1, _id: -1 });
	return Promise.all([store.dispatch('fetch_categories'), store.dispatch('fetch_topics', { skip: skip, sort: sort }), store.dispatch('fetch_topics', { skip: skip + 30, sort: sort, count: true })]);
}

/* harmony default export */ __webpack_exports__["default"] = ({
	components: { TopicItem: __WEBPACK_IMPORTED_MODULE_1__components_listItem_Topic_vue___default.a },
	metaInfo: function metaInfo() {
		return {
			title: 'topic list'
		};
	},

	data: function data() {
		return {
			curr_category: null
		};
	},
	watch: {
		'curr_category': function curr_category() {
			var criteria = void 0;
			if (this.curr_category) criteria = { category: this.curr_category._id };
			this.$store.dispatch('fetch_topics', criteria ? { criteria: criteria } : { sort: JSON.stringify({ top: -1, _id: -1 }) });
		}
	},
	preFetch: preFetch,
	computed: _extends({
		page: function page() {
			return this.$route.query.page;
		}
	}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])(['topic_list', 'category_list', 'topic_list_next'])),
	methods: {
		switchCategory: function switchCategory(cate) {
			this.curr_category = cate;
		}
	},
	beforeMount: function beforeMount() {
		this.$root._isMounted && preFetch(this.$store);
	}
});

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_listItem_Topic_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_listItem_Topic_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_listItem_Topic_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_listItem_User_vue__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_listItem_User_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_listItem_User_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_listItem_UserReply_vue__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_listItem_UserReply_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_listItem_UserReply_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vuex__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






function preFetch(store) {
	var username = store.state.route.params.username;

	return store.dispatch('fetch_user', username).then(function (res) {
		return store.dispatch('fetch_user_topics');
	});
}

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'view-user',
	components: { TopicItem: __WEBPACK_IMPORTED_MODULE_0__components_listItem_Topic_vue___default.a, UserItem: __WEBPACK_IMPORTED_MODULE_1__components_listItem_User_vue___default.a, UserReplyItem: __WEBPACK_IMPORTED_MODULE_2__components_listItem_UserReply_vue___default.a },
	preFetch: preFetch,
	data: function data() {
		return {
			tab_curr: 'topic'
		};
	},
	computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_vuex__["mapGetters"])(['user_curr', 'user_curr_topics', 'user_curr_replys', 'user_curr_favorites', 'user_curr_followings', 'user_curr_followers', 'login_user']), {
		is_following: function is_following() {
			return this.$store.getters.user_curr_is_following;
		}
	}),
	watch: {
		'$route.params.username': function $routeParamsUsername() {
			this.tab_curr = 'topic';
			return preFetch(this.$store);
		}
	},
	methods: {
		switchTab: function switchTab(e) {
			if (this.tab_curr !== e) {
				this.tab_curr = e;
				return this.$store.dispatch('fetch_user_' + e + 's');
			}
		},
		followUser: function followUser() {
			var _this = this;

			if (!this.login_user._id) {
				sessionStorage.redirect = location.href;
				sessionStorage.info = 'You need to login to follow the user.';
				this.$router.push('/login');
			} else {
				var _id = this.user_curr._id;
				return this.$store.dispatch('follow_user', { id: _id, action: this.is_following ? 'unfollow' : 'follow' }).then(function (res) {
					if (res.code === 200) {
						_this.$store.dispatch('is_following', { id: _id });
						_this.$store.dispatch('fetch_user_followers');
					}
				});
			}
		}
	},
	beforeMount: function beforeMount() {
		var _this2 = this;

		if (this.$root._isMounted) {
			preFetch(this.$store).then(function () {
				if (!_this2.user_curr._id) _this2.$router.push('/404');
			});
		} else {
			if (!this.user_curr._id) this.$router.push('/404');
		}
	},
	mounted: function mounted() {
		if (this.login_user._id && this.user_curr._id && this.login_user._id !== this.user_curr._id) return store.dispatch('is_following', { id: id });
	}
});

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["host"] = host;
/* harmony export (immutable) */ __webpack_exports__["ellipsis"] = ellipsis;
/* harmony export (immutable) */ __webpack_exports__["fileName"] = fileName;
/* harmony export (immutable) */ __webpack_exports__["ts2timeAgo"] = ts2timeAgo;
/* harmony export (immutable) */ __webpack_exports__["std2timeAgo"] = std2timeAgo;
/* harmony export (immutable) */ __webpack_exports__["ts2hiDdmy"] = ts2hiDdmy;
/* harmony export (immutable) */ __webpack_exports__["std2hiDdmy"] = std2hiDdmy;
/* harmony export (immutable) */ __webpack_exports__["fmtNum"] = fmtNum;
function host(url) {
  var host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  var parts = host.split('.').slice(-3);
  if (parts[0] === 'www') parts.shift();
  return parts.join('.');
}
function ellipsis(str) {
  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;

  var suffix = str.length > len ? '...' : '';
  return str.slice(0, len) + suffix;
}

function fileName(url) {
  return url.substr(url.lastIndexOf('/') + 1);
}

function ts2timeAgo(time) {
  var between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), ' min');
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hr');
  } else {
    return pluralize(~~(between / 86400), ' day');
  }
}

function std2timeAgo(time) {
  return ts2timeAgo(new Date(time).getTime() / 1000);
}

function ts2hiDdmy(ts) {
  if (!ts) return '';
  var s = new Date(ts).toString();
  return s.substr(16, 5) + ', ' + s.substr(8, 3) + ' ' + s.substr(4, 4) + ' ' + s.substr(11, 4);
}
function std2hiDdmy(time) {
  if (!time) return '';
  return ts2hiDdmy(new Date(time).getTime());
}

function fmtNum(n) {
  if (n < 1000) return n;
  if (n > 1000000) return (n / 1000000).toFixed(1) + 'm';
  var sn = n / 1000;
  if (sn < 10) return sn.toFixed(2) + 'k';
  if (sn < 100) return sn.toFixed(1) + 'k';
  return Math.floor(sn) + 'k';
}

function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label + 's';
}

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_404_vue__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_404_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__pages_404_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_vue__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__pages_login_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_logout_vue__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_logout_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__pages_logout_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_tags_vue__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_tags_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__views_tags_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_tag_vue__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_tag_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__views_tag_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_categories_vue__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_categories_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__views_categories_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__views_category_vue__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__views_category_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__views_category_vue__);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router___default.a);











var ViewUser =  false ? function () {
  return System.import('../views/user.vue');
} : __webpack_require__(87);
var EditUser =  false ? function () {
  return System.import('../views/edit_user.vue');
} : __webpack_require__(82);

var ViewTopics =  false ? function () {
  return System.import('../views/topics.vue');
} : __webpack_require__(86);
var ViewTopic =  false ? function () {
  return System.import('../views/topic.vue');
} : __webpack_require__(85);
var EditTopic =  false ? function () {
  return System.import('../views/edit_topic.vue');
} : __webpack_require__(81);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router___default.a({
  mode: 'history',
  scrollBehavior: function scrollBehavior(to, from, saved) {
    if (saved) return saved;
    return to.hash ? { selector: to.hash } : { x: 0, y: 0 };
  },
  routes: [{ path: '/', name: 'view-home-topics', component: ViewTopics }, { path: '/login', name: 'page-login', component: __WEBPACK_IMPORTED_MODULE_3__pages_login_vue___default.a }, { path: '/logout', name: 'page-logout', component: __WEBPACK_IMPORTED_MODULE_4__pages_logout_vue___default.a }, { path: '/user/:username', name: 'view-user', component: ViewUser }, { path: '/edit/user/:username', name: 'edit-user', component: EditUser }, { path: '/create/topic', name: 'create-topic', component: EditTopic }, { path: '/edit/topic/:path', name: 'edit-topic', component: EditTopic }, { path: '/topic', name: 'view-topics', component: ViewTopics }, { path: '/topic/:path', name: 'view-topic', component: ViewTopic }, { path: '/tag', name: 'view-tags', component: __WEBPACK_IMPORTED_MODULE_5__views_tags_vue___default.a }, { path: '/tag/:path', name: 'view-tag', component: __WEBPACK_IMPORTED_MODULE_6__views_tag_vue___default.a }, { path: '/404', name: 'page-404', component: __WEBPACK_IMPORTED_MODULE_2__pages_404_vue___default.a }, { path: '*', name: 'page-redirect-404', component: __WEBPACK_IMPORTED_MODULE_2__pages_404_vue___default.a }]
}));

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app__ = __webpack_require__(10);



var _app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__app__["a" /* app */]);
var isDev = "production" !== 'production';

var meta = _app.$meta();

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var s = isDev && Date.now();

  __WEBPACK_IMPORTED_MODULE_1__app__["b" /* router */].push(context.url);
  context.meta = meta;
  var matchedComponents = __WEBPACK_IMPORTED_MODULE_1__app__["b" /* router */].getMatchedComponents();

  if (!matchedComponents.length) {
    return Promise.reject({ code: '404' });
  }

  return Promise.all(matchedComponents.map(function (component) {
    if (component.preFetch) {
      return component.preFetch(__WEBPACK_IMPORTED_MODULE_1__app__["c" /* store */]);
    }
  })).then(function () {
    isDev && console.log('data pre-fetch: ' + (Date.now() - s) + 'ms');

    context.initialState = __WEBPACK_IMPORTED_MODULE_1__app__["c" /* store */].state;
    return _app;
  });
});

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lru_cache__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lru_cache___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lru_cache__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_package__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_package___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_package__);



var isProd = "production" === 'production';

var api = void 0;
if (process.__API__) {
  api = process.__API__;
} else {
  api = process.__API__ = {
    prefix: 'http://127.0.0.1:8000/api',
    isServer: true,
    cache: __WEBPACK_IMPORTED_MODULE_0_lru_cache___default()({
      max: 1000,
      maxAge: 1000 * 60 * 15 })
  };
}

/* harmony default export */ __webpack_exports__["a"] = (api);

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_user__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_topic__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_reply__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_category__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_tag__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_widget__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_message__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__api__ = __webpack_require__(4);












__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex___default.a);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vuex___default.a.Store({
  modules: { user: __WEBPACK_IMPORTED_MODULE_2__modules_user__["a" /* default */], topic: __WEBPACK_IMPORTED_MODULE_3__modules_topic__["a" /* default */], reply: __WEBPACK_IMPORTED_MODULE_4__modules_reply__["a" /* default */], category: __WEBPACK_IMPORTED_MODULE_5__modules_category__["a" /* default */], tag: __WEBPACK_IMPORTED_MODULE_6__modules_tag__["a" /* default */], message: __WEBPACK_IMPORTED_MODULE_8__modules_message__["a" /* default */], widget: __WEBPACK_IMPORTED_MODULE_7__modules_widget__["a" /* default */] },
  state: {
    loading: false,
    progress: 0,
    login_user: {},
    logs: [],
    flash: [],
    ws: null
  },
  getters: {
    login_user: function login_user(state) {
      return state.login_user;
    },
    logs: function logs(state) {
      return state.logs;
    },
    flash: function flash(state) {
      return state.flash;
    }
  },
  actions: {
    login: function login(_ref, user) {
      var commit = _ref.commit;

      commit('LOGIN', user);
      return user;
    },
    logout: function logout(_ref2) {
      var commit = _ref2.commit;

      commit('LOGOUT');
    },
    logger: function logger(_ref3, res) {
      var commit = _ref3.commit;

      commit('LOG', res);
    },
    clear_flash: function clear_flash(_ref4) {
      var commit = _ref4.commit;

      commit('CLEAR_FLASH');
    },
    cdn_token: function cdn_token(_ref5, name) {
      var commit = _ref5.commit;

      return __WEBPACK_IMPORTED_MODULE_9__api__["a" /* default */].cdnToken(name);
    },
    cdn_img_upload: function cdn_img_upload(_ref6, _ref7) {
      var commit = _ref6.commit;
      var key = _ref7.key,
          file = _ref7.file,
          token = _ref7.token;

      return __WEBPACK_IMPORTED_MODULE_9__api__["a" /* default */].cdnImgUpload(key, file, token);
    },
    ws_connect: function ws_connect(_ref8, ws) {
      var commit = _ref8.commit;

      commit('WS_CONNECT', ws);
    }
  },
  mutations: {
    LOGIN: function LOGIN(state, user) {
      state.login_user = user;
    },
    LOGOUT: function LOGOUT(state) {
      state.login_user = null;
    },
    LOG: function LOG(state, res) {
      state.logs.push(res);
      state.flash.push(res);
      setTimeout(function () {
        var i = state.flash.indexOf(res) > -1;
        if (i) state.flash.splice(i, 1);
      }, 5000);
    },
    CLEAR_FLASH: function CLEAR_FLASH(state) {
      state.flash = [];
    },
    WS_CONNECT: function WS_CONNECT(state, ws) {
      state.ws = ws;
    }
  }
}));

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api__ = __webpack_require__(4);


/* harmony default export */ __webpack_exports__["a"] = ({
  state: {
    list: []
  },
  getters: {
    category_list: function category_list(state) {
      return state.list;
    }
  },
  actions: {
    fetch_categories: function fetch_categories(_ref) {
      var commit = _ref.commit;
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].fetchAll('category', query).then(function (res) {
        commit('CATEGORY_SET_LIST', res);
        return res;
      });
    },
    create_category: function create_category(_ref2, body) {
      var commit = _ref2.commit;

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].post('category', body).then(function (res) {
        commit('LOG', res);
        return res;
      });
    }
  },
  mutations: {
    CATEGORY_SET_LIST: function CATEGORY_SET_LIST(state, _ref3) {
      var code = _ref3.code,
          data = _ref3.data;

      if (code === 200 && data.length) state.list = data;else state.list = [];
    }
  }
});

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api__ = __webpack_require__(4);


/* harmony default export */ __webpack_exports__["a"] = ({
  state: {
    list: []
  },
  getters: {
    message_list: function message_list(state) {
      return state.list;
    }
  },
  actions: {
    fetch_messages: function fetch_messages(_ref, recieverId) {
      var commit = _ref.commit;
      var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      query.criteria = query.criteria || { beRead: false };
      query.limit = query.limit || 11;
      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].fetchItem('message', recieverId, query).then(function (res) {
        commit('MESSAGE_SET_LIST', res);
        return res;
      });
    },
    read_message: function read_message(_ref2, id) {
      var commit = _ref2.commit;

      var body = { beRead: true };
      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].patch('message', { id: id, body: body }).then(function (res) {
        commit('MESSAGE_READ_ONE', id);
        return res;
      });
    }
  },
  mutations: {
    MESSAGE_SET_LIST: function MESSAGE_SET_LIST(state, _ref3) {
      var code = _ref3.code,
          data = _ref3.data;

      if (code === 200 && data.length) state.list = data;else state.list = [];
    },
    MESSAGE_READ_ONE: function MESSAGE_READ_ONE(state, id) {
      var i = state.list.findIndex(function (e) {
        return e._id === id;
      });
      state.list.splice(i, 1);
    }
  }
});

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api__ = __webpack_require__(4);


/* harmony default export */ __webpack_exports__["a"] = ({
  state: {
    curr: {}
  },
  getters: {
    reply_curr: function reply_curr(state) {
      return state.curr;
    },
    reply_list: function reply_list(state) {
      return state.list;
    }
  },
  actions: {
    create_reply: function create_reply(_ref, _ref2) {
      var commit = _ref.commit;
      var body = _ref2.body;

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].post('reply', body).then(function (res) {
        res.name = 'create_reply';
        commit('LOG', res);
        return res;
      });
    },
    update_reply: function update_reply(_ref3, _ref4) {
      var commit = _ref3.commit;
      var id = _ref4.id,
          body = _ref4.body;

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].patch('reply', { id: id, body: body }).then(function (res) {
        res.name = 'update_reply (' + id + ')';
        commit('LOG', res);
        return res;
      });
    },
    reply_reply: function reply_reply(_ref5, username) {
      var commit = _ref5.commit;

      commit('REPLY_REPLY', username);
    },
    edit_reply: function edit_reply(_ref6, id) {
      var commit = _ref6.commit,
          rootState = _ref6.rootState;

      var list = rootState.topic.curr_replys;
      if (list.length && id) {
        commit('EDIT_REPLY', { list: list, id: id });
      }
    }
  },
  mutations: {
    REPLY_SET_LIST: function REPLY_SET_LIST(state, _ref7) {
      var code = _ref7.code,
          data = _ref7.data;

      if (code === 200 && data.length) state.list = data;else state.list = [];
    },
    REPLY_REPLY: function REPLY_REPLY(state, username) {
      state.curr = { replyToUsername: username };
    },
    EDIT_REPLY: function EDIT_REPLY(state, _ref8) {
      var list = _ref8.list,
          id = _ref8.id;

      if (!id) {
        state.curr = {};
        return;
      }
      var i = list.length;
      while (i--) {
        if (list[i]._id === id) state.curr = list[i];
      }
    }
  }
});

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api__ = __webpack_require__(4);


/* harmony default export */ __webpack_exports__["a"] = ({
  state: {
    list: []
  },
  getters: {
    tag_list: function tag_list(state) {
      return state.list;
    }
  },
  actions: {
    fetch_tags: function fetch_tags(_ref) {
      var commit = _ref.commit;
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].fetchAll('tag', query).then(function (res) {
        commit('TAG_SET_LIST', res);
        return res;
      });
    },
    create_tag: function create_tag(_ref2, body) {
      var commit = _ref2.commit;

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].post('tag', body).then(function (res) {
        commit('LOG', res);
        return res;
      });
    }
  },
  mutations: {
    TAG_SET_LIST: function TAG_SET_LIST(state, _ref3) {
      var code = _ref3.code,
          data = _ref3.data;

      if (code === 200 && data.length) state.list = data;else state.list = [];
    }
  }
});

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api__ = __webpack_require__(4);


var null_topic = {
  _id: "",
  title: "Topic Not Found",
  path: "topic-not-found",
  thumbnail: '',
  content: "",
  authorId: "",
  hidden: false,
  updateAt: '',
  createAt: Date.now(),
  lastReplyAt: '',
  visitCount: 0,
  replyCount: 0,
  likedUsers: [],
  status: 1,
  tags: [],
  type: "text"
};
/* harmony default export */ __webpack_exports__["a"] = ({
  state: {
    list: [],
    list_next: [],
    curr: { authorInfo: {}, categoryInfo: {}, tagsInfo: [] },
    curr_replys: [],
    prev: {},
    next: {}
  },
  getters: {
    topic_list: function topic_list(state) {
      return state.list;
    },
    topic_list_next: function topic_list_next(state) {
      return state.list_next;
    },
    topic_curr: function topic_curr(state) {
      return state.curr;
    },
    topic_curr_replys: function topic_curr_replys(state) {
      return state.curr_replys;
    },
    topic_prev: function topic_prev(state) {
      return state.prev;
    },
    topic_next: function topic_next(state) {
      return state.next;
    }
  },
  actions: {
    fetch_topic: function fetch_topic(_ref, _ref2) {
      var commit = _ref.commit;
      var path = _ref2.path,
          query = _ref2.query;

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].fetchItem('topic', path, query).then(function (res) {
        commit('TOPIC_SET_CURR', res);

        if (res.code > 200) return Promise.reject(res);
        var id = res.data._id;

        var c_prev = { _id: { $lt: id }, hidden: false };
        var c_next = { _id: { $gt: id }, hidden: false };
        var select = '_id title path';
        return Promise.all([__WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].fetchAll('topic', { criteria: c_prev, select: select,
          sort: { _id: -1 }, limit: 1 }), __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].fetchAll('topic', { criteria: c_next, select: select, limit: 1 })]).then(function (resp) {
          var prev = resp[0];
          var next = resp[1];
          commit('TOPIC_SET_PREV', prev);
          commit('TOPIC_SET_NEXT', next);
          return res;
        });
      });
    },
    fetch_topic_replys: function fetch_topic_replys(_ref3) {
      var commit = _ref3.commit,
          state = _ref3.state;
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var topicId = state.curr._id;
      query.criteria = query.criteria || JSON.stringify({ topicId: topicId });
      query.sort = query.sort || JSON.stringify({ _id: -1 });
      query.limit = query.limit || 30;
      query.skip = query.skip || 0;
      var _init = query._init || true;

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].fetchAll('reply', query).then(function (res) {
        if (res.code > 200) {
          res.name = "fetch_topic_replys[" + (_init ? 'initial' : 'more') + "] (topicId:" + topicId + ") failed";
          commit('LOG', res);
        }
        res._init = _init;
        commit('TOPIC_SET_CURR_REPLYS', res);
        return res;
      });
    },
    fetch_topics: function fetch_topics(_ref4) {
      var commit = _ref4.commit;
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      query.sort = query.sort || JSON.stringify({ _id: -1 });
      query.limit = query.limit || 30;
      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].fetchAll('topic', query).then(function (res) {
        commit(query.count ? 'TOPIC_SET_LIST_NEXT' : 'TOPIC_SET_LIST', res);
        return res;
      });
    },
    create_topic: function create_topic(_ref5, body) {
      var commit = _ref5.commit;

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].post('topic', body).then(function (res) {
        res.name = 'create_topic';
        commit('LOG', res);
        return res;
      });
    },
    update_topic: function update_topic(_ref6, _ref7) {
      var commit = _ref6.commit;
      var id = _ref7.id,
          body = _ref7.body;

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].patch('topic', { id: id, body: body }).then(function (res) {
        res.name = 'update_topic (' + id + ')';
        commit('LOG', res);
        return res;
      });
    },
    _favorite_topic: function _favorite_topic(_ref8, _ref9) {
      var commit = _ref8.commit;
      var userId = _ref9.userId,
          action = _ref9.action;

      return commit('_TOPIC_FAVORITE_CURR', { userId: userId, action: action });
    }
  },
  mutations: {
    TOPIC_SET_CURR: function TOPIC_SET_CURR(state, _ref10) {
      var code = _ref10.code,
          data = _ref10.data;

      if (code === 200 && data) {
        data.visitCount++;
        state.curr = data;
      } else state.curr = null_topic;
    },
    TOPIC_SET_CURR_REPLYS: function TOPIC_SET_CURR_REPLYS(state, _ref11) {
      var code = _ref11.code,
          data = _ref11.data;

      if (code === 200) {
        state.curr_replys = data;
      } else state.curr_replys = [];
    },
    TOPIC_SET_PREV: function TOPIC_SET_PREV(state, _ref12) {
      var code = _ref12.code,
          data = _ref12.data;

      if (code === 200 && data.length) {
        state.prev = data[0];
      } else state.prev = null_topic;
    },
    TOPIC_SET_NEXT: function TOPIC_SET_NEXT(state, _ref13) {
      var code = _ref13.code,
          data = _ref13.data;

      if (code === 200 && data.length) {
        state.next = data[0];
      } else state.next = null_topic;
    },
    TOPIC_SET_LIST: function TOPIC_SET_LIST(state, _ref14) {
      var code = _ref14.code,
          data = _ref14.data;

      if (code === 200 && data.length) state.list = data;else state.list = [];
    },
    TOPIC_SET_LIST_NEXT: function TOPIC_SET_LIST_NEXT(state, _ref15) {
      var code = _ref15.code,
          data = _ref15.data;

      if (code === 200 && data.length) state.list_next = data;else state.list_next = [];
    },
    _TOPIC_FAVORITE_CURR: function _TOPIC_FAVORITE_CURR(state, _ref16) {
      var userId = _ref16.userId,
          action = _ref16.action;

      if (action === 'unfavorite') {
        var i = state.curr.likedUsers.indexOf(userId);
        state.curr.likedUsers.splice(i, 1);
      } else state.curr.likedUsers.push(userId);
    }
  }
});

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__select__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__select__);



var null_user = {
  _id: ''
};

/* harmony default export */ __webpack_exports__["a"] = ({
  state: {
    curr: {},
    curr_topics: [],
    curr_replys: [],
    curr_favorites: [],
    curr_followings: [],
    curr_followers: [],
    curr_is_following: false,
    list: []
  },
  getters: {
    user_curr: function user_curr(state) {
      return state.curr;
    },
    user_curr_topics: function user_curr_topics(state) {
      return state.curr_topics;
    },
    user_curr_replys: function user_curr_replys(state) {
      return state.curr_replys;
    },
    user_curr_favorites: function user_curr_favorites(state) {
      return state.curr_favorites;
    },
    user_curr_followings: function user_curr_followings(state) {
      return state.curr_followings;
    },
    user_curr_followers: function user_curr_followers(state) {
      return state.curr_followers;
    },
    user_curr_is_following: function user_curr_is_following(state) {
      return state.curr_is_following;
    },
    user_list: function user_list(state) {
      return state.list;
    }
  },
  actions: {
    fetch_user: function fetch_user(_ref, username) {
      var commit = _ref.commit;

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].fetchItem('user', username).then(function (res) {
        commit('USER_SET_CURR', res);
        return res;
      });
    },
    fetch_user_topics: function fetch_user_topics(_ref2) {
      var commit = _ref2.commit,
          state = _ref2.state;
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var authorId = state.curr._id;
      query.criteria = query.criteria || JSON.stringify({ authorId: authorId });
      query.select = query.select || __WEBPACK_IMPORTED_MODULE_1__select___default.a.topic.sameUser;
      query.sort = query.sort || JSON.stringify({ _id: -1 });
      query.limit = query.limit || 10;
      var _init = query._init !== undefined ? query._init : true;
      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].fetchAll('topic', query).then(function (res) {
        if (res.code > 200) {
          res.name = 'fetch_user_topics[' + (_init ? 'initial' : 'more') + '] (authorId:' + authorId + ') failed';
          commit('LOG', res);
        }
        res._init = _init;
        commit('USER_SET_CURR_TOPICS', res);
        return res;
      });
    },
    fetch_user_favorites: function fetch_user_favorites(_ref3) {
      var commit = _ref3.commit,
          state = _ref3.state;
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _id = { $in: state.curr.favorites };
      query.criteria = query.criteria || JSON.stringify({ _id: _id });
      query.select = query.select || __WEBPACK_IMPORTED_MODULE_1__select___default.a.topic.sameUser;
      query.sort = query.sort || JSON.stringify({ _id: -1 });
      query.limit = query.limit || 10;
      var _init = query._init !== undefined ? query._init : true;

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].fetchAll('topic', query).then(function (res) {
        if (res.code > 200) {
          res.name = 'fetch_user_favorites[' + (_init ? 'initial' : 'more') + '] (userId:' + userId + ') failed';
          commit('LOG', res);
        }
        res._init = _init;
        commit('USER_SET_CURR_FAVORITES', res);
        return res;
      });
    },
    fetch_user_replys: function fetch_user_replys(_ref4) {
      var commit = _ref4.commit,
          state = _ref4.state;
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var authorId = state.curr._id;
      query.criteria = query.criteria || JSON.stringify({ authorId: authorId });
      query.sort = query.sort || JSON.stringify({ _id: -1 });
      query.limit = query.limit || 20;
      query.skip = query.skip || 0;
      var _init = query._init !== undefined ? query._init : true;

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].fetchAll('reply', query).then(function (res) {
        if (res.code > 200) {
          res.name = 'fetch_user_replys[' + (_init ? 'initial' : 'more') + '] (authorId:' + authorId + ') failed';
          commit('LOG', res);
        }
        res._init = _init;
        commit('USER_SET_CURR_REPLYS', res);
        return res;
      });
    },
    fetch_user_followings: function fetch_user_followings(_ref5) {
      var commit = _ref5.commit,
          state = _ref5.state;
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var followings = state.curr.followings;
      if (!followings.length) {
        var res = { code: 200, data: [], time: Date.now(), _init: true };
        commit('USER_SET_CURR_FOLLOWINGS', res);
        return res;
      }
      query.ids = followings.join('+');
      query.select = query.select || __WEBPACK_IMPORTED_MODULE_1__select___default.a.user.follower;
      query.sort = query.sort || JSON.stringify({ _id: -1 });
      query.limit = query.limit || 30;
      var _init = query._init !== undefined ? query._init : true;
      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].fetchAll('user', query).then(function (res) {
        if (res.code > 200) {
          res.name = 'fetch_user_followings[' + (_init ? 'initial' : 'more') + '] (userId:' + state.curr._id + ') failed';
          commit('LOG', res);
        }
        res._init = _init;
        commit('USER_SET_CURR_FOLLOWINGS', res);
        return res;
      });
    },
    fetch_user_followers: function fetch_user_followers(_ref6) {
      var commit = _ref6.commit,
          state = _ref6.state;
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var followers = state.curr.followers;
      if (!followers.length) {
        var res = { code: 200, data: [], time: Date.now(), _init: true };
        commit('USER_SET_CURR_FOLLOWERS', res);
        return res;
      }
      query.ids = followers.join('+');
      query.select = query.select || __WEBPACK_IMPORTED_MODULE_1__select___default.a.user.follower;
      query.sort = query.sort || JSON.stringify({ _id: -1 });
      query.limit = query.limit || 30;
      var _init = query._init !== undefined ? query._init : true;

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].fetchAll('user', query).then(function (res) {
        if (res.code > 200) {
          res.name = 'fetch_user_followers[' + (_init ? 'initial' : 'more') + '] (userId:' + state.curr._id + ') failed';
          commit('LOG', res);
        }
        res._init = _init;
        commit('USER_SET_CURR_FOLLOWERS', res);
        return res;
      });
    },
    follow_user: function follow_user(_ref7, _ref8) {
      var commit = _ref7.commit;
      var id = _ref8.id,
          action = _ref8.action;

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].follow_user(id, action).then(function (res) {
        res.name = (action === 'unfollow' ? 'un' : '') + 'follow user(' + id + ')';
        commit('LOG', res);
        return res;
      });
    },
    favorite_topic: function favorite_topic(_ref9, _ref10) {
      var commit = _ref9.commit;
      var id = _ref10.id,
          action = _ref10.action;

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].favorite_topic(id, action).then(function (res) {
        res.name = (action === 'unfavorite' ? 'un' : '') + 'favorite topic(' + id + ')';
        commit('LOG', res);
        return res;
      });
    },
    join_group: function join_group(_ref11, _ref12) {
      var commit = _ref11.commit;
      var id = _ref12.id,
          action = _ref12.action;

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].join_group(id, action).then(function (res) {
        res.name = (action === 'leave' ? 'leave' : 'join') + ' group(' + id + ')';
        commit('LOG', res);
        return res;
      });
    },
    is_following: function is_following(_ref13, _ref14) {
      var commit = _ref13.commit;
      var id = _ref14.id;

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].is_following(id).then(function (res) {
        if (res.code === 200) commit('USER_SET_CURR_IS_FOLLOWING', res.data.isFollowing);
      });
    },
    is_favorited: function is_favorited(_ref15, _ref16) {
      var commit = _ref15.commit;
      var id = _ref16.id;

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].is_favorited(id);
    },
    update_user: function update_user(_ref17, _ref18) {
      var commit = _ref17.commit;
      var id = _ref18.id,
          body = _ref18.body;

      return __WEBPACK_IMPORTED_MODULE_0__api__["a" /* default */].patch('user', { id: id, body: body });
    }
  },
  mutations: {
    USER_SET_CURR: function USER_SET_CURR(state, _ref19) {
      var code = _ref19.code,
          data = _ref19.data;

      state.curr = code > 200 ? null_user : data;
    },
    USER_SET_CURR_TOPICS: function USER_SET_CURR_TOPICS(state, _ref20) {
      var _state$curr_topics;

      var data = _ref20.data,
          _init = _ref20._init;

      if (_init) state.curr_topics = data;else (_state$curr_topics = state.curr_topics).push.apply(_state$curr_topics, data);
    },
    USER_SET_CURR_REPLYS: function USER_SET_CURR_REPLYS(state, _ref21) {
      var _state$curr_replys;

      var data = _ref21.data,
          _init = _ref21._init;

      if (_init) state.curr_replys = data;else (_state$curr_replys = state.curr_replys).push.apply(_state$curr_replys, data);
    },
    USER_SET_CURR_FAVORITES: function USER_SET_CURR_FAVORITES(state, _ref22) {
      var _state$curr_favorites;

      var data = _ref22.data,
          _init = _ref22._init;

      if (_init) state.curr_favorites = data;else (_state$curr_favorites = state.curr_favorites).push.apply(_state$curr_favorites, data);
    },
    USER_SET_CURR_FOLLOWINGS: function USER_SET_CURR_FOLLOWINGS(state, _ref23) {
      var _state$curr_following;

      var data = _ref23.data,
          _init = _ref23._init;

      if (_init) state.curr_followings = data;else (_state$curr_following = state.curr_followings).push.apply(_state$curr_following, data);
    },
    USER_SET_CURR_FOLLOWERS: function USER_SET_CURR_FOLLOWERS(state, _ref24) {
      var _state$curr_followers;

      var data = _ref24.data,
          _init = _ref24._init;

      if (_init) state.curr_followers = data;else (_state$curr_followers = state.curr_followers).push.apply(_state$curr_followers, data);
    },
    USER_SET_CURR_IS_FOLLOWING: function USER_SET_CURR_IS_FOLLOWING(state, status) {
      state.curr_is_following = status;
    }
  }
});

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  state: {
    dialog: '',
    navbar: '',
    footer: ''
  },
  getters: {
    dialog: function dialog(state) {
      return state.dialog;
    }
  },
  mutations: {
    DIALOG: function DIALOG(state, name) {
      state.dialog = name;
    }
  },
  actions: {
    dialog: function dialog(_ref, name) {
      var commit = _ref.commit;

      commit('DIALOG', name);
    }
  }
});

/***/ }),
/* 45 */
/***/ (function(module, exports) {

exports.user = {
  follower: '_id username displayName avatar level bio followers followings favorites '
};

exports.topic = {
  sameUser: '_id title path thumbnail authorId category tags replyCount visitCount lastReplyAt'
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".user-item{position:relative;border-bottom:1px solid #e2e2e2}.user-item .avatar{position:absolute;top:10px;left:10px;width:50px;height:50px}.user-item .basic-count,.user-item .basic-info{font-size:.9em;margin-left:60px;line-height:25px}.user-item .basic-count span,.user-item .basic-info span{margin-right:10px}.user-item .name{font-weight:700;font-size:1.3em}.user-item .bio{color:#abadbb}", ""]);

// exports


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".foot-bar{width:100%;border-top:1px solid #e2e2e2;text-align:center;line-height:50px;height:50px;font-size:20px}", ""]);

// exports


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".nav-bar{left:0;width:100%;height:50px;line-height:50px;color:#fff;background-color:#24292e}.nav-bar .logo{width:180px;height:100%}.nav-bar .logo img{border-radius:8px}.nav-bar .logo span{text-decoration:none!important;font-size:24px;text-space:1.2}.nav-bar .wide-screen{position:relative;height:100%}.nav-bar .nav-block-box{height:100%}.nav-bar .nav-btn-box{height:100%;padding-left:16px;padding-right:16px}.nav-bar .nav-btn-box:active,.nav-bar .nav-btn-box:hover{background-color:hsla(0,0%,100%,.2)}.nav-bar .nav-btn-box .fa-bell,.nav-bar .nav-btn-box .fa-file{font-size:1.3em;vertical-align:middle}.nav-bar .nav-guest{position:relative}.nav-bar .nav-toggle-list{position:absolute;transition:all .2s;border:1px solid rgba(27,31,35,.15);box-shadow:0 3px 12px rgba(27,31,35,.15);background-color:#24292e;margin-top:5px;right:0;z-index:110;font-size:.9em;list-style:none;padding:5px 0;min-width:100px;line-height:25px;overflow:hidden}.nav-bar .nav-toggle-list li:hover{background-color:hsla(0,0%,100%,.2)}.nav-bar .nav-toggle-list-message{min-height:150px}.nav-bar .title{text-align:center;padding:0 50px}.nav-bar .search-bar,.nav-bar .title{position:absolute;width:100%;height:100%;z-index:-1}.nav-bar .search-bar{padding-left:50px}.nav-bar .search-bar input{width:97%;height:35px;line-height:20px;background-color:#eaebed;border:1px solid #e2e2e2;color:#4a4a4a;padding-left:5px;font-size:16px;border-radius:5px;vertical-align:middle}.nav-bar.bg-white{background-color:#fff!important}", ""]);

// exports


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".reply-box{position:relative;border-bottom:1px solid #e2e2e2}.reply-box .header{margin-left:50px;margin-right:60px;line-height:18px}.reply-box .header .username{font-size:.9em;margin-right:1em}.reply-box .header .time{color:#7186c7;font-size:.75em}.reply-box .content{margin-left:50px;font-size:.85em}.reply-box .avatar{position:absolute;top:10px;left:10px;width:35px;height:35px}.reply-box .btn-group{position:absolute;top:0;right:10px;bottom:0}", ""]);

// exports


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".page-login{padding-top:20px}.page-login .info{margin:0 auto;width:400px;line-height:40px;padding:10px;margin-bottom:10px;color:#ff3b30;text-align:center}.page-login .vendors{margin:0 auto;width:400px;padding:10px}.page-login .vendors p{text-align:center;height:40px;line-height:40px}.page-login .vendors p .btn{width:250px}.page-login .vendors p .btn:active,.page-login .vendors p .btn:hover{background-color:#e1e1e1}.page-login .vendors p i{width:32px;font-size:2em;vertical-align:middle}.page-login .vendors p .fa-github{color:#5856d6}.page-login .vendors p .fa-twitter{color:#5ac8fa}.page-login .vendors p .fa-facebook{color:#007aff}.page-login .vendors p .fa-google{color:#ff3b30}", ""]);

// exports


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".view-edit-topic .wide-screen{height:100%}.view-edit-topic .navigator{height:35px;line-height:35px;font-size:.9em;background-color:#f6f6f6;border-radius:4px 4px 0 0}.view-edit-topic main{margin-right:305px}.view-edit-topic main .btn{padding:3px 12px}.view-edit-topic main header{position:relative;padding-top:10px}.view-edit-topic main header .title{line-height:1.5em;font-size:1.3em;font-weight:700}.view-edit-topic main header .subtitle{line-height:1.1em;color:#2c2c30}.view-edit-topic main header .mode{height:40px;line-height:40px}.view-edit-topic main header .mode .btn.right{margin-right:10px}.view-edit-topic main header .mode .btn-switch{font-weight:700;margin-left:-1px}.view-edit-topic main .edit-area{position:relative;padding:15px 10px;height:700px}.view-edit-topic main .edit-area .note{text-align:right;width:120px 9;margin-left:10px}.view-edit-topic main .edit-area.mode-0 .text{width:100%;border-right:none}.view-edit-topic main .edit-area.mode-0 .preview{display:none}.view-edit-topic main .edit-area.mode-1 .preview,.view-edit-topic main .edit-area.mode-1 .text{width:50%}.view-edit-topic main .edit-area.mode-1 .text{border-right:1px solid #e2e2e2}.view-edit-topic main .edit-area.mode-2 .text{display:none}.view-edit-topic main .edit-area.mode-2 .preview{width:100%}.view-edit-topic main .edit-area .preview,.view-edit-topic main .edit-area .text{float:left;height:100%;padding:5px;overflow:auto;border-top:1px solid #e2e2e2;border-bottom:1px solid #e2e2e2}.view-edit-topic main .edit-area .text{border-left:none}.view-edit-topic main .edit-area .preview{float:left;margin-left:-1px}.view-edit-topic aside{width:295px;min-height:700px;margin-bottom:20px}.view-edit-topic aside .box{padding:10px;border-bottom:1px solid #e2e2e2}.view-edit-topic aside .box .fa{color:#ff9530}.view-edit-topic aside .box .fa.fa-check-circle{color:#4cd964}.view-edit-topic aside .btn-group .btn{padding:5px 12px}.view-edit-topic aside .categories,.view-edit-topic aside .tags{margin-top:10px}.view-edit-topic aside .category{margin:3px 6px 3px 0;padding:3px 6px;font-size:.9em}.view-edit-topic aside .tag{margin:2px 5px 2px 0;padding:2px 5px;font-size:.8em}.view-edit-topic aside .switches{font-size:.9em;line-height:1.5em}.view-edit-topic aside .images .btn-upload{margin:10px 10px 10px 0;padding:3px 6px;font-size:.8em}.view-edit-topic aside .images input[type=file]{display:none}.view-edit-topic aside .images .uploaded{padding-top:10px;border-bottom:1px solid #e2e2e2;font-size:.8em}.view-edit-topic aside .images .uploaded .btn-group{width:100%;height:40px}.view-edit-topic aside .images .uploaded a{display:block}.view-edit-topic aside .images .uploaded img{min-width:40px;max-width:70%}.view-edit-topic aside .images .uploaded span{padding:3px 6px}", ""]);

// exports


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".edit-reply-box .reply-to{display:inline-block;max-width:450px;padding-top:10px}.edit-reply-box .btn-icon{padding:4px}.edit-reply-box .btn-icon i{vertical-align:middle}.edit-reply-box .btn{margin:6px 0 6px 10px;padding:4px 12px}.edit-reply-box .row textarea{border-color:#eaebed;width:100%;min-height:100px}", ""]);

// exports


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".view-user .profile{position:relative}.view-user .profile .avatar{position:absolute;width:80px;height:80px}.view-user .profile .btn-group{position:absolute;right:10px}.view-user .profile .btn-group .btn{padding:4px 12px}.view-user .profile .basic-info{margin-left:90px;height:45px}.view-user .profile .basic-info .name{line-height:1.5em}.view-user .profile .basic-info .bio{color:#333;font-size:.8em}.view-user .profile .basic-count{margin-left:90px;height:35px}.view-user .profile .basic-count>span{display:inline-block;margin-right:20px;height:100%;line-height:35px;text-align:center;font-size:.9em}.view-user .tab-panel .tabs{color:#abadbb;height:40px}.view-user .tab-panel .tabs .tab{height:100%;line-height:40px;text-align:center;-ms-flex-positive:1;flex-grow:1;border-bottom:1px solid #e2e2e2;transition:color .2s ease}.view-user .tab-panel .tabs .tab.active{color:#000;border-bottom:3px solid #000}.view-user .tab-panel .panels .panel{height:700px;overflow:auto}.view-user .tab-panel .panels .panel .panel-empty-data{line-height:70px;text-align:center}.view-user .tab-panel .panels .panel .panel-empty-data span{padding:8px 20px;background-color:#e1e1e1;border-radius:4px}", ""]);

// exports


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".view-topics main{margin-right:305px}.view-topics main .tabs-category{color:#4cd964}.view-topics main .tabs-category .tab-category{display:inline-block;margin:6px 3px;padding:3px 12px;cursor:pointer}.view-topics main .tabs-category .tab-category:active,.view-topics main .tabs-category .tab-category:hover{background-color:#fff}.view-topics main .tabs-category .tab-category.active{background-color:#4cd964;color:#fff}.view-topics main .topic-list{min-height:800px}", ""]);

// exports


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".topic-item{border-bottom:1px solid #e2e2e2;height:50px;line-height:50px}.topic-item:hover{background-color:rgba(0,0,0,.05)}.topic-item .avatar{width:35px;height:35px}.topic-item .at-top,.topic-item .category{padding:2px 5px;color:#fff;background-color:#80bd01;border-radius:4px;line-height:20px;margin-right:5px;min-width:35px;text-align:center}.topic-item .category{font-size:.8em}.topic-item .title{min-width:66%}.topic-item a:hover{text-decoration:underline}.topic-item a:visited{color:#778087}.topic-item .count{font-size:.8em;width:60px;text-align:center}.topic-item .count .rc{color:#007aff;font-size:.8em}.topic-item .count .pv{font-size:.7em;color:#abadbb}.topic-item .last-reply{color:#778087;font-size:.7em}", ""]);

// exports


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".user-box header{line-height:40px}.user-box .avatar{height:48px;width:48px}.user-box .username{margin-left:1em;max-width:180px;font-size:.9em;white-space:nowrap}.user-box .btn-group .btn{padding:4px 12px}", ""]);

// exports


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".user-reply-box{position:relative;border-bottom:1px solid #e2e2e2}.user-reply-box .time{font-size:.8em}.user-reply-box .content{padding:2px 5px;line-height:24px;background-color:#eaebed}.user-reply-box .topic-title{color:#007aff}", ""]);

// exports


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "#dialog{position:fixed!important;z-index:800}#dialog .dialog-mask{background-color:rgba(0,0,0,.7);z-index:-1}#dialog .dialog{position:absolute;top:50%;left:50%}#dialog .dialog header{line-height:40px}#dialog .dialog header .right{line-height:40px;font-size:1.1em}#dialog .dialog .fa-close{color:#ff3b30}#dialog .add-category,#dialog .add-tag{width:400px;height:500px;margin-top:-250px;margin-left:-200px}#dialog .add-category .category,#dialog .add-category .tag,#dialog .add-tag .category,#dialog .add-tag .tag{float:left;margin:2px 5px 2px 0;padding:2px 5px;font-size:.8em}#dialog .add-category .category-list,#dialog .add-category .tag-list,#dialog .add-tag .category-list,#dialog .add-tag .tag-list{height:300px;overflow:auto;padding-top:10px}#dialog .add-category .category-input,#dialog .add-category .tag-input,#dialog .add-tag .category-input,#dialog .add-tag .tag-input{height:100px;text-align:center}#dialog .add-category .category-input input,#dialog .add-category .tag-input input,#dialog .add-tag .category-input input,#dialog .add-tag .tag-input input{text-align:center;width:80%}#dialog .add-category .btn-group .btn,#dialog .add-tag .btn-group .btn{padding:3px 12px}", ""]);

// exports


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".page-404 .block{height:404px}.page-404 .block .title{font-size:2em;line-height:4em}.page-404 .block .redirect{font-size:1.5em}", ""]);

// exports


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block}audio:not([controls]){display:none;height:0}progress{vertical-align:baseline}[hidden],template{display:none}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}svg:not(:root){overflow:hidden}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}button,input,select,textarea{font:inherit;margin:0}optgroup{font-weight:700}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}body,html{width:100%;height:100%}.btn,article,div,footer,nav,section{box-sizing:border-box}input[type=password],input[type=text],textarea{resize:none;outline:none;-webkit-appearance:none;white-space:pre-wrap;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-overflow-scrolling:touch}.row{width:100%}.row:after{content:\"\";visibility:hidden;display:block;height:0;clear:both}.clearfix{clear:both}.full{position:absolute;top:0;left:0;width:100%;height:100%}.fixed-top{position:fixed;top:0}.fixed-btm{position:fixed;bottom:0}.ellipsis{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.block{display:block}.center{text-align:center}.left{float:left}.right{float:right}.hide{display:none!important}.show{display:block!important}body{background-color:#e1e1e1}a{color:unset;text-decoration:none}a:hover{text-decoration:initial}.page,.view{position:relative;margin:0 auto;padding-top:10px;padding-bottom:60px;transition:all .2s}.page .main,.view .main{margin-right:305px}.page aside,.view aside{width:295px;min-height:700px;margin-bottom:10px}.full-screen{width:100%}.wide-screen{width:90%;max-width:1400px;min-width:960px;margin:0 auto}.block,.rad-4{border-radius:4px}.block{background-color:#fff;margin-bottom:10px;box-sizing:border-box}.block:hover{box-shadow:0 0 8px 0 rgba(232,237,250,.6),0 2px 4px 0 rgba(232,237,250,.5)}.block footer,.block header,.block nav{background-color:#f6f6f6;height:40px}.block>div:last-child,.block>footer:last-child,.block>header:last-child,.block>nav:last-child{border-bottom-left-radius:4px;border-bottom-right-radius:4px;overflow:hidden}.block>div:first-child,.block>footer:first-child,.block>header:first-child,.block>nav:first-child{border-top-left-radius:4px;border-top-right-radius:4px;overflow:hidden}.pad-5{padding:5px}.pad-tb-5{padding-top:5px;padding-bottom:5px}.pad-lr-5{padding-left:5px;padding-right:5px}.pad-10{padding:10px}.pad-tb-10{padding-top:10px;padding-bottom:10px}.pad-lr-10{padding-left:10px;padding-right:10px}.pad-15{padding:15px}.pad-tb-15{padding-top:15px;padding-bottom:15px}.pad-lr-15{padding-left:15px;padding-right:15px}.pad-20{padding:20px}.pad-tb-20{padding-top:20px;padding-bottom:20px}.pad-lr-20{padding-left:20px;padding-right:20px}.pad-25{padding:25px}.pad-tb-25{padding-top:25px;padding-bottom:25px}.pad-lr-25{padding-left:25px;padding-right:25px}.pad-30{padding:30px}.pad-tb-30{padding-top:30px;padding-bottom:30px}.pad-lr-30{padding-left:30px;padding-right:30px}input[type=text]{width:100%;margin:10px 0;border:none;border-bottom:2px solid rgba(88,86,214,.4)}input[type=text]:focus{border-bottom-color:#5856d6}label{cursor:pointer}[type=text],textarea{box-sizing:border-box;display:inline-block}.avatar{border-radius:4px;overflow:hidden}.avatar img{width:100%}.pager span{margin:7.5px 0;padding:4px;max-width:45%;font-size:.9em}.btn{display:inline-block;text-align:center;cursor:pointer;border-radius:4px;border:1px solid transparent}.btn:hover{opacity:.9}.btn:active{opacity:.7;box-shadow:inset 0 3px 5px rgba(0,0,0,.125)}.btn-default{background:#fff;color:#007aff}.btn-default:active,.btn-default:link{background:#e2e2e2}.btn-block{width:100%}.red{color:#ff3b30}.blue{color:#007aff}.btn-red{color:#fff;background-color:#ff3b30;border-color:#ff3b30}.btn-red-h,.btn-red-h-b{background-color:#fff;color:#ff3b30;border-color:#ff3b30}.btn-orange{color:#fff;background-color:#ff9530;border-color:#ff9530}.btn-orange-h,.btn-orange-h-b{background-color:#fff;color:#ff9530;border-color:#ff9530}.btn-green{color:#fff;background-color:#4cd964;border-color:#4cd964}.btn-green-h,.btn-green-h-b{background-color:#fff;color:#4cd964;border-color:#4cd964}.btn-tealBlue{color:#fff;background-color:#5ac8fa;border-color:#5ac8fa}.btn-tealBlue-h,.btn-tealBlue-h-b{color:#5ac8fa;background-color:#fff;border-color:#5ac8fa}.btn-blue{color:#fff;background-color:#007aff;border-color:#007aff}.btn-blue-h-b{color:#007aff;background-color:#fff;border-color:#007aff}.tab{cursor:pointer}@font-face{font-family:FontAwesome;src:url(\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.eot\");src:url(\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0\") format(\"embedded-opentype\"),url(\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0\") format(\"woff2\"),url(\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0\") format(\"woff\"),url(\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttfv=4.7.0\") format(\"truetype\"),url(\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular\") format(\"svg\");font-weight:400;font-style:normal}.fa{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-lg{font-size:1.33333333em;line-height:.75em;vertical-align:-15%}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-fw{width:1.28571429em;text-align:center}.fa-ul{padding-left:0;margin-left:2.14285714em;list-style-type:none}.fa-ul>li{position:relative}.fa-li{position:absolute;left:-2.14285714em;width:2.14285714em;top:.14285714em;text-align:center}.fa-li.fa-lg{left:-1.85714286em}.fa-border{padding:.2em .25em .15em;border:.08em solid #eee;border-radius:.1em}.fa-spin{animation:fa-spin 2s infinite linear}.fa-pulse{animation:fa-spin 1s infinite steps(8)}.fa-rotate-90{-ms-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-ms-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-ms-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-ms-transform:scaleX(-1);transform:scaleX(-1)}.fa-flip-vertical{-ms-transform:scaleY(-1);transform:scaleY(-1)}:root .fa-flip-horizontal,:root .fa-flip-vertical,:root .fa-rotate-90,:root .fa-rotate-180,:root .fa-rotate-270{filter:none}.fa-stack{position:relative;display:inline-block;width:2em;height:2em;line-height:2em;vertical-align:middle}.fa-stack-1x,.fa-stack-2x{position:absolute;left:0;width:100%;text-align:center}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:#fff}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.sr-only-focusableactive,.sr-only-focusablefocus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}.fa-angle-double-left:before{content:\"\\F100\"}.fa-angle-double-right:before{content:\"\\F101\"}.fa-bell:before{content:\"\\F0F3\"}.fa-caret-down:before{content:\"\\F0D7\"}.fa-caret-up:before{content:\"\\F0D8\"}.fa-check:before{content:\"\\F00C\"}.fa-check-circle:before{content:\"\\F058\"}.fa-close:before{content:\"\\F00D\"}.fa-edit:before{content:\"\\F044\"}.fa-facebook:before{content:\"\\F09A\"}.fa-file:before{content:\"\\F15B\"}.fa-github:before{content:\"\\F09B\"}.fa-google:before{content:\"\\F1A0\"}.fa-heart:before{content:\"\\F004\"}.fa-heart-o:before{content:\"\\F08A\"}.fa-pencil:before{content:\"\\F040\"}.fa-plus:before{content:\"\\F067\"}.fa-reply:before{content:\"\\F112\"}.fa-toggle-off:before{content:\"\\F204\"}.fa-toggle-on:before{content:\"\\F205\"}.fa-twitter:before{content:\"\\F099\"}.hover_rotate_90:hover{-ms-transform:rotate(90deg);transform:rotate(90deg);transition-duration:.3s}.hover_scale:hover{-ms-transform:scale(1.1);transform:scale(1.1);transition-duration:.3s}.fa-toggle-off{color:#eaebed}.fa-check,.fa-check-circle,.fa-toggle-on{color:#4cd964}@keyframes fa-spin{0%{transform:rotate(0deg)}to{transform:rotate(359deg)}}.flex{display:-ms-flexbox;display:flex}.redirect_col{-ms-flex-direction:column;flex-direction:column}.redirect_col_rev{-ms-flex-direction:column-reverse;flex-direction:column-reverse}.redirect_row_rev{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.wrap_wrap{-ms-flex-wrap:wrap;flex-wrap:wrap}.wrap_rev{-ms-flex-wrap:wrap-reverse;flex-wrap:wrap-reverse}.flex_end{-ms-flex-pack:end;justify-content:flex-end}.middle_center{-ms-flex-pack:center;justify-content:center}.middle_center,.right_center{-ms-flex-align:center;align-items:center}.right_center{-ms-flex-pack:end;justify-content:flex-end}.around_center{-ms-flex-pack:distribute;justify-content:space-around}.around_center,.between_center{-ms-flex-align:center;align-items:center}.between_center{-ms-flex-pack:justify;justify-content:space-between}.space_around{-ms-flex-pack:distribute;justify-content:space-around}.align_center{-ms-flex-align:center;align-items:center}.align_btm{-ms-flex-align:end;align-items:flex-end}.self_btm{-ms-flex-item-align:end;align-self:flex-end}.grow_1{-ms-flex-positive:1;flex-grow:1}.grow_2{-ms-flex-positive:2;flex-grow:2}.grow_3{-ms-flex-positive:3;flex-grow:3}.self_start{-ms-flex-item-align:start;align-self:flex-start}.self_end{-ms-flex-item-align:end;align-self:flex-end}.self_center{-ms-flex-item-align:center;-ms-grid-row-align:center;align-self:center}.self_stretch{-ms-flex-item-align:stretch;-ms-grid-row-align:stretch;align-self:stretch}.flex_1{-ms-flex:1;flex:1}.table{display:table;width:100%}.table .cell{display:table-cell}.md-body a{color:#007aff;text-decoration:none}.md-body a:hover{text-decoration:underline}.md-body twitterwidget{margin-left:auto;margin-right:auto}.md-body img{max-width:100%;border-radius:4px}.md-body pre{background:#f7f7f7;margin:0;padding:.85em 1em;margin-bottom:1.275em;overflow-x:auto}.md-body code[class*=lang-],.md-body pre[class*=lang-]{color:#000;text-shadow:0 1px #fff;font-family:Menlo,Source Code Pro,Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.2;-moz-tab-size:2;tab-size:2;-webkit-hyphens:none;-ms-hyphens:none;hyphens:none}.md-body code[class*=lang-]-moz-selection,.md-body code[class*=lang-] -moz-selection,.md-body pre[class*=lang-]-moz-selection,.md-body pre[class*=lang-] -moz-selection{text-shadow:none;background:#b3d4fc}.md-body code[class*=lang-]selection,.md-body code[class*=lang-] selection,.md-body pre[class*=lang-]selection,.md-body pre[class*=lang-] selection{text-shadow:none;background:#b3d4fc}.md-body pre[class*=lang-]{padding:1em;margin:.5em 0;overflow:auto}.md-body .hljs-cdata,.md-body .hljs-comment,.md-body .hljs-doctype,.md-body .hljs-prolog{color:#708090}.md-body .hljs-punctuation{color:#999}.md-body .namespace{opacity:.7}.md-body .hljs-boolean,.md-body .hljs-constant,.md-body .hljs-deleted,.md-body .hljs-number,.md-body .hljs-property,.md-body .hljs-symbol,.md-body .hljs-tag{color:#905}.md-body .hljs-attr-name,.md-body .hljs-builtin,.md-body .hljs-char,.md-body .hljs-inserted,.md-body .hljs-selector,.md-body .hljs-string{color:#690}.md-body .hljs-entity,.md-body .hljs-operator,.md-body .hljs-url,.md-body .lang-css .hljs-string,.md-body .style .hljs-string{color:#a67f59;background:hsla(0,0%,100%,.5)}.md-body .hljs-atrule,.md-body .hljs-attr-value,.md-body .hljs-keyword{color:#07a}.md-body .hljs-function{color:#dd4a68}.md-body .hljs-important,.md-body .hljs-regex,.md-body .hljs-variable{color:#e90}.md-body .hljs-bold,.md-body .hljs-important{font-weight:700}.md-body .hljs-italic{font-style:italic}.md-body .hljs-entity{cursor:help}aside .block-promo{border:1px solid #eaebed;width:100%;min-height:290px}.trans_200{transition:all .2s ease}.trans_400{transition:all .4s ease}.fade-enter,.fade-leave-active{opacity:0}.slide-right-enter,.slide-right-leave{opacity:0;-ms-transform:translateX(5%);transform:translateX(5%)}.slide-left-enter,.slide-left-leave{opacity:0;-ms-transform:translateX(-5%);transform:translateX(-5%)}.slide-btm-enter,.slide-btm-leave{opacity:0;-ms-transform:translateY(100%);transform:translateY(100%)}.slide-top-enter,.slide-top-leave{opacity:0;-ms-transform:translateY(-100%);transform:translateY(-100%)}.zoomInSmall-enter,.zoomInSmall-leave{-ms-transform:scale(.8);transform:scale(.8)}.zoomInBig-enter,.zoomInBig-leave{-ms-transform:scale(1.2);transform:scale(1.2)}.modal-enter,.modal-leave-active{opacity:0}.modal-enter .dialog,.modal-enter .modal,.modal-leave-active .dialog,.modal-leave-active .modal,.widgetProfile-enter,.widgetProfile-leave-active{-ms-transform:scale(1.1);transform:scale(1.1)}.shareBtm-enter,.shareBtm-leave-active{opacity:0}.shareBtm-enter #shareBox,.shareBtm-leave-active #shareBox{opacity:0;-ms-transform:translateY(100%);transform:translateY(100%)}.fold-enter,.fold-leave-active{-ms-transform:scaleY(0);transform:scaleY(0)}#app{font-family:Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}", ""]);

// exports


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".view-edit-user .profile textarea{width:100%;height:300px}.view-edit-user aside nav{line-height:40px}.view-edit-user aside .btn-group{height:50px}.view-edit-user aside .btn-group .btn{padding:5px 12px}", ""]);

// exports


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".view-topic main .topic-header{position:relative;padding-top:6px;padding-bottom:6px}.view-topic main .topic-header a:hover{text-decoration:underline}.view-topic main .topic-header .ellipsis{padding-left:68px;padding-right:60px}.view-topic main .topic-header .title{line-height:1.5em;color:#1f3f99;font-size:1.2em;font-weight:700}.view-topic main .topic-header .subtitle{line-height:1.5em;font-size:.8em;color:#abadbb}.view-topic main .topic-header .subtitle span{margin-right:1.5rem}.view-topic main .topic-header .btn-group{top:0;right:10px}.view-topic main .topic-header .btn-group .btn-like{line-height:55px}.view-topic main .topic-header .btn-group .btn-like .fa{color:#ff3b30}.view-topic main .topic-header .btn-group .btn-like span{margin-left:10px}.view-topic main .topic-header .btn-group .btn-edit,.view-topic main .topic-header .btn-group .btn-share{padding:4px 12px}.view-topic main .topic-header .avatar{position:absolute;left:10px;top:6px;width:48px;height:48px}.view-topic main .topic-header .pv{position:absolute;line-height:20px;top:66px;font-size:.7em}.view-topic main .topic-header .pv b{font-size:.8rem}.view-topic main .topic-header .btn-group{position:absolute}.view-topic main .topic-header .tags{margin-top:10px}.view-topic main .topic-header .tag{margin:2px 5px 2px 0;padding:2px 5px;font-size:.8em}.view-topic main article{border-top:1px solid #e2e2e2;border-bottom:1px solid #e2e2e2}.view-topic .replies{margin-top:10px;margin-bottom:10px;line-height:40px}", ""]);

// exports


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(126)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(11),
  /* template */
  __webpack_require__(105),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(117)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(12),
  /* template */
  __webpack_require__(95),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(121)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(13),
  /* template */
  __webpack_require__(99),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(113)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(14),
  /* template */
  __webpack_require__(91),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(110)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(88),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(123)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(102),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(124)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(103),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(111)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(89),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(112)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(20),
  /* template */
  __webpack_require__(90),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(125)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(21),
  /* template */
  __webpack_require__(104),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(114)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(22),
  /* template */
  __webpack_require__(92),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(23),
  /* template */
  __webpack_require__(100),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(122)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(24),
  /* template */
  __webpack_require__(101),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(129)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(25),
  /* template */
  __webpack_require__(108),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(116)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(26),
  /* template */
  __webpack_require__(94),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(128)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(27),
  /* template */
  __webpack_require__(107),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(115)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(28),
  /* template */
  __webpack_require__(93),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(127)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(29),
  /* template */
  __webpack_require__(106),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(130)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(30),
  /* template */
  __webpack_require__(109),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(119)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(31),
  /* template */
  __webpack_require__(97),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(118)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(32),
  /* template */
  __webpack_require__(96),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user-item pad-10"
  }, [_c('router-link', {
    attrs: {
      "to": '/user/' + _vm.e.username
    }
  }, [_c('div', {
    staticClass: "avatar"
  }, [_c('img', {
    attrs: {
      "src": _vm.e.avatar
    }
  })])]), _c('div', {
    staticClass: "basic-info"
  }, [_c('div', {
    staticClass: "name ellipsis"
  }, [_c('router-link', {
    attrs: {
      "to": '/user/' + _vm.e.username
    }
  }, [_vm._v(_vm._s(_vm.e.displayName))])], 1), _c('div', {
    staticClass: "bio ellipsis"
  }, [_vm._v(_vm._s(_vm.e.bio || 'nothing left and nothing right'))])])], 1)
},staticRenderFns: []}

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "foot-bar"
  }, [_vm._v("\n\t© 2017 - ArkNodeJs - w10036w - "), _c('a', {
    attrs: {
      "href": "https://github.com/w10036w/arknodejs",
      "target": "_blank"
    }
  }, [_vm._v("Source Code")])])
}]}

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('nav', {
    staticClass: "nav-bar"
  }, [_c('div', {
    staticClass: "wide-screen row"
  }, [_c('router-link', {
    attrs: {
      "to": "/"
    }
  }, [_c('div', {
    staticClass: "left logo flex between_center"
  }, [_c('img', {
    attrs: {
      "height": "40",
      "src": "/favicon/apple-icon-57x57.png"
    }
  }), _c('span', [_vm._v("ArkNodeJs")])])]), (_vm.login_user._id) ? _c('div', {
    staticClass: "nav-guest right"
  }, [_c('div', {
    staticClass: "btn nav-btn-box"
  }, [_c('router-link', {
    attrs: {
      "to": {
        name: 'create-topic'
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-file"
  })])], 1), _c('div', {
    staticClass: "btn nav-btn-box"
  }, [_c('span', {
    on: {
      "click": _vm.toggleNoticeList
    }
  }, [_c('i', {
    staticClass: "fa fa-bell"
  })])]), _c('transition', {
    attrs: {
      "name": "slide-top"
    }
  }, [_c('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show_notice_list),
      expression: "show_notice_list"
    }],
    staticClass: "nav-toggle-list nav-toggle-list-message rad-4 center"
  }, _vm._l((_vm.message_list), function(e) {
    return _c('li')
  }))]), _c('div', {
    staticClass: "btn nav-btn-box",
    on: {
      "click": _vm.toggleUserList
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.login_user.displayName) + " "), _c('i', {
    staticClass: "fa trans_200",
    class: _vm.show_user_list ? 'fa-caret-up' : 'fa-caret-down'
  })])]), _c('transition', {
    attrs: {
      "name": "slide-top"
    }
  }, [_c('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show_user_list),
      expression: "show_user_list"
    }],
    staticClass: "nav-toggle-list rad-4 center"
  }, [_c('li', [_c('router-link', {
    attrs: {
      "to": '/user/' + _vm.login_user.username
    }
  }, [_vm._v("Profile")])], 1), _c('li', [_c('router-link', {
    attrs: {
      "to": "/setting/"
    }
  }, [_vm._v("Setting")])], 1), _c('li', [_c('router-link', {
    attrs: {
      "to": "/logout/"
    }
  }, [_vm._v("Logout")])], 1)])])], 1) : _c('div', {
    staticClass: "nav-visitor right"
  }, [_c('div', {
    staticClass: "btn nav-btn-box"
  }, [_c('router-link', {
    attrs: {
      "to": "/login"
    }
  }, [_vm._v("Login")])], 1)])], 1)])
},staticRenderFns: []}

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "reply-box pad-10",
    attrs: {
      "id": 'reply_' + _vm.e._id
    }
  }, [_c('a', {
    attrs: {
      "href": '#reply_' + _vm.e._id
    }
  }), _c('div', {
    staticClass: "avatar"
  }, [_c('router-link', {
    attrs: {
      "to": '/user/' + _vm.username
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.avatar,
      "alt": ""
    }
  })])], 1), _c('div', {
    staticClass: "header"
  }, [_c('router-link', {
    staticClass: "username",
    attrs: {
      "to": '/user/' + _vm.username
    }
  }, [_c('b', [_vm._v(_vm._s(_vm.username))])]), _c('span', {
    staticClass: "time"
  }, [_vm._v(_vm._s(_vm._f("std2hiDdmy")(_vm.e.createAt)))]), (_vm.e.createAt !== _vm.e.updateAt) ? _c('span', {
    staticClass: "time"
  }, [_vm._v(", edit " + _vm._s(_vm._f("std2timeAgo")(_vm.e.updateAt)) + " ago")]) : _vm._e()], 1), _c('div', {
    staticClass: "content md-body"
  }, [(_vm.e.replyToUsername) ? _c('router-link', {
    attrs: {
      "to": '/user/' + _vm.e.replyToUsername
    }
  }, [_vm._v("@" + _vm._s(_vm.e.replyToUsername))]) : _vm._e(), _vm._v(" \n    " + _vm._s(_vm.e.type === 'text' ? _vm.content : '') + "\n    "), (_vm.e.type !== 'text') ? _c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.content)
    }
  }) : _vm._e()], 1), _c('div', {
    staticClass: "btn-group"
  }, [(_vm.e.authorId === _vm.login_user._id) ? _c('span', {
    staticClass: "btn btn-edit",
    on: {
      "click": function($event) {
        _vm.editReply(_vm.e._id)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-edit"
  })]) : _vm._e(), _c('span', {
    staticClass: "btn btn-reply",
    on: {
      "click": function($event) {
        _vm.replyTo(_vm.username)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-reply"
  })])])])
},staticRenderFns: []}

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "page page-login"
  }, [(_vm.msg) ? _c('div', {
    staticClass: "info block"
  }, [_vm._v("\n\t\t" + _vm._s(_vm.msg) + "\n\t")]) : _vm._e(), _c('div', {
    staticClass: "vendors block"
  }, [_c('p', [_c('span', {
    staticClass: "btn",
    on: {
      "click": function($event) {
        _vm.login('github')
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-github"
  }), _vm._v(" Login with Github\n\t\t\t")])]), _c('p', [_c('span', {
    staticClass: "btn",
    on: {
      "click": function($event) {
        _vm.login('twitter')
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-twitter"
  }), _vm._v(" Login with Twitter\n\t\t\t")])])])])
},staticRenderFns: []}

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {})
},staticRenderFns: []}

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "view view-edit-topic"
  }, [_c('div', {
    staticClass: "full-screen row pad-lr-10"
  }, [_c('aside', {
    staticClass: "block right"
  }, [_c('nav', {
    staticClass: "navigator pad-lr-10"
  }, [_vm._v("Operations")]), _c('div', {
    staticClass: "box btn-group flex around_center"
  }, [_c('span', {
    staticClass: "btn btn-green",
    on: {
      "click": _vm.save
    }
  }, [_c('b', [_vm._v("SAVE")])]), _c('span', {
    staticClass: "btn btn-blue right",
    on: {
      "click": _vm.publish
    }
  }, [_c('b', [_vm._v("PUBLISH")])])]), _c('div', {
    staticClass: "box"
  }, [_c('b', [_vm._v("Choose a category")]), (_vm.login_user.role === 'editor') ? _c('i', {
    staticClass: "btn fa fa-plus hover_rotate_90 right",
    on: {
      "click": function($event) {
        _vm.openDialog('add_category')
      }
    }
  }) : _vm._e(), _c('div', {
    staticClass: "categories"
  }, _vm._l((_vm.categories), function(e) {
    return _c('span', {
      staticClass: "category btn rad-4",
      class: _vm.category === e._id ? 'btn-green' : 'btn-green-h-b',
      on: {
        "click": function($event) {
          _vm.switchCategory(e._id)
        }
      }
    }, [_vm._v("\n\t\t\t\t\t\t" + _vm._s(e.name) + "\n\t\t\t\t\t")])
  }))]), _c('div', {
    staticClass: "box"
  }, [_c('b', [_vm._v("Select tags")]), (_vm.login_user.role === 'editor') ? _c('i', {
    staticClass: "btn fa fa-plus right hover_rotate_90",
    on: {
      "click": function($event) {
        _vm.openDialog('add_tag')
      }
    }
  }) : _vm._e(), _c('div', {
    staticClass: "tags"
  }, _vm._l((_vm.tags), function(e) {
    return _c('span', {
      staticClass: "tag btn rad-4",
      class: _vm.selectedTags.indexOf(e._id) > -1 ? 'btn-blue' : 'btn-blue-h-b',
      on: {
        "click": function($event) {
          _vm.addTag(e._id)
        }
      }
    }, [_vm._v("\n\t\t\t\t\t\t" + _vm._s(e.name) + "\n\t\t\t\t\t")])
  }))]), _c('div', {
    staticClass: "box switches row"
  }, [_c('label', {
    attrs: {
      "for": "push_top"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.top),
      expression: "top"
    }],
    attrs: {
      "type": "checkbox",
      "id": "push_top"
    },
    domProps: {
      "checked": Array.isArray(_vm.top) ? _vm._i(_vm.top, null) > -1 : (_vm.top)
    },
    on: {
      "__c": function($event) {
        var $$a = _vm.top,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.top = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.top = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.top = $$c
        }
      }
    }
  }), _vm._v(" Push to top\n\t\t\t\t")]), _c('br'), _c('label', {
    attrs: {
      "for": "enable_toc"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.enableToc),
      expression: "enableToc"
    }],
    attrs: {
      "type": "checkbox",
      "id": "enable_toc"
    },
    domProps: {
      "checked": Array.isArray(_vm.enableToc) ? _vm._i(_vm.enableToc, null) > -1 : (_vm.enableToc)
    },
    on: {
      "__c": function($event) {
        var $$a = _vm.enableToc,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.enableToc = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.enableToc = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.enableToc = $$c
        }
      }
    }
  }), _vm._v(" Enable TOC\n\t\t\t\t")]), _c('br'), _c('label', {
    attrs: {
      "for": "allow_comment"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.allowComment),
      expression: "allowComment"
    }],
    attrs: {
      "type": "checkbox",
      "id": "allow_comment"
    },
    domProps: {
      "checked": Array.isArray(_vm.allowComment) ? _vm._i(_vm.allowComment, null) > -1 : (_vm.allowComment)
    },
    on: {
      "__c": function($event) {
        var $$a = _vm.allowComment,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.allowComment = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.allowComment = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.allowComment = $$c
        }
      }
    }
  }), _vm._v(" Allow comment\n\t\t\t\t")]), _c('br'), _c('label', {
    attrs: {
      "for": "private_topic"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.hidden),
      expression: "hidden"
    }],
    attrs: {
      "type": "checkbox",
      "id": "private_topic"
    },
    domProps: {
      "checked": Array.isArray(_vm.hidden) ? _vm._i(_vm.hidden, null) > -1 : (_vm.hidden)
    },
    on: {
      "__c": function($event) {
        var $$a = _vm.hidden,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.hidden = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.hidden = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.hidden = $$c
        }
      }
    }
  }), _vm._v(" Private\n\t\t\t\t")]), _c('br')]), _c('div', {
    staticClass: "thumbnail box"
  }, [_c('b', [_vm._v("Current Thumbnail")]), _c('br'), _c('p', {
    staticClass: "center"
  }, [_c('a', {
    attrs: {
      "href": _vm.dyn_thumbnail ? _vm.dyn_thumbnail : '#',
      "target": "_blank"
    }
  }, [(_vm.dyn_thumbnail) ? _c('img', {
    staticClass: "rad-4",
    attrs: {
      "width": "40%",
      "src": _vm.dyn_thumbnail + '-tn.jpg'
    }
  }) : _vm._e()])])]), _c('div', {
    staticClass: "box images"
  }, [_c('b', [_vm._v("Upload Image")]), _c('i', {
    staticClass: "fa right",
    class: _vm.foldUpload ? 'fa-caret-down' : 'fa-caret-up',
    on: {
      "click": function($event) {
        _vm.foldUpload = !_vm.foldUpload
      }
    }
  }), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.foldUpload),
      expression: "!foldUpload"
    }]
  }, [_c('span', {
    staticClass: "btn btn-green btn-upload",
    on: {
      "click": _vm.upload
    }
  }, [_vm._v("UPLOAD")]), _c('span', [_vm._v(_vm._s(_vm.uploadQueue.length === 0 ? 'Ready' : 'Uploading'))]), _c('input', {
    ref: "file",
    attrs: {
      "type": "file",
      "name": "file",
      "accept": "image/gif, image/png, image/jpeg, image/bmp, image/webp"
    },
    on: {
      "change": _vm.onFile
    }
  }), _vm._l((_vm.imgsBase64), function(e, i) {
    return _c('div', {
      staticClass: "uploaded"
    }, [_c('a', {
      staticClass: "center",
      attrs: {
        "href": e,
        "target": "_blank"
      }
    }, [_c('img', {
      staticClass: "rad-4",
      attrs: {
        "src": e,
        "alt": e
      }
    }), _c('br')]), _c('div', {
      staticClass: "btn-group flex around_center"
    }, [_c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.imgsUrl[i]),
        expression: "imgsUrl[i]"
      }],
      staticClass: "btn",
      class: _vm.thumbnail === _vm.imgsUrl[i] ? 'btn-orange' : 'btn-orange-h-b',
      on: {
        "click": function($event) {
          _vm.setThumbnail(i)
        }
      }
    }, [_vm._v("Thumbnail\n\t\t\t\t\t\t\t\t"), _c('i', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.thumbnail === _vm.imgsUrl[i]),
        expression: "thumbnail===imgsUrl[i]"
      }],
      staticClass: "fa fa-check-circle"
    })]), _c('span', {
      staticClass: "btn btn-red",
      on: {
        "click": function($event) {
          _vm.removeImage(i)
        }
      }
    }, [_vm._v("Remove")])])])
  })], 2)])]), _c('main', {
    staticClass: "main block"
  }, [_c('nav', {
    staticClass: "navigator pad-lr-10"
  }, [_c('router-link', {
    attrs: {
      "to": "/"
    }
  }, [_vm._v("Home")]), _vm._v(" / " + _vm._s(!_vm.topicPath ? 'Create' : 'Edit') + " a topic\n\t\t\t")], 1), _c('div', {
    staticClass: "pad-lr-10"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.title),
      expression: "title"
    }],
    staticClass: "title",
    attrs: {
      "type": "text",
      "placeholder": "Title"
    },
    domProps: {
      "value": (_vm.title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.title = $event.target.value
      }
    }
  }), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.path),
      expression: "path"
    }],
    staticClass: "subtitle",
    attrs: {
      "type": "text",
      "placeholder": "Path"
    },
    domProps: {
      "value": (_vm.path)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.path = $event.target.value
      }
    }
  }), _c('div', {
    staticClass: "mode"
  }, [_c('span', {
    staticClass: "btn btn-switch",
    class: _vm.mode == 0 ? 'btn-blue' : 'btn-blue-h-b',
    on: {
      "click": function($event) {
        _vm.mode = 0
      }
    }
  }, [_vm._v("Write")]), _c('span', {
    staticClass: "btn btn-switch",
    class: _vm.mode == 1 ? 'btn-blue' : 'btn-blue-h-b',
    on: {
      "click": function($event) {
        _vm.mode = 1
      }
    }
  }, [_vm._v("Split")]), _c('span', {
    staticClass: "btn btn-switch",
    class: _vm.mode == 2 ? 'btn-blue' : 'btn-blue-h-b',
    on: {
      "click": function($event) {
        _vm.mode = 2
      }
    }
  }, [_vm._v("Preview")]), _c('a', {
    staticClass: "btn btn-tealBlue-h-b right",
    attrs: {
      "href": "http://markdown-guide.readthedocs.io/en/latest/basics.html#blockquotes",
      "target": "_blank"
    }
  }, [_vm._v("Syntax Guide")])])]), _c('div', {
    staticClass: "row edit-area",
    class: 'mode-' + _vm.mode
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.content),
      expression: "content"
    }],
    staticClass: "text box",
    domProps: {
      "value": (_vm.content)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.content = $event.target.value
      }
    }
  }), _c('div', {
    ref: "preview",
    staticClass: "preview box md-body",
    domProps: {
      "innerHTML": _vm._s(_vm.preview_content)
    }
  })])]), _c('footer', {
    staticClass: "bg-white rad-4"
  })])])
},staticRenderFns: []}

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "edit-reply-box"
  }, [_c('header', {
    staticClass: "pad-lr-10"
  }, [_c('span', {
    staticClass: "reply-to ellipsis"
  }, [_vm._v("Reply to \n\t\t"), _c('b', [_vm._v(_vm._s(_vm.replyTo))])]), _c('div', {
    staticClass: "btn-group right"
  }, [_c('span', {
    staticClass: "btn-icon",
    on: {
      "click": _vm.switchType
    }
  }, [_c('i', {
    staticClass: "fa trans_200 fa-2x",
    class: _vm.type === 'text' ? 'fa-toggle-off' : 'fa-toggle-on'
  })]), _c('span', {
    staticClass: "btn btn-reply btn-tealBlue",
    on: {
      "click": _vm.replyTopic
    }
  }, [_vm._v(_vm._s(_vm.action))])])]), _c('div', {
    staticClass: "ctrl"
  }), _c('div', {
    staticClass: "row pad-10"
  }, [_c('div', {
    staticClass: "edit-area"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.content),
      expression: "content"
    }],
    staticClass: "rad-4",
    domProps: {
      "value": (_vm.content)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.content = $event.target.value
      }
    }
  })])])])
},staticRenderFns: []}

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "view view-user"
  }, [_c('div', {
    staticClass: "wide-screen"
  }, [_c('main', [_c('div', {
    staticClass: "profile block main pad-10"
  }, [_c('div', {
    staticClass: "avatar"
  }, [_c('router-link', {
    attrs: {
      "to": '/user/' + _vm.user_curr.username
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.user_curr.avatar
    }
  })])], 1), _c('div', {
    staticClass: "btn-group"
  }, [(_vm.login_user._id === _vm.user_curr._id) ? _c('router-link', {
    attrs: {
      "to": '/edit/user/' + _vm.user_curr.username
    }
  }, [_c('div', {
    staticClass: "btn btn-edit"
  }, [_c('i', {
    staticClass: "fa fa-pencil"
  })])]) : _c('div', [_c('div', {
    staticClass: "btn btn-tealBlue btn-follow",
    on: {
      "click": _vm.followUser
    }
  }, [_vm._v("\n\t\t\t\t\t\t\t" + _vm._s(_vm.is_following ? 'unfollow' : 'follow') + "\n\t\t\t\t\t\t")])])], 1), _c('div', {
    staticClass: "basic-info"
  }, [_c('b', {
    staticClass: "name"
  }, [_vm._v(_vm._s(_vm.user_curr.displayName))]), _c('br'), _c('div', {
    staticClass: "bio ellipsis"
  }, [_vm._v(_vm._s(_vm.user_curr.bio))])]), _c('div', {
    staticClass: "basic-count"
  }, [_c('span', [_c('b', [_vm._v(_vm._s(_vm.user_curr_topics.length))]), _vm._v(" Topics")]), (_vm.user_curr.favorites) ? _c('span', [_c('b', [_vm._v(_vm._s(_vm.user_curr.favorites.length))]), _vm._v(" Favorites")]) : _vm._e(), (_vm.user_curr.followers) ? _c('span', [_c('b', [_vm._v(_vm._s(_vm.user_curr.followers.length))]), _vm._v(" Followers")]) : _vm._e(), (_vm.user_curr.followings) ? _c('span', [_c('b', [_vm._v(_vm._s(_vm.user_curr.followings.length))]), _vm._v(" Followings")]) : _vm._e()])]), _c('div', {
    staticClass: "tab-panel block main"
  }, [_c('div', {
    staticClass: "tabs flex middle_center"
  }, [_c('div', {
    staticClass: "tab",
    class: {
      'active': _vm.tab_curr === 'topic'
    },
    on: {
      "click": function($event) {
        _vm.switchTab('topic')
      }
    }
  }, [_vm._v("Topics")]), _c('div', {
    staticClass: "tab",
    class: {
      'active': _vm.tab_curr === 'favorite'
    },
    on: {
      "click": function($event) {
        _vm.switchTab('favorite')
      }
    }
  }, [_vm._v("Favorites")]), _c('div', {
    staticClass: "tab",
    class: {
      'active': _vm.tab_curr === 'follower'
    },
    on: {
      "click": function($event) {
        _vm.switchTab('follower')
      }
    }
  }, [_vm._v("Followers")]), _c('div', {
    staticClass: "tab",
    class: {
      'active': _vm.tab_curr === 'following'
    },
    on: {
      "click": function($event) {
        _vm.switchTab('following')
      }
    }
  }, [_vm._v("Followings")]), _c('div', {
    staticClass: "tab",
    class: {
      'active': _vm.tab_curr === 'reply'
    },
    on: {
      "click": function($event) {
        _vm.switchTab('reply')
      }
    }
  }, [_vm._v("Replies")])]), _c('div', {
    staticClass: "panels"
  }, [(_vm.tab_curr === 'topic') ? _c('div', {
    staticClass: "panel"
  }, [(!_vm.user_curr_topics.length) ? _c('div', {
    staticClass: "panel-empty-data"
  }, [_c('span', [_c('b', [_vm._v(_vm._s(_vm.user_curr.displayName))]), _vm._v(" has no topics yet.")])]) : _vm._e(), (_vm.user_curr_topics.length) ? _c('div', {
    staticClass: "panel-topic"
  }, _vm._l((_vm.user_curr_topics), function(e) {
    return _c('topic-item', {
      attrs: {
        "e": e,
        "mode": 'user_topics'
      }
    })
  })) : _vm._e()]) : _vm._e(), (_vm.tab_curr === 'favorite') ? _c('div', {
    staticClass: "panel"
  }, [(!_vm.user_curr_favorites.length) ? _c('div', {
    staticClass: "panel-empty-data"
  }, [_c('span', [_c('b', [_vm._v(_vm._s(_vm.user_curr.displayName))]), _vm._v(" has no favorite topics.")])]) : _c('div', {
    staticClass: "panel-favorite"
  }, _vm._l((_vm.user_curr_favorites), function(e) {
    return _c('topic-item', {
      staticClass: "user-topic",
      attrs: {
        "e": e,
        "mode": 'user_favorites'
      }
    })
  }))]) : _vm._e(), (_vm.tab_curr === 'follower') ? _c('div', {
    staticClass: "panel"
  }, [(!_vm.user_curr_followers.length) ? _c('div', {
    staticClass: "panel-empty-data"
  }, [_c('span', [_c('b', [_vm._v(_vm._s(_vm.user_curr.displayName))]), _vm._v(" has no followers.")])]) : _c('div', {
    staticClass: "panel-follower"
  }, _vm._l((_vm.user_curr_followers), function(e) {
    return _c('user-item', {
      attrs: {
        "e": e
      }
    })
  }))]) : _vm._e(), (_vm.tab_curr === 'following') ? _c('div', {
    staticClass: "panel"
  }, [(!_vm.user_curr_followings.length) ? _c('div', {
    staticClass: "panel-empty-data"
  }, [_c('span', [_c('b', [_vm._v(_vm._s(_vm.user_curr.displayName))]), _vm._v(" has no following users.")])]) : _c('div', {
    staticClass: "panel-following"
  }, _vm._l((_vm.user_curr_followings), function(e) {
    return _c('user-item', {
      attrs: {
        "e": e
      }
    })
  }))]) : _vm._e(), (_vm.tab_curr === 'reply') ? _c('div', {
    staticClass: "panel"
  }, [(!_vm.user_curr_replys.length) ? _c('div', {
    staticClass: "panel-empty-data"
  }, [_c('span', [_c('b', [_vm._v(_vm._s(_vm.user_curr.displayName))]), _vm._v(" has no replies yet.")])]) : _vm._e(), (_vm.user_curr_replys.length) ? _c('div', {
    staticClass: "panel-reply"
  }, _vm._l((_vm.user_curr_replys), function(e) {
    return _c('user-reply-item', {
      key: e._id,
      staticClass: "user-reply",
      attrs: {
        "topic": e.topicInfo,
        "e": e
      }
    })
  })) : _vm._e()]) : _vm._e()])])])])])
},staticRenderFns: []}

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "view view-topics"
  }, [_c('div', {
    staticClass: "wide-screen row"
  }, [_c('main', {
    staticClass: "block main"
  }, [_c('header', {
    staticClass: "tabs-category pad-lr-10"
  }, [_c('div', {
    staticClass: "tab-category rad-4",
    class: {
      'active': !_vm.curr_category
    },
    on: {
      "click": function($event) {
        _vm.switchCategory(null)
      }
    }
  }, [_vm._v("All")]), _vm._l((_vm.category_list), function(e) {
    return _c('div', {
      staticClass: "tab-category rad-4",
      class: {
        'active': _vm.curr_category === e
      },
      on: {
        "click": function($event) {
          _vm.switchCategory(e)
        }
      }
    }, [_vm._v("\n\t\t\t\t\t" + _vm._s(e.name) + "\n\t\t\t\t")])
  })], 2), _c('div', {
    staticClass: "topic-list"
  }, _vm._l((_vm.topic_list), function(e) {
    return _c('topic-item', {
      attrs: {
        "e": e
      }
    })
  })), _c('footer', {
    staticClass: "pager pad-lr-10"
  }, [(_vm.page > 1) ? _c('router-link', {
    attrs: {
      "to": '/topic?page=' + _vm.page--
    }
  }, [_c('span', {
    staticClass: "btn btn-tealBlue left"
  }, [_c('i', {
    staticClass: "fa fa-angle-double-left"
  }), _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.prev.title))])]) : _vm._e(), (_vm.topic_list_next.length) ? _c('router-link', {
    attrs: {
      "to": '/topic?page=' + _vm.page++
    }
  }, [_c('span', {
    staticClass: "btn btn-tealBlue right"
  }, [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.next.title) + " ")]), _c('i', {
    staticClass: "fa fa-angle-double-right"
  })]) : _vm._e()], 1)])])])
},staticRenderFns: []}

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "topic-item flex align_center trans_200 pad-lr-10"
  }, [(_vm.mode !== 'user_topics') ? _c('router-link', {
    attrs: {
      "to": '/user/' + _vm.e.authorInfo.username
    }
  }, [_c('div', {
    staticClass: "avatar"
  }, [_c('img', {
    attrs: {
      "width": "35",
      "src": _vm.e.authorInfo.avatar
    }
  })])]) : _vm._e(), _c('span', {
    staticClass: "count"
  }, [_c('em', {
    staticClass: "rc"
  }, [_vm._v(_vm._s(_vm.e.replyCount))]), _vm._v(" /\n    "), _c('span', {
    staticClass: "pv"
  }, [_vm._v(_vm._s(_vm.e.visitCount))])]), (!_vm.mode || _vm.mode.indexOf('user_') === -1) ? _c('span', [(_vm.e.top) ? _c('span', {
    staticClass: "at-top"
  }, [_vm._v("TOP")]) : _c('span', {
    staticClass: "category"
  }, [_vm._v(_vm._s(_vm.e.categoryInfo.name))])]) : _vm._e(), _c('span', {
    staticClass: "title ellipsis flex_1"
  }, [_c('router-link', {
    attrs: {
      "to": '/topic/' + _vm.e.path
    }
  }, [_vm._v(_vm._s(_vm.e.title))])], 1), (!_vm.mode || _vm.mode.indexOf('user_') === -1) ? _c('div', {
    staticClass: "last-reply self_end"
  }, [_c('b', [_vm._v(_vm._s(_vm._f("std2timeAgo")(_vm.e.lastReplyAt)))]), _vm._v(" ago\n  ")]) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user-box block"
  }, [_c('header', {
    staticClass: "pad-lr-10"
  }, [_vm._v("AUTHOR")]), _c('div', {
    staticClass: "pad-10 flex align_center"
  }, [_c('router-link', {
    staticClass: "avatar",
    attrs: {
      "to": '/user/' + _vm.e.username
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.e.avatar
    }
  })]), _c('span', {
    staticClass: "username"
  }, [_c('router-link', {
    attrs: {
      "to": '/user/' + _vm.e.username
    }
  }, [_c('b', [_vm._v(_vm._s(_vm.e.username))])])], 1)], 1), _c('div', {
    staticClass: "btn-group pad-10 flex around_center"
  })])
},staticRenderFns: []}

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c("div")
},staticRenderFns: []}

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {})
},staticRenderFns: []}

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user-reply-box pad-10",
    attrs: {
      "id": _vm.e._id
    }
  }, [_c('router-link', {
    staticClass: "md-body",
    attrs: {
      "to": '/topic/' + _vm.topic.path + '#reply_' + _vm.e._id
    }
  }, [_c('span', {
    staticClass: "content rad-4"
  }, [_vm._v(_vm._s(_vm._f("ellipsis")(_vm.e.content)))]), _c('br'), _vm._v("in "), _c('b', {
    staticClass: "topic-title"
  }, [_vm._v(_vm._s(_vm._f("ellipsis")(_vm.topic.path)))])]), _c('span', {
    staticClass: "time right"
  }, [_vm._v(_vm._s(_vm._f("std2hiDdmy")(_vm.e.createAt)))])], 1)
},staticRenderFns: []}

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "modal"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.dialog),
      expression: "dialog"
    }],
    staticClass: "full trans_200",
    attrs: {
      "id": "dialog"
    }
  }, [_c('div', {
    staticClass: "dialog-mask full",
    on: {
      "click": _vm.closeDialog
    }
  }), (_vm.dialog === 'add_tag') ? _c('div', {
    staticClass: "add-tag dialog block trans_200"
  }, [_c('header', {
    staticClass: "pad-lr-10"
  }, [_vm._v("Add Tag")]), _c('div', {
    staticClass: "tag-list pad-lr-10"
  }, _vm._l((_vm.tag_list), function(e) {
    return _c('span', {
      staticClass: "tag rad-4 btn btn-blue-h-b"
    }, [_vm._v(_vm._s(e.name))])
  })), _c('div', {
    staticClass: "tag-input pad-lr-10"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tag.name),
      expression: "tag.name"
    }],
    ref: "add_tag",
    attrs: {
      "type": "text",
      "placeholder": "name"
    },
    domProps: {
      "value": (_vm.tag.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tag.name = $event.target.value
      }
    }
  }), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tag.path),
      expression: "tag.path"
    }],
    attrs: {
      "type": "text",
      "placeholder": "path"
    },
    domProps: {
      "value": (_vm.tag.path)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tag.path = $event.target.value
      }
    }
  })]), _c('div', {
    staticClass: "btn-group flex around_center"
  }, [_c('span', {
    staticClass: "btn btn-tealBlue",
    on: {
      "click": _vm.addTag
    }
  }, [_vm._v("ADD")]), _c('span', {
    staticClass: "btn btn-tealBlue-h-b",
    on: {
      "click": _vm.closeDialog
    }
  }, [_vm._v("CANCEL")])])]) : _vm._e(), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.dialog === 'add_category'),
      expression: "dialog==='add_category'"
    }],
    staticClass: "add-category dialog block trans_200"
  }, [_c('header', {
    staticClass: "pad-lr-10"
  }, [_vm._v("Add Category\n      "), _c('span', {
    staticClass: "right",
    on: {
      "click": _vm.closeDialog
    }
  }, [_c('i', {
    staticClass: "btn fa fa-close right"
  })])]), _c('div', {
    staticClass: "category-list pad-lr-10"
  }, _vm._l((_vm.category_list), function(e) {
    return _c('span', {
      staticClass: "tag rad-4 btn btn-blue-h-b"
    }, [_vm._v(_vm._s(e.name))])
  })), _c('div', {
    staticClass: "category-input pad-lr-10"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.category.name),
      expression: "category.name"
    }],
    ref: "add_category",
    attrs: {
      "type": "text",
      "placeholder": "name"
    },
    domProps: {
      "value": (_vm.category.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.category.name = $event.target.value
      }
    }
  }), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.category.path),
      expression: "category.path"
    }],
    attrs: {
      "type": "text",
      "placeholder": "path"
    },
    domProps: {
      "value": (_vm.category.path)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.category.path = $event.target.value
      }
    }
  })]), _c('div', {
    staticClass: "btn-group flex around_center"
  }, [_c('span', {
    staticClass: "btn btn-green",
    on: {
      "click": _vm.addCategory
    }
  }, [_vm._v("ADD")]), _c('span', {
    staticClass: "btn btn-green-h-b",
    on: {
      "click": _vm.closeDialog
    }
  }, [_vm._v("CANCEL")])])])])])
},staticRenderFns: []}

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "page page-404"
  }, [_c('div', {
    staticClass: "wide-screen"
  }, [_c('div', {
    staticClass: "block main flex middle_center redirect_col"
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v("4-Missing-0-Node-4")]), _c('div', {
    staticClass: "redirect"
  }, [_c('router-link', {
    staticClass: "blue",
    attrs: {
      "to": "/"
    }
  }, [_vm._v("Back to Home")])], 1)])])])
},staticRenderFns: []}

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('nav-bar'), _c('transition', {
    attrs: {
      "name": "fade",
      "mode": "out-in"
    }
  }, [_c('router-view')], 1), _c('foot-bar'), _c('w-dialog')], 1)
},staticRenderFns: []}

/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {})
},staticRenderFns: []}

/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "view view-edit-user"
  }, [_c('div', {
    staticClass: "wide-screen"
  }, [_c('aside', {
    staticClass: "block right"
  }, [_c('nav', {
    staticClass: "navigator pad-lr-10"
  }, [_vm._v("Operations")]), _c('div', {
    staticClass: "btn-group flex around_center"
  }, [_c('span', {
    staticClass: "btn btn-blue",
    on: {
      "click": _vm.update
    }
  }, [_vm._v("UPDATE")])])]), _c('div', {
    staticClass: "profile block main pad-10"
  }, [_vm._v("\n\t\t\tBio: "), _c('br'), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.bio),
      expression: "bio"
    }],
    domProps: {
      "value": (_vm.bio)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.bio = $event.target.value
      }
    }
  }), _c('p')])])])
},staticRenderFns: []}

/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {})
},staticRenderFns: []}

/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "view view-topic"
  }, [_c('div', {
    staticClass: "wide-screen row"
  }, [(_vm.topic_curr._id) ? _c('main', {
    staticClass: "block"
  }, [_c('div', {
    staticClass: "topic-header pad-lr-10"
  }, [_c('div', {
    staticClass: "title ellipsis"
  }, [_vm._v(_vm._s(_vm.topic_curr.title))]), _c('div', {
    staticClass: "subtitle ellipsis"
  }, [_c('span', [_c('router-link', {
    attrs: {
      "to": '/user/' + _vm.topic_curr.authorInfo.username
    }
  }, [_c('b', [_vm._v(_vm._s(_vm.topic_curr.authorInfo.username))])])], 1), _c('span', [_vm._v("Published "), _c('b', [_vm._v(_vm._s(_vm._f("std2hiDdmy")(_vm.topic_curr.createAt)))])]), _c('span', [_vm._v("From \n\t\t\t\t\t\t"), _c('router-link', {
    attrs: {
      "to": '/?category=' + _vm.topic_curr.categoryInfo.path
    }
  }, [_c('b', [_vm._v(_vm._s(_vm.topic_curr.categoryInfo.name))])])], 1)]), _c('div', {
    staticClass: "tags ellipsis"
  }, _vm._l((_vm.topic_curr.tagsInfo), function(e) {
    return _c('span', {
      staticClass: "tag btn rad-4 btn-blue"
    }, [_vm._v(_vm._s(e.name))])
  })), _c('router-link', {
    staticClass: "avatar",
    attrs: {
      "to": '/user/' + _vm.topic_curr.authorInfo.username
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.topic_curr.authorInfo.avatar
    }
  })]), _c('span', {
    staticClass: "pv"
  }, [_c('b', [_vm._v(_vm._s(_vm._f("fmtNum")(_vm.topic_curr.visitCount)))]), _vm._v(" views")]), _c('div', {
    staticClass: "btn-group right"
  }, [_c('span', {
    staticClass: "btn-like",
    on: {
      "click": _vm.favoriteTopic
    }
  }, [_c('i', {
    staticClass: "fa hover_scale",
    class: _vm.liked ? 'fa-heart' : 'fa-heart-o'
  }), _c('span', [_vm._v(_vm._s(_vm._f("fmtNum")(_vm.topic_curr.likedUsers.length)))])]), _c('br'), (_vm.login_user._id === _vm.topic_curr.authorId) ? _c('router-link', {
    attrs: {
      "to": '/edit/topic/' + _vm.topic_curr.path
    }
  }, [_c('span', {
    staticClass: "btn btn-edit btn-blue-h-b"
  }, [_vm._v("Edit")])]) : _c('span', {
    staticClass: "btn btn-share btn-blue-h-b",
    on: {
      "click": _vm.openShareBox
    }
  }, [_vm._v("Share")])], 1)], 1), _c('article', {
    staticClass: "topic pad-lr-20 md-body"
  }, [_c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.topic_curr.content)
    }
  }), _c('div', {
    staticClass: "hide",
    attrs: {
      "id": "widget-script"
    }
  })]), _c('footer', {
    staticClass: "pager pad-lr-10"
  }, [(_vm.topic_prev._id) ? _c('router-link', {
    attrs: {
      "to": '/topic/' + _vm.topic_prev.path
    }
  }, [_c('span', {
    staticClass: "btn btn-tealBlue left ellipsis"
  }, [_c('i', {
    staticClass: "fa fa-angle-double-left"
  }), _vm._v("\n\t\t\t\t  " + _vm._s(_vm.topic_prev.title))])]) : _vm._e(), (_vm.topic_next._id) ? _c('router-link', {
    attrs: {
      "to": '/topic/' + _vm.topic_next.path
    }
  }, [_c('span', {
    staticClass: "btn btn-tealBlue right ellipsis"
  }, [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.topic_next.title) + " \n\t\t\t\t\t"), _c('i', {
    staticClass: "fa fa-angle-double-right"
  })])]) : _vm._e()], 1)]) : _vm._e(), _c('div', {
    staticClass: "block replies"
  }, [_c('header', {
    staticClass: "pad-lr-10"
  }, [(_vm.topic_curr.allowComment) ? _c('span', [_c('b', [_vm._v(_vm._s(_vm.topic_curr_replys.length))]), _vm._v(" Relies")]) : _c('span', [_vm._v("Comments not allowed")])]), (_vm.topic_curr_replys.length) ? _c('div', {
    staticClass: "reply_list"
  }, _vm._l((_vm.topic_curr_replys), function(e) {
    return _c('reply-item', {
      key: e._id,
      attrs: {
        "e": e
      }
    })
  })) : _vm._e()]), (_vm.topic_curr.allowComment && _vm.login_user._id) ? _c('edit-reply', {
    staticClass: "block"
  }) : _vm._e()], 1)])
},staticRenderFns: []}

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(46);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("1e9cc7f6", content, true);

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(47);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("2d833bda", content, true);

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(48);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("607b9e8b", content, true);

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(49);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("0abbbc8d", content, true);

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(50);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("483b2d5e", content, true);

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(51);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("7318eedf", content, true);

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(52);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("05a5b5f8", content, true);

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(53);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("6989c3e9", content, true);

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(54);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("f81e5a72", content, true);

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(55);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("3750eda6", content, true);

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(56);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("71bf593a", content, true);

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(57);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("6306c2fd", content, true);

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(58);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("3a1bf26c", content, true);

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(59);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("268d0619", content, true);

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(60);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("2cc4aa4c", content, true);

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(61);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("4dc569ff", content, true);

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(62);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("252b0c68", content, true);

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(63);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("985a061e", content, true);

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(64);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("8b5de46a", content, true);

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(65);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("31526730", content, true);

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(66);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
__webpack_require__(2)("19deaf8e", content, true);

/***/ }),
/* 131 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = {
	"name": "arknodejs_community_vue",
	"description": "frontend of arknodejs",
	"author": "w10036w@gmail.com",
	"private": false,
	"scripts": {
		"dev": "node index",
		"start": "NODE_ENV=production node index",
		"build": "rimraf dist && npm run build:client && npm run build:server",
		"build:client": "cross-env NODE_ENV=production webpack --config build/webpack.client.config.js --progress --hide-modules",
		"build:server": "cross-env NODE_ENV=production webpack --config build/webpack.server.config.js --progress --hide-modules",
		"build:size": "cross-env NODE_ENV=production webpack --config build/webpack.server.config.js --display-modules --sort-modules-by size"
	},
	"config": {
		"api": "/api",
		"port": 8002
	},
	"engines": {
		"node": ">=6.0",
		"npm": ">=3.0"
	},
	"dependencies": {
		"axios": "^0.15.3",
		"compression": "^1.6.2",
		"cross-env": "^3.1.3",
		"es6-promise": "^4.0.5",
		"express": "^4.14.0",
		"isomorphic-style-loader": "^1.1.0",
		"lru-cache": "^4.0.2",
		"marked": "^0.3.6",
		"node-schedule": "^1.2.0",
		"serialize-javascript": "^1.3.0",
		"serve-favicon": "^2.3.2",
		"vue": "^2.1.10",
		"vue-meta": "^1.0.3",
		"vue-router": "^2.1.0",
		"vue-server-renderer": "^2.1.10",
		"vuex": "^2.1.0",
		"vuex-router-sync": "^4.0.2"
	},
	"devDependencies": {
		"autoprefixer": "^6.5.3",
		"babel-core": "^6.0.0",
		"babel-eslint": "^6.1.2",
		"babel-loader": "^6.0.0",
		"babel-plugin-component": "^0.9.0",
		"babel-plugin-transform-object-rest-spread": "^6.16.0",
		"babel-plugin-transform-runtime": "^6.0.0",
		"babel-preset-es2015": "^6.0.0",
		"babel-preset-latest": "^6.22.0",
		"babel-preset-stage-2": "^6.0.0",
		"css-loader": "^0.26.0",
		"element-ui": "^1.2.3",
		"extract-text-webpack-plugin": "^2.0.0-beta.3",
		"file-loader": "^0.10.0",
		"html-webpack-plugin": "^2.24.1",
		"rimraf": "^2.5.4",
		"stylus": "^0.54.5",
		"stylus-loader": "^2.4.0",
		"sw-precache-webpack-plugin": "^0.9.0",
		"url-loader": "^0.5.7",
		"vue-aplayer": "^0.1.0",
		"vue-cookie": "^1.1.3",
		"vue-loader": "^10.0.2",
		"vue-template-compiler": "^2.1.8",
		"webpack": "^2.2.0",
		"webpack-bundle-analyzer": "^2.3.0",
		"webpack-dev-middleware": "^1.8.4",
		"webpack-hot-middleware": "^2.13.2"
	}
};

/***/ }),
/* 133 */
/***/ (function(module, exports) {

module.exports = require("lru-cache");

/***/ }),
/* 134 */
/***/ (function(module, exports) {

module.exports = require("marked");

/***/ }),
/* 135 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports = require("vue-router");

/***/ }),
/* 137 */
/***/ (function(module, exports) {

module.exports = require("vuex-router-sync");

/***/ })
/******/ ]);