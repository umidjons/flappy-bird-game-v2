import { injectable } from 'inversify';
import { Bird } from './bird';
import { container } from './index';
import { Pipe } from './pipe';
import { Coordinates } from './coordinates';
import { Symbols } from './symbols';

@injectable()
export class PipeManager {

    public pipes: Coordinates[];
    private context: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private northPipe: Pipe;
    private southPipe: Pipe;
    private readonly gap: number;
    private readonly speed: number;
    private readonly newPipeGenerationPoint: number;

    constructor(northPipeImage: string, southPipeImage: string) {
        this.canvas = container.get(Symbols.Canvas);
        this.context = container.get(Symbols.Context);
        this.northPipe = new Pipe(northPipeImage);
        this.southPipe = new Pipe(southPipeImage);
        this.gap = container.get(Symbols.Gap);
        this.pipes = [
            this.getCoordinatesForNewPipe(),
        ];
        this.speed = container.get(Symbols.MoveSpeed);
        this.newPipeGenerationPoint = container.get(Symbols.NewPipeGenerationPoint);
    }

    public drawNorthPipe(coords: Coordinates) {
        this.northPipe.draw(coords.x, coords.y);
    }

    public drawSouthPipe(coords: Coordinates) {
        this.southPipe.draw(coords.x, coords.y + this.northPipe.getHeight() + this.gap);
    }

    public slidePipeLeft(coords: Coordinates) {
        coords.x -= this.speed;
    }

    public shouldGeneratePipe(coords: Coordinates) {
        return coords.x < this.newPipeGenerationPoint
            && coords.x >= this.newPipeGenerationPoint - this.speed;
    }

    public addPipe() {
        this.pipes.push(this.getCoordinatesForNewPipe());
    }

    public clearOldPipes() {
        if (this.pipes.length >= 6) {
            this.pipes.splice(0, 3);
        }
    }

    public doesPassPipe(bird: Bird, coords: Coordinates): boolean {
        return bird.rightSide() > coords.x + this.getPipeWidth()
            && bird.rightSide() <= coords.x + this.getPipeWidth() + this.speed;
    }

    public doesHitPipe(bird: Bird, coords: Coordinates) {
        return this.isInsidePipeByX(bird, coords)
            && this.isInsidePipeByY(bird, coords);
    }

    public isInsidePipeByX(bird: Bird, coords: Coordinates) {
        // console.log('bird.rightSide=', bird.rightSide(), 'coords.x=', coords.x);
        // console.log('bird.leftSide=', bird.leftSide(), 'coords.x + pipeWidth=', coords.x + this.getPipeWidth());
        return bird.rightSide() >= coords.x
            && bird.leftSide() <= coords.x + this.getPipeWidth();
    }

    public isInsidePipeByY(bird: Bird, coords: Coordinates) {
        // console.log('bird.topSide=', bird.topSide(), 'coords.y + pipeHeight=', coords.y + this.getPipeHeight());
        // console.log('bird.bottomSide=', bird.bottomSide(), 'coords.y + southPipeStart=', coords.y + this.getSouthPipeStart());
        return bird.topSide() <= coords.y + this.getPipeHeight()
            || bird.bottomSide() >= coords.y + this.getSouthPipeStart();
    }

    public getPipeWidth() {
        return this.northPipe.getWidth();
    }

    public getPipeHeight() {
        return this.northPipe.getHeight();
    }

    public getSouthPipeStart() {
        return this.getPipeHeight() + this.gap;
    }

    private getCoordinatesForNewPipe(): Coordinates {
        return {
            x: this.canvas.width,
            y: Math.floor(Math.random() * this.northPipe.getHeight()) - this.northPipe.getHeight(),
        };
    }

}
