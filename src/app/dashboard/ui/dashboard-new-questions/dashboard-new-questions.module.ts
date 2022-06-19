import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DashboardNewQuestionsComponent } from "./dashboard-new-questions.component";

@NgModule({
    declarations: [DashboardNewQuestionsComponent],
    imports: [CommonModule],
    exports: [DashboardNewQuestionsComponent]
})
export class DashboardNewQuestionsModule {}