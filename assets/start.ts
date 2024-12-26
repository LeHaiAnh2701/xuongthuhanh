import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('start')
export class start extends Component {
    @property({ type: Node })
    gameScene: Node = null!; // Node chứa các phần của game (ẩn ban đầu)

    start() {
        // Ban đầu ẩn toàn bộ game
        if (this.gameScene) {
            this.gameScene.active = false;
        }
    }

    onStartButtonClick() {
        console.log("Game bắt đầu!");
        // Hiển thị game khi nhấn nút Bắt Đầu
        if (this.gameScene) {
            this.gameScene.active = true;
        }
    }
}


