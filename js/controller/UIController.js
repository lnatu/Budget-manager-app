var UIController = (function() {
    var domStr = {
        addType: '.app__control--type',
        addDescription: '.app__control--description',
        addValue: '.app__control--value',
        addButton: '.app__control--add',
        incomeContainer: '.income--list',
        expensesContainer: '.expenses--list',
        budgetHolder: '.app--budget',
        totalIncome: '.total--income',
        totalExpenses: '.total--expenses',
        listContainer: '.list__container',
        deleteItem: '.app__list-box-list--link'
    };

    var formatMoney = function (n, c, d, t) {
        var c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;

        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
      

    var getInput = function () {
        return {
            type: document.querySelector(domStr.addType).value,
            description: document.querySelector(domStr.addDescription).value,
            amout: document.querySelector(domStr.addValue).value
        };
    };

    var addListItem = function(item, type) {
        var html, container;
        if (type === 'inc') {
            container = document.querySelector(domStr.incomeContainer);
            html = `<li class="app__list-box-list--item" id="inc-${item.id}">
                        <p class="app__list-box-list--text">${item.description}</p>
                        <p class="app__list-box-list--inc">+ ${formatMoney(item.value)} <a href="#" class="app__list-box-list--link">x</a></p>
                    </li>`;
        } else {
            container = document.querySelector(domStr.expensesContainer);
            html = `<li class="app__list-box-list--item" id="exp-${item.id}"> 
                        <p class="app__list-box-list--text">${item.description}</p>
                        <p class="app__list-box-list--exp">- ${formatMoney(item.value)} <a href="#" class="app__list-box-list--link">x</a></p>
                    </li>`;
        }
        container.insertAdjacentHTML('beforeend', html);
    };   

    var deleteListItem = function(itemId) {
        var el = document.getElementById(itemId);
        el.parentNode.removeChild(el);
    };

    var displayBudget = function(budgetData) {
        document.querySelector(domStr.budgetHolder).innerText = formatMoney(budgetData.budget);
        document.querySelector(domStr.totalIncome).innerText = '+ ' + formatMoney(budgetData.income);
        document.querySelector(domStr.totalExpenses).innerText = '- ' + formatMoney(budgetData.expenses);
    };

    var clearFields = function() {
        document.querySelector(domStr.addDescription).value = "";
        document.querySelector(domStr.addValue).value = "";

        document.querySelector(domStr.addDescription).focus();
    }
            

    return {
        domStr,
        getInput,
        addListItem,
        displayBudget,
        clearFields,
        deleteListItem
    }
})();