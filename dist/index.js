"use strict";
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function _ts_values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = function(target, all) {
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = function(to, from, except, desc) {
    if (from && (typeof from === "undefined" ? "undefined" : _type_of(from)) === "object" || typeof from === "function") {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            var _loop = function() {
                var key = _step.value;
                if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                    get: function() {
                        return from[key];
                    },
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            };
            for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return to;
};
var __toCommonJS = function(mod) {
    return __copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
};
// src/index.ts
var src_exports = {};
__export(src_exports, {
    Pipeline: function() {
        return Pipeline;
    },
    PipelineLink: function() {
        return PipelineLink;
    }
});
module.exports = __toCommonJS(src_exports);
var Pipeline = /*#__PURE__*/ function() {
    function Pipeline(input) {
        var _this = this;
        _class_call_check(this, Pipeline);
        this._pipings = [];
        this._pipe = function(pipe, timeLimitSecs, fallbackValue) {
            _this._pipings.push([
                pipe,
                timeLimitSecs,
                fallbackValue
            ]);
        };
        this._exec = function() {
            var _this1 = _this;
            return new Promise(function() {
                var _ref = _async_to_generator(function(resolve, reject) {
                    var _$input, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _ret, err;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _$input = _this1._input;
                                _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                _state.label = 1;
                            case 1:
                                _state.trys.push([
                                    1,
                                    6,
                                    7,
                                    8
                                ]);
                                _loop = function() {
                                    var _step_value, pipe, timeLimitSecs, fallbackValue;
                                    return _ts_generator(this, function(_state) {
                                        switch(_state.label){
                                            case 0:
                                                _step_value = _sliced_to_array(_step.value, 3), pipe = _step_value[0], timeLimitSecs = _step_value[1], fallbackValue = _step_value[2];
                                                if (_this1._isCancelled) {
                                                    reject("Pipeline was cancelled");
                                                    return [
                                                        2,
                                                        {
                                                            v: void void 0
                                                        }
                                                    ];
                                                }
                                                return [
                                                    4,
                                                    new Promise(function() {
                                                        var _ref = _async_to_generator(function(resolve2) {
                                                            var timeout;
                                                            return _ts_generator(this, function(_state) {
                                                                timeout = void 0;
                                                                if (timeLimitSecs !== void 0) {
                                                                    timeout = setTimeout(function() {
                                                                        resolve2(fallbackValue !== void 0 ? fallbackValue : null);
                                                                    }, timeLimitSecs * 1e3);
                                                                }
                                                                pipe(_$input, timeLimitSecs).then(function(output) {
                                                                    clearTimeout(timeout);
                                                                    resolve2(output);
                                                                });
                                                                return [
                                                                    2
                                                                ];
                                                            });
                                                        });
                                                        return function(resolve2) {
                                                            return _ref.apply(this, arguments);
                                                        };
                                                    }())
                                                ];
                                            case 1:
                                                _$input = _state.sent();
                                                return [
                                                    2
                                                ];
                                        }
                                    });
                                };
                                _iterator = _this1._pipings[Symbol.iterator]();
                                _state.label = 2;
                            case 2:
                                if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                                    3,
                                    5
                                ];
                                return [
                                    5,
                                    _ts_values(_loop())
                                ];
                            case 3:
                                _ret = _state.sent();
                                if (_type_of(_ret) === "object") return [
                                    2,
                                    _ret.v
                                ];
                                _state.label = 4;
                            case 4:
                                _iteratorNormalCompletion = true;
                                return [
                                    3,
                                    2
                                ];
                            case 5:
                                return [
                                    3,
                                    8
                                ];
                            case 6:
                                err = _state.sent();
                                _didIteratorError = true;
                                _iteratorError = err;
                                return [
                                    3,
                                    8
                                ];
                            case 7:
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                                        _iterator.return();
                                    }
                                } finally{
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                                return [
                                    7
                                ];
                            case 8:
                                resolve(_$input);
                                return [
                                    2
                                ];
                        }
                    });
                });
                return function(resolve, reject) {
                    return _ref.apply(this, arguments);
                };
            }());
        };
        this._isCancelled = false;
        this._cancel = function() {
            _this._isCancelled = true;
        };
        this._input = input;
    }
    _create_class(Pipeline, [
        {
            key: "pipe",
            value: function pipe(pipe, timeLimitSecs, fallbackValue) {
                this._pipe(pipe, timeLimitSecs, fallbackValue);
                return new PipelineLink(this._pipe, this._exec, this._cancel);
            }
        },
        {
            key: "cancel",
            value: function cancel() {
                this._cancel();
            }
        }
    ]);
    return Pipeline;
}();
var PipelineLink = /*#__PURE__*/ function() {
    function _PipelineLink(_pipe, _exec, _cancel) {
        _class_call_check(this, _PipelineLink);
        this._pipe = _pipe;
        this._exec = _exec;
        this._cancel = _cancel;
    }
    _create_class(_PipelineLink, [
        {
            key: "pipe",
            value: function pipe(pipe, timeLimitSecs, fallbackValue) {
                this._pipe(pipe, timeLimitSecs, fallbackValue);
                return new _PipelineLink(this._pipe, this._exec, this._cancel);
            }
        },
        {
            key: "exec",
            value: function exec() {
                return this._exec();
            }
        },
        {
            key: "cancel",
            value: function cancel() {
                this._cancel();
            }
        }
    ]);
    return _PipelineLink;
}();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    Pipeline: Pipeline,
    PipelineLink: PipelineLink
});
