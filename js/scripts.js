// Configuro precios constantes
const basePrice = 1500;
const sectPrice = 500;
const blogPrice = 3000;
const ecomPrice = 3000;
const mantPrice = 2400;

// Constantes del DOM
const form = $('#form-simu');
const nameInput = $('#name');
const telInput = $('#tel');
const emailInput = $('#email');
const sectInput = $('#sections');
const blogInput = $('#blog');
const ecomInput = $('#ecom');
const mantInput = $('#mant');
const saveButton = $('#saveBtn');
const webHis = $('#webHis');
const choiceBlog = $('#choiceb');
const priceBlog = $('#priceb');
const choiceEcom = $('#choicee');
const priceEcom = $('#pricee');
const choiceMant = $('#choicem');
const priceMant = $('#pricem');
const unitSect = $('#unitsect');
const priceSect = $('#prices');
const price = $('#price');

// Espero la carga del DOM
$( document ).ready(function()
{
    console.log('Cargo el DOM');
    calc();
    getWeb();
    nameInput.change(calc);
    telInput.change(calc);
    emailInput.change(calc);
    sectInput.change(calc);
    blogInput.change(calc);
    ecomInput.change(calc);
    mantInput.change(calc);
    saveButton.click(saveWeb);
    saveButton.click(getWeb);
    form.submit(function( event ) {
        alert('Se envio informacion!');
    });
});

// Creo el objeto web
function Web(data) {
    this.sect = data[0];
    this.blog = data[1];
    this.ecom = data[2];
    this.mant = data[3];
    this.fullName = data[4];
    this.tel = data[5];
    this.email = data[6];
    this.date = data[7];
    this.select = data[8];
    this.price = function (){
        let price = basePrice;
        if(this.calcSect()>0) {
            price += this.calcSect();
        }
        if(this.blog === true){
            price += blogPrice;
        }
        if(this.ecom === true){
            price += ecomPrice;
        }
        if(this.mant === true){
            price += mantPrice;
        }
        return price
    };
    this.calcSect = function () {
        return sectPrice*this.sect;
    }
}
