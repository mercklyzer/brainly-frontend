import { NgModule } from "@angular/core";
import { HomePageRoutingModule } from "./home-routing.module";
import { HomePage } from "./home.page";
import { HomeHeroComponent } from "./ui/home-hero.component";

@NgModule({
    declarations: [
        HomePage,
        HomeHeroComponent
    ],
    imports: [
        HomePageRoutingModule
    ]
})
export class HomeModule{}