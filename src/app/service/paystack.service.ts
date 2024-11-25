import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { TransferInterface, TransferReceipt, TransferRecieptReturnType, TransferResponse } from '../pages/dashboard/admin-paystack/paystact.interface';
import { generateTransFerRecieptObj } from '../pages/dashboard/admin-paystack/paystact.helper';

const LIVE_KEY_SECRET = 'sk_live_2f6e549a0978bbbc9b2723b731e082f068ec744a';
const TSECRET_KEY = 'sk_test_40b208bb25f8ab9d385aeef7e42bff14052e7a35';
const SECRET_KEY = 'sk_live_2f6e549a0978bbbc9b2723b731e082f068ec744a';
const BASE_URL = 'https://api.paystack.co/';
@Injectable({
    providedIn: 'root',
})
export class PaystackService {
    constructor(private api: ApiService) {}
    createRecieptRequest(name: string, phone: string): Observable<TransferRecieptReturnType> {
        return this.api.postRequest(BASE_URL + 'transferrecipient', generateTransFerRecieptObj(name, phone), SECRET_KEY);
    }
    initaitePaymentInBulk(data: any): Observable<TransferInterface> {
        return this.api.postRequest(
            BASE_URL + 'transfer/bulk',
            {
                currency: 'GHS',
                source: 'balance',
                transfers: data,
            },
            SECRET_KEY
        );
    }

    checkPayStackBalance(): Observable<any> {
        return this.api.getRequest(BASE_URL + 'balance', SECRET_KEY);
    }

    verifyTransfer(ref: string): Observable<TransferResponse> {
        return this.api.getRequest(`${BASE_URL}transfer/verify/${ref}`, SECRET_KEY);
    }

    getAllTransactions(): Observable<TransferResponse> {
        return this.api.getRequest(BASE_URL + 'transfer', SECRET_KEY);
    }
}
