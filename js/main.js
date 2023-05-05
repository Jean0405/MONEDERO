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
    disponible(lista, totalDisponible, ingresos, egresos) {
        let mov = new Calculos();
        let ui = new UI();
        let valor = 0;

        lista.forEach(item => {
            valor = parseInt(item.valor);
            switch (item.movimiento) {
                case "ingresos":
                    ingresos += valor;
                    break;
                case "egresos":
                    egresos += valor;
            }
            totalDisponible = ingresos - egresos;
        });
        mov.porcentajes(egresos,ingresos);
        ui.renderDisponible(totalDisponible,ingresos,egresos);
        ui.renderDisponible(totalDisponible,ingresos,egresos);

        let porcIngreso = Math.floor((valor/ingresos)*100) ;
        let porcEgreso = Math.floor((valor/egresos)*100);

        return {porcIngreso,porcEgreso};
    }
    porcentajes(egresos,ingresos){
        let porcentajeEgresos;
        let ui = new UI();

        if (egresos!=0) {
            porcentajeEgresos = Math.floor((egresos/ingresos)*100);
            ui.renderPorcentajes(porcentajeEgresos)
        }
    }

}


class UI {
    renderIngresos(item,porcIngreso) {
        const ingresosContainer = document.querySelector('.ingresos');
        const movIngresos = document.createElement('div');
        movIngresos.setAttribute('class', 'ingresos-detalle col-12 d-flex justify-content-between py-2 my-1 rounded');
            movIngresos.innerHTML = `
            <span>${item.descripcion}</span>
            <span class="valor-movimiento mx-2">+$${item.valor}</span>
            <span class="porcentajeIn">${porcIngreso}%</span>
        `;
        ingresosContainer.appendChild(movIngresos);
    }

    renderEgresos(item,porcEgreso){

        const egresosContainer = document.querySelector('.egresos');
        const movEgresos = document.createElement('div');
        movEgresos.setAttribute('class', 'egresos-detalle col-12 d-flex justify-content-between py-2 my-1 rounded');
            movEgresos.innerHTML = `
            <span>${item.descripcion}</span>
            <span class="valor-movimiento mx-2">-$${item.valor}</span>
            <span class="porcentajeEg">${porcEgreso}%</span>
        `;
            egresosContainer.appendChild(movEgresos);
    }
    renderDisponible(totalDisponible,ingresos,egresos){
        document.querySelector('.disponible').innerHTML=`$${totalDisponible}`;
        document.querySelector('.ingresos-total').innerHTML=`$${ingresos}`;
        document.querySelector('.egresos-total').innerHTML=`$${egresos}`;
    }

    renderPorcentajes(porcentajeEgresos){
        document.querySelector('.porcentaje-egresos').innerHTML =`${porcentajeEgresos}%`;
    }
    formReset() {
        form.reset();
    }
}


const form = document.querySelector('#formulario');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let data = Object.fromEntries(new FormData(e.target))
    const { movimiento, descripcion, valor } = data; /*Desestructurando los valores*/


    let mov = new Calculos(movimiento, descripcion, valor);
    listaMovimientos.push(mov)
    let porc = mov.disponible(listaMovimientos, totalDisponible, ingresos, egresos);
    
    const {porcIngreso, porcEgreso} = porc;
    console.log(porcIngreso,porcEgreso)
    let ui = new UI();


        if (mov.movimiento === "ingresos") {
            ui.renderIngresos(mov,porcIngreso);
        }else if(mov.movimiento === "egresos"){
            ui.renderEgresos(mov,porcEgreso);
        }
    ui.formReset();
})
