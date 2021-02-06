import { container } from './index';
import { Symbols } from './symbols';

export class Score {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private value: number;
    private readonly bonusPoints: number;
    private readonly x: number;
    private readonly y: number;
    private sound: HTMLAudioElement;

    constructor() {
        this.value = 0;
        this.canvas = container.get(Symbols.Canvas);
        this.context = container.get(Symbols.Context);
        this.bonusPoints = container.get(Symbols.Bonus);
        this.x = 10;
        this.y = this.canvas.height - 20;
        this.sound = new Audio(container.get(Symbols.ScoreSound));
    }

    public increment() {
        this.value += this.bonusPoints;
        this.makeSound();
    }

    public print() {
        this.context.fillStyle = '#000';
        this.context.font = '20px Verdana';
        this.context.fillText(this.getMessage(), this.x, this.y);
    }

    private makeSound() {
        this.sound.play();
    }

    private getMessage() {
        return `Score: ${ this.value }`;
    }

}
