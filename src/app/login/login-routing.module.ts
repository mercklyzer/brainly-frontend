import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { LoginPage } from "./login.page";

const routes:Route[] = [
    {path: '', component: LoginPage}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule{}