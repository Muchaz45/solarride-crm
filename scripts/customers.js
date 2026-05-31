customers = [
    {name: "Anne Oludhe", phone: "0123456789", location: "Nakuru", product: "SHS 200", status: "Active"},
    {name: "Man UK", phone: "0123987789", location: "Nanyuki", product: "SHS 100", status: "Active"},
    {name: "Olu Okae", phone: "0123456123", location: "Murang`a", product: "SP 250", status: "Default"},
    {name: "Spider Kamau", phone: "0123456456", location: "Uthiru", product: "DX 245", status: "Active"},
    {name: "JM Laban", phone: "0123456578", location: "Gilgil", product: "FR 234", status: "Default"},
    {name: "Waiyaki Kui", phone: "012345243", location: "Rangwe", product: "RT 123", status: "Active"},
    {name: "Rongo Moja", phone: "012345798", location: "Bungoma", product: "SPL 500", status: "Complete"}
    ];

function rendercustomerTable(){

    let tableHTML ="";
    let customerCount=0;

    customers.forEach(customer =>{
        customerCount++;
        tableHTML+=`
        
            <tr>
                <td>${customerCount}</td>
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td>${customer.location}</td>
                <td>${customer.product}</td>
                <td>KES</td>
                <td><button>${customer.status}</button></td>
                <td><button>+</button><button>&#128465;</button></td>
            </tr>
         
            `;
    });
    document.querySelector('.table-rows').innerHTML = tableHTML;
}
rendercustomerTable();