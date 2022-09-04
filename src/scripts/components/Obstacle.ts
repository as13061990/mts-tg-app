import Settings from '../data/Settings';
import Game from '../scenes/Game';

class Obstacle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game) {
    super(scene, scene.cameras.main.width, scene.cameras.main.height - 215, 'obstacle-' + Phaser.Math.Between(1, 4));
    this._build();
  }

  public scene: Game;
  private _tween: Phaser.Tweens.Tween;

  private _build(): void {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setOrigin(0, 1);
    this.setDepth(2);
    
    if (this.texture.key === 'obstacle-1') {
      this.body.setSize(250, 150);
    } else if (this.texture.key === 'obstacle-2') {
      this.body.setCircle(this.displayWidth / 2);
    } else if (this.texture.key === 'obstacle-3') {
      this.body.setSize(250, 150);
      this.body.setCircle(this.displayWidth / 5);
    } else if (this.texture.key === 'obstacle-4') {
      this.body.setSize(150, 150);
      this.body.setCircle(this.displayWidth / 5);
    }

    this._tween = this.scene.tweens.add({
      targets: this,
      x: '-=' + this.scene.bg.width,
      duration: Settings.speed
    });
    this.scene.tween.push(this._tween);
  }

  public destroy(): void {
    super.destroy();
  }

  protected preUpdate(): void {
    if (this.x + this.width < 0) {
      this._tween.stop();
      this.destroy();
    }
  }
}

export default Obstacle;