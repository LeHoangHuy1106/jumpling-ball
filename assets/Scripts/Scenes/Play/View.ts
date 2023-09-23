import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('View')
export class View extends Component {
    @property(Label) txtScore: Label;

    public SetScore(n: number){
        this.txtScore.string = n.toString();
    }
}


