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
        const sellButton = `sale-${elemento.id}`;
        const purchaseButton = `purchase-${elemento.id}`;
        row.innerHTML = `
            <th scope = "row">${elemento.id}</th>
            <td>${elemento.name}</th>
            <td>${elemento.stored}</td>
            <td>${elemento.price}</td>
            <td><button type = 'button' class = "btn btn-primary" id = "${sellButton}">Vender</button></td>
            <td><button type = 'button' class = "btn btn-secondary" id = "${purchaseButton}">Comprar</button></td>
        `;
        lista.appendChild(row);
        document.getElementById(sellButton).addEventListener('click', (e) => {
            sellButtonEvent(elemento.id);
        });
    });
};

const sellButtonEvent = (id) =>
{
    let container = document.getElementById("sellContainer");
    let product = products.getProduct(id);

    container.innerHTML = `
    <div class="col">
        <h5>${product.name}</h5></div>
    </div>
    <div class="col">
        <h6>Existencia: ${product.stored} kg</h6></div>
    </div>
    <div class="col">
        <label for="sellItem">Cantidad a vender (kg)</label>
        <input type="text" class="form-control" id="sellItem">
        <button type = "button" class="btn btn-success" id ="btnSellItem">Vender</button>
    </div>
    <div class="col">
        <button type ="button" class = "btn btn-danger" id = "cancelSell">Cancelar</button>
    </div>
    `;
}

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
    document.getElementById('addProduct').reset();
    document.getElementById("addProduct").style.display = "none";
    document.getElementById("addProductBtn").style.display = "block";
}

addEventListener("load", getCash);
addEventListener("load", buildTable);
addEventListener("submit", submitEvent);
document.getElementById("addProductBtn").addEventListener("click", addProductEventStart);
document.getElementById("cancelNewProd").addEventListener("click", addProductEventEnd);
