import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-fbcreate',
  templateUrl: './fbcreate.component.html',
  styleUrls: ['./fbcreate.component.css']
})
export class FBcreateComponent implements OnInit {
  
  constructor(private fb:FormBuilder,private employeeService:EmployeeService) { }


  //error messages

  formErrors={
    'fullName':'',
    'emailGroup':'',
    'email':'',
    'confirmEmail':'',
    'phone':'',
    'skillName':'',
    'exp':'',
    'prof':''
  };

  validationMessages={
    'fullName':{
      'required':'Full name is required',
      'minlength':'Full name must be greater than 2 char',
      'maxlength':"Full name must be less than 10 char"
    },
    'email':{
      'required':'Email is required',
      'emailDomain':'Type Email Coorectly with@docsvault.com'
    },
    'confirmEmail':{
      'required':'Confirm Email is required',
    },
    'emailGroup':{
      'emailMisMatch':"Mails should be same"
    },
    'phone':{
      'required':'Phone is required',
      'minlength':'Enter 10 digits'
    },
    'skillName':{
      'required':'Skill Name is required'
    },
    'exp':{
      'required':'Experience is required'
    },
    'prof':{
      'required':'Proficiency is required'
    }
  };

  employeeForm=this.fb.group({
    fullName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
    contactPreference:['email'],
    emailGroup:this.fb.group({
      email:['',[emailDomainparam('docsvault.com'),Validators.required]],
      confirmEmail:['',Validators.required],
    },{validators:matchEmail}),
   
    phone:[''],
    skills:this.fb.group({
      skillName:['',Validators.required],
      exp:['',Validators.required],
      prof:['',Validators.required]
    }),

  });
  

  ngOnInit(): void 
  {
    //formControl value change example
    // this.employeeForm.controls.fullName.valueChanges.subscribe((value:string)=>{ 
    //  // console.log(value);
    //   this.fullNameLength=value.length;
    // });


    //formGroup value changes
    // this.employeeForm.valueChanges.subscribe((value:any)=>{ 
    //    // console.log(value);
    //     console.log(JSON.stringify(value));
    //     console.log(value);
    //   });



    this.employeeForm.valueChanges.subscribe((data)=>{
      this.logValidationErrors(this.employeeForm);
    });

    this.employeeForm.controls.contactPreference.valueChanges.subscribe((data:string)=>{
      this.onContactPreferenceChange(data);
    });



  }

 

  onContactPreferenceChange(selectedValue:string)
  {
     const phoneControl=this.employeeForm.controls.phone;

     if(selectedValue==='phone')
     {
       phoneControl.setValidators([Validators.required,Validators.minLength(10)]);
     }
     else
     {
       phoneControl.clearValidators();
     }

     phoneControl.updateValueAndValidity();

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

  onValidationClick()
  { 
    this.logValidationErrors(this.employeeForm);
    console.log(this.formErrors);
  }

  

  disableFormControlMethod()
  {
    this.disableFormControls(this.employeeForm);
  }

  disableFormGroupMethod()
  {
    this.disableFormGroupControls(this.employeeForm);
  }

  disableAllFormsMethod()
  {
    this.disableAllForms(this.employeeForm);
  }

  printKeyValue()
  {
    this.logKeyValuePairs(this.employeeForm);
  }

  markAsDirtyFullName()
  {
    this.employeeForm.controls.fullName.markAsDirty();
  }

  markAsDirtyAllMethod()
  { 
    this.markAsDirtyAll(this.employeeForm);
  }




  //helper methods
  disableFormControls(group:FormGroup)
  {
    Object.keys(group.controls).forEach((key:string)=>{
      const abstractControl=group.get(key);
      if(abstractControl instanceof FormControl)
        abstractControl.disable(); 
    });
  }
  
  disableFormGroupControls(group:FormGroup)
  {
    Object.keys(group.controls).forEach((key:string)=>{
      const abstractControl=group.get(key);
      if(abstractControl instanceof FormGroup)
        abstractControl.disable();       
    });
  }

  disableAllForms(group:FormGroup)
  {
    Object.keys(group.controls).forEach((key:string)=>{
      const abstractControl=group.get(key);
        abstractControl.disable();
    });

  }


  logKeyValuePairs(group:FormGroup)
  {
    Object.keys(group.controls).forEach((key:string)=>{
      const abstractControl=group.get(key);
      if(abstractControl instanceof FormGroup)
      {
        this.logKeyValuePairs(abstractControl); //its formGroup.So it will have keys value.So we wiil again call loop
      }
      else //its FormControl so no need to recursively go through loop
        console.log('KEY:'+key+' VALUE:'+abstractControl.value);
    });
  }



  markAsDirtyAll(group:FormGroup)
  {
    Object.keys(group.controls).forEach((key:string)=>{
      const abstractControl=group.get(key);
        abstractControl.markAsDirty();
    });
  }


  
  logValidationErrors(group:FormGroup=this.employeeForm)
  { 
    Object.keys(group.controls).forEach((key:string)=>{
    const abstractControl=group.get(key);

    this.formErrors[key]='';
      if(abstractControl && !abstractControl.valid && (abstractControl.dirty || abstractControl.touched))
      {
        const message=this.validationMessages[key];
       // console.log(message);
       // console.log(abstractControl.errors);
        for(const errorKey in abstractControl.errors)
        {
          if(errorKey)
          {
            this.formErrors[key] += message[errorKey]+' '; 
          }  
        }
      }

    if(abstractControl instanceof FormGroup)
    {
      this.logValidationErrors(abstractControl); 
    }
    
    });

  }

}

function emailDomain(control:AbstractControl):{[key:string]:any} | null
{
  const email:string=control.value;
  const domain=email.substring(email.lastIndexOf('@')+1);

  if(email==='' || domain.toLowerCase()==='docsvault.com')
  {
    return null;
  }
  else{
    return {'emailDomain':true};
  }  
}


//below is parameterized custom function of email validation
function emailDomainparam(domainName:string){
  return (control:AbstractControl):{[key:string]:any} | null=>{
  const email:string=control.value;
  const domain=email.substring(email.lastIndexOf('@')+1);

  if(email==='' || domain.toLowerCase()===domainName.toLowerCase())
  {
    return null;
  }
  else{
    return {'emailDomain':true};
  };  
}
}



function matchEmail(group:AbstractControl):{[key:string]:any} | null
{
  const emailControl=group.get('email');
  const confirmEmailControl=group.get('confirmEmail');
  if(emailControl.value==confirmEmailControl.value
    || confirmEmailControl.pristine)
  {
    return null;
  }
  else
  {
    return {'emailMisMatch':true};
  }
}