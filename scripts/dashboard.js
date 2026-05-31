agents=[
    {name: "Josiah Mwangi", image: "images/agent-photo.jpg", installations: 700, amount: 10000},
    {name: "Anne Gidi", image: "images/agent-photo.jpg", installations: 450, amount: 8000},
    {name: "Terry M", image: "images/agent-photo.jpg", installations: 350, amount: 5600},
    {name: "Joakim Wayua", image: "images/agent-photo.jpg", installations: 200, amount: 4100},
    {name: "Fitzergard Onyango", image: "images/agent-photo.jpg", installations: 150, amount: 3200},
    {name: "Robert Mwerevu", image: "images/agent-photo.jpg", installations: 70, amount: 1400} 
]

customers = [
    {name: "Anne Oludhe", phone: "0123456789", location: "Nakuru", product: "SHS 200", status: "Active"},
    {name: "Man UK", phone: "0123987789", location: "Nanyuki", product: "SHS 100", status: "Active"},
    {name: "Olu Okae", phone: "0123456123", location: "Murang`a", product: "SP 250", status: "Default"},
    {name: "Spider Kamau", phone: "0123456456", location: "Uthiru", product: "DX 245", status: "Active"},
    {name: "JM Laban", phone: "0123456578", location: "Gilgil", product: "FR 234", status: "Default"},
    {name: "Waiyaki Kui", phone: "012345243", location: "Rangwe", product: "RT 123", status: "Active"},
    {name: "Rongo Moja", phone: "012345798", location: "Bungoma", product: "SPL 500", status: "Complete"}
    ];
const today = new Date();

payments = [
    {id: "MPESA 012", name: customers[0].name, amount: 1000, date: today.toDateString()},
    {id: "MPESA 021", name: customers[4].name, amount: 1500, date: today.toDateString()},
    {id: "MPESA 032", name: customers[2].name, amount: 2000, date: today.toDateString()}

];

let customerAlertNumber = 0;
let paymentAlertNumber = 0;



function renderAgents(){
let topAgents = "";
let agentRank = 0;

agents.forEach(agent => {
    agentRank++;

    if (agentRank > 0 && agentRank <= 5){
        topAgents += `
        <div class = "agent-container">
        <div class = "agent-rank">${agentRank}</div>
        <div class = "agent-picture-container">
            <img class = "agent-photo" src = "${agent.image}"></img>
        </div>
        <div class = "agent-info">
        <span>${agent.name}</span>
        <span class ="installations-span">${agent.installations} Installations</span>
        </div>
        <div class = "agent-amount">KES ${agent.amount}</div>
    </div> 
    `;

    }
});

document.querySelector('.top-agents-container').innerHTML = topAgents;

}

function renderCharts(){
    const revenueChart = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueChart, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Revenue',
            data: [200, 400, 500, 700, 500, 800],
            borderColor: 'rgb(134, 218, 14)',
            borderWidth: 1,
            pointRadius: 1,
            backgroundColor: 'rgb(134, 218, 14, 0.2)',
            tension: 0.4,
            fill: true,
        }]
    },
     options: {
        scales: {
            x: {grid: {display: false}},
            y: {grid: {display: false},
        ticks: {
    callback: (value) => `KES ${value.toLocaleString()}`
  }}
        },
        plugins: {
            legend: {
                display: false
            }
        },
    }
});
    
let customerTotals = {};
    customers.forEach(customer =>{
    if (customer.status === "Default"){
        customerAlertNumber+=1;
    }
    if (customerTotals[customer.status]){
        customerTotals[customer.status]+=1;

    }else{
        customerTotals[customer.status]=1;
    }
    
});
console.log(customerAlertNumber);



    let customerLabels = Object.keys(customerTotals);
    let customerQuantity = Object.values(customerTotals);
    let colors = [
                'rgb(134, 218, 14)', 
                '#EF4444',
                '#06B6D4'
            ];

    let customerLegend = document.querySelector('.customer-chart-legend');
    let customerTotal = customers.length;
    console.log("stock Total:",customerTotal);

    customerLabels.forEach((label, i) => {
    const value = customerQuantity[i];
    const percentage = ((value / customerTotal) * 100).toFixed(1);

    customerLegend.innerHTML += `
        <div class="customer-legend-item">
            <span class="dot" style="background:${colors[i]}"></span>
            <span class = "category-label">${label}</span>
            <span class = "value-label">${value}</span>
            <span class = "percent-label">${percentage}%</span>
        </div>
    `;
});

const customerChart = document.getElementById('customerChart');
new Chart(customerChart, {
    type: 'doughnut',
    data: {
      labels: customerLabels,
      datasets: [{
        label: 'Customers by Status',
        data: customerQuantity,
        backgroundColor: colors
      }]
    },
    options: {
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false,
                position: 'right',
                font: 'Arial',
                weight: 'bold',
                
            },

            tooltip: {
                backgroundColor: '#111827',
                titleColor: '#fff',
                bodyColor: '#e5e7eb',
                padding: 10,
                cornerRadius: 8
            }
        },

    }
    
  });

}

function renderRecentPayments(){
    let paymentsHTML = "";
    payments.forEach(payment =>{
        if (payment.date == today.toDateString()){
            paymentAlertNumber+=1;
        }
        paymentsHTML += `
        <div class = "recent-payment-card">
        <p>${payment.name}</p>
        <h4>KES ${payment.amount}</h4>
        <span>${payment.date}</span>
        </div>
              `;        
        });
    console.log(paymentAlertNumber);
    document.querySelector('.recent-payments-container').innerHTML = paymentsHTML;
}
renderRecentPayments();


renderAgents();
renderCharts();

function getLowStockCount(inventory){

    let stockAlertNumber =0;

    inventory.forEach(item => {

        let percent = (item.quantity / item.maximum) * 100;

        if (percent < 30){
            stockAlertNumber++;
        }

    });

    return stockAlertNumber;
}

function updateAlerts(){
document.querySelector('.customer-alerts-container').innerHTML = `
<div class = "customer-alert-card">
<div class = "alert-symbol-container">
<button>&#9888;</button>
</div>
<div class = "alert-text">
<p>${customerAlertNumber} customers in Default</p>
<a>View Customers</a>
</div>
</div>
`;
document.querySelector('.payment-alerts-container').innerHTML = `
<div class = "payment-alert-card">
<div class = "alert-symbol-container">
<button>&#9888;</button>
</div>
<div class = "alert-text">
<p>${paymentAlertNumber} payments received today</p>
<a>View Customers</a>
</div>
</div>
`;
document.querySelector('.stock-alerts-container').innerHTML = `
<div class = "stock-alert-card">
<div class = "alert-symbol-container">
<button>&#9888;</button>
</div>
<div class = "alert-text">
<p>${ getLowStockCount(inventory)} items are low stock</p>
<a>View Customers</a>
</div>
</div>
`;
}
updateAlerts();

