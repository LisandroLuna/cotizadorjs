// Función para calcular precio final
function calc(){
    console.log('Cargo calc()');
    // data[0] = Nro de secciones
    // data[1] = true lleva blog / false no lleva blog
    // data[2] = true lleva tienda / false no lleva tienda
    // data[3] = true Si desea mantenimiento / false no desea mantenimiento
    // data[4] = Nombre
    // data[5] = Telefono
    // data[6] = Email
    // data[7] = Fecha de creacion
    // data[8] = Fecha de creacion usada como identificador
    // data[9] = Provincia
    // data[10] = Municipio
    let data = [];

    // Tomo valores del formulario
    data[0] = sectInput.val();
    data[1] = blogInput.prop("checked");
    data[2] = ecomInput.prop("checked");
    data[3] = mantInput.prop("checked");
    data[4] = nameInput.prop("value");
    data[5] = telInput.prop("value");
    data[6] = emailInput.prop("value");
    const format = " HH:mm - DD/MM/YY";
    let date = new Date();
    data[7] = moment(date).format(format);
    data[8] = Date.now();
    data[9] = provInput.prop("value");
    data[10] = munInput.prop("value");

    checkCalc(data);
}

// Valido y formateo valores para crear objeto
function checkCalc(data){
    // Si no ingresan booleanos
    if(typeof data[1] !== "boolean"){
        alert('Error al seleccionar Blog, intente nuevamente!');
        blogInput.prop('checked', false);
        console.warn('Error al seleccionar Blog, no ingreso booleano');
    }
    if(typeof data[2] !== "boolean"){
        alert('Error al seleccionar Tienda, intente nuevamente!');
        ecomInput.prop('checked', false);
        console.warn('Error al seleccionar Tienda, no ingreso booleano');
    }
    if(typeof data[3] !== "boolean"){
        alert('Error al seleccionar Mantenimiento, intente nuevamente!');
        mantInput.prop('checked', false);
        console.warn('Error al seleccionar Mantenimiento, no ingreso booleano');
    }

    // Creo el objeto para realizar el calculo
    const webCalc = new Web(data);
    console.log(webCalc);

    // Muestro el precio final en el HTML
    if((typeof webCalc.price()) == 'number' ) {
        if(webCalc.blog === true){
            choiceBlog.text('Si');
            priceBlog.text('$3000');
        }else{
            choiceBlog.text('No');
            priceBlog.text('$0');
        }
        if(webCalc.ecom === true){
            choiceEcom.text('Si');
            priceEcom.text('$3000');
        }else{
            choiceEcom.text('No');
            priceEcom.text('$0');
        }
        if(webCalc.mant === true){
            choiceMant.text('Si');
            priceMant.text('$4500');
        }else{
            choiceMant.text('No');
            priceMant.text('$0');
        }
        unitSect.text(webCalc.sect);
        let finalSec = webCalc.calcSect();
        priceSect.text('$' + finalSec);
        price.text('$' + webCalc.price());
        console.log('Costo total: $' + webCalc.price());
        sessionStorage.setItem('budget', JSON.stringify(webCalc));
    }else{
        alert('Error al obtener presupuesto.');
        console.warn('Error al obtener presupuesto.')
    }
}

// Obtengo las cotizaciones guardadas en localStorage
function filterStorage() {
    // Filtro las keys que empiezan con mu clave 'bud-'
    let values = [];
    let i;
    keys = Object.keys(localStorage).sort().reverse();
    // Limito a las ultimas 3 cotizaciones
    if(keys.length <= 3){
        i = keys.length;
    }else{
        i = 3;
    }
    while(i--) {
        if(keys[i].substr(0, 4) == 'bud-') {
            values.push(localStorage.getItem(keys[i]));
        }
    }
    return values;
}

// Obtengo una cotizacion guardada en localStorage
function getStorage(select) {
    let value = '';
    let i;
    keys = Object.keys(localStorage).sort().reverse();
    // Limito a las ultimas 3 cotizaciones
    if(keys.length <= 3){
        i = keys.length;
    }else{
        i = 3;
    }
    while(i--) {
        if(keys[i] == ('bud-' + select)) {
            value = localStorage.getItem(keys[i]);
        }
    }
    return value;
}

//Guardar cotizacion
function saveWeb(){
    console.log('Cargo saveWeb()');
    // Cargo el JSON de sessionStorage
    let getData = sessionStorage.getItem('budget');
    localStorage.setItem('bud-' + JSON.parse(getData).select, getData);
}

// Limpiar Historial de Cotizaciones en DOM
function clearHis(){
    webHis.html('');
}

// De booleano a Si/No
function siNo(info){
    if(info == true){
        return 'Si'
    }else{
        return 'No';
    }
}

// De Si/No a booleano
function trueFalse(info){
    if(info === "Si"){
        return true
    }else{
        return false;
    }
}

// Traer cotizaciones guardadas
function getWeb(){
    console.log('Cargo getWeb()');
    clearHis();
    // Recibo las cotizaciones anteriores
    let getData = filterStorage();
    let temp = []
    getData.forEach(function (web) {
        web = JSON.parse(web)
        let data = [web.sect, web.blog, web.ecom, web.mant, web.fullName, web.tel, web.email, web.date, web.select, web.prov, web.mun];
        temp.push(new Web(data));
    })
    let i = 1;
    temp.forEach(e => {
        let article = $("<article></article>");
        article.html('<div class="p-2 mb-1" id="' + e.select + '">' +
            '<p class="font-weight-bold">Cotización: ' + e.date +
            '</p><ul>' +
            '<li id="bud-fullName">Nombre: ' + noData(e.fullName) + '</li>' +
            '<li id="bud-email">Email: ' + noData(e.email) + '</li>' +
            '<li id="bud-tel">Tel.: ' + noData(e.tel) + '</li>' +
            '<li id="bud-prov">Provincia: ' + noData(e.prov) + '</li>' +
            '<li id="bud-mun">Municipio/Departamento: ' + noData(e.mun) + '</li>' +
            '<li id="bud-sect">Secciones: ' + e.sect + '</li>' +
            '<li id="bud-blog">Blog: ' + siNo(e.blog) + '</li>' +
            '<li id="bud-ecom">Tienda: ' + siNo(e.ecom) + '</li>' +
            '<li id="bud-mant">Mantenimiento: ' + siNo(e.mant) + '</li>' +
            '<li id="bud-price">Precio Final: $' + e.price() + '</li>' +
            '</ul>' +
            '<a id="loadBtn-' + e.select +'" class="btn btn-info ml-4 w-100">Cargar</a>' +
            '</div>');
        webHis.prepend(article);
        i--;
        var loadButton = $('#loadBtn-' + e.select);
        loadButton.click(loadBud);
    })
}

function noData(data){
    if(data == ''){
        return 'Anonimo';
    }else{
        return data;
    }
}

// Cargar cotizaciones guardadas
function loadBud(){
    console.log('Cargo loadBud()');
    let art = this.parentNode.id;
    let info = JSON.parse(getStorage(art));
    data = [info.sect, info.blog, info.ecom, info.mant, info.fullName, info.tel, info.email, info.date, info.select, info.prov, info.mun];
    console.log(data);
    sectInput.val(data[0]);
    $('#amount').text(sectInput.val());
    blogInput.prop("checked", data[1]);
    ecomInput.prop("checked", data[2]);
    mantInput.prop("checked", data[3]);
    nameInput.val(data[4]);
    telInput.val(data[5]);
    emailInput.val(data[6]);
    provInput.val(data[9]);
    munInput.empty();
    munInput.val(data[10]);
    munInput.append('<option selected="selected" value="' + data[10] + '">' + data[10] + '</option>');
    checkCalc(data);
}

// Obtengo Provincias
function getProv(){
    $.ajax({
        url: "js/provincias.json", // Un archivo json con datos de usuarios: nombre, apellido, etc
        dataType: "json",
        success: function(response) {
            let select = $('#prov');
            prov = response.provincias;
            arrayProv = [];
            for (var j = 0; j  < response.total ; j++) {
                arrayProv.push(prov[j].nombre)
            }
            arrayProv.sort();
            let i = 0;
            arrayProv.forEach(a => {
                if(i==0){
                    select.append('<option selected="selected" value="' + a + '">' + a + '</option>\n');
                }else{
                    select.append('<option value="' + a + '">' + a + '</option>\n');
                }
                i++;
            })
        }
    });
}

// Obtengo Municipios
function getMun(){
    $.ajax({
        url: "js/municipios.json", // Un archivo json con datos de usuarios: nombre, apellido, etc
        dataType: "json",
        success: function(response) {
            let select = $('#mun').empty();
            let prov = $('#prov').val();
            mun = response.municipios;
            arrayMun = [];
            if( prov == 'Ciudad Autónoma de Buenos Aires'){
                arrayMun.push('Ciudad Autónoma de Buenos Aires');
            }else{
                for (var j = 0; j  < response.total ; j++) {
                    if(mun[j].provincia.nombre == prov){
                        arrayMun.push(mun[j].nombre);
                    }
                }
            }
            arrayMun.sort();
            let i = 0;
            arrayMun.forEach(a => {
                if(i==0){
                    select.append('<option selected="selected" value="' + a + '">' + a + '</option>\n');
                }else{
                    select.append('<option value="' + a + '">' + a + '</option>\n');
                }
                i++;
            })
            calc();
        }
    });
}

// Relleno el Modal
function mFill(){
    console.log('Cargo modalFill()');
    // Cargo el JSON de sessionStorage
    let getData = JSON.parse(sessionStorage.getItem('budget'));
    let data = [getData.sect, getData.blog, getData.ecom, getData.mant, getData.fullName, getData.tel, getData.email, getData.date, getData.select, getData.prov, getData.mun];
    let web = new Web(data);
    console.log(web)
    modalList.empty();
    modalList.html('<h5>Cotización: ' + getData.date + '</h5>' +
                    '<p class="lead">Datos de Contacto:</p>' +
                    '<ul class="ml-4">'+
                        '<li>Nombre: ' + noData(web.fullName) + '</li>' +
                        '<li>Email: ' + noData(web.email) + '</li>' +
                        '<li>Apellido: ' + noData(web.tel) + '</li>' +
                        '<li>Provincia: ' + noData(web.prov) + '</li>' +
                        '<li>Localidad: ' + noData(web.mun) + '</li>' +
                    '</ul>' +
                    '<p class="lead">Configuración:</p>' +
                    '<ul class="ml-4">'+
                        '<li>Secciones: ' + web.sect + '</li>' +
                        '<li>Blog: ' + siNo(web.blog) + '</li>' +
                        '<li>Tienda: ' + siNo(web.ecom) + '</li>' +
                        '<li>Mantenimiento anual: ' + siNo(web.mant) + '</li>' +
                    '</ul>' +
                    '<p class="lead">Precio Final: $' + web.price() + '</p>'
    );
}
