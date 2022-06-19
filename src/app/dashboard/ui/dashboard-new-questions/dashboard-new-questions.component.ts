import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'dashboard-new-questions',
    template: `
        <button *ngIf="newQuestionsLength !== 0" class="btn new-questions-btn" (click)="handleNewQuestions()">
            New Questions
        </button>
    `,
    styles: [
        `
        .new-questions-btn{
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translate(-50%,0);
            background-color: #4FB3F6;
            color: white;
            border-radius: 20px;
        }
        
        .new-questions-btn:hover{
            background-color: #1091e7;
        }
        `
    ]
})
export class DashboardNewQuestionsComponent {
    @Input() newQuestionsLength!:number;
    @Output() onNewQuestions:EventEmitter<null> = new EventEmitter<null>();

    handleNewQuestions():void{
        this.onNewQuestions.emit();
    }
}