import { Injectable } from '@angular/core';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  emp:Employee={fullName:"",email:"dhruv",skills:{skillName:"java",exp:5,prof:"beginner"}};
  updatedEmp={fullName:'gautam',skills:{skillName:"photo"}};
  constructor() { }


  getSingleEmployee():Employee
  {
    return this.emp;
  }

  updateEmployee()
  {
    return this.updatedEmp;
  }

}
