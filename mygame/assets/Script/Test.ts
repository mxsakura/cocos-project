const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  image: cc.Node = null;

  onLoad() {
    this.image.on('touchend',this.onClick,this)
  }

  onClick() {
    let h = 300;
    cc.tween(this.image)
      .by(0.5, { position: cc.v3(0, -h, 0) }, { easing: "quardIn" }) //加速 下降
      .by(0.2, { position: cc.v3(0, h / 6, 0) }, { easing: "quardOut" }) //反弹 减速上升
      .by(0.2, { position: cc.v3(0, -h / 6, 0) }, { easing: "quardIn" }) // 再下降
      .start();
  }

  // update (dt) {}
}
