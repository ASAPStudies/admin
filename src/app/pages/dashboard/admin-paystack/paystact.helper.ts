import { TransferReceipt, TransferRecieptReturnType } from "./paystact.interface";

export function convertToLocalNumber(phoneNumber: string) {
    // Trim and remove spaces, parentheses
    phoneNumber = phoneNumber.trim().replace(/\s|\(|\)/g, '');
        if (phoneNumber.startsWith('+2330')) {
            phoneNumber = phoneNumber.slice(4, phoneNumber.length)
        }
            // Check if the number starts with '+233' or '233'
        else if (phoneNumber.startsWith('+233')) {
            return '0' + phoneNumber.slice(4);
            
        } 
        else if (phoneNumber.startsWith('233')) {
            return '0' + phoneNumber.slice(3);
        } else if (phoneNumber.startsWith('0')) {
            // If it already starts with '0', just return as-is
            return phoneNumber;
        } else {
            return '0' + phoneNumber; // Fallback to assuming it's a local number
        }

        return phoneNumber;
    
}

export function findNetwork(phoneNumber: string): string {
    // Remove any non-digit characters
    const sanitizedNumber = phoneNumber.replace(/\D/g, '');

    // Convert to local format if it starts with country code +233
    let localNumber = sanitizedNumber;
    if (sanitizedNumber.startsWith('233') && sanitizedNumber.length > 3) {
        localNumber = '0' + sanitizedNumber.substring(3);
    }

    // Check the length of the number
    if (localNumber.length < 10) {
        return 'Invalid phone number';
    }

    // Extract the prefix (first few digits)
    const prefix = localNumber.substring(0, 3);

    // Determine the network based on the prefix
    switch (prefix) {
        case '024': // MTN prefix example
        case '054':
        case '053':
        case '055':
        case '059':
            return 'MTN';
        case '020': // Vodafone prefix example
        case '050':
            return 'VOD';
        case '027': // AirtelTigo prefix example
        case '026':
            return 'ATL';
        default:
            return 'NON';
    }
}


export function generateTransFerRecieptObj(name:string, phone:string){
  
    let obj:TransferReceipt = {
        name:name,
        type:'mobile_money',
        currency:"GHS",
        account_number:convertToLocalNumber(phone),
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