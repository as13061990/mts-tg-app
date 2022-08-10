import Game from '../scenes/Game';
import Pipe from '../components/Pipe';
import Zone from '../components/Zone';
import Player from '../components/Player';
import Coin from '../components/Coin';
import { screen, coin } from '../types/enums';
import Settings from '../data/Settings';
import Score from '../components/Score';

const DISTANCE = 550 // расстояние между трубами
const MIN = 400; // минимальный отступ для труб

class GameActions {
  constructor(scene: Game) {
    this.scene = scene;
  }

  private scene: Game;
  private pipes: Phaser.Time.TimerEvent;

  public startPipes(): void {
    this.pipes = this.scene.time.addEvent({ delay: 10, callback: (): void => {
      this.createpipe();
    }, loop: true });
  }

  public createClickZone(): void {
    const { centerX, centerY, width, height } = this.scene.cameras.main;
    const zone = new Zone(this.scene, centerX, centerY, width, height);
    zone.downCallback = (): void => this.scene.player.jump();
    zone.downClickCallback = (): void => {
      this.scene.player.jumpCounter = 1;
    }
  }

  private createpipe(): void {
    const { width, centerY } = this.scene.cameras.main;
    const last: Pipe = this.scene.pipes.getChildren()[this.scene.pipes.getLength() - 1] as Pipe;
    if (last && last.x + DISTANCE > width) return;

    const top = last ? !last.top : Boolean(Phaser.Math.Between(0, 1));
    const y = Phaser.Math.Between(centerY - MIN / 2, centerY + MIN / 2);

    const pipe = new Pipe(this.scene, y, top);
    this.scene.pipes.add(pipe);
    this.createCoin(pipe);
  }

  private createCoin(pipe: Pipe): void {
    // if (Phaser.Math.Between(1, 3) !== 1) return;

    // const type = Phaser.Math.Between(1, 3) === coin.BLUE ? coin.BLUE : coin.RED;
    // const texture = type === coin.BLUE ? 'blue-' : 'red-';
    // const num = type === coin.BLUE ? Phaser.Math.Between(1, 4) : Phaser.Math.Between(1, 5);
    // const x = Phaser.Math.Between(pipe.x - pipe.size / 2 + 15, pipe.x + pipe.size / 2 - 15);
    // const icon = new Coin(this.scene, x, pipe.y - 80, texture + num, type);
    // this.scene.coins.add(icon);
  }

  public gameOver(): void {
    this.pipes.remove();
    this.scene.pipes.children.iterate((pipe: Pipe): void => {
      pipe.tween.stop();
    });
    this.scene.coins.children.iterate((coin: Coin): void => {
      coin.tween.stop();
    });
    this.scene.bg.tween.stop();
    this.scene.gameOver = true;
 
    this.scene.time.addEvent({ delay: 4000, callback: (): void => {
      Settings.setScreen(screen.RESULT);
      this.scene.scene.start('Menu');
    }, loop: false });
  }

  public setCollosions(): void {
    this.scene.physics.add.overlap(
      this.scene.pipes,
      this.scene.player,
      this.pipeCollisions.bind(this)
    );
    this.scene.physics.add.overlap(
      this.scene.coins,
      this.scene.player,
      this.coinCollisions.bind(this)
    );
  }

  private pipeCollisions(player: Player, pipe: Pipe): void {
    this.gameOver();
  }

  private coinCollisions(player: Player, icon: Coin): void {
    if (!icon.taked) {
      icon.setTaked();
      const score = icon.coin === coin.BLUE ? 50 : 20;
      new Score(this.scene, icon.x, icon.y - 50, '+' + score);

    }
  }

  public interval(): void {
    this.scene.time.addEvent({ delay: 1000, callback: (): void => {
      if (!this.scene.gameOver) {

      }
    }, loop: true });
  }
}

export default GameActions;