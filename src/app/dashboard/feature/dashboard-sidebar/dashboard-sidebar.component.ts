import { Component, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { titleCase } from "src/app/utils/utils";
import { Subject } from "../../data-access/subject.model";
import { subjects } from "../../data-access/subjects.data";

@Component({
    selector: 'dashboard-sidebar',
    templateUrl: './dashboard-sidebar.component.html',
    styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent{
    helper = {
        titleCase: titleCase
      }
    
    @Input() subject!:string

    subjects:Subject[] = subjects
    routeObserver:any

    constructor(
        private route: ActivatedRoute
    ) { }

}