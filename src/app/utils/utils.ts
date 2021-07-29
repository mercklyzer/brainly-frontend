import * as moment from 'moment'

export const utils = {
    relativeDate : (time:number):string => {
        return moment(time).fromNow()
    },
    
    titleCase : (param:string):string => {
        return param.split('-').map((word) => word[0].toUpperCase() + word.substr(1).toLowerCase()).join(' ')
    }
}
