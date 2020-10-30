// Configuro precios constantes
const basePrice = 1500;
const sectPrice = 500;
const blogPrice = 3000;
const ecomPrice = 3000;
const mantPrice = 2400;

// Constantes del DOM
const form = $('#form-simu');
const spinner = $('#spinner');
const divOne = $('#one');
const divTwo = $('#two');
const divTwoHalf = $('#twohalf');
const divThree = $('#three');
const nameInput = $('#name');
const emailInput = $('#email');
const telInput = $('#tel');
const provInput = $('#prov');
const munInput = $('#mun');
const sectInput = $('#sections');
const blogInput = $('#blog');
const ecomInput = $('#ecom');
const mantInput = $('#mant');
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
const modalList = $('#dataList');
const saveBtn = $('#saveBtn');
const goBtn = $('#goBtn');
const strBtn = $('#strbtn');
const twobtn = $('#twobtn');
const twobckbtn = $('#twobckbtn');
const tbckbtn = $('#tbckbtn');
const modal = $('#dataModal');
const goPdf = $('#goPdf');

// Espero la carga del DOM
$( document ).ready(function()
{
    console.log('Cargo el DOM');
    divTwo.hide();
    divTwoHalf.hide();
    webHis.hide();
    getProv();
    calc();
    getWeb();
    nameInput.change(calc);
    telInput.change(calc);
    emailInput.change(calc);
    sectInput.change(calc);
    blogInput.change(calc);
    ecomInput.change(calc);
    mantInput.change(calc);
    provInput.ready(getMun);
    provInput.change(getMun);
    provInput.change(calc);
    munInput.change(calc);
    saveBtn.click(saveWeb);
    saveBtn.click(getWeb);
    goBtn.click(mFill);
    strBtn.click(stepOne);
    twobckbtn.click(stepBckOne);
    twobtn.click(stepTwo);
    tbckbtn.click(stepBckTwo);
    goPdf.click(savePdf);
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
    this.prov = data[9];
    this.mun = data[10];
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

$(form).validator().on('submit', function (e) {
    if (e.isDefaultPrevented()) {
        stepBckTwo()
    } else {
        modal.modal('show');
        return false;
    }
})
