import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Continuous')
export class Continuous extends Component {
    private totalElapsedTime = 0;
    private funcStart: Function;
    private funcEnd: Function;
    private time: number;

    public Call(actionStart: Function, actionEnd: Function, time: number): void {
        this.funcStart = actionStart;
        this.funcEnd = actionEnd;
        this.time = time;
        this.schedule(this.handle, 0);
    } 

    private handle(dt: number): void {
        this.totalElapsedTime += dt;
        if (this.totalElapsedTime < this.time) {
            this.funcStart();
        }
        else {
            this.totalElapsedTime = 0;
            if (this.funcEnd) {
                this.funcEnd();
            }
            this.unschedule(this.handle);
        }
    }

}


