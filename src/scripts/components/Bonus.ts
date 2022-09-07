import Settings from '../data/Settings';
import Game from '../scenes/Game';

class Bonus extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game, y: number) {
    super(scene, scene.cameras.main.width, y, 'bonus-' + Phaser.Math.Between(1, 4));
    this._build();
  }

  public scene: Game;
  private _tween: Phaser.Tweens.Tween;
  private _flash: Phaser.GameObjects.Sprite;

  private _build(): void {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setOrigin(0, 1);
    this.setDepth(3);
    const { centerX, centerY } = this.getBounds();
    this._flash = this.scene.add.sprite(centerX, centerY, 'flash');

    this._tween = this.scene.tweens.add({
      targets: this,
      y: '-=20',
      yoyo: true,
      repeat: -1
    });
    this.scene.tween.push(this._tween);
  }

  public destroy(): void {
    this._flash.destroy();
    super.destroy();
  }

  protected preUpdate(): void {
    if (!this.scene.gameOver) {
      this.setX(this.x - Settings.getSpeed());
      this._flash.setX(this._flash.x - Settings.getSpeed());
    }

    if (this.x + this.width < 0) {
      this._tween.stop();
      this.destroy();
    }
  }
}

export default Bonus;