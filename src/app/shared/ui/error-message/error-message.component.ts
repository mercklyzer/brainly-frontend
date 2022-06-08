import { Component, Input } from "@angular/core";

@Component({
    selector: 'error-message',
    template: `
    <div class="alert alert-danger" role="alert">
        {{errorMessage}}
    </div>
    `
})
export class ErrorMessageComponent {
    @Input() errorMessage!:string
}