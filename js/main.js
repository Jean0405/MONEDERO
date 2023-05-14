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
    let valor = 0;
    let mov = new Calculos();
    let ui = new UI();

    lista.forEach((item) => {
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

    mov.porcentajes(egresos, ingresos);
    ui.renderDisponible(totalDisponible, ingresos, egresos);
  }
  porcentajes(egresos, ingresos) {
    let porcentajeEgresos;
    let ui = new UI();

    if (egresos != 0) {
      porcentajeEgresos = Math.floor((egresos / ingresos) * 100);
      ui.renderPorcentajes(porcentajeEgresos);
    }
  }
}

class UI {
  renderIngresos(item) {
    const movIngresos = document.createElement("div");
    movIngresos.setAttribute(
      "class",
      "ingresos-detalle detalle col-12 d-flex justify-content-around align-items-center py-2 my-1 rounded"
    );
    movIngresos.innerHTML = `
            <span class="descripcion">${item.descripcion}</span>
            <span class="valor-movimiento mx-2">+$${item.valor}</span>
            <button class="btn borrar" id="borrarIn">X</button>
        `;
    ingresosContainer.appendChild(movIngresos);

    const listaBtnBorrar = document.querySelectorAll("#borrarIn");
    listaBtnBorrar.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const button = e.target;
        borrarItemsMovimientos(button);
      });
    });
  }

  renderEgresos(item) {
    const movEgresos = document.createElement("div");
    movEgresos.setAttribute(
      "class",
      "egresos-detalle detalle col-12 d-flex justify-content-around align-items-center py-2 my-1 rounded"
    );
    movEgresos.innerHTML = `
            <span class="descripcion">${item.descripcion}</span>
            <span class="valor-movimiento mx-2">-$${item.valor}</span>
            <button class="btn borrar" id="borrarEg">X</button>
        `;
    egresosContainer.appendChild(movEgresos);

    const listaBtnBorrar = document.querySelectorAll("#borrarEg");
    listaBtnBorrar.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const button = e.target;
        borrarItemsMovimientos(button);
      });
    });
  }
  renderDisponible(totalDisponible, ingresos, egresos) {
    document.querySelector(".disponible").innerHTML = `$${totalDisponible}`;
    document.querySelector(".ingresos-total").innerHTML = `$${ingresos}`;
    document.querySelector(".egresos-total").innerHTML = `$${egresos}`;
  }

  renderPorcentajes(porcentajeEgresos) {
    document.querySelector(
      ".porcentaje-egresos"
    ).innerHTML = `${porcentajeEgresos}%`;
  }
  formReset() {
    form.reset();
  }
}

function borrarItemsMovimientos(button) {
  const parentButton = button.closest(".detalle");
  const nameItem = parentButton.querySelector(".descripcion").textContent;

  listaMovimientos.forEach((item) => {
    if (item.descripcion === nameItem) {
      const index = listaMovimientos.indexOf(item);
      listaMovimientos.splice(index, 1);
      parentButton.remove();
    }
  });
  let calculos = new Calculos();
  calculos.disponible(listaMovimientos, totalDisponible, ingresos, egresos);
}

const form = document.querySelector("#formulario");
const ingresosContainer = document.querySelector(".ingresos");
const egresosContainer = document.querySelector(".egresos");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let data = Object.fromEntries(new FormData(e.target));
  const { movimiento, descripcion, valor } =
    data; /*Desestructurando los valores*/

  let mov = new Calculos(movimiento, descripcion, valor);
  let ui = new UI();
  listaMovimientos.push(mov);
  mov.disponible(listaMovimientos, totalDisponible, ingresos, egresos);

  ingresosContainer.innerHTML = "";
  egresosContainer.innerHTML = "";

  listaMovimientos.forEach((item) => {
    if (item.movimiento === "ingresos") {
      ui.renderIngresos(item);
    } else if (item.movimiento === "egresos") {
      ui.renderEgresos(item);
    }
  });

  ui.formReset();
});
