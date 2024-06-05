class Pedido {
    constructor(codigo, nombreCliente, direccion, horaPedido, fechaEntrega, pizza, tipoPago, cantidad, precioTotal, entregado, tipoEntrega, descuento) {
        this.codigo = codigo;
        this.nombreCliente = nombreCliente;
        this.direccion = direccion;
        this.horaPedido = horaPedido;
        this.fechaEntrega = fechaEntrega;
        this.pizza = pizza;
        this.tipoPago = tipoPago;
        this.cantidad = cantidad;
        this.precioTotal = precioTotal;
        this.entregado = entregado;
        this.tipoEntrega = tipoEntrega;
        this.descuento = descuento;
    }
}