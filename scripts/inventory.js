let inventory = [
    // Solar Home Systems
    {SKU: "SOL 100", product: "SHS 100W Kit", category: "Solar System", quantity: 75, maximum: 100, price: 599},
    {SKU: "SOL 200", product: "SHS 200W Kit", category: "Solar System", quantity: 18, maximum: 80, price: 899},
    {SKU: "SOL 500", product: "SHS 500W Kit", category: "Solar System", quantity: 20, maximum: 50, price: 1599},
    {SKU: "SOL 1K", product: "1KW Hybrid Solar Kit", category: "Solar System", quantity: 7, maximum: 30, price: 2499},

    // Solar Panels
    {SKU: "PAN 150", product: "150W Solar Panel", category: "Solar Panel", quantity: 80, maximum: 120, price: 129},
    {SKU: "PAN 300", product: "300W Mono Solar Panel", category: "Solar Panel", quantity: 32, maximum: 100, price: 249},
    {SKU: "PAN 550", product: "550W Half-Cut Panel", category: "Solar Panel", quantity: 42, maximum: 60, price: 399},

    // Batteries
    {SKU: "BAT 100", product: "100Ah Gel Battery", category: "Battery", quantity: 15, maximum: 50, price: 299},
    {SKU: "BAT 200", product: "200Ah Lithium Battery", category: "Battery", quantity: 8, maximum: 25, price: 899},

    // Inverters
    {SKU: "INV 1K", product: "1KW Pure Sine Inverter", category: "Inverter", quantity: 32, maximum: 40, price: 349},
    {SKU: "INV 3K", product: "3KW Hybrid Inverter", category: "Inverter", quantity: 6, maximum: 20, price: 1199},

    // Electric Bikes
    {SKU: "EBK 100", product: "Urban E-Bike 250W", category: "Electric Bike", quantity: 15, maximum: 25, price: 1499},
    {SKU: "EBK 200", product: "Mountain E-Bike 500W", category: "Electric Bike", quantity: 6, maximum: 20, price: 2199},
    {SKU: "EBK 300", product: "Cargo E-Bike", category: "Electric Bike", quantity: 4, maximum: 15, price: 2799},

    // Electric Scooters
    {SKU: "ESC 100", product: "Foldable E-Scooter", category: "Electric Scooter", quantity: 14, maximum: 35, price: 799},
    {SKU: "ESC 200", product: "Offroad E-Scooter", category: "Electric Scooter", quantity: 5, maximum: 15, price: 1399},

    // Solar Water Pumps
    {SKU: "PMP 100", product: "DC Solar Water Pump", category: "Water Pump", quantity: 11, maximum: 40, price: 699},
    {SKU: "PMP 200", product: "Submersible Solar Pump", category: "Water Pump", quantity: 7, maximum: 25, price: 1299},

    // Charge Controllers
    {SKU: "CTR 20", product: "20A MPPT Controller", category: "Charge Controller", quantity: 20, maximum: 60, price: 149},
    {SKU: "CTR 40", product: "40A MPPT Controller", category: "Charge Controller", quantity: 10, maximum: 35, price: 299},

    // Solar Accessories
    {SKU: "ACC 001", product: "Solar Cable 10m", category: "Accessory", quantity: 50, maximum: 150, price: 39},
    {SKU: "ACC 002", product: "MC4 Connector Pair", category: "Accessory", quantity: 70, maximum: 200, price: 12},
    {SKU: "ACC 003", product: "Solar Mounting Rail", category: "Accessory", quantity: 35, maximum: 100, price: 49},

    // Appliances
    {SKU: "APP 100", product: "Solar Refrigerator", category: "Appliance", quantity: 5, maximum: 15, price: 999},
    {SKU: "APP 200", product: "Solar Street Light", category: "Appliance", quantity: 16, maximum: 50, price: 199},
    {SKU: "APP 300", product: "Solar Water Heater", category: "Appliance", quantity: 3, maximum: 10, price: 1799}
];

let currentPage = 1;
let itemsPerPage = 5;

function renderInventory(items = inventory){
    let inventoryHTML = "";
    let start = (currentPage-1)* itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedItems = items.slice(start, end);
    
    paginatedItems.forEach(item => {
        let stockpercent = (item.quantity/item.maximum)*100;
        let stockColor = "";
        let status = "";
        let statusColor = "";
    

        if (stockpercent >50){
            stockColor = "rgb(134, 218, 14)";
            status = "OK";
            statusColor = "rgb(134, 218, 14)";
        }
        else if (stockpercent >= 30){
            stockColor = "orange";
            status = "Restock";
            statusColor = "orange";

        }
        else if (stockpercent < 30){
            stockColor = "red";
            status = "Low Stock";
            statusColor = "red";

        }

               
        inventoryHTML+= `
        <tr>
            <td>${item.SKU}</td>
            <td>${item.product}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.maximum}</td>
            <td>$ ${item.price}</td>
            <td><div class = "stock-row">
                    <div class = "stock-percent">${stockpercent.toFixed(0)} %</div>
                    <div class = "stock-container">
                    <div class = "stock-grid" style = " 
                    width: ${stockpercent}%; background-color: ${stockColor};"></div>
                    </div>
                </div>
            </td>
            <td style = "color: ${statusColor}">${status}</td>
            <td>
            <button class = "item-add-btn" onclick = "increaseItem('${item.SKU}')">+</button>
            <button class = "item-reduce-btn" onclick = "decreaseItem('${item.SKU}')">-</button>
            <button class = "item-edit-btn" onclick = "editItem('${item.SKU}')">&#128393;</button>
            <button class = "item-delete-btn" onclick = "deleteItem('${item.SKU}')">&#128465;</button>
            </td>
        </tr>
    
        `;

    });

    document.querySelector('.table-rows').innerHTML = inventoryHTML;
}

function nextPage(){
    if (currentPage * itemsPerPage < inventory.length){
        currentPage++;
        renderInventory();
    }
}

function prevPage(){
    if (currentPage > 1){
        currentPage--;
        renderInventory();
    }
}

function getLowStockCount(){
    let lowstockHTML = "";
    inventory.forEach(item => {
        let stockpercent = (item.quantity/item.maximum)*100;
        let stockColor = "";
        let status = "";
        let statusColor = "";
    

        if (stockpercent >50){
            stockColor = "rgb(134, 218, 14)";
            status = "OK";
            statusColor = "rgb(134, 218, 14)";
        }
        else if (stockpercent >= 30){
            stockColor = "orange";
            status = "Restock";
            statusColor = "orange";

        }
        else if (stockpercent < 30){
            stockColor = "red";
            status = "Low Stock";
            statusColor = "red";

        }

        if (stockpercent < 30){
            lowstockHTML += `
            <div class = "alert-container">
                <div class = "alert-text"><p><span class = "alert-symbol">&#9888;</span>${item.product} running out! </p></div>
                <div class = "alert-text-left"><span class = "alert-span">Only ${item.quantity} left </span></div>
            </div>
            
            `;
           
        }

    });

    
        document.querySelector('.low-stock-container').innerHTML = lowstockHTML;

}
getLowStockCount();


function calculateInventory(){
    let inventoryValue = inventory.reduce((sum, item) =>
    sum + item.quantity * item.price, 0);
    let inventoryTotal = inventory.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('#inventory-value').innerHTML = `$ ${inventoryValue.toLocaleString()}`;
    document.querySelector('#inventory-total').innerHTML = inventoryTotal;

}

function productForm(){
    document.querySelector('.add-product-form').style.display = "block";
}

function cancelForm(){
    document.querySelector('.add-product-form').style.display = "none";

}

function deleteItem(SKU){
    inventory = inventory.filter(item => item.SKU !== SKU);
    renderInventory();
    calculateInventory();
}

function increaseItem(SKU){
    let existingItem = inventory.find(item => item.SKU === SKU);

    if (existingItem){
        existingItem.quantity++;
    }

    renderInventory();
    calculateInventory();
}

function decreaseItem(SKU){
    let existingItem = inventory.find(item => item.SKU === SKU);

    if (existingItem){
        existingItem.quantity--;
    }

    renderInventory();
    calculateInventory();
}

calculateInventory();

let editingSKU = null;
function editItem(SKU){

   const item = inventory.find(i => i.SKU === SKU);

   if (!item) return;
   editingSKU = SKU;

    document.querySelector('.add-product-form').style.display = "block";

    document.querySelector('.sku').value = item.SKU;
    document.querySelector('.product-name').value = item.product;
    document.querySelector('.add-category').value = item.category;
    document.querySelector('.product-quantity').value = item.quantity;
    document.querySelector('.product-maximum').value = item.maximum;
    document.querySelector('.product-price').value = item.price;

    document.querySelector('.add-item-btn').innerHTML = "Update Product";

}


function addProduct(){

     let itemSKU = document.querySelector('.sku');
     let itemName = document.querySelector('.product-name');
     let itemCategory = document.querySelector('.add-category');
     let itemQuantity = document.querySelector('.product-quantity');
     let itemMaximum = document.querySelector('.product-maximum');
     let itemPrice = document.querySelector('.product-price');

     if (editingSKU !== null){
        const item = inventory.find(i => i.SKU ===editingSKU );

        if (item){
            item.SKU = itemSKU.value;
            item.product = itemName.value;
            item.category = itemCategory.value;
            item.quantity = Number(itemQuantity.value);
            item.maximum = Number(itemMaximum.value);
            item.price = Number(itemPrice.value);
        }
        editingSKU = null;

        document.querySelector('.add-item-btn').innerHTML =
            "Add Product";
     }else{
         inventory.push({
        SKU: itemSKU.value,
        product: itemName.value,
        category: itemCategory.value,
        quantity: Number(itemQuantity.value),
        maximum: Number(itemMaximum.value),
        price: Number(itemPrice.value)

     });

     }

    
     renderInventory();
     calculateInventory();
     console.log(inventory);

     document.querySelector('.add-product-form').style.display = "none";

}




function renderChart(){

    let categoryTotals = {};
    inventory.forEach((item) => {

        if (categoryTotals[item.category]){
            categoryTotals[item.category]+=item.quantity;
        }
        else{
            categoryTotals[item.category]=item.quantity;

        }
    });

    let labels = Object.keys(categoryTotals);
    let quantities = Object.values(categoryTotals)
    let colors = [
                'rgb(134, 218, 14)', 
                'rgb(100, 140, 200)','#06B6D4', '#F59E0B',
                '#EF4444', '#10B981', '#8B5CF6',
                '#F97316', '#14B8A6', '#3B82F6'
            ];
    
    let stockLegend = document.querySelector('.stock-category-chart-legend');
    let stockTotal = inventory.reduce((sum, item) => sum + item.quantity, 0);
    console.log("stock Total:",stockTotal);

    labels.forEach((label, i) => {
    const value = quantities[i];
    const percentage = ((value / stockTotal) * 100).toFixed(1);

    stockLegend.innerHTML += `
        <div class="stock-legend-item">
            <span class="dot" style="background:${colors[i]}"></span>
            <span class = "category-label">${label}</span>
            <span class = "value-label">${value}</span>
            <span class = "percent-label">${percentage}%</span>
        </div>
    `;
});

const ctx = document.getElementById('stock-category-chart');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels,
        datasets: [{
            data: quantities,
            backgroundColor: colors,
            borderColor: '#fff',
            borderWidth: 2,
            hoverOffset: 20
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

        animation: {
            animateRotate: true,
            duration: 1200
        },

        elements: {
            arc: {
                borderWidth: 2,
                borderColor: '#fff'
            }
        }
    }
});
         
}



function populateCategoryandProductDropdown(){
    let categorySelect = document.getElementById('product-category');
    let productSelect = document.getElementById('product-list-name');
    let categories = new Set();

    
    

    inventory.forEach(item => {
        if(!categories.has(item.category)){
            categories.add(item.category);

            let categoryOption = document.createElement('option');
            categoryOption.value = item.category;
            categoryOption.textContent = item.category;
            categorySelect.appendChild(categoryOption);


        }

        let productOption = document.createElement('option');
        

        productOption.value = item.product;
        productOption.textContent = item.product;

        productSelect.appendChild(productOption);
    } );

    
}

populateCategoryandProductDropdown();

function filterItem(){

    let category = document.getElementById('product-category').value;
    let product = document.getElementById('product-list-name').value;

   let filtered = inventory.filter(item =>{

    let matchCategory = category === "" || item.category === category;
    let matchProduct = product === "" || item.product === product;

    return matchCategory && matchProduct;
   });
   renderInventory(filtered);
}

renderInventory();

function addProductsDropdown(){
    let categorySelect = document.getElementById('add-category');
    let categories = new Set();

    inventory.forEach(item =>{

        if (!categories.has(item.category)){
            categories.add(item.category);
            let categoryOption = document.createElement('option');
        categoryOption.value = item.category;
        categoryOption.innerText = item.category;

        categorySelect.appendChild(categoryOption);
        }
        
    });

}
renderChart();
addProductsDropdown();
