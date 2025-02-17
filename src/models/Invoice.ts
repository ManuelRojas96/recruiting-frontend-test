export interface Invoice {
    id: string;
    amount: Number;
    organization_id: string;
    currency: string;
    type: string;
    reference: string | undefined;
}
