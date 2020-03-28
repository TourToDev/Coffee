(function (window) {
    'use strict';
    var App = window.App || {};
    function DataStore() {
        this.data = {};//data是一个对象，可以包含很多元素，以键值对的方式储存
    }
    DataStore.prototype.add = function (key, val) {
        this.data[key]= val;
    };

    DataStore.prototype.get = function (key) {
        return this.data[key];
    };

    DataStore.prototype.getAll = function () {
        return this.data;
    };

    DataStore.prototype.remove = function (key) {
        delete this.data[key];
    }

    App.DataStore = DataStore;
    window.App = App;
})(window);