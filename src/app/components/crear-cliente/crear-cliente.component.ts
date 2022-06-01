import { ProductoService } from './../../service/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { producto } from './../../model/producto.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css'],
})
export class CrearClienteComponent implements OnInit {
  productoForm: FormGroup;
  titulo: string = 'CREAR PERSONAS';
  id: string | null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private ProductoService: ProductoService,
    arouter: ActivatedRoute
  ) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });
    this.id = arouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.iseditar();
  }

  agregarproducto() {
    const producto: producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    };

    if (!this.id == null) {
      this.ProductoService.editarproducto(this.id, producto).subscribe(
        (data) => {
          this.toastr.success('agrego', 'ingreso satisfactorio');
          this.router.navigate(['/']);
        }
      );
    } else {
      this.ProductoService.agregarproducto(producto).subscribe((data) => {
        this.toastr.success('agrego', 'ingreso satisfactorio');
        this.router.navigate(['/']);
      });
    }
  }

  iseditar() {
    if (this.id == null) {
      this.titulo = 'CREAR PRODUCTO';
    } else {
      this.titulo = 'editar persona';
      this.ProductoService.obtenerproducto(this.id).subscribe((data) => {
        console.log(data);
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
        });
      });
    }
  }
}
