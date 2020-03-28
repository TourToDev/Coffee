(function (window) {
    var App = window.App || {};
    var DATA_SLIDE = '[data-slide=slide]';
    
    var $ = window.jQuery;
    function SlideHandler(selector) {
        if (!selector) {           //函数接收一个选择器，如data-coffee-order=form
            throw new Error('No selector provided');
        }

        this.$slideElement = $(selector); //$(selector)找到一个符合选择器匹配的html元素，赋值给实例变量$formElement;
        if (this.$slideElement===0) {
            throw new Error('Could not find element with selector: '+ selector);
        }
    }

    SlideHandler.prototype.addSlideChange = function () {
        this.$slideElement.on('slidechange',function (event,ui) {
            
        })
    }

    window.App = App; 
})(window);