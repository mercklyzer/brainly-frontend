import { FormGroup } from '@angular/forms'
import * as moment from 'moment'
import { CookieService } from 'ngx-cookie'

export const relativeDate = (time:number):string =>  moment(time).fromNow()
    
export const titleCase = (param:string):string => param.split('-').map((word) => word[0].toUpperCase() + word.substr(1).toLowerCase()).join(' ')

export const getFormValidationErrors = (form: FormGroup) => {
    let hasError = false
    let errorMessages:string[] = []

    Object.keys(form.controls).forEach(key => {
      let controlErrors: any = form.get(key)?.errors;
      
      if (controlErrors != null) {
        hasError = true
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ' + controlErrors[keyError]);
        //   this.isError = true

          let field = getKeyString(key)
          let errorMessage = getErrorMessage(key,keyError)


          errorMessages.push(field + ' ' + errorMessage)
        });
      }
    });
    
    return errorMessages
  }


export const getKeyString = (key:string):string => {
  if(key === 'username')          return 'Username'
  if(key === 'usernameOrEmail')   return 'Username or email'
  if(key === 'email')             return 'Email'
  if(key === 'profilePicture')    return 'Profile picture'
  if(key === 'password')          return 'Password'
  if(key === 'birthday')          return 'Birthday'
  if(key === 'level')             return 'Level'
  if(key === 'question')          return 'Question'
  if(key === 'newQuestion')       return 'New question'
  if(key === 'answer')            return 'Answer'
  if(key === 'subject')           return 'Subject'
  if(key === 'rewardPoints')      return 'Reward points'

  return ''
}
  
export const getErrorMessage = (key:string, keyError:string):string => {
  if(keyError === 'required')   return 'is required.'
  if(keyError === 'minlength'){
    if(key === 'username'){
      return 'should be at least 6 characters.'
    }
    if(key === 'password'){
      return 'should be at least 8 characters.'
    }
  }
  if(keyError === 'maxlength'){
    if(key === 'username'){
      return 'should not exceed 16 characters.'
    }
  }
  if(keyError === 'email')    return 'has invalid format.'

  return ''
}

export const updateUserCurrentPtsCookie = (cookieService:CookieService, addPoints:number):void => {
  let user = JSON.parse(cookieService.get('User'))
  user.currentPoints += addPoints
  console.log(user);
  cookieService.put('User', JSON.stringify(user))
}