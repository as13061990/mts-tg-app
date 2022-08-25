class Button extends Phaser.GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.init();
  }

  public x: number;
  public y: number;
  private _press: boolean;
  public text: Phaser.GameObjects.Text;
  public icon: Phaser.GameObjects.Sprite;
  public callback: Function = (): void => {};

  private init(): void {
    this.scene.add.existing(this);
    this.pressButton();
  }

  public destroy(): this {
    super.destroy();
    this.text?.destroy();
    this.icon?.destroy();
    return this;
  }

  public setAlpha(alpha: number): this {
    super.setAlpha(alpha);
    this.text?.setAlpha(alpha);
    this.icon?.setAlpha(alpha);
    return this;
  }

  protected pressButton(): void {
    this.setInteractive();
    this.on('pointerdown', (): void => {
      this._press = true;
      let counter = 0;
      let filter = 0xFFFFFF;

      const interval = this.scene.time.addEvent({ delay: 5, callback: (): void => {
        filter -= 0x222222;
        this.setTint(filter);
        this.text?.setTint(filter);
        this.icon?.setTint(filter);
        this.y = Math.round(this.y + 1);
        this.text?.setY(Math.round(this.text?.y + 1));
        this.icon?.setY(Math.round(this.icon?.y + 1));
        counter++;
  
        if (counter >= 3) {
          interval.remove(false);
        }
      }, callbackScope: this, loop: true });
    });
  
    this.on('pointerout', (): void => {
      if (this._press) {
        this._press = false;
        let counter = 0;
        let filter = 0x999999;

        const interval = this.scene.time.addEvent({ delay: 10, callback: (): void => {
          filter += 0x222222;
          this.setTint(filter);
          this.text?.setTint(filter);
          this.icon?.setTint(filter);
          this.y = Math.round(this.y - 1);
          this.text?.setY(Math.round(this.text?.y - 1));
          this.icon?.setY(Math.round(this.icon?.y - 1));
          counter++;
  
          if (counter >= 3) {
            interval.remove(false);
          }
        }, callbackScope: this, loop: true });
      }
    });
  
    this.on('pointerup', (): void => {
      if (this._press) {
        this._press = false;
        let counter = 0;
        let filter = 0x999999;
        const interval = this.scene.time.addEvent({ delay: 10, callback: (): void => {
          filter += 0x222222;
          this.setTint(filter);
          this.text?.setTint(filter);
          this.icon?.setTint(filter);
          this.y = Math.round(this.y - 1);
          this.text?.setY(Math.round(this.text?.y - 1));
          this.icon?.setY(Math.round(this.icon?.y - 1));
          counter++;
  
          if (counter >= 3) {
            interval.remove(false);
          }
        }, callbackScope: this, loop: true });

        this.callback();
      }
    });
  }

  public preUpdate(): void {
    if (this.text?.scene) {
      if (this.alpha !== this.text.alpha) {
        this.text.alpha = this.alpha;
      }
    }

    if (this.icon?.scene) {
      if (this.alpha !== this.icon.alpha) {
        this.icon.alpha = this.alpha;
      }
    }
  }
}

export default Button;