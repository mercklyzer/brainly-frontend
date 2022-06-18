import { Component, EventEmitter, Output } from "@angular/core";
@Component({
    selector: 'dashboard-sidebar-header',
    template: `
        <div class="subjects-header">
            Subjects
            <img src="../../assets/images/x.png" class="x" (click)="handleCloseMenu()">
        </div>
    `,
    styles: [
        `
        .subjects-header{
            position: relative;
            z-index: 999;
            padding: 10px 10px 16px 10px;
            border-bottom: 2px solid #EBF2F7;
            font-weight: 500;
            font-size: 16px;
            line-height: 16px;
            width: 100%;
            display: flex;
            justify-content:space-between;
            align-items:center;
        }

        .x{
            cursor: pointer;
            display: none;
            width: 25px;
            height: 25px;
        }

        @media screen and (max-width: 992px){
            .x{
                display:block;
            }
        }

        @media screen and (max-width: 425px){
            .x{
                width: 18px;
                height: 18px;
            }
        }
        `
    ]
})
export class DashboardSidebarHeaderComponent {
    @Output() onCloseMenu:EventEmitter<null> = new EventEmitter<null>();

    handleCloseMenu(){
        this.onCloseMenu.emit();
    }

}