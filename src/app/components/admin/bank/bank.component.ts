import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal' | 'transfer';
  description: string;
  amount: number;
  date: Date;
  balance: number;
}

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
  accountNumber: string;
}

@Component({
    selector: 'app-bank',
    imports: [CommonModule, FormsModule],
    templateUrl: './bank.component.html',
    styleUrl: './bank.component.scss'
})
export class BankComponent implements OnInit {
  userName: string = '';
  currentDate: Date = new Date();
  
  accounts: Account[] = [
    {
      id: '1',
      name: 'Cuenta de Ahorros',
      type: 'savings',
      balance: 25750.50,
      currency: 'USD',
      accountNumber: '****4521'
    },
    {
      id: '2',
      name: 'Cuenta Corriente',
      type: 'checking',
      balance: 8320.75,
      currency: 'USD',
      accountNumber: '****7832'
    },
    {
      id: '3',
      name: 'Cuenta de Inversiones',
      type: 'investment',
      balance: 45000.00,
      currency: 'USD',
      accountNumber: '****9156'
    }
  ];

  transactions: Transaction[] = [
    {
      id: 1,
      type: 'deposit',
      description: 'Deposito de nomina',
      amount: 3500.00,
      date: new Date('2026-01-15'),
      balance: 25750.50
    },
    {
      id: 2,
      type: 'withdrawal',
      description: 'Retiro en cajero',
      amount: -200.00,
      date: new Date('2026-01-14'),
      balance: 22250.50
    },
    {
      id: 3,
      type: 'transfer',
      description: 'Transferencia a Maria Garcia',
      amount: -500.00,
      date: new Date('2026-01-13'),
      balance: 22450.50
    },
    {
      id: 4,
      type: 'deposit',
      description: 'Reembolso de compra',
      amount: 150.00,
      date: new Date('2026-01-12'),
      balance: 22950.50
    },
    {
      id: 5,
      type: 'withdrawal',
      description: 'Pago de servicios',
      amount: -350.00,
      date: new Date('2026-01-11'),
      balance: 22800.50
    }
  ];

  selectedAccount: Account | null = null;
  transferAmount: number = 0;
  transferRecipient: string = '';
  transferDescription: string = '';
  showTransferModal: boolean = false;
  showSuccessAlert: boolean = false;
  alertMessage: string = '';

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    if (this._authService.userData) {
      this.userName = this._authService.userData.name || this._authService.userData.username || 'Usuario';
    } else {
      this.userName = 'Eduardo';
    }
    this.selectedAccount = this.accounts[0];
  }

  get totalBalance(): number {
    return this.accounts.reduce((sum, acc) => sum + acc.balance, 0);
  }

  selectAccount(account: Account): void {
    this.selectedAccount = account;
  }

  openTransferModal(): void {
    this.showTransferModal = true;
    this.transferAmount = 0;
    this.transferRecipient = '';
    this.transferDescription = '';
  }

  closeTransferModal(): void {
    this.showTransferModal = false;
  }

  executeTransfer(): void {
    if (!this.selectedAccount || this.transferAmount <= 0 || !this.transferRecipient) {
      return;
    }

    if (this.transferAmount > this.selectedAccount.balance) {
      this.showAlert('Fondos insuficientes para realizar la transferencia');
      return;
    }

    const newTransaction: Transaction = {
      id: this.transactions.length + 1,
      type: 'transfer',
      description: `Transferencia a ${this.transferRecipient}${this.transferDescription ? ' - ' + this.transferDescription : ''}`,
      amount: -this.transferAmount,
      date: new Date(),
      balance: this.selectedAccount.balance - this.transferAmount
    };

    this.selectedAccount.balance -= this.transferAmount;
    this.transactions.unshift(newTransaction);
    this.closeTransferModal();
    this.showAlert(`Transferencia de $${this.transferAmount.toFixed(2)} realizada exitosamente`);
  }

  makeDeposit(): void {
    if (!this.selectedAccount) return;
    
    const depositAmount = 500;
    const newTransaction: Transaction = {
      id: this.transactions.length + 1,
      type: 'deposit',
      description: 'Deposito rapido',
      amount: depositAmount,
      date: new Date(),
      balance: this.selectedAccount.balance + depositAmount
    };

    this.selectedAccount.balance += depositAmount;
    this.transactions.unshift(newTransaction);
    this.showAlert(`Deposito de $${depositAmount.toFixed(2)} realizado exitosamente`);
  }

  showAlert(message: string): void {
    this.alertMessage = message;
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 3000);
  }

  getTransactionIcon(type: string): string {
    switch (type) {
      case 'deposit': return 'bi-arrow-down-circle-fill';
      case 'withdrawal': return 'bi-arrow-up-circle-fill';
      case 'transfer': return 'bi-arrow-left-right';
      default: return 'bi-circle';
    }
  }

  getTransactionColor(type: string): string {
    switch (type) {
      case 'deposit': return 'text-success';
      case 'withdrawal': return 'text-danger';
      case 'transfer': return 'text-primary';
      default: return 'text-secondary';
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }
}
