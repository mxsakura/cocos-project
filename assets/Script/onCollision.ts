const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  // LIFE-CYCLE CALLBACKS:
  @property(cc.BoxCollider)
  other: cc.BoxCollider;

  @property(cc.BoxCollider)
  self: cc.BoxCollider;

  overState: boolean;

  start() {
    this.overState = false;
    // 开启碰撞检测系统，未开启时无法检测
    let manager = cc.director.getCollisionManager();
    manager.enabled = true;
    // manager.enabledDebugDraw = true;
    // manager.enabledDrawBoundingBox = true;

    this.onCollisionEnter(this.other, this.self);
  }

  /**
   * 当碰撞产生的时候调用
   * @param  {Collider} other 产生碰撞的另一个碰撞组件
   * @param  {Collider} self  产生碰撞的自身的碰撞组件
   */
  onCollisionEnter(other, self) {
    console.log("on collision enter");
    // alert("over");
    // 碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
    var world = self.world;

    // 碰撞组件的 aabb 碰撞框
    var aabb = world.aabb;

    // 节点碰撞前上一帧 aabb 碰撞框的位置
    var preAabb = world.preAabb;

    // 碰撞框的世界矩阵
    var t = world.transform;

    // 以下属性为圆形碰撞组件特有属性
    var r = world.radius;
    var p = world.position;

    // 以下属性为 矩形 和 多边形 碰撞组件特有属性
    var ps = world.points;
  }

  /**
   * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
   * @param  {Collider} other 产生碰撞的另一个碰撞组件
   * @param  {Collider} self  产生碰撞的自身的碰撞组件
   */
  onCollisionStay(other, self) {
    console.log("on collision stay");
    if (!this.overState) {
      alert("Game Over");
      this.overState = true;
    }
  }
  /**
   * 当碰撞结束后调用
   * @param  {Collider} other 产生碰撞的另一个碰撞组件
   * @param  {Collider} self  产生碰撞的自身的碰撞组件
   */
  onCollisionExit(other, self) {
    console.log("on collision exit");
    this.overState = false;
  }
}
