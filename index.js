//user can enter savings amount 
//user enter expense name and amount 
//clicks add and then it displays 
//shows total amount spent and remaining savings left 
//can delete an expsense 
//graph is created and shown 

const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const savingsAmount = document.getElementById("savingsAmount");
const totalSpent = document.getElementById("totalSpent");
const savingsLeft = document.getElementById("savingsLeft");
const list = document.getElementById("list");

let i = 0;
let total = 0;
let startingSavings = null;

function add() {

    if (expenseAmount.value === "" || Number(expenseAmount.value)  <= 0 || savingsAmount.value === "" || Number(savingsAmount.value) <= 0){
        window.alert("Enter valid values");
        return;
    }
    if (startingSavings === null) {
        startingSavings = Number(savingsAmount.value);
       
    }

    savingsAmount.disabled = true;

    total += Number(expenseAmount.value);

    totalSpent.textContent = total.toFixed(2);
    savingsLeft.textContent = (startingSavings - total).toFixed(2);
    i++;

    const newItem = document.createElement("li");
    const newremoveBtn = document.createElement("button");

    newItem.textContent = `Expense ${i}: ${expenseName.value} » Cost: ${expenseAmount.value}`;
    newremoveBtn.textContent = "Remove";

    const amount = Number(expenseAmount.value);

    newremoveBtn.addEventListener("click", function () {
        total -= amount;

         totalSpent.textContent = total.toFixed(2);
         savingsLeft.textContent = (startingSavings - total).toFixed(2);

        newItem.remove();
        newremoveBtn.remove();
    });

    list.appendChild(newItem);
    list.appendChild(newremoveBtn);

    updateChart();
}

function removeAll() {
    total = 0;
    i = 0;
    startingSavings = null;

    totalSpent.textContent = "0.00";
    savingsLeft.textContent = "0.00";
    list.replaceChildren();
    savingsAmount.disabled = false;

}

function updateChart() {
    const remaining = Math.max(0, startingSavings - total);

    const data = [
        { label: "Spent", amount: total },
        { label: "Remaining", amount: remaining }
    ];

    // Clear the old chart.
    d3.select("#Graph").selectAll("*").remove();

    // Create a drawing area.
    const svg = d3.select("#Graph")
        .append("svg")
        .attr("width", 220)
        .attr("height", 220);

    // Move the pie's center to the middle.
    const group = svg.append("g")
        .attr("transform", "translate(110, 110)");

    // Convert amounts into slice angles.
    const pie = d3.pie()
        .sort(null)
        .value(function (item) {
            return item.amount;
        });

    // Turn those angles into shapes.
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(95);

    // Draw one slice per data item.
    group.selectAll("path")
        .data(pie(data))
        .join("path")
        .attr("d", arc)
        .attr("fill", function (slice) {
            return slice.data.label === "Spent"
                ? "#818cf8"
                : "#6ee7b7";
        })
        .attr("stroke", "#090a0a")
        .attr("stroke-width", 2);
}

