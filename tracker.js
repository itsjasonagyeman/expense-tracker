const fs = require("fs");
const FILE = "expenses.json"

function loadExpenses(){
  if(!fs.existsSync(FILE)){
    return [];
  }
  const text = fs.readFileSync(FILE, "utf-8");
  return JSON.parse(text)
}

function saveExpenses(expenses){
  fs.writeFileSync(FILE, JSON.stringify(expenses, null, 2));
}

const expenses = loadExpenses();

function listExpenses() {
  expenses.forEach((e, index)=>{
    console.log(`${index + 1}. ${e.item} - GHS ${e.amount} (${e.category})`)
  });
  console.log(`Total: GHS ${expenses.reduce((sum, i) => sum + i.amount, 0)}`);
}

function addExpense(item, amount, category) {
    const value = Number(amount);
    if (item && category && !Number.isNaN(value)){
        expenses.push({item, amount: value, category});
        saveExpenses(expenses);
        console.log(`Added: ${item} - GHS ${value} (${category})`)
    }else{
        console.log("Input error");
        return;
    }
}

function deleteExpense(position) {
  const number = Number(position);

  if (!Number.isInteger(number) || number < 1 || number > expenses.length) {
    console.log("Input error");
    return;
  }

  const removed = expenses[number - 1];
  const remaining = expenses.filter((e, i) => i !== number - 1);

  saveExpenses(remaining);
  console.log(`Deleted: ${removed.item} -${removed.amount} (${removed.category})`);
}

function summarizeExpenses(){
  const totals = {};

  for (const e of expenses) {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  }

  Object.entries(totals).forEach(([category, sum]) => {
    console.log(`${category}: GHS ${sum}`);
  });
}

const [command, item, amount, category] = process.argv.slice(2);

if (command === "list") {
  listExpenses();
} else if (command === "add") {
  addExpense(item, amount, category);
} else if(command === "summary"){
  summarizeExpenses()
} else if(command === "delete"){
  deleteExpense(item)} else {
  console.log("Usage: node tracker.js list | add <item> <amount> <category> | summary");
}