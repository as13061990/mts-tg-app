import Settings from '../data/Settings';
import Game from '../scenes/Game';

class Premium extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game) {
    super(scene, scene.cameras.main.width, scene.cameras.main.height - 220, 'premium');
    this._build();
  }

  public scene: Game;
  private _tween: Phaser.Tweens.Tween;

  private _build(): void {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setOrigin(0, 1);
    this.setDepth(3);

    this._tween = this.scene.tweens.add({
      targets: this,
      y: '-=20',
      yoyo: true,
      repeat: -1
    });
    this.scene.tween.push(this._tween);
  }

  public destroy(): void {
    super.destroy();
  }

  protected preUpdate(time: number, delta: number): void {
    if (!this.scene.gameOver) {
      this.setX(this.x - Settings.getSpeed(delta));
    }

    if (this.x + this.width < 0) {
      this._tween.stop();
      this.destroy();
    }
  }
}

export default Premium;