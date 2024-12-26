import { _decorator, Component, Prefab, instantiate, Node, Label, Vec3, randomRangeInt } from 'cc';
import { EnemyMovement } from './enemymove'; 
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
const { ccclass, property } = _decorator;

@ccclass('SpawnManager')
export class SpawnManager extends Component {

    @property({ type: Prefab })
    enemyPrefab: Prefab = null!;

    @property({ type: Node })
    spawnArea: Node = null!;

    @property({ type: Label })
    scoreLabel: Label = null!;

    @property({ type: Label })
    timeLabel: Label = null!;

    @property({ type: Label })
    gameOverLabel: Label = null!;

    @property({ type: Node })
    convertButton: Node = null!;

   
  

   
    private _score: number = 0;
    private _timeLeft: number = 31; 
    private _isGameRunning: boolean = true; // Trạng thái của game
    
    
    isGameRunning(): boolean {
        return this._isGameRunning; // Trả về trạng thái hiện tại của game
    }
    start() {
        this._score = 0;
        this.updateScore();

        // Gọi hàm spawn quái lần đầu
        this.spawnEnemy();

        // Lắng nghe sự kiện khi quái bị click
        this.node.on("enemy-clicked", this.onEnemyClicked, this);
        // Đếm thời gian
        this.schedule(this.countdown, 1);
        
    
    }
      
   
    spawnEnemy() {
        const enemy = instantiate(this.enemyPrefab);
    
        // Thiết lập vị trí ngẫu nhiên trong vùng giới hạn
        const randomX = randomRangeInt(-500, 500);
        const randomY = randomRangeInt(-250, 250);
        enemy.setPosition(new Vec3(randomX, randomY, 0));
    
        // Gán quái vào vùng spawnArea
        enemy.setParent(this.spawnArea);
    
        // Gọi setSpawnManager và truyền tham chiếu đúng
        const enemyMovement = enemy.getComponent(EnemyMovement);
        if (enemyMovement) {
            enemyMovement.setSpawnManager(this.node); // Truyền tham chiếu của SpawnManager
            console.log("SpawnManager đã được gán cho quái!");
        } else {
            console.error("EnemyMovement component is missing on the prefab!");
        }
    }
    countdown() {
        if (!this._isGameRunning) return; // Không đếm thời gian nếu game đã dừng
        this._timeLeft -= 1;
        this.updateTime();

        if (this._timeLeft <= 0) {
            this.endGame(); // Kết thúc game khi hết thời gian
        }
    }
    updateTime() {
        if (this.timeLabel) {
            this.timeLabel.string = `Time: ${this._timeLeft}s`;
        } else {
            console.error("TimeLabel is not set.");
        }
    }
    endGame() {
        this._isGameRunning = false; // Dừng trò chơi
        this.unschedule(this.countdown); // Dừng đếm giờ
        this.spawnArea.removeAllChildren(); // Xóa tất cả quái vật còn lại

        // Hiển thị thông báo kết thúc
        if (this.gameOverLabel) {
            this.gameOverLabel.string = `Game Over! Final Score: ${this._score}`;
            this.gameOverLabel.node.active = true;
        }

        // Hiển thị nút convert
        if (this.convertButton) {
            this.convertButton.active = true;
        }
    }


    onEnemyClicked() {
        this._score += 10; // Cộng điểm khi click vào quái
        this.updateScore();
        this.spawnEnemy(); // Spawn quái mới
    }

    updateScore() {
        if (this.scoreLabel) {
            this.scoreLabel.string = `Score: ${this._score}`;

        } else {
            console.error("ScoreLabel is not set.");
        }
    }
   
    
} 

    
