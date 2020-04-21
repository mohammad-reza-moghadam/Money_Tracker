const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//     {id: 1, text: 'Flower', amount: -20},
//     {id: 1, text: 'Salary', amount: 300},
//     {id: 1, text: 'Book', amount: -10},
//     {id: 1, text: 'Camera', amount: 150}
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Update localstorage
function updateLocalstorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Add Transaction
function addTransaction(e) {
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('Please add a text and amount');
    }else{
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalstorage()

        text.value = '';
        amount.value = '';
    }
}

// Generate ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add Transactions to DOM
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
};

// Update Balance / Income / Expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    // Total for Balance
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    // Total for income
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);  
    
    // Total for Expense
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);  


    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;

}

// Remove Item
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalstorage();

    init();
}

function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}
init();

form.addEventListener('submit', addTransaction);