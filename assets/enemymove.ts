import { _decorator, Component, Vec3, UITransform, Node,EventTouch } from 'cc';
import { SpawnManager } from './spamenemy';
const { ccclass, property } = _decorator;

@ccclass('EnemyMovement') 
export class EnemyMovement extends Component {

    @property
    moveSpeed: number = 50; // Tốc độ di chuyển của quái

    @property({ type: Node })
    background: Node = null!; // Node background để giới hạn di chuyển

    private direction: Vec3 = new Vec3(1, 1, 0); // Hướng di chuyển ban đầu
    private spawnManager: Node = null!; // Tham chiếu tới Node quản lý Spawn
    private minX: number = 0;
    private maxX: number = 0;
    private minY: number = 0;
    private maxY: number = 0;
    private isGamePaused: boolean = false;

    start() {
        // Lấy kích thước của vùng "tường thành" theo tọa độ
        // Dựa vào hình, điều chỉnh các giới hạn thủ công
        this.minX = -500; // Giới hạn bên trái tường thành
        this.maxX = 500;  // Giới hạn bên phải tường thành
        this.minY = -250; // Giới hạn dưới tường thành
        this.maxY = 250;  // Giới hạn trên tường thành

        // Đặt hướng di chuyển ngẫu nhiên
        this.direction.x = Math.random() > 0.5 ? 1 : -1;
        this.direction.y = Math.random() > 0.5 ? 1 : -1;
    }

    update(deltaTime: number) {
        if (!this.spawnManager) return;
    
        // Ép kiểu SpawnManager
        const spawnManager = this.spawnManager.getComponent('SpawnManager') as SpawnManager;
    
        // Kiểm tra nếu spawnManager tồn tại và game đang chạy
       
    
        const pos = this.node.getPosition();
    
        // Cập nhật vị trí
        pos.x += this.direction.x * this.moveSpeed * deltaTime;
        pos.y += this.direction.y * this.moveSpeed * deltaTime;
    
        // Đổi hướng khi chạm biên
        if (pos.x > this.maxX || pos.x < this.minX) {
            this.direction.x *= -1;
        }
        if (pos.y > this.maxY || pos.y < this.minY) {
            this.direction.y *= -1;
        }
    
        this.node.setPosition(pos);
    }
    
    onLoad() {
        this.node.on(Node.EventType.TOUCH_END, this.onEnemyClicked, this);
    }

    onEnemyClicked(event: EventTouch) {
        
        console.log("Quái bị click!");
        if (this.spawnManager) {
            this.spawnManager.emit("enemy-clicked");
        } else {
            console.error("SpawnManager is not set.");
        }
        this.node.destroy();
    }

    setSpawnManager(manager: Node) {
        this.spawnManager = manager;
        console.log("SpawnManager đã được nhận:", manager);
    }
  
} 