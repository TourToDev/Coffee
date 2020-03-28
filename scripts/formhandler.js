(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery; //引入jquery元素并用$标记

    function FormHandler(selector) {//创建FormHandler对象(生成器)来处理Html的用户输入表单
        if (!selector) {           //函数接收一个选择器，如data-coffee-order=form
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector); //$(selector)找到一个符合选择器匹配的html元素，赋值给实例变量$formElement;
        if (this.$formElement===0) {
            throw new Error('Could not find element with selector: '+ selector);
        }
    }
    FormHandler.prototype.addSubmitHandler = function (fn) {//在触发submit事件时对表单中的数据用函数fn处理
        console.log('Setting submit handler for form');
        this.$formElement.on('submit',function (event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function (item) {//将对应的FormHandler实例用$包裹起来变成jquery元素
                //serializeArray是jQuery元素的方法，将form中的元素数组化，每个数组元素为HTML tag name和value的键值对
                data[item.name]=item.value;             
                console.log(item.name + 'is' + item.value);
            }); 
            console.log(data);
            fn(data);
            this.reset();
            this.elements[0].focus();
        });
    };

    FormHandler.prototype.addInputHandler = function (fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input','[name="emailAddress"]',function (event) {
            var emailAddress = event.target.value;//event.target指向出发event的html元素
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                var message = emailAddress + 'is not an authorized email address';
                event.target.setCustomValidity(message);
            }
        })
    }

    App.FormHandler = FormHandler;
    window.App = App;
})(window);