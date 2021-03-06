import 'reflect-metadata';
import { Container } from 'inversify';
import { Score } from './score';
import { Symbols } from './symbols';
import { Bird } from './bird';
import { Background } from './background';
import { PipeManager } from './pipe-manager';
import { Ground } from './ground';

const MOVE_SPEED = 0.5;
const GRAVITY = 1;
const GAP = 150;
const NEXT_PIPE_GENERATION_POINT = 90;
const JUMP_HEIGHT = 25;
const BONUS = 1;

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d')!;

export const container = new Container();
container.bind(Symbols.MoveSpeed).toConstantValue(MOVE_SPEED);
container.bind(Symbols.Gap).toConstantValue(GAP);
container.bind(Symbols.Gravity).toConstantValue(GRAVITY);
container.bind(Symbols.Canvas).toConstantValue(canvas);
container.bind(Symbols.Context).toConstantValue(context);
container.bind(Symbols.NewPipeGenerationPoint).toConstantValue(NEXT_PIPE_GENERATION_POINT);
container.bind(Symbols.JumpHeight).toConstantValue(JUMP_HEIGHT);
container.bind(Symbols.Bonus).toConstantValue(BONUS);
container.bind(Symbols.NorthPipeImage).toConstantValue('images/pipeNorth.png');
container.bind(Symbols.SouthPipeImage).toConstantValue('images/pipeSouth.png');
container.bind(Symbols.BackgroundImage).toConstantValue('images/bg.png');
container.bind(Symbols.GroundImage).toConstantValue('images/fg.png');
container.bind(Symbols.BirdImage).toConstantValue('images/bird.png');
container.bind(Symbols.ScoreSound).toConstantValue('sounds/score.mp3');
container.bind(Symbols.HitSound).toConstantValue('sounds/hit.mp3');
container.bind(Symbols.FlySound).toConstantValue('sounds/fly.mp3');

const pipeManager = new PipeManager();
const background = new Background();
const ground = new Ground();
const bird = new Bird();
const score = new Score();

let gameOver = false;

function game() {

    background.draw();

    for (let coords of pipeManager.pipes) {

        pipeManager.drawNorthPipe(coords);
        pipeManager.drawSouthPipe(coords);

        pipeManager.slidePipeLeft(coords);

        if (pipeManager.shouldGeneratePipe(coords)) {
            pipeManager.addPipe();
        }

        if (pipeManager.doesHitPipe(bird, coords) || ground.doesHit(bird)) {
            gameOver = true;
            pipeManager.makeHitSound();
        }

        if (pipeManager.doesPassPipe(bird, coords)) {
            score.increment();
        }

    }

    ground.draw();
    score.print();

    bird.draw();
    bird.fall();

    if (gameOver) {
        return;
    }

    pipeManager.clearOldPipes();

    requestAnimationFrame(game);
}

document.addEventListener('keydown', event => {

    if (event.code === 'Space') {

        if (gameOver) {
            return location.reload();
        }

        bird.jump();

    }

});

game();
