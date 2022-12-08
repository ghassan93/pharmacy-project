import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Drug, ListCustomerOrders, ListDrugs, Order, OrderedDrug } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {

  constructor(private http:HttpClient, private authService:AuthService,) { this.code = this.authService.getCurrentUser()?.code as string;}
  code: string =''
  page:number = 1;



  getDrugList():Observable<ListDrugs<Drug>>{
    return this.http.get<ListDrugs<Drug>>(`${env.BASE_URL}drugs`);
    }


  addNewOrder(Order:Order){
     
    return this.http.post<Order>(`${env.BASE_URL}orders/${this.code}/`,Order);
    
    }

    getcustomerordere( page:number ){
     let params =new HttpParams();

     params=params.append('page',String(page))
      return this.http.get<ListCustomerOrders>(`${env.BASE_URL}orders/${this.code}/`,{params});
      
      }
}
