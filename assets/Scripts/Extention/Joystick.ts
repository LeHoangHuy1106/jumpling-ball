import { _decorator, CCFloat, Component, EventHandler, EventTouch, Node, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Joystick')
export class Joystick extends Component {

	@property({ type: Node })
	private arrowsNode: Node = null;

	@property({ type: [EventHandler] })
	private axisEvents: EventHandler[] = [];

	private size: number;

	protected onLoad(): void {
		this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
		this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
		this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
		this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);

		this.size = this.getComponent(UITransform).contentSize.width / 2.0;
	}

	private onTouchStart(event: EventTouch): void {
		this.onBegin(event.getLocation());
	}

	private onTouchMove(event: EventTouch): void {
		this.onBegin(event.getLocation());
	}

	private onTouchEnd(event: EventTouch): void {
		this.onEnd();
	}

	private onTouchCancel(event: EventTouch): void {
		this.onEnd();
	}

	private onBegin(screenPosition: Vec2): void {
		let position = new Vec3();
		position = this.node.inverseTransformPoint(position, new Vec3(screenPosition.x, screenPosition.y, 0.0));
		const length = position.length();
		if (length > this.size) {
			position.x = position.x * this.size / length;
			position.y = position.y * this.size / length;
		}
		this.arrowsNode.setPosition(position);

		const axis = new Vec2(position.x / this.size, position.y / this.size);
		EventHandler.emitEvents(this.axisEvents, this, axis);
	}

	private onEnd(): void {
		this.arrowsNode.setPosition(Vec3.ZERO);

		EventHandler.emitEvents(this.axisEvents, this, Vec2.ZERO);
	}
}
