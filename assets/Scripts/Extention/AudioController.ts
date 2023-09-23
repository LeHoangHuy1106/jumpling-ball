import { _decorator, Component, Node, AudioSource, AudioClip, Toggle } from 'cc';
import { Constants } from './Constants';
import { DataManager } from './DataManager';
const { ccclass, property } = _decorator;

export enum ClipSound {
    button, good, narmal, over, jump
}
@ccclass('AudioController')
export class AudioController extends Component {
    @property(AudioSource) source: AudioSource;
    @property([AudioClip]) clips: AudioClip[] = [];
    @property(Toggle) bntSound: Toggle;

    @property(AudioSource) sourceMusic: AudioSource;
    @property(AudioClip) clipMusic: AudioClip;
    @property(Toggle) btnMusic: Toggle;

    onLoad(): void {
        this.Setup();
        if (this.bntSound) {
            this.bntSound.node.on(Toggle.EventType.TOGGLE, this.SoundEvent, this);
        }
        if (this.btnMusic) {
            this.btnMusic.node.on(Toggle.EventType.TOGGLE, this.MusicEvent, this);
        }

    }

    private SoundEvent() {
        if (!this.bntSound.isChecked) {
            this.source.volume = 0;
            DataManager.getInstance().SetData(Constants.dataSound, false);
        }
        else {
            this.source.volume = 1;
            DataManager.getInstance().SetData(Constants.dataSound, true);
        }
    }

    private MusicEvent(): void {
        if (!this.btnMusic.isChecked) {
            this.sourceMusic.volume = 0;
            DataManager.getInstance().SetData(Constants.dataMusic, false);
        }
        else {
            this.sourceMusic.volume = 1;
            DataManager.getInstance().SetData(Constants.dataMusic, true);

        }
    }

    private Setup(): void {
        let isSound = DataManager.getInstance().GetData(Constants.dataSound, true)
        if (this.bntSound) {
            this.bntSound.isChecked = isSound;
        }
        if (isSound) {
            this.source.volume = 1;
        }
        else {
            this.source.volume = 0;
        }

        let isMusic = DataManager.getInstance().GetData(Constants.dataMusic, true)
        if (this.btnMusic) {
            this.btnMusic.isChecked = isMusic;
        }
        if (isMusic) {
            this.sourceMusic.volume = 1;
        }
        else {
            this.sourceMusic.volume = 0;
        }

        this.PlayMusic();
    }

    public PlaySound(sound: ClipSound) {
        switch (sound) {
            case ClipSound.button:
                this.source.clip = this.clips[0];
                this.source.play();
                break;
            case ClipSound.good:
                this.source.clip = this.clips[1];
                this.source.play();
                break;
            case ClipSound.narmal:
                this.source.clip = this.clips[2];
                this.source.play();
                break;
            case ClipSound.over:

                this.source.clip = this.clips[3];
                this.source.play();
                break;
                case ClipSound.jump:

                    this.source.clip = this.clips[4];
                    this.source.play();
                    break;
            default:
                break;
        }
    }
    public Stop(): void {
        this.source.stop();
    }
    public PlayMusic(): void {
        this.sourceMusic.clip = this.clipMusic;
        this.source.play();
    }


}


