import { Component, HostListener} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, tap } from "rxjs/operators";

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
        map(params => params['subject']),
        tap(() => this.handleCloseMenu()),
    )

    showMenu:boolean = false;

    handleCloseMenu():void{
        this.showMenu = false;
        document.body.classList.remove('unscrollable');
    }

    handleOpenMenu():void{
        this.showMenu = true;
        document.body.classList.add('unscrollable');
    }

}