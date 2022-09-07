import Settings from '../data/Settings';
import Game from '../scenes/Game';

const WIDTH = 2002;

class Background extends Phaser.GameObjects.TileSprite {
  constructor(scene: Game) {
    super(scene, 0, scene.cameras.main.height, WIDTH, Settings.sizes.maxHeight, 'bg');
    this._build();
  }
  
  public scene: Game;

  private _build(): void {
    this.scene.add.existing(this);
    this.setOrigin(0, 1);
    this.setDepth(-2);
  }

  protected preUpdate(time: number, delta: number): void {
    if (!this.scene.gameOver) {
      this.setTilePosition(this.tilePositionX + Settings.getSpeed(delta), this.tilePositionY);
    }
  }
}

export default Background;