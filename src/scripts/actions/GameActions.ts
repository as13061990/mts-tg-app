import Game from '../scenes/Game';
import Platform from '../components/Platform';
import Zone from '../components/Zone';
import Player from '../components/Player';
import Coin from '../components/Coin';
import { screen, coin } from '../types/enums';
import Settings from '../data/Settings';
import Score from '../components/Score';

const MAX_JUMP = 120; // абстрактное число максимального прыжка
const MIN_INDENT = 70; // минимально расстояние для следующей платформы
const TOP_INDENT = 300; // верхняя граница отступа для платформы
const BOTTOM_INDENT = 200; // нижняя граница отступа для платформы
const DISTANCE = 400 // расстояние между платформами

class GameActions {
  constructor(scene: Game) {
    this.scene = scene;
  }

  private scene: Game;
  private platforms: Phaser.Time.TimerEvent;

  public startPlatforms(): void {
    this.createPlatform(true);

    this.platforms = this.scene.time.addEvent({ delay: 10, callback: (): void => {
      this.createPlatform();
    }, loop: true });
  }

  public createClickZone(): void {
    const camera = this.scene.cameras.main;
    const zone = new Zone(this.scene, camera.centerX, camera.centerY, camera.width, camera.height);
    zone.clickCallback
    zone.downCallback = (): void => this.scene.player.jump();
    zone.downClickCallback = (): void => {
      this.scene.player.jumpCounter = 1;
    }
  }

  private createPlatform(first: boolean = false): void {
    const size = first ? 500 : Phaser.Math.Between(200, 400);
    const position = this.getPlatformPosition(size, first);
    
    if (position === null) return;
    const platform = new Platform(this.scene, position.x, position.y, size);
    this.scene.platforms.add(platform);
    this.createCoin(platform);
  }

  private createCoin(platform: Platform): void {
    if (Phaser.Math.Between(1, 3) !== 1) return;

    const type = Phaser.Math.Between(1, 3) === coin.BLUE ? coin.BLUE : coin.RED;
    const texture = type === coin.BLUE ? 'blue-' : 'red-';
    const num = type === coin.BLUE ? Phaser.Math.Between(1, 4) : Phaser.Math.Between(1, 5);
    const x = Phaser.Math.Between(platform.x - platform.size / 2 + 15, platform.x + platform.size / 2 - 15);
    const icon = new Coin(this.scene, x, platform.y - 80, texture + num, type);
    this.scene.coins.add(icon);
  }

  private getPlatformPosition(size: number, start: boolean = false): Iposition {
    const last: Platform = this.scene.platforms.getChildren()[this.scene.platforms.getLength() - 1] as Platform;

    if (start) {
      return {
        x: this.scene.cameras.main.width / 1.5,
        y: this.scene.player.body.bottom + 300
      }
    } else if (last) {
      if (last.getBounds().right + DISTANCE > this.scene.cameras.main.width) {
        return null;
      }
      const up =
        last.y - TOP_INDENT < TOP_INDENT ? false :
        last.y + BOTTOM_INDENT > this.scene.cameras.main.height - BOTTOM_INDENT ? true :
        Boolean(Math.round(Math.random()));

      const min = up ? last.y - MAX_JUMP - MIN_INDENT : last.y + MIN_INDENT;
      const max = up ? last.y - MIN_INDENT : last.y + MIN_INDENT + MAX_JUMP;

      return {
        x: this.scene.cameras.main.width + size / 2,
        y: Phaser.Math.Between(max, min)
      }
    }
    return null;
  }

  public gameOver(): void {
    this.platforms.remove();
    this.scene.platforms.children.iterate((platform: Platform): void => {
      platform.tween.stop();
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
      this.scene.platforms,
      this.scene.player,
      this.platformCollisions.bind(this)
    );
    this.scene.physics.add.overlap(
      this.scene.coins,
      this.scene.player,
      this.coinCollisions.bind(this)
    );
  }

  private platformCollisions(player: Player, platform: Platform): void {
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