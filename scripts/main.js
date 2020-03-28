(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]'
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]'
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataSotre = App.RemoteDataStore;
    var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;
    var remoteDS = new RemoteDataSotre(SERVER_URL);
    var myTruck = new Truck('卢俊义', remoteDS);
    window.myTruck = myTruck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    var formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addSubmitHandler(function (data) {
        myTruck.createOrder.call(myTruck, data)
        .then(function () {
        checkList.addRow.call(checkList, data);
        });
    });
    formHandler.addInputHandler(Validation.isCompanyEmail);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    console.log(formHandler);
    myTruck.printOrders(checkList.addRow.bind(checkList));
})(window);