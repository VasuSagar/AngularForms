import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-fbcreate',
  templateUrl: './fbcreate.component.html',
  styleUrls: ['./fbcreate.component.css']
})
export class FBcreateComponent implements OnInit {
  
  constructor(private fb:FormBuilder,private employeeService:EmployeeService) { }
  employeeForm=this.fb.group({
    fullName:['',Validators.required],
    email:['',[Validators.email,Validators.required]],
    skills:this.fb.group({
      skillName:[''],
      exp:[''],
      prof:['']
    }),

  })

  ngOnInit(): void {
  }
   onSubmit()
  {
    // console.log(this.employeeForm.value);
    // console.log(this.employeeForm.controls.fullName); //OR
    // console.log(this.employeeForm.get('fullName'));


  }

  onLoad()
  {
    this.employeeForm.setValue(this.employeeService.getSingleEmployee());
    //to update OR to Set only some of the form value use patchValue()
    //this.employeeForm.patchValue(this.employeeService.updateEmployee());
    // NOTE:We can also use patch value to update OR Load all the data

  }

}
