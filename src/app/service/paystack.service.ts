import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { TransferInterface, TransferReceipt, TransferRecieptReturnType, TransferResponse } from '../pages/dashboard/admin-paystack/paystact.interface';
import { generateTransFerRecieptObj } from '../pages/dashboard/admin-paystack/paystact.helper';
import { SharedService } from './shared.service';

const BASE_URL = 'https://api.paystack.co/';
@Injectable({
    providedIn: 'root',
})
export class PaystackService {
    payment_key:any;
    SECRET_KEY!:string;
    constructor(private api: ApiService, private shared:SharedService) {
        this.loadKey()
    }

    async loadKey(){
        this.payment_key = await this.shared.getPaymentKeys()
        this.SECRET_KEY = this.payment_key?.live_secretkey;
    }

    createRecieptRequest(name: string, phone: string): Observable<TransferRecieptReturnType> | any {
       
        return this.api.postRequest(BASE_URL + 'transferrecipient', generateTransFerRecieptObj(name, phone), this.SECRET_KEY);
    }
    initaitePaymentInBulk(data: any): Observable<TransferInterface>|any {
        
        return this.api.postRequest(
            BASE_URL + 'transfer/bulk',
            {
                currency: 'GHS',
                source: 'balance',
                transfers: data,
            },
            this.SECRET_KEY
        );
    }

    checkPayStackBalance(): Observable<any> {
        return this.api.getRequest(BASE_URL + 'balance', this.SECRET_KEY)
    }

    verifyTransfer(ref: string): Observable<TransferResponse> {
        return this.api.getRequest(`${BASE_URL}transfer/verify/${ref}`, this.SECRET_KEY);
    }

    getAllTransactions(): Observable<TransferResponse> {
        return this.api.getRequest(BASE_URL + 'transfer', this.SECRET_KEY);
    }
}
