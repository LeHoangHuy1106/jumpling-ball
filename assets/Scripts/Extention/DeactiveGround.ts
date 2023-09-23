import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DeactiveGround')
export class DeactiveGround extends Component {

    @property(Collider2D) col: Collider2D;

    onLoad(): void {
        this.col.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)

    }
    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        switch (otherCollider.tag) {
            // ground 1, ground 2
            case 2: {
                otherCollider.node.active = false;
                otherCollider.node.setRotationFromEuler(new Vec3(0, 0, 0));

                break;
            }
            default:
                break;

        }

    }
}
