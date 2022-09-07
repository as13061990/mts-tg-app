import Settings from '../data/Settings';
import Game from '../scenes/Game';

class NPC extends Phaser.GameObjects.Sprite {
  constructor(scene: Game, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this._build();
  }

  public scene: Game;

  private _build(): void {
    this.scene.add.existing(this);
    this.setOrigin(0, 1);
  }

  protected preUpdate(): void {
    if (!this.scene.gameOver) {
      this.setX(this.x - Settings.getSpeed());
    }

    if (this.x + this.width < 0) {
      this.destroy();
    }
  }
}

export default NPC;