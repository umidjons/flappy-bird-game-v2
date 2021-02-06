import { injectable } from 'inversify';
import { container } from './index';
import { Symbols } from './symbols';

@injectable()
export class Pipe {

    private context: CanvasRenderingContext2D;
    private readonly image: HTMLImageElement;
    private readonly imagePath: string;

    constructor(imagePath: string) {
        this.context = container.get(Symbols.Context);
        this.imagePath = imagePath;
        this.image = new Image();
        this.image.src = this.imagePath;
    }

    draw(x: number, y: number): void {
        this.context.drawImage(this.image, x, y);
    }

    getHeight(): number {
        return this.image.height;
    }

    getWidth(): number {
        return this.image.width;
    }

}
