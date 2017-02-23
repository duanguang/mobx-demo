"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/**
 * Created by DuanG on 2017/2/16.
 */
var mobx_1 = require('mobx');
var mobx_utils_1 = require('mobx-utils');
var mobxUtils = require('mobx-utils');
var todoService_1 = require("../api/todoService");
var Store = (function () {
    function Store() {
        var _this = this;
        this.count = 0;
        this.users = {};
        this.map = mobx_1.observable.map({ key: "value" }); //键值对数据结构
        this.theme = {
            backgroundColor: "#ffffff"
        };
        this.person = {
            firstName: "firstMichel",
            lastName: "lastWeststrate"
        };
        this.array = [];
        this.reset = function () {
            //this.users = Object.assign( { 'ASDFPOIU98': { id: 'ASDFPOIU98', name: '张小龙' } }, this.users);autorun触发二次
            //this.users['ASDFPOIU98'] = { id: 'ASDFPOIU98', name: '张小龙' }//autorun触发一次
            //未触发的原因是，观察的数据虽然是users对象，但其实是他们的指针指向，
            // 而以上修改数据的方式，并未改变users的指针，故不会触发set方法，也就不会触发数据更新检测。
        };
        this.test = function () {
            mobx_1.autorun(function () {
                // console.log(this.users)
                console.log(_this.person.lastName, ",", 
                // this untracked block will return the person's firstName without establishing a dependency
                mobx_1.untracked(function () { return _this.person.firstName; }));
            });
            mobx_1.autorun(function () {
                console.log(_this.array.length, "array!");
            });
        };
        ///监听对象属性，当对象属性值变化之前会被触发的拦截器
        this.listenIntercept = function () {
            mobx_1.intercept(_this.theme, 'backgroundColor', function (change) {
                console.log(change.newValue);
                if (!change.newValue) {
                    // ignore attempts to unset the background color
                    return null;
                }
                if (change.newValue.length === 6) {
                    // correct missing '#' prefix
                    change.newValue = '#' + change.newValue;
                    return change;
                }
                if (change.newValue.length === 7) {
                    // this must be a properly formatted color code!
                    return change;
                }
                throw new Error("This doesn't like a color at all: " + change.newValue);
            });
        };
        this.test();
        this.reset();
        this.total;
        this.listenIntercept();
    }
    Object.defineProperty(Store.prototype, "isLoading", {
        get: function () {
            var userData = this.userData;
            console.log('==isLoading==');
            return !!userData && userData.state == mobxUtils.PENDING;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "isLoaded", {
        get: function () {
            var userData = this.userData;
            console.log('==isLoaded==');
            return userData && userData.state == mobxUtils.FULFILLED;
        },
        enumerable: true,
        configurable: true
    });
    Store.prototype.getCount = function (count) {
        this.count = count;
    };
    Store.prototype.setVaule = function () {
        this.name = '111';
        this.title = '渲染';
        this.person.firstName = "firstG.K."; //当直接更改对象属性值时，autorun监听到对象引用地址并没有变化。故不会执行相关事件
        this.person = Object.assign({}, this.person); //此方法可以使autorun事件触发；还可使用untracked来监听对象属性值，来触发
        // this.person.lastName = "lastChesterton";
        this.map.set('key', 'new value');
        console.log(this.map.get('key'));
        console.log(Array.isArray(this.array)); //返回false
        console.log(Array.isArray(this.array.slice())); //返回true
        console.log("tojs:" + mobx_1.toJS(this.map));
        this.theme.backgroundColor = '#fffff';
        this.tranUpdate();
    };
    Object.defineProperty(Store.prototype, "total", {
        get: function () {
            return this.count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "uesrs", {
        get: function () {
            var _a = this, isLoaded = _a.isLoaded, userData = _a.userData;
            console.log(userData);
            if (isLoaded) {
                return userData.value;
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Store.prototype.tranUpdate = function () {
        var _this = this;
        /*transaction(() => {
            transaction(() => {
                this.array.push(1);
                this.array.push(2);
            });
            this.array.push(3);
        });*/
        mobx_1.runInAction(function () {
            _this.array.push(1);
            _this.array.push(2);
            _this.array.push(3);
        }); //相当于一个事务，全部操作完成，才更新
    };
    Store.prototype.query = function () {
        if (this.isLoading)
            return;
        this.userData = mobx_utils_1.fromPromise(todoService_1.getCustomerInfo());
    };
    Store.prototype.asyncQuery = function () {
        return __awaiter(this, void 0, void 0, function* () {
            var _this = this;
            if (this.isLoading)
                return;
            var userData = yield mobx_utils_1.fromPromise(todoService_1.getCustomerInfo());
            setTimeout(function () {
                _this.userData = (userData);
            }, 3000);
            /*runInAction("update state after fetching data", () => {
                this.userData=(userData);
    
                this.isSaving = true;
            })*/
        });
    };
    Store.prototype.boundQuery = function () {
        if (this.isLoading)
            return;
        this.userData = mobx_utils_1.fromPromise(todoService_1.getCustomerInfo());
    };
    __decorate([
        mobx_1.observable
    ], Store.prototype, "count", void 0);
    __decorate([
        mobx_1.observable
    ], Store.prototype, "title", void 0);
    __decorate([
        mobx_1.observable
    ], Store.prototype, "name", void 0);
    __decorate([
        mobx_1.observable
    ], Store.prototype, "users", void 0);
    __decorate([
        mobx_1.observable
    ], Store.prototype, "userData", void 0);
    __decorate([
        mobx_1.observable
    ], Store.prototype, "map", void 0);
    __decorate([
        //键值对数据结构
        mobx_1.observable
    ], Store.prototype, "theme", void 0);
    __decorate([
        mobx_1.observable
    ], Store.prototype, "person", void 0);
    __decorate([
        mobx_1.observable
    ], Store.prototype, "array", void 0);
    __decorate([
        mobx_1.computed
    ], Store.prototype, "isLoading", null);
    __decorate([
        mobx_1.computed
    ], Store.prototype, "isLoaded", null);
    __decorate([
        mobx_1.computed
    ], Store.prototype, "total", null);
    __decorate([
        mobx_1.computed
    ], Store.prototype, "uesrs", null);
    __decorate([
        mobx_1.action
    ], Store.prototype, "query", null);
    __decorate([
        mobx_1.action
    ], Store.prototype, "asyncQuery", null);
    __decorate([
        mobx_1.action.bound
    ], Store.prototype, "boundQuery", null);
    return Store;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new Store();
