import {Component, Input} from '@angular/core';
import {Product} from '../../../classes/product.model';
import {Subject} from 'rxjs/Subject';
import {ProductService} from '../../../services/product.service';
import {IAlert} from '../table-users/table-users.component';


@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.css'],
  providers: [ProductService],
})

export class TableProductsComponent {
  products = new Product('', '', '', [], [], [], '');
  @Input()
  public alerts: Array<IAlert> = [];
  private _success = new Subject<string>();
  private backup: Array<IAlert>;
  constructor(private productService: ProductService) {
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }
  product: any;
  error: string;
  id: string;
  ngOnInit() {
    this.productService.getProduct().subscribe(
      (data) => {
        this.product = data;
        console.log(data);
      });
  }
  showProducts() {
    this.productService.getProduct().subscribe(
      (data) => {
        this.product = data;
        console.log(data);
      });
  }
  deleteUsers(id: string, index: number) {
    this.products._id = id;
    console.log(id);
    this.productService.deleteProduct(id).subscribe(
      (data) => {
        console.log(data);
        this.product.splice(index, 1);
      });
  }
  passID(id: string) {
    this.id = id;
  }
  modifyProducts(name: string, category: string, company: string) {
    this.products.category = category;
    this.products.name = name;
    this.products.company = company;
    this.products._id = this.id;
    console.log(this.products);
    this.productService.modifyProduct(this.products).subscribe(
      (data) => {
        console.log(data);
        this.error = data.name;
        if (this.error === 'CastError') {
          this.alerts.push({
            id: 2,
            type: 'danger',
            message: 'Error al modificar producto',
          });
        } else {
          this.alerts.push({
            id: 1,
            type: 'success',
            message: 'Producto Modificado!',
          });
        }
      });
  }
  addProduct(name: string, category: string, company: string, id: string) {
    this.products.category = category;
    this.products.name = name;
    this.products.company = company;
    this.products._id = id;
    console.log(this.products);
    this.productService.addProduct(this.products).subscribe(
      (data) => {
        console.log(data);
        // this.error = data.name; ARREGLAR SI SE PRODUCE ALGUN ERROR
        if (this.error === 'CastError') {
          this.alerts.push({
            id: 2,
            type: 'danger',
            message: 'Error al añadir producto',
          });
        } else {
          this.alerts.push({
            id: 1,
            type: 'success',
            message: 'Producto Añadido!',
          });
        }
      }
    );
  }
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}