import Game from '../scenes/Game';
import Zone from '../components/Zone';
import Player from '../components/Player';
import { screen } from '../types/enums';
import Settings from '../data/Settings';
import Score from '../components/Score';
import User from '../data/User';

class GameActions {
  constructor(scene: Game) {
    this._scene = scene;
  }

  private _scene: Game;

  public createClickZone(): void {
    const { centerX, centerY, width, height } = this._scene.cameras.main;
    const zone = new Zone(this._scene, centerX, centerY, width, height);
    zone.downCallback = (): void => this._scene.player.jump();
    zone.downClickCallback = (): void => {
      this._scene.player.jumpCounter = 1;
    }
  }

  public setWorldBounds(): void {
    const { width, height } = this._scene.cameras.main;
    const x = 0;
    const y = 0;
    this._scene.physics.world.setBounds(x, y, width, height - 240);
  }

  public gameOver(): void {
    this._scene.bg.tween.stop();
    this._scene.gameOver = true;
 
    this._scene.time.addEvent({ delay: 2000, callback: (): void => {
      Settings.setScreen(screen.RESULT);
      this._scene.scene.start('Menu');
    }, loop: false });
  }

  public interval(): void {
    this._scene.time.addEvent({ delay: 1000, callback: (): void => {
      if (!this._scene.gameOver) {
        User.plusScore(1);
      }
    }, loop: true });
  }
}

export default GameActions;