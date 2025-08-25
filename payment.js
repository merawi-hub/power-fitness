// Payment method switching
const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
const paymentSections = document.querySelectorAll('.payment-section');

paymentMethods.forEach(method => {
    method.addEventListener('change', () => {
        paymentSections.forEach(section => section.classList.remove('active'));
        switch (method.value) {
            case 'cbe':
                document.getElementById('cbeSection').classList.add('active');
                break;
            case 'abysinia':
                document.getElementById('abysiniaSection').classList.add('active');
                break;
            case 'commercial':
                document.getElementById('commercialSection').classList.add('active');
                break;
            case 'ethioPay':
                document.getElementById('ethioPaySection').classList.add('active');
                break;
        }
    });
});

// Transaction history handling
const viewHistoryBtn = document.getElementById('viewHistoryBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const transactionHistory = document.getElementById('transactionHistory');
const transactionTable = document.getElementById('transactionTable');
const transactionTableBody = document.getElementById('transactionTableBody');
const noTransactions = document.getElementById('noTransactions');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function renderTransactions() {
    transactionTableBody.innerHTML = '';
    if (transactions.length === 0) {
        transactionTable.style.display = 'none';
        noTransactions.style.display = 'block';
        clearHistoryBtn.style.display = 'none';
    } else {
        transactions.forEach((t, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${i+1}</td>
                <td>${t.date}</td>
                <td>${t.name}</td>
                <td>${t.plan}</td>
                <td>${t.method}</td>
                <td>${t.amount}</td>
            `;
            transactionTableBody.appendChild(tr);
        });
        transactionTable.style.display = 'table';
        noTransactions.style.display = 'none';
        clearHistoryBtn.style.display = 'inline-block';
    }
}

viewHistoryBtn.addEventListener('click', () => {
    transactionHistory.classList.toggle('show');
    renderTransactions();
});

clearHistoryBtn.addEventListener('click', () => {
    if(confirm('Are you sure you want to clear transaction history?')) {
        transactions = [];
        localStorage.removeItem('transactions');
        renderTransactions();
    }
});

// Add transaction after payment
function addTransaction(name, plan, method, amount) {
    const date = new Date().toLocaleDateString();
    transactions.push({date, name, plan, method, amount});
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();
}

// Example: show welcome message after registration
const welcomeMessage = document.getElementById('welcomeMessage');
function showWelcome() {
    welcomeMessage.classList.add('show');
}

// Demo: simulate registration
document.addEventListener('DOMContentLoaded', () => {
    renderTransactions();
    // Simulate adding a transaction
    // addTransaction('John Doe', 'Standard Monthly', 'CBE', '$139.08');
    // showWelcome();
});
