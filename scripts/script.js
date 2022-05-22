'use strict';

const balance =  document.getElementById('balance');
const moneyPlus =  document.getElementById('money-plus');
const moneyMinus =  document.getElementById('money-minus');
const list =  document.getElementById('list');
const form =  document.getElementById('form');
const transaction =  document.getElementById('transaction');
const amount =  document.getElementById('amount');

// global variables
// support function
// update localstorage
const updateLocalStorage = function(){
  localStorage.setItem('transactions',JSON.stringify(transactions));
};
// updated values
const updatedValues = function(){
  const amounts = transactions.map((transaction) => transaction.amount)
  const income =amounts
  .filter((amount) => amount > 0)
  .reduce((acc, amount) => acc + amount, 0)
  .toFixed(2)
  
  const expense =amounts
  .filter((amount) => amount < 0)
  .reduce((acc, amount) => acc + amount, 0)
  .toFixed(2)
  
  const total =amounts
  .reduce((acc, amount) => acc + amount, 0)
  .toFixed(2)
  
  moneyPlus.innerHTML =  `₹${income}`;
  moneyMinus.innerHTML =`₹${expense}`;
  balance.innerHTML = `₹${total}`
}
// getting the data already available in database

const localStorageTransaction = JSON.parse(
  localStorage.getItem('transactions')
);

// We need to create local copy of database(we follow clean method) 
let transactions = 
localStorage.getItem('transactions') !== null ? localStorageTransaction:[];

// add transaction dom in screen
// add transactions to DOM List
const addTransactionDom = function(transaction){
  // get Sign
  const sign = transaction.amount < 0  ?'-':'+';
  // create li element
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus':'plus');
  item.innerHTML =
  `${transaction.transaction} <span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick = removeTransaction(${transaction.id})>X</button>`;
  list.appendChild(item);
};
// removing the transaction
const removeTransaction = function(id){
  transactions = transactions.filter((transaction) => transaction.id !==id);
  updateLocalStorage();
  init();
};
// eventListener
form.addEventListener('submit',(e) => {
  e.preventDefault();
  if(transaction.value.trim() === '' || amount.value.trim() === ''){
    alert('Please add transaction Details');
  }

  const transactionDetails = {
    id: Math.floor(Math.random()*10000),
    transaction: transaction.value,
    amount: Number(amount.value),
  }

  transactions.push(transactionDetails);
  addTransactionDom(transactionDetails);
  updatedValues();
  updateLocalStorage();
  transaction.value = '';
  amount.value = '';
});
// initial function
const init = function(){
  list.innerHTML=null;
  transactions.forEach(addTransactionDom);
  updatedValues();
};
// starting initial value
init();

// use will enter the expense or income details - create(POSTmethod)

// you should store the user data in local storage- create(PUT method)

// we should be displaying them on the screen-Read(GET)


// we should sum all the values and update them on screen- Read

// delete functionality-Delete(POST)
// delete the data in local storage also

// update the ui after delete







