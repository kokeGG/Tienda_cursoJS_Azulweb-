let cash = _cashier(db_cash);
let products = _products(db_productos);
let purchase = _purchase(db_purchase);

const getCash = () => {
    let cashText = document.getElementById('cash');
    cashText.innerHTML = `Capital $${cash.getStored()} MXN`;
}

const buildTable = () => {
    let table = document.getElementById("productTable");
    let lista = table.getElementsByTagName("tbody")[0];
    lista.innerHTML = "";

    products.getAllProducts().forEach((elemento) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <th scope = "row">${elemento.id}</th>
            <td>${elemento.name}</th>
            <td>${elemento.stored}</td>
            <td>${elemento.price}</td>
            <td></td>
            <td></td>
        `;
        lista.appendChild(row);
    });
    
};

const newProductEvent = () => {
    const name = document.getElementById('np_name').value;
    const stored = new Number(document.getElementById('np_stored').value);
    const purchasePrice = new Number(document.getElementById('np_p_price').value);
    const salePrice = new Number(document.getElementById('np_s_price').value);

    try {
        cash.purchase(stored * purchasePrice);
        const newProd = products.newProduct(name, stored, salePrice);
        purchase.new(newProd.id, stored, purchase);
    } catch (err) {
        alert(err.error);
    }

    buildTable();
    getCash();
    document.getElementById('addProduct').reset();
    addProductEventEnd();
    

}

const submitEvent = (e) => {
    e.preventDefault();
    //console.log(e);

    switch (e.target.id) {
        case 'addProduct':
            newProductEvent();
            break;
    
        default:
            break;
    }
}

const addProductEventStart = () => {
    document.getElementById("addProduct").style.display = "block";
    document.getElementById("addProductBtn").style.display = "none";
}

const addProductEventEnd = () => {
    document.getElementById("addProduct").style.display = "none";
    document.getElementById("addProductBtn").style.display = "block";
}

addEventListener("load", getCash);
addEventListener("load", buildTable);
addEventListener("submit", submitEvent);
document.getElementById("addProductBtn").addEventListener("click", addProductEventStart);