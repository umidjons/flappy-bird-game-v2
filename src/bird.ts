import { injectable } from 'inversify';
import { container } from './index';
import { Symbols } from './symbols';

@injectable()
export class Bird {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private x: number;
    private y: number;
    private readonly gravity: number;
    private readonly jumpHeight: number;
    private readonly imagePath: string;
    private readonly image: HTMLImageElement;

    constructor() {
        this.canvas = container.get(Symbols.Canvas);
        this.context = container.get(Symbols.Context);
        this.gravity = container.get(Symbols.Gravity);
        this.jumpHeight = container.get(Symbols.JumpHeight);
        this.imagePath = container.get(Symbols.BirdImage);
        this.image = new Image();
        this.image.src = this.imagePath;
        this.x = 100;
        this.y = 70;
    }

    draw(): void {
        this.context.drawImage(this.image, this.x, this.y);
    }

    fall(): void {
        this.y += this.gravity;
    }

    jump(): void {
        this.y = this.y - this.jumpHeight;
    }

    rightSide(): number {
        return this.x + this.image.width;
    }

    leftSide(): number {
        return this.x;
    }

    topSide(): number {
        return this.y;
    }

    bottomSide(): number {
        return this.y + this.image.height;
    }

}
