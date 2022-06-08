import { Component } from "@angular/core";

@Component({
    selector: 'tagline',
    template: `
        <span class="caption">
            <ng-content></ng-content>
        </span>
    `,
    styles: [
        `:host{
            padding: 20px 40px;
            display: flex;
        }`,
        
        `.caption{
            color: #B9E2FE;
            font-family: 'Montserrat', sans-serif;
            font-weight: 800;
            font-size: 60px;
            line-height: 60px;
        }`,

        `@media screen and (max-width: 500px) {
            :host{
                padding: 20px 20px;
            }

            .caption-container{
                padding: 20px 20px;
            }
        
            .caption{
                font-size: 40px;
                line-height: 40px;
            }
        }`
    ]
})
export class TaglineComponent {}