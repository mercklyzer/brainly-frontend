import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Question } from "src/app/models/question.model";
import { User } from "src/app/models/user.model";

@Component({
    selector: 'dashboard-question',
    templateUrl: './dashboard-question.component.html',
    styleUrls: ['./dashboard-question.component.css']
})
export class DashboardQuestionComponent {
    @Input() question!:Question;
    @Input() watchers?:User[]
}