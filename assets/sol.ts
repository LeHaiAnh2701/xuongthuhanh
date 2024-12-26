// import { _decorator, Component, Node, Label } from 'cc';
// import { Connection, PublicKey, Transaction, SystemProgram, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
// import { Buffer } from 'buffer';
// import process from 'process';

// const { ccclass, property } = _decorator;

// declare var global: any;

// @ccclass('sol')
// export class sol extends Component {
//     @property({ type: Label })
//     scoreLabel: Label = null!;

//     private _score: number = 0;

//     // Kết nối với Solana Testnet
//     private connection = new Connection('https://api.testnet.solana.com', 'confirmed');
    
//     // Khởi tạo Keypair người gửi (ví của người chơi)
//     private senderKeypair = Keypair.generate();
    
//     // Địa chỉ ví người nhận
//     private recipientPublicKey = new PublicKey('Etjtkb49LNyTe6DJeEEcCxdUkhE4vZNUK3fUnkCNDoTr'); // Địa chỉ ví Phantom của người nhận

//     start() {
//         // Gắn polyfill cho Buffer và process
//         if (typeof global !== 'undefined') {
//             global.Buffer = Buffer;
//             global.process = process;
//         } else {
//             (window as any).Buffer = Buffer;
//             (window as any).process = process;
//         }

//         // Giả sử điểm khởi đầu của người chơi là 5000
//         this._score = 0;
//         this.scoreLabel.string = `Điểm: ${this._score}`;
//     }

//     // Hàm chuyển đổi điểm thành SOL
//     private convertPointsToSOL(points: number): number {
//         const solPerPoint = 0.0001; // Tỉ lệ 1 điểm = 0.0001 SOL
//         return points * solPerPoint; // Tính số lượng SOL từ điểm
//     }

//     // Hàm gửi SOL
//     private async sendSol(): Promise<void> {
//         if (this._score >= 10) {  // Kiểm tra nếu người chơi có ít nhất 10 điểm
//             try {
//                 // Chuyển điểm thành SOL
//                 const solAmount = this.convertPointsToSOL(this._score);

//                 // Tạo giao dịch chuyển SOL
//                 const transaction = new Transaction().add(
//                     SystemProgram.transfer({
//                         fromPubkey: this.senderKeypair.publicKey,
//                         toPubkey: this.recipientPublicKey,
//                         lamports: solAmount * LAMPORTS_PER_SOL, // Chuyển SOL thành lamports
//                     })
//                 );

//                 // Gửi giao dịch
//                 const signature = await this.connection.sendTransaction(transaction, [this.senderKeypair]);
//                 await this.connection.confirmTransaction(signature, 'confirmed');
//                 console.log('Transaction successful:', signature);

//                 // Cập nhật điểm sau khi gửi
//                 this._score -= 10; // Giảm điểm theo một số lượng nhất định
//                 this.scoreLabel.string = `Điểm: ${this._score}`;
//             } catch (error) {
//                 console.error('Error sending SOL:', error);
//             }
//         } else {
//             console.log("Không đủ điểm để quy đổi.");
//         }
//     }

//     // Hàm gọi khi người chơi nhấn nút chuyển đổi điểm
//     public onConvertButtonClicked() {
//         this.sendSol();
//     }
// }
// declare global {
//     interface SolanaProvider {
//         isPhantom: boolean;
//         disconnect: () => Promise<void>;
//         signTransaction?: (transaction: Transaction) => Promise<Transaction>;
//         signAllTransactions?: (transactions: Transaction[]) => Promise<Transaction[]>;
//         sendTransaction: (
//             transaction: Transaction,
//             connection: Connection,
//             options?: { skipPreflight?: boolean; preflightCommitment?: string }
//         ) => Promise<string>;
//         connect: () => Promise<void>; // Thêm phương thức connect
//         publicKey?: PublicKey;       // Thêm thuộc tính publicKey
//     }

//     interface Window {
//         solana?: SolanaProvider;
//     }
// }