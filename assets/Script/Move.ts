const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  leftBtn: cc.Node;

  @property(cc.Node)
  rightBtn: cc.Node;

  @property(cc.Node)
  moveTarget: cc.Node;

  @property(cc.Node)
  bigTarger: cc.Node;

  leftState: boolean;

  rightState: boolean;

  onLoad() {
    //防抖
    this.leftState = true;

    this.rightState = true;

    this.leftBtn.on(
      "touchend",
      () => {
        this.move("left");
      },
      this
    );
    this.rightBtn.on(
      "touchend",
      () => {
        this.move("right");
      },
      this
    );
  }

  getPlayerDistance() {
    // 根据 moveTarget 节点位置判断距离
    let moveTarget: cc.Vec3 = this.moveTarget.position;
    // 根据两点位置计算两点之间距离
    let dist = this.bigTarger.position.sub(moveTarget).mag();
    return dist;
  }

  move(direction: string) {
    if (direction === "left" && this.leftState) {
      this.leftState = false;
      cc.tween(this.moveTarget)
        .by(0.3, { position: cc.v3(-50, 0, 0), rotation: -360 })
        .call(() => {
          this.leftState = true;
        })
        .start();
    } else if (direction === "right" && this.rightState) {
      this.rightState = false;
      cc.tween(this.moveTarget)
        .by(0.3, { position: cc.v3(50, 0, 0), rotation: 360 })
        .call(() => {
          this.rightState = true;
        })
        .start();
    }
  }
}
