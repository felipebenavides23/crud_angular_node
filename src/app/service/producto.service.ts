import { producto } from './../model/producto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  url: string = 'http://localhost:4000/api/productos/';
  constructor(private http: HttpClient) {}

  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarProducto(id: any): Observable<any> {
    return this.http.delete(this.url + id);
  }

  agregarproducto(producto: producto): Observable<any> {
    return this.http.post(this.url, producto);
  }

  obtenerproducto(id: any): Observable<any> {
    return this.http.get(this.url + id);
  }

  editarproducto(id: any, producto: producto): Observable<any> {
    return this.http.put(this.url + id, producto);
  }
}
