import { Component, HostListener} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Question } from "../models/question.model";
import { User } from "../models/user.model";
import { QuestionService } from "../services/question.service";
import { relativeDate, titleCase } from "../utils/utils";


@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.css']
})
export class DashboardPage {
    constructor(
        private route:ActivatedRoute
    ){}

    subject$ = this.route.params.pipe(
        map(params => params['subject'])
    )


}