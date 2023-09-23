import { _decorator, Component, Node, director, Constraint, Label, sys } from 'cc';
import { Constants } from '../../Extention/Constants';
import { DataManager } from '../../Extention/DataManager';
const { ccclass, property } = _decorator;

@ccclass('MainScene')
export class MainScene extends Component {
   
    @property(Label) txtScore: Label;

    public SetScore(n: number){
        this.txtScore.string = n.toString();
    }
    onLoad(){
        let highScore =parseInt( sys.localStorage.getItem(Constants.highScore)) || 0;
        let score = DataManager.getInstance().GetData(Constants.score,0);


        if(score > highScore){
            highScore = score;
            sys.localStorage.setItem('highScore', score.toString());
        }
        this.SetScore(highScore)
    }
    public PlayGame():void{
        director.loadScene(Constants.scenePlay)
    }
}


