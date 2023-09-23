import { _decorator, Component, Node, input, EventTouch, Input, Prefab, view, Vec3, math, tween, random, director, RigidBody2D, v2, Collider2D, IPhysics2DContact, Contact2DType, Vec2, sys } from 'cc';
import { AudioController, ClipSound } from '../../Extention/AudioController';
import { Constants } from '../../Extention/Constants';
import { DataManager } from '../../Extention/DataManager';
import { Extention } from '../../Extention/Extention';
import { NodeCustom } from '../../Extention/NodeCustom';
import { ObjectPool } from '../../Extention/ObjectPool';
import { View } from './View';
const { ccclass, property } = _decorator;

@ccclass('Controller')
export class Controller extends Component {
    @property(Prefab) ground: Prefab;
    @property(Node) parentGround: Node;
    @property(NodeCustom) groundCurr: NodeCustom
    @property(RigidBody2D) rbBall: RigidBody2D;
    @property(Collider2D) colBall: Collider2D;
    @property(Node) cameraFollow: Node;
    @property(Node) background: Node;
    @property(View) view: View;
    @property(AudioController) audio: AudioController;

    private groundQueue: NodeCustom[] = [];
    private groundNext: NodeCustom;
    private width: number;
    private height: number;
    private score: number = 0;
    private isClose = false;
    private canJump: boolean = false;
    private jumpForce: number = 5;
    private dic_right = -1;


    onLoad(): void {
        ObjectPool.Instance.CreateListObject(Constants.ground, this.ground, 20, this.parentGround)
        input.on(Input.EventType.TOUCH_START, this.Jump, this);
        this.colBall.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)

        const screenSize = view.getVisibleSize()
        this.width = screenSize.width;
        this.height = screenSize.height;
        this.canJump = true;
        this.height = -910 + 100;


    }
    start(): void {
        this.CreateGroundStart();
    }

    CreateGroundStart(): void {
        if (this.isClose) {
            return;
        }
        let i = random();
        let posX = this.groundCurr.GetSize().x / 2 + this.width / 2;
        if (i < 0.5) {
            posX = -this.groundCurr.GetSize().x / 2 - this.width / 2;
            this.dic_right = 1;
        }

        let posY = this.groundCurr.GetPositon().y + this.groundCurr.GetSize().y + 1;

        this.groundNext = ObjectPool.Instance.getObject(Constants.ground, this.parentGround)

        this.groundQueue.push(this.groundNext)
        this.groundNext.SetPositon(new Vec3(posX, posY, 0));
        let target = new Vec3(0, posY, 0);
        let time = 0;
        if (sys.now() > 15 * 1000) {
            time = Extention.RandomFloatInRange(1, 2.5);
        }
        else {
            time = Extention.RandomFloatInRange(0.5, 1);
        }
        this.groundNext.HorizontalScrolling(target, time)
        this.groundNext.GetNode().active = true;

        this.scheduleOnce(() => {
            this.height += 100;
            this.CameraFollow(100)
            this.BackgroundFollow(100)
            this.groundCurr = this.groundNext;
            this.CreateGroundStart()
        }, time)


    }


    Jump() {
        if (this.isClose) {
            return;
        }
        if (this.canJump) {
            this.audio.PlaySound(ClipSound.jump)
            const worldCenter = new Vec2();
            this.rbBall.getWorldCenter(worldCenter);
            this.rbBall.linearVelocity = new Vec2(0, this.jumpForce * 5);
            this.canJump = false;
        }

    }

    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {

        if (Math.abs(this.colBall.node.position.x) > 0.1) {
            this.isClose = true;
            this.audio.PlaySound(ClipSound.over);
            DataManager.getInstance().SetData(Constants.score, this.score)
            this.scheduleOnce(() => { director.loadScene(Constants.mainScene); }, 2)


        }

        if (this.isClose) {
            return;
        }
        this.canJump = true;
        if (otherCollider.tag == 2) {
            if (otherCollider.node.position.x == 0) {
                this.score += 2;
                this.view.SetScore(this.score)
                this.audio.PlaySound(ClipSound.good);

            }
            else {
                if (Math.abs(this.groundNext.node.position.x) < 170 / 2 + 200) {
                    this.groundNext.StopMoving();
                    this.score += 1;
                    this.view.SetScore(this.score)
                    this.audio.PlaySound(ClipSound.narmal);

                }

            }

        }

    }







    private CameraFollow(deltaHeight): void {
        if (this.rbBall.node.position.y > 0) {
            var cameraPos = this.cameraFollow.position;
            var y = cameraPos.y;
            tween(this.cameraFollow)
                .to(0.3, { position: new Vec3(cameraPos.x, Math.max(y, y + deltaHeight)) })
                .start();
        }
    }
    private BackgroundFollow(deltaHeight): void {
        if (this.rbBall.node.position.y > 0) {
            var bgPos = this.background.position;
            var y = bgPos.y;
            tween(this.background)
                .to(0.3, { position: new Vec3(bgPos.x, Math.max(y, y + deltaHeight)) })
                .start();
        }
    }

}


