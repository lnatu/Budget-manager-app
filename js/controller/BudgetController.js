var BudgetController = (function() {
    
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0
    };

    var calculateTotals = function(type) {
        var sum = 0;
        data.allItems[type].forEach(item => {
            sum += item.value;
        });
        data.totals[type] = sum;
    };

    var calculateBudget = function() {
        calculateTotals('exp');
        calculateTotals('inc');

        data.budget = data.totals.inc - data.totals.exp;
    };

    var addItem = function(type, description, value) {
        var id, newItem;
        if (data.allItems[type].length === 0) {
            id = 0;
        } else {
            id = data.allItems[type][data.allItems[type].length - 1].id + 1;
        }
        type === 'inc' ? newItem = new Income(id, description, value) : newItem = new Expense(id, description, value);
        data.allItems[type].push(newItem);

        return newItem;
    };

    var deleteItem = function(type, id) {
        var index, ids;
        ids = data.allItems[type].map(current => {
            return current.id;
        });
  
        index = ids.indexOf(id);

        if (index !== -1) {
            data.allItems[type].splice(index, 1);
        }
    };

    return {
        budgetData() {
            return {
                budget: data.budget,
                income: data.totals.inc,
                expenses: data.totals.exp
            }
        },
        budget: data.budget,
        calculateTotals,
        calculateBudget,
        deleteItem,
        addItem,
        testing: function() {
            return data;
        }
    };

})();