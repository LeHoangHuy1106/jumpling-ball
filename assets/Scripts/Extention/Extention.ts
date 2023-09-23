import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Extention')
export class Extention {
    static RandomFloatInRange(minValue: number, maxValue: number): number {
        return minValue + Math.random() * (maxValue - minValue);
    }
    static CheckMobileDevice(): boolean {
        const userAgent: string = navigator.userAgent;
        return /Mobi|Android|iPhone|iPad|iPod|Windows Phone|KFAPWI|BlackBerry|PlayBook|BB10|RIM Tablet|Mobile|Touch|webOS|Opera Mini/i.test(userAgent);
    }
}


