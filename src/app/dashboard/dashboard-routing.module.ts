import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { UserLoginGuardService } from "../user-login-guard.service";
import { DashboardPage } from "./dashboard.page";

const routes:Route[] = [
    {path: '', redirectTo: 'questions/all'},
    {path: 'questions/:subject', component: DashboardPage},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}