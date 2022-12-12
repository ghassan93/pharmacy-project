import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AdminOrderService } from '../services/admin.service';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.css']
})
export class CreateUserDialogComponent  {
  @Output() private coursChanged = new EventEmitter();
  form= new FormGroup({
    userFile: new FormControl('',Validators.required)
   
  });
  selectedFile: any ;
  constructor(public dialog: MatDialog,private adminOrderService:AdminOrderService,
    public dialogRef: MatDialogRef<CreateUserDialogComponent>) {}


  

  selectFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if(! this.selectedFile){window.alert('Upload File Please');}
    else{
    const formData =  this.selectedFile;

    this.adminOrderService.createNewUsers(formData).subscribe();
      // do something after the file is uploaded
      this.dialogRef.close(formData);
   
      
    
  }}
}
 

 

