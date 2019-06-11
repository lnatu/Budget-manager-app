var AppController = (function(UIController, BudgetController) {
    var domStr = UIController.domStr;
    
    var appEvents = function() {
        document.querySelector(domStr.addButton).addEventListener('click', addItem);
        document.querySelector(domStr.listContainer).addEventListener('click', deleteItem);
    };

    var addItem = function() {
        var input = UIController.getInput();
        var addedItem = BudgetController.addItem(input.type, input.description, parseFloat(input.amout));
        
        UIController.addListItem(addedItem, input.type);

        updateBudget();

        UIController.clearFields();
    };

    var deleteItem = function(event) {
        var itemId = event.target.parentNode.parentNode.id;

        if (itemId) {
            var splittedItemId = itemId.split('-');
            var type = splittedItemId[0];
            var id = parseInt(splittedItemId[1]);

            BudgetController.deleteItem(type, id);

            UIController.deleteListItem(itemId);

            updateBudget();
            
        }
    };

    var updateBudget = function() {
        BudgetController.calculateBudget();
        var budgetData = BudgetController.budgetData();
        UIController.displayBudget(budgetData);
    }

    return {
        init: function() {
            console.log('Application has started');
            console.log('=======================');
            appEvents();
        }
    };

})(UIController, BudgetController);

AppController.init();