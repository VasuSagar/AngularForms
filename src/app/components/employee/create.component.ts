import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  employeeForm:FormGroup=new FormGroup({
    fullName:new FormControl(''),
    email:new FormControl(''),
    //skill formgroup
    skills:new FormGroup({
      skillName:new FormControl(''),
      exp:new FormControl(''),
      prof:new FormControl('')
    })

  });
  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void 
  {
   
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
