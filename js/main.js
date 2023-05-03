let listaMovimientos = [];
let totalDisponible = 0;
let ingresos = 0;
let egresos = 0;



class Calculos {
    constructor(movimiento, descripcion, valor) {
        this.movimiento = movimiento;
        this.descripcion = descripcion;
        this.valor = valor;
    }
    disponible(valores, totalDisponible, ingresos, egresos) {
        valores.forEach(item => {
            let valor = parseInt(item.valor);
            switch (item.movimiento) {
                case "ingresos":
                    ingresos += valor;
                    break;
                case "egresos":
                    egresos += valor;
            }
            totalDisponible = ingresos - egresos;
        });
        let ui = new UI();
        ui.renderDisponible(totalDisponible,ingresos,egresos)
        return totalDisponible, ingresos, egresos;
    }

    formReset() {
        form.reset();
    }
}





class UI {
    renderIngresos(item) {
        const ingresosContainer = document.querySelector('.ingresos');
        const movIngresos = document.createElement('div');

        movIngresos.setAttribute('class', 'ingresos-detalle col-12 d-flex justify-content-between py-2 my-1 rounded');
            movIngresos.innerHTML = `
            <span>${item.descripcion}</span>
            <span class="valor-movimiento">+$${item.valor}</span>
        `;
        ingresosContainer.appendChild(movIngresos);
    }

    renderEgresos(item){
        const egresosContainer = document.querySelector('.egresos');
        const movEgresos = document.createElement('div');

        movEgresos.setAttribute('class', 'egresos-detalle col-12 d-flex justify-content-between py-2 my-1 rounded');
            movEgresos.innerHTML = `
            <span>${item.descripcion}</span>
            <span class="valor-movimiento">-$${item.valor}</span>
        `;
            egresosContainer.appendChild(movEgresos);
    }
    renderDisponible(totalDisponible,ingresos,egresos){
        document.querySelector('.disponible').innerHTML=`$${totalDisponible}`;
        document.querySelector('.ingresos-total').innerHTML=`$${ingresos}`;
        document.querySelector('.egresos-total').innerHTML=`$${egresos}`;
    }
}




const form = document.querySelector('#formulario');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let data = Object.fromEntries(new FormData(e.target))
    const { movimiento, descripcion, valor } = data; /*Desestructurando los valores*/


    let mov = new Calculos(movimiento, descripcion, valor);
    listaMovimientos.push(mov)
    totalDisponible,ingresos,egresos = mov.disponible(listaMovimientos, totalDisponible, ingresos, egresos);

    let ui = new UI();

        if (mov.movimiento === "ingresos") {
            ui.renderIngresos(mov);
        }else if(mov.movimiento === "egresos"){
            ui.renderEgresos(mov);
        }
       
    mov.formReset();
})
