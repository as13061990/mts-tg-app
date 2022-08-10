import Settings from '../data/Settings';
import Game from '../scenes/Game';

const WIDTH = 100;

class Pipe extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game, y: number, top: boolean) {
    super(scene, scene.cameras.main.width + WIDTH, y, 'pixel');
    this.top = top;
    this.init();
  }

  public tween: Phaser.Tweens.Tween;
  public top: boolean;
  private hat: Phaser.GameObjects.Sprite;
  private hatBody: Phaser.GameObjects.TileSprite;
  
  private init(): void {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setOrigin(0.5, Number(this.top));
    const height = this.top ? this.y : this.scene.cameras.main.height - this.y;
    this.setDisplaySize(WIDTH, height);
    this.setPushable(false);
    this.build();
    this.move();
  }

  private build(): void {
    this.hatBody = this.scene.add.tileSprite(this.x, this.y, this.displayWidth, this.displayHeight, 'pipe-tile').setOrigin(0.5, this.originY);
    this.hat = this.scene.add.sprite(this.x, this.y, 'pipe');
    if (this.top) this.hat.setFlipY(true);
  }

  private move(): void {
    this.tween = this.scene.add.tween({
      targets: this,
      x: '-=' + Settings.getSpeed(),
      duration: Settings.duration,
      onComplete: (): void => this.destroy()
    });
  }

  public destroy(): void {
    this.hat?.destroy();
    this.hatBody?.destroy();
    super.destroy();
  }

  protected preUpdate(): void {
    this.hat.setX(this.x - 3);
    this.hatBody.setX(this.x - 3);
  }
}

export default Pipe;