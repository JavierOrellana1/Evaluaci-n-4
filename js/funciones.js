var pedidos = [];
pedidos.push(new Pedido("P-1020", "JORGE PEREZ", "Calle Sur #847, Rancagua ", "12:00", 
            "2024-12-06", "Pizza Peperoni", "Efectivo", "2", "12.000", "Pendiente", "Domicilio", "No Aplicado"));
pedidos.push(new Pedido("P-1021", "JORGE PEREZ", "Calle Sur #847, Rancagua ", "12:00", 
            "2024-12-06", "Pizza Peperoni", "Efectivo", "2", "12.000", "Pendiente", "Domicilio", "No Aplicado"));

function listarPedidos(){
    var filas = "";
    for (let i = 0; i < pedidos.length; i++) {
        var p = pedidos[i];
        filas += "<tr>";
            filas += "<td>" + p.codigo + "</td>";
            filas += "<td>" + p.nombreCliente.toUpperCase() + "</td>";
            filas += "<td>" + p.direccion.toUpperCase() + "</td>";
            filas += "<td>" + p.horaPedido.toUpperCase() + "</td>";
            filas += "<td>" + p.fechaEntrega.toUpperCase() + "</td>";
            filas += "<td>" + p.pizza.toUpperCase() + "</td>";
            filas += "<td>" + p.tipoPago.toUpperCase() + "</td>";
            filas += "<td>" + p.cantidad + "</td>";
            filas += "<td>" + p.precioTotal + "</td>";
            filas += "<td>" + p.entregado.toUpperCase() + "</td>";
            filas += "<td>" + p.tipoEntrega.toUpperCase() + "</td>";
            filas += "<td>" + p.descuento.toUpperCase() + "</td>";
        filas += "</tr>";
    }
    document.getElementById("tabladedatos").innerHTML = filas;
}

document.addEventListener("DOMContentLoaded", function() { listarPedidos(); });

function limpiarCampos(x){
    if(x === 1){
        document.getElementById("codigo").value = "";
    }
    document.getElementById("Nombre").value = "";
    document.getElementById("Direccion").value = "";
    document.getElementById("Hora").value = "";
    document.getElementById("Fecha").value = "";
    document.getElementById("Pizza").value = "";
    document.getElementById("efectivo").checked = true;
    document.getElementById("debito").checked = false;
    document.getElementById("cantidad").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("Entregado").value = "";
    document.getElementById("domicilio").checked = true;
    document.getElementById("retiro").checked = false;
    document.getElementById("Descuento").value = "";
}

function consultar() {
    var cod = document.getElementById("codigo").value;
    // Expresión para verificar si el código está en el rango de "P-1020" a "P-1050"
    var codigoRegex = /^P-10([2-4][0-9]|50)$/;

    if (!codigoRegex.test(cod)) {
        alert("El código debe estar en el rango de P-1020 a P-1050.");
        document.getElementById("codigo").focus();
        return;
    }

    let sw = 0;
    for (let i = 0; i < pedidos.length; i++) {
        var p = pedidos[i];
        if (cod === p.codigo) {
            sw = 1;
            document.getElementById("Nombre").value = p.nombreCliente;
            document.getElementById("Direccion").value = p.direccion;
            document.getElementById("Hora").value = p.horaPedido;
            document.getElementById("Fecha").value = p.fechaEntrega;
            document.getElementById("Pizza").value = p.pizza;
            if (p.tipoPago === "Efectivo") {
                document.getElementById("efectivo").checked = true;
            } else {
                document.getElementById("debito").checked = true;
            }
            document.getElementById("cantidad").value = p.cantidad;
            document.getElementById("precio").value = p.precioTotal;
            document.getElementById("Entregado").value = p.entregado;
            if (p.tipoEntrega === "Domicilio") {
                document.getElementById("domicilio").checked = true;
            } else {
                document.getElementById("retiro").checked = true;
            }
            document.getElementById("Descuento").value = p.descuento;
            break;
        }
    }

    var msg = "";
    if(sw === 0){
        msg += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>"
        msg += "<strong>Cliente no encontrado!</strong>"
        msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"
        msg += "</div>"
    } else {
        msg += "<div class='alert alert-success alert-dismissible fade show' role='alert'>"
        msg += "<strong>Cliente encontrado!</strong>"
        msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"
        msg += "</div>"
    }
    document.getElementById("mensajes").innerHTML = msg;
}

function registrar() {
    var cod = document.getElementById("codigo").value.toUpperCase();
    var nom = document.getElementById("Nombre").value.toUpperCase();
    var dir = document.getElementById("Direccion").value.toUpperCase();
    var hor = document.getElementById("Hora").value.toUpperCase();
    var fec = document.getElementById("Fecha").value.toUpperCase();
    var piz = document.getElementById("Pizza").value.toUpperCase();

    var mPag = "";
    if (document.getElementById("efectivo").checked === true) {
        mPag = "Efectivo";
    } else {
        mPag = "Debito";
    }

    var cant = document.getElementById("cantidad").value;
    var prec = document.getElementById("precio").value.toUpperCase();
    var ent = document.getElementById("Entregado").value.toUpperCase();
    var mEntreg = "";
    if (document.getElementById("domicilio").checked === true) {
        mEntreg = "Domicilio";
    } else {
        mEntreg = "Retiro";
    }
    var des = document.getElementById("Descuento").value.toUpperCase();

    var errores = "";
    if (cod.trim().length < 2 || cod.trim().length > 6) {
        errores += "El código debe contener entre 2 y 6 caracteres!\n";
    } else {
        let x = 0;
        for (let i = 0; i < pedidos.length; i++) {
            var p = pedidos[i];
            if (cod === p.codigo) {
                x = 1;
                break;
            }
        }
        if (x === 1) {
            errores += "El código ya se encuentra registrado!\n";
        }
    }

    if (nom.trim().length < 1 || nom.trim().length > 30) {
        errores += "El nombre de cliente debe contener entre 1 y 30 caracteres.\n";
    }

    if (dir.trim().length < 1 || dir.trim().length > 30) {
        errores += "La dirección debe contener entre 1 y 30 caracteres.\n";
    }

    if (hor.trim().length < 1 || hor.trim().length > 10) {
        errores += "La Hora debe contener entre 1 y 10 caracteres.\n";
    }

    if (fec.trim().length < 1 || fec.trim().length > 10) {
        errores += "La Fecha debe contener entre 1 y 10 caracteres.\n";
    }

    if (piz.trim().length === 0) {
        errores += "Debe ingresar la Pizza!\n";
    }

    if (isNaN(cant) || cant < 0) {
        errores += "La cantidad debe ser un número positivo.\n";
    }
    if (isNaN(prec) || prec < 0) {
        errores += "El precio total debe ser un número positivo.\n";
    }

    if (ent.trim().length === 0) {
        errores += "Debe ingresar el Metodo de entrega!\n";
    }

    if (des.trim().length === 0) {
        errores += "Debe ingresar el Descuento!\n";
    }

    if (errores !== "") {
        alert(errores);
    } else {
        pedidos.push(new Pedido(cod, nom, dir, hor, fec, piz, mPag, cant, prec, ent, mEntreg, des));
        var msg = "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
        msg += "<strong>Client registrado correctamente!</strong>";
        msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
        msg += "</div>";
        document.getElementById("mensajes").innerHTML = msg;
        listarPedidos();
        limpiarCampos();
    }
}

function modificar() {
    var cod = document.getElementById("codigo").value.toUpperCase();
    var nom = document.getElementById("Nombre").value.toUpperCase();
    var dir = document.getElementById("Direccion").value.toUpperCase();
    var hor = document.getElementById("Hora").value.toUpperCase();
    var fec = document.getElementById("Fecha").value.toUpperCase();
    var piz = document.getElementById("Pizza").value.toUpperCase();

    var mPag = "";
    if (document.getElementById("efectivo").checked === true) {
        mPag = "Efectivo";
    } else {
        mPag = "Debito";
    }

    var cant = document.getElementById("cantidad").value;
    var prec = document.getElementById("precio").value.toUpperCase();
    var ent = document.getElementById("Entregado").value.toUpperCase();
    var mEntreg = "";
    if (document.getElementById("domicilio").checked === true) {
        mEntreg = "Domicilio";
    } else {
        mEntreg = "Retiro";
    }
    var des = document.getElementById("Descuento").value.toUpperCase();

    var errores = "";
    if (cod.trim().length < 2 || cod.trim().length > 6) {
        errores += "El código debe contener entre 2 y 6 caracteres!\n";
    } else {
        let x = 0;
        for (let i = 0; i < pedidos.length; i++) {
            var p = pedidos[i];
            if (cod === p.codigo) {
                x = 1;
                break;
            }
        }
        if (x === 0) {
            errores += "El código no se encuentra registrado!\n";
        }
    }

    if (nom.trim().length < 1 || nom.trim().length > 30) {
        errores += "El nombre de cliente debe contener entre 1 y 30 caracteres.\n";
    }

    if (dir.trim().length < 1 || dir.trim().length > 30) {
        errores += "La dirección debe contener entre 1 y 30 caracteres.\n";
    }

    if (hor.trim().length < 1 || hor.trim().length > 10) {
        errores += "La Hora debe contener entre 1 y 10 caracteres.\n";
    }

    if (fec.trim().length < 1 || fec.trim().length > 10) {
        errores += "La Fecha debe contener entre 1 y 10 caracteres.\n";
    }

    if (piz.trim().length === 0) {
        errores += "Debe ingresar la Pizza!\n";
    }

    if (isNaN(cant) || cant < 0) {
        errores += "La cantidad debe ser un número positivo.\n";
    }
    if (isNaN(prec) || prec < 0) {
        errores += "El precio total debe ser un número positivo.\n";
    }

    if (ent.trim().length === 0) {
        errores += "Debe ingresar el Metodo de entrega!\n";
    }

    if (des.trim().length === 0) {
        errores += "Debe ingresar el Descuento!\n";
    }
    if (errores !== "") {
        alert(errores);
    } else {
        var sw = 0;
        for (let i = 0; i < pedidos.length; i++) {
            var p = pedidos[i];
            if (cod === p.codigo) {
                var x = confirm("Desea modificar el registro?");
                if (x === true) {
                    sw = 1;
                    pedidos[i].nombre = nom;
                    pedidos[i].direccion = dir;
                    pedidos[i].horaPedido = hor;
                    pedidos[i].fechaEntrega = fec;
                    pedidos[i].pizza = piz;
                    pedidos[i].tipoPago = mPag;
                    pedidos[i].cantidad = cant;
                    pedidos[i].precioTotal = prec;
                    pedidos[i].entregado = ent;
                    pedidos[i].tipoEntrega = mEntreg;
                    pedidos[i].descuento = des;
                    break;
                } else {
                    sw = 2;
                }
            }
        }

        var msg = "";
        if (sw === 0) {
            msg += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
            msg += "<strong>Cliente no encontrado!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        } else if (sw === 1) {
            msg += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
            msg += "<strong>Cliente modificado correctamente!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        } else if (sw === 2) {
            msg += "<div class='alert alert-info alert-dismissible fade show' role='alert'>";
            msg += "<strong>Modificación cancelada!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        }
        document.getElementById("mensajes").innerHTML = msg;
        listarPedidos();
        limpiarCampos();
    }
}



function eliminar() {
    var cod = document.getElementById("codigo").value.toUpperCase();
    var errores = "";

    if (cod.trim().length < 2 || cod.trim().length > 6) {
        errores += "El código debe contener entre 2 y 6 caracteres! \n";
    } else {
        let x = 0;
        for (let i = 0; i < pedidos.length; i++) {
            if (cod === pedidos[i].codigo) {
                x = 1;
                break;
            }
        }
        if (x === 0) {
            errores += "El código no se encuentra registrado!\n";
        }
    }

    if (errores !== "") {
        alert(errores);
    } else {
        let sw = 0;
        for (let i = 0; i < pedidos.length; i++) {
            if (cod === pedidos[i].codigo) {
                var x = confirm("Desea eliminar el registro?");
                if (x === true) {
                    sw = 1;
                    pedidos.splice(i, 1);
                    break;
                } else {
                    sw = 2;
                }
            }
        }

        let msg = "";
        if (sw === 0) {
            msg += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
            msg += "<strong>Client no encontrado!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        } else if (sw === 1) {
            msg += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
            msg += "<strong>Cliente eliminado correctamente!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        } else if (sw === 2) {
            msg += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
            msg += "<strong>El Cliente no fue eliminado!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        }
        document.getElementById("mensajes").innerHTML = msg;
        listarPedidos();
        limpiarCampos();
    }
}



