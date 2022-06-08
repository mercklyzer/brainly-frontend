import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ErrorMessageModule } from "../shared/ui/error-message/error-message.module";
import { SignupPage } from "./signup.page";

const routes:Route[] = [
    {path: '', component:SignupPage}
]

@NgModule({
    imports:[
        RouterModule.forChild(routes),
        ErrorMessageModule
    ],
    exports:[
        RouterModule
    ]
})
export class SignupRoutingModule{}