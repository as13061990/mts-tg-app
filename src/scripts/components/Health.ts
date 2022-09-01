import User from "../data/User";

class Health {
  constructor(scene: Phaser.Scene) {
    this._scene = scene;
    this._build();
  }

  private _scene: Phaser.Scene;
  private _sprites: Phaser.GameObjects.Sprite[] = [];

  private _build(): void {
    for (let i = 0; i < 3; i++) {
      const x = 70 + i * 55;
      const sprite = this._scene.add.sprite(x, 50, 'health').setOrigin(0, 0);
      this._sprites.push(sprite);
    }
  }

  public updateHealth(): void {
    const health = User.getHealth();
    const sprite = this._sprites[health];
    if (sprite) this._showAnimation(sprite);
  }

  private _showAnimation(sprite: Phaser.GameObjects.Sprite): void {
    let counter = 0;
    const time = this._scene.time.addEvent({ delay: 80, callback: (): void => {
      sprite.alpha === 1 ? sprite?.setAlpha(0.1) : sprite?.setAlpha(1);

      if (counter >= 20) {
        time?.remove();
        sprite?.destroy();
      }
      counter++;
    }, loop: true });
  }
}

export default Health;