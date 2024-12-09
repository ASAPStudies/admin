export interface TransferReceipt {
    type: 'mobile_money'; // Corrected spelling
    name: string;
    account_number: string;
    bank_code: string ; // Use an enum or type alias for better scalability
    currency: string; // Use an enum or type alias for better scalability
}

export interface TransferRecieptReturnType {
    status:boolean,
    message:"string",
    data:Record<string, any>
}

export interface TransferInterface {
    event: string;
    data: Record<string, any>;
    reason: string;
    reference: string;
    status: string;
    transfer_code: string;
    recipient: Record<string, any>;
}

export interface TransferResponse {
  status: boolean;
  message: string;
  data: TransferData;
}

interface TransferData {
  amount: number;
  createdAt: string; // ISO date string
  currency: string;
  domain: string;
  failures: null | any; // Adjust type if you have specific structure for failures
  id: number;
  integration: number;
  reason: string;
  reference: string;
  source: string;
  source_details: null | any; // Adjust type if you have specific structure for source details
  status: string;
  titan_code: null | any; // Adjust type if you have specific structure for titan code
  transfer_code: string;
  request: number;
  transferred_at: null | string; // ISO date string or null
  updatedAt: string; // ISO date string
  recipient: Recipient;
  session: Session;
  fee_charged: number;
  fees_breakdown: null | any; // Adjust type if you have specific structure for fees breakdown
  gateway_response: null | any; // Adjust type if you have specific structure for gateway response
}

interface Recipient {
  active: boolean;
  createdAt: string; // ISO date string
  currency: string;
  description: null | string; // Could be a string or null
  domain: string;
  email: string;
  id: number;
  integration: number;
  metadata: RecipientMetadata;
  name: string;
  recipient_code: string;
  type: string; // e.g., "nuban"
  updatedAt: string; // ISO date string
  is_deleted: boolean;
  isDeleted: boolean; // Redundant, consider using only one of these
  details: RecipientDetails;
}

interface RecipientMetadata {
  custom_fields: CustomField[];
}

interface CustomField {
  display_name: string;
  variable_name: string;
  value: string; // Assuming all values are strings
}

interface RecipientDetails {
  authorization_code: null | any; // Adjust type if you have specific structure for authorization code
  account_number: string;
  account_name: string;
  bank_code: string;
  bank_name: string;
}

interface Session {
  provider: null | any; // Adjust type if you have specific structure for provider
  id: null | any; // Adjust type if you have specific structure for session id
}

export enum NETWORK {
    MTN = "MTN",
    VODA = "VOD",
    ARTEL_TIGO = "ATL"
}