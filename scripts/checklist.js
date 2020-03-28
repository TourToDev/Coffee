(function (window) {
    'use strict'
    
    var App = window.App||{}
    var $ = window.jQuery;

    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Couldn not find element with selector '+selector);
        }
    }

    function Row(coffeeOrder) {
        //Constructor code will go here
        var $div = $('<div></div>',{
            'data-coffee-order': 'checkbox',
            'class': 'checkbox'
        });

        var $label = $('<label></label>');

        var $checkbox = $('<input></input>', {
            type: 'checkbox' ,
            value: coffeeOrder.emailAddress
        });

        var description = coffeeOrder.size + ' ';
        if (coffeeOrder.flavor) {
            description += coffeeOrder.flavor + ' ';
        }
        description += coffeeOrder.coffee + ',';
        description += ' ('+ coffeeOrder.emailAddress +'] ';
        description += ' ['+ coffeeOrder.strength +'x]';

        $label.append($checkbox);//将checkbox作为Label的子树
        $label.append(description);
        $div.append($label);

        this.$element=$div;//这里的this为Row的实例
    }

    CheckList.prototype.addRow = function (coffeeOrder) {
        this.removeRow(coffeeOrder.emailAddress);
        var rowElement = new Row(coffeeOrder);
        this.$element.append(rowElement.$element);//这里的this为Checklist的实例
    }

    CheckList.prototype.removeRow = function (email) {
        this.$element
                    .find('[value="' + email + '"]')
                    .closest('[data-coffee-order="checkbox"]')
                    .remove();
    }

    CheckList.prototype.addClickHandler = function (fn) {
        this.$element.on('click','input',function () {
            var email = event.target.value;
            fn(email)
            .then(function () {
                this.removeRow(email);
            }.bind(this));
        }.bind(this));
    }

    App.CheckList = CheckList;
    window.App = App;
})(window);
//Checklist要实现三个功能
//1.创建一个行元素
//2.删除一个行元素
//3.加一个点击事件的监听器使代码删除一行