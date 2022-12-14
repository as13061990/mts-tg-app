import Settings from '../data/Settings';
import Game from '../scenes/Game';

class Obstacle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game) {
    super(scene, scene.cameras.main.width, scene.cameras.main.height - 215, 'obstacle-' + Phaser.Math.Between(1, 4));
    this._build();
  }

  public scene: Game;

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
  }

  public destroy(): void {
    super.destroy();
  }

  protected preUpdate(time: number, delta: number): void {
    if (!this.scene?.gameOver) {
      this?.setX(this.x - Settings.getSpeed(delta));
    }

    if (this.x + this.width < 0) {
      this?.destroy();
    }
  }
}

export default Obstacle;