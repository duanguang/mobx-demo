"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by DuanG on 2017/2/16.
 */
var mobx_1 = require('mobx');
var Store = (function () {
    function Store() {
        var _this = this;
        this.count = 0;
        this.users = {};
        this.reset = function () {
            //this.users = Object.assign( { 'ASDFPOIU98': { id: 'ASDFPOIU98', name: '张小龙' } }, this.users);autorun触发二次
            //this.users['ASDFPOIU98'] = { id: 'ASDFPOIU98', name: '张小龙' }//autorun触发一次
            //未触发的原因是，观察的数据虽然是users对象，但其实是他们的指针指向，
            // 而以上修改数据的方式，并未改变users的指针，故不会触发set方法，也就不会触发数据更新检测。
        };
        this.test = function () {
            mobx_1.autorun(function () {
                console.log(_this.users);
            });
        };
        this.test();
        this.reset();
    }
    Store.prototype.getCount = function (count) {
        this.count = count;
    };
    Store.prototype.setVaule = function () {
        this.name = '111';
        this.title = '渲染';
    };
    Object.defineProperty(Store.prototype, "total", {
        get: function () {
            return this.count;
        },
        enumerable: true,
        configurable: true
    });
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
        mobx_1.computed
    ], Store.prototype, "total", null);
    return Store;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new Store();
