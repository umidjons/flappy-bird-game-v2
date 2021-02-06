import { injectable } from 'inversify';
import { Bird } from './bird';
import { container } from './index';
import { Symbols } from './symbols';

@injectable()
export class Ground {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private readonly imagePath: string;
    private readonly image: HTMLImageElement;

    constructor() {
        this.canvas = container.get(Symbols.Canvas);
        this.context = container.get(Symbols.Context);
        this.imagePath = container.get(Symbols.GroundImage);
        this.image = new Image();
        this.image.src = this.imagePath;
    }

    draw(): void {
        this.context.drawImage(this.image, 0, this.canvas.height - this.image.height);
    }

    doesHit(bird: Bird): boolean {
        return bird.bottomSide() >= this.topSide()
            || bird.bottomSide() >= this.canvas.height;
    }

    topSide(): number {
        return this.canvas.height - this.image.height;
    }

}
