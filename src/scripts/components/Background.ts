import Settings from '../data/Settings';

const WIDTH = 2002;

class Background extends Phaser.GameObjects.TileSprite {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, scene.cameras.main.height, WIDTH, Settings.sizes.maxHeight, 'bg');
    this._build();
  }
  
  private _build(): void {
    this.scene.add.existing(this);
    this.setOrigin(0, 1);
    this.setDepth(-2);
  }
}

export default Background;