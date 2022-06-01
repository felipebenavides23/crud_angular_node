import { ProductoService } from './../../service/producto.service';
import { Component, OnInit } from '@angular/core';
import { producto } from './../../model/producto.model';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css'],
})
export class ListarProductosComponent implements OnInit {
  constructor(private productoService: ProductoService) {}

  listadoprodu: producto[] = [];

  ngOnInit(): void {
    this.listarproductos();
  }

  listarproductos() {
    this.productoService.getProductos().subscribe((data) => {
      console.log(data);
      this.listadoprodu = data;
    });
  }

  eliminarproducto(id: any) {
    this.productoService.eliminarProducto(id).subscribe((data) => {
      this.listarproductos();
    });
  }
}
