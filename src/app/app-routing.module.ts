import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/employee/create.component';
import { ListComponent } from './components/employee/list.component';
import { FBcreateComponent } from './componentsFormbuilder/employee/fbcreate/fbcreate.component';
const routes: Routes = [
{path:'list',component:ListComponent},
{path:'create',component:CreateComponent},
{path:'fbcreate',component:FBcreateComponent},
{path:'',redirectTo:'list',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
