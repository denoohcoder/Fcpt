export type PageStep = 1 | 2 | 3 | 4 | 5;

export interface LoanState {
  amount: number;
  periodMonths: number;
  interestRate: number; // 5% per year
  currency: 'USD' | 'ZiG';
  
  fullName: string;
  nationalId: string;
  phoneNumber: string;
  email: string;
  loanPurpose: string;
  monthlyIncome: number;
  hasExistingLoans: boolean;
  
  loginMobile: string;
  otpCode: string;
  referenceCode: string;
  
  applicationId: string;
  approvalDate: string;
  disbursementAccount: string;
  disbursementStatus: 'pending' | 'processing' | 'disbursed';
}
