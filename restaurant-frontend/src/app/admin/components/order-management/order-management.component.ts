import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  orders;
  constructor(private adminService: AdminService) { 
    this.adminService.getAllOrder().pipe(
      map((result)=>{
        console.log(result);
        this.orders = result;
      })
    ).subscribe();
    
  }

  ngOnInit(): void {
    console.log(this.orders);
  }

  orderReady(id: string){
    this.adminService.orderReady(id).pipe(
      map(()=>window.location.reload())
    ).subscribe();
  }

  deleteOrder(id: string){
    this.adminService.deleteOrder(id).pipe(
      map(()=> window.location.reload())
    ).subscribe();
  }

}
