import { TransferReceipt, TransferRecieptReturnType } from "./paystact.interface";

export function findNetwork(phoneNumber: string): string {
    // Remove any non-digit characters
    const sanitizedNumber = phoneNumber.replace(/\D/g, '');

    // Check the length of the number
    if (sanitizedNumber.length < 10) {
        return 'Invalid phone number';
    }

    // Extract the prefix (first few digits)
    const prefix = sanitizedNumber.substring(0, 3);

    // Determine the network based on the prefix
    switch (prefix) {
        case '024': // MTN prefix example
        case '054':
        case '055':
        case 'O59':
            return 'MTN';
        case '020': // Vodafone prefix example
        case '050':
            return 'VOD';
        case '027': // AirtelTigo prefix example
        case '026':
            return 'ATL';
        default:
            return 'Unknown network';
    }
}


export function generateTransFerRecieptObj(name:string, phone:string){
    
    let obj:TransferReceipt = {
        name:name,
        type:'mobile_money',
        currency:"GHS",
        account_number:phone,
        bank_code: findNetwork(phone)
    }

    return obj
}


export function createReadyReceipts(source:TransferRecieptReturnType[], amount:any){
    let destination:any[] = []
    for (let reciept of source ){
        let data = {
            source: 'balance',
            amount: amount * 100,
            reference: Math.random().toString(20).substring(2),
            recipient: reciept.data['recipient_code'],
            reason: 'Asap Stipends, thank you for your service',
        };
        destination.push(data)
    }
    return destination
}