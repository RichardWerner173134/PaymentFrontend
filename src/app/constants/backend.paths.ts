export const url: string = 'https://rw-payment-backend.azurewebsites.net/api';

// users
export const pathUsers: string = url + '/users';

// payment context
export const pathPaymentContext = url + '/paymentContexts';

export const pathPaymentContextById = (paymentContext: number): string => {
  return pathPaymentContext + '/' + paymentContext;
};

// payments
export const pathPayments = (selectedPaymentContext: number): string => {
  return pathPaymentContextById(selectedPaymentContext) + '/payments';
};

export const pathPaymentById = (
  selectedPaymentContext: number,
  paymentId: number
): string => {
  return pathPayments(selectedPaymentContext) + '/' + paymentId;
};

export const pathPaymentsForCreditor = (
  selectedPaymentContext: number,
  creditorUsername: string
): string => {
  return (
    pathPaymentContextById(selectedPaymentContext) +
    '/payments-for-creditor/' +
    creditorUsername
  );
};

export const pathPaymentsForDebitor = (
  selectedPaymentContext: number,
  debitorUsername: string
): string => {
  return (
    pathPaymentContextById(selectedPaymentContext) +
    '/payments-for-debitor' +
    debitorUsername
  );
};

export const pathPaymentsForAuthor = (
  selectedPaymentContext: number,
  authorUsername: string
): string => {
  return (
    pathPaymentContextById(selectedPaymentContext) +
    '/payments-for-author' +
    authorUsername
  );
};

export const pathPaymentOverviewForCreditor = (
  selectedPaymentContext: number,
  creditorUsername: string
): string => {
  return (
    pathPaymentContextById(selectedPaymentContext) +
    '/payment-overview-for-creditor/' +
    creditorUsername
  );
};

export const pathPaymentOverviewForDebitor = (
  selectedPaymentContext: number,
  debitorUsername: string
): string => {
  return (
    pathPaymentContextById(selectedPaymentContext) +
    '/payment-overview-for-debitor/' +
    debitorUsername
  );
};

// bills
export const pathBills = (selectedPaymentContext: number): string => {
  return pathPaymentContextById(selectedPaymentContext) + '/bills';
};

export const pathBillsForUser = (
  selectedPaymentContext: number,
  username: string
): string => {
  return pathBills(selectedPaymentContext) + '/all/users/' + username;
};

export const pathBillOverviews = (selectedPaymentContext: number): string => {
  return pathPaymentContextById(selectedPaymentContext) + '/bill-overviews';
};

export const pathBillOverviewsForUser = (
  selectedPaymentContext: number,
  username: string
): string => {
  return pathBillOverviews(selectedPaymentContext) + '/all/users/' + username;
};

// hostkey
export const hostKey: string = '';
