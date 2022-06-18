import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
    name: 'relativeDate'
})
export class RelativeDatePipe implements PipeTransform{
    transform(time: number) {
        return moment(time).fromNow()
    }
}