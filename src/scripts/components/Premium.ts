import Settings from '../data/Settings';
import Game from '../scenes/Game';

class Premium extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game) {
    super(scene, scene.cameras.main.width, scene.cameras.main.height - 250, 'premium');
    this._build();
  }

  public scene: Game;
  private _tween: Phaser.Tweens.Tween;
  private _tween2: Phaser.Tweens.Tween;
  private _tween3: Phaser.Tweens.Tween;
  private _flash: Phaser.GameObjects.Sprite;

  private _build(): void {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setOrigin(0, 1);
    this.setDepth(3);
    const { centerX, centerY } = this.getBounds();
    this._flash = this.scene.add.sprite(centerX, centerY, 'flash');

    this._tween = this.scene.tweens.add({
      targets: [this, this._flash],
      x: '-=' + this.scene.bg.width,
      duration: Settings.speed
    });
    this._tween2 = this.scene.tweens.add({
      targets: this,
      y: '-=20',
      yoyo: true,
      repeat: -1
    });
    this._tween3 = this.scene.tweens.add({
      targets: this._flash,
      alpha: { from: 1, to: 0.8 },
      yoyo: true,
      repeat: -1
    });
    this.scene.tween.push(this._tween);
    this.scene.tween.push(this._tween2);
    this.scene.tween.push(this._tween3);
  }

  public destroy(): void {
    this._flash.destroy();
    super.destroy();
  }

  protected preUpdate(): void {
    if (this.x + this.width < 0) {
      this._tween.stop();
      this._tween2.stop();
      this._tween3.stop();
      this.destroy();
    }
  }
}

export default Premium;