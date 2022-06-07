import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { HomePage } from "./home.page";

const routes:Route[] = [
    {path: '', component:HomePage}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomePageRoutingModule {}