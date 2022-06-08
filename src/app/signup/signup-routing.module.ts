import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { SignupPage } from "./signup.page";

const routes:Route[] = [
    {path: '', component:SignupPage}
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class SignupRoutingModule{}