import { _decorator, Component, Node, RigidBody2D, Collider2D, UITransform, Vec2, Size, tween, Vec3, Tween, view, Rect, BoxCollider2D, v2, IPhysics2DContact, Contact2DType, find, random } from 'cc';
import { Extention } from './Extention';
const { ccclass, property } = _decorator;

@ccclass('NodeCustom')
export class NodeCustom extends Component {

    private uiTransform: UITransform;
    private rb: RigidBody2D;
    private col: BoxCollider2D;
    private width: number;
    private height: number;
    private direction: number = 1;
    private speed: number = 20;
    private isMoving = false;
    private camera: Node;
    private tweenMoving;

    onEnable(): void {
        this.speed = Extention.RandomFloatInRange(15, 30)

    }
    onLoad(): void {
        const screenSize = view.getVisibleSize()
        this.width = screenSize.width;
        this.height = screenSize.height;
        this.uiTransform = this.getComponent(UITransform);
        this.rb = this.getComponent(RigidBody2D);
        this.col = this.getComponent(BoxCollider2D);
        this.tweenMoving = tween(this.node)

    }
    public GetNode(): Node {
        return this.node;
    }
    public GetSize(): Vec2 {
        return new Vec2(this.uiTransform.contentSize.clone().width, this.uiTransform.contentSize.clone().height);
    }
    public increaseSize(size: number) {
        this.SetSize(size);

    }
    public SetSize(sizeX: number): void {
        this.uiTransform.setContentSize(new Size(sizeX, this.GetSize().y))
        const newColliderSize = new Rect(0, 0, sizeX, this.GetSize().y);

        // Gán kích thước mới cho collider2D
        this.col.size = newColliderSize;


    }
    public Active(isBool: boolean) {
        this.node.active = isBool;
    }
    public SetPositon(pos: Vec3) {
        this.node.position = pos;
    }
    public GetPositon(): Vec3 {
        return this.node.position;
    }
    public GetRb(): RigidBody2D {
        return this.rb;
    }

    public HorizontalScrolling(target: Vec3, time: number): void {
        this.isMoving = true;
        this.tweenMoving.to(time, { position: target }).start();

    }

    public StopMoving() {
        this.isMoving = false;
        this.tweenMoving.stop();
    }




}


