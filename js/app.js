class Product{
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }

}

class UI{
    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
        
        <div class = "card text-center mb-4">
            <div class="card-body">
                <strong>Product Name</strong> : ${product.name}
                <strong>Product Price</strong> : ${product.price}
                <strong>Product Year</strong> : ${product.year}
                <a href = "#" class = "btn btn-danger" name="delete">Delete</a>
            </div>
        </div>
        
        `;

        productList.appendChild(element);
    }

    resetForm(){
        document.getElementById('product-form').reset();
    }

    // element, es un elemento html
    deleteProduct(element){
        // Si el element tiene una propiedad name llamada delete
        if(element.name === 'delete'){
            console.log(element.parentElement.parentElement.parentElement);
            // se movio a 3 parent para llegar hasta el div que contiene todo la targeta
            element.parentElement.parentElement.parentElement.remove();//elimina un elemento padre
            this.showMessage('Product deleted successfully', 'success');
        }
    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));

        // Showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        // seleccionar container, insertar un div antes de app
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

// DOM Events

// Event enviar datos 
document.getElementById("product-form").addEventListener('submit', function(e){
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    const product = new Product(name, price, year);

    const ui =  new UI();

    if(name === '' || price === '' || year === ''){
        return ui.showMessage('Complete fields please', 'danger');
    }

    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage('Product added successfully', 'success');

    e.preventDefault();
});

// Evento botn elimnar
document.getElementById('product-list').addEventListener('click', function(e){
    console.log(e.target);//verifica que esta capturando el target
    const ui = new UI();
    ui.deleteProduct(e.target);
});