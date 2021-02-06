import { injectable } from 'inversify';
import { container } from './index';
import { Symbols } from './symbols';

@injectable()
export class Background {

    private context: CanvasRenderingContext2D;
    private readonly imagePath: string;
    private readonly image: HTMLImageElement;

    constructor() {
        this.context = container.get(Symbols.Context);
        this.imagePath = container.get(Symbols.BackgroundImage);
        this.image = new Image();
        this.image.src = this.imagePath;
    }

    public draw(): void {
        this.context.drawImage(this.image, 0, 0);
    }

}
