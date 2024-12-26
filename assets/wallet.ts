import { _decorator, Component, Node,Label } from 'cc';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

const { ccclass, property } = _decorator;

@ccclass('wallet')
export class wallet extends Component {
    private phantom: any;
      

    start() {
        // Kiểm tra xem Phantom Wallet có được cài đặt
        if (window.solana && window.solana.isPhantom) {
            this.phantom = window.solana;
            console.log("Phantom wallet detected!");
        } else {
            console.error("Phantom wallet not found. Please install Phantom.");
        }
    }
   

    async onConnectWallet() {
        try {
            // Kết nối với ví Phantom
            if (this.phantom) {
                const response = await this.phantom.connect();
                console.log('Connected to wallet:', response.publicKey.toString());
                alert(`Connected Wallet Address: ${response.publicKey.toString()}`);
          
            } else {
                console.error('Phantom wallet is not available.');
                alert('Phantom wallet is not installed!');
            }
        } catch (error) {
            console.error('Error connecting to wallet:', error);
            alert('Failed to connect wallet!');
        }

            
       
    }
 
}
declare global {
    interface SolanaProvider {
        isPhantom: boolean;
        disconnect: () => Promise<void>;
        signTransaction?: (transaction: Transaction) => Promise<Transaction>;
        signAllTransactions?: (transactions: Transaction[]) => Promise<Transaction[]>;
        sendTransaction: (
            transaction: Transaction,
            connection: Connection,
            options?: { skipPreflight?: boolean; preflightCommitment?: string }
        ) => Promise<string>;
        connect: () => Promise<void>; // Thêm phương thức connect
        publicKey?: PublicKey;       // Thêm thuộc tính publicKey
    }

    interface Window {
        solana?: SolanaProvider;
    }
}

