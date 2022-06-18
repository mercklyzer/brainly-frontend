import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'subjectTitlecase'
})
export class SubjectTitlecasePipe implements PipeTransform{
    transform(value: string) {
        return value.split('-').map((word) => word[0].toUpperCase() + word.substr(1).toLowerCase()).join(' ')
    }
}