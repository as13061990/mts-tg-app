import Settings from '../data/Settings';

const WIDTH = 3567;
const SPEED = 60000;

class Background extends Phaser.GameObjects.TileSprite {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, scene.cameras.main.height, WIDTH, Settings.sizes.maxHeight, 'bg');
    this._build();
  }

  public tween: Phaser.Tweens.Tween;
  
  private _build(): void {
    this.scene.add.existing(this);
    this.setOrigin(0, 1);
    this.setDepth(-2);

    this.tween = this.scene.tweens.add({
      targets: this,
      tilePositionX: { from: 0, to: this.width },
      duration: SPEED,
      repeat: -1
    });
  }
}

export default Background;