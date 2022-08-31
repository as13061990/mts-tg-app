import Settings from '../data/Settings';
import Game from '../scenes/Game';

class NPC extends Phaser.GameObjects.Sprite {
  constructor(scene: Game, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this._build();
  }

  public scene: Game;
  private _tween: Phaser.Tweens.Tween;

  private _build(): void {
    this.scene.add.existing(this);
    this.setOrigin(0, 1);
    this._tween = this.scene.tweens.add({
      targets: this,
      x: '-=' + this.scene.bg.width,
      duration: Settings.speed
    });
    this.scene.tween.push(this._tween);
  }

  protected preUpdate(): void {
    if (this.x + this.width < 0) {
      this._tween.stop();
      this.destroy();
    }
  }
}

export default NPC;