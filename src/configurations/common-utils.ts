import { Injectable, inject } from '@angular/core'
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CommonUtils {
  datePipe = inject(DatePipe);
  constructor() {}
  public camelCaseToCapitalizedWords(inputString: string): string {
    const camelCaseRegex = /[a-z]+|[A-Z][a-z]*/g
    const words = inputString.match(camelCaseRegex) || []
    const capitalizedString = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return capitalizedString
  }

  public stringSplice(string:string, maxLength: number): string {
    if(string)
    return string.length>maxLength? string.slice(0,maxLength)+'...' :string
    else
    return '---'
  }

  public convertLabelToPath(inputString: string): string {
    const pathString = inputString.replace(/\s+/g, '-').toLowerCase();
    return pathString;
  }

  public formatDateToPatchWithDateInput(date: string): string {
    return new Date(date).toISOString().split("T")[0];
  }

  public formatDate(date: string): string {
    return this.datePipe.transform(new Date(date),'mediumDate')?.toString() ?? ''
  }

  public toString(data: number): string {
    return data.toString()
  }

  // public deepCopy(obj: any): any {
  //   // Use JSON.stringify to serialize the object, then JSON.parse to create a deep copy
  //   return JSON.parse(JSON.stringify(obj));
  // }
  public deepCopy<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.deepCopy(item)) as T;
    }

    const newObj: Record<string, any> = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = this.deepCopy(obj[key]);
      }
    }

    return newObj as T;
  }

  public dashPlaceholder(inputString: string | undefined, showDashesAsPlaceholder:boolean = true): string {
    if((!inputString || inputString == undefined) && showDashesAsPlaceholder) return '---';
    return inputString as string;
  }

  public static makeFirebaseMessageReadable(error: any,type:string=''): string {
    let message: string = error
    if (error && error?.message) {
      message = error.message.toString().replace('Firebase:', '')

      if (message.includes('user-not-found'))
        message =
          'No user exist with this email address! Try again with register email.'
      if (message.includes('wrong-password') || message.includes('auth/invalid-credential'))
        message = 'Invalid credentials! Try again with valid credentials.'
      if (message.includes('email-already-in-use'))
        message =
          'Account already exist against this email! Try with other email.'
      if (message.includes('invalid-action-code') && type == 'email')
        message =
          'Your verification link is expire! Or the code is provided in the link is invalid. Please verify the link and try again. Thanks'
      if (message.includes('invalid-action-code')&& type == 'pass')
        message =
          'Sorry! Your provided code in the link is invalid. Please verify the link and try again. Thanks'
    }
    return message
  }
}
