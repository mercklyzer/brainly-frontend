import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { DashboardQuestionsComponent } from "./dashboard-questions.component";

@NgModule({
    declarations: [
        DashboardQuestionsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgxSkeletonLoaderModule
    ],
    exports: [
        DashboardQuestionsComponent
    ]
})
export class DashboardQuestionsModule {}