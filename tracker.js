const expenses = [
  { item: "Lunch", amount: 25, category: "food" },
  { item: "Taxi", amount: 18, category: "transport" }
];

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
        console.log(`Added: ${item} - GHS ${value} (${category})`)
    }else{
        console.log("Input error");
        return;
    }
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
}else {
  console.log("Usage: node tracker.js list | add <item> <amount> <category> | summary");
}