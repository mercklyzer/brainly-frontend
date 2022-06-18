import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboardQuestionsComponent } from "./dashboard-questions.component";

@NgModule({
    declarations: [
        DashboardQuestionsComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        DashboardQuestionsComponent
    ]
})
export class DashboardQuestionsModule {}