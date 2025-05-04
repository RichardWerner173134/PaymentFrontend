export interface InternalShortBills {
    calculationTime: Date;
    bills: InternalShortBill[];
}

export interface InternalShortBillsForUser {
    calculationTime: Date;
    bills: InternalShortBill[];
    /** balance of the user over all bills. Positive -> you get money back. Negative -> you have to pay a lot */
    balance: number;
}

export interface InternalShortBill {
    /** receiver of the money issued with this bill */
    issuedBy: string;
    /** receiver of the money issued with this bill */
    issuedFor: string;
    /** amount of money that needs to be transfered to the receiver of the bill */
    amount: number;
}