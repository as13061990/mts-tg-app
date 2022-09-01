import Settings from '../data/Settings';
import Game from '../scenes/Game';

const MAX_JUMP = 500;
const JUMP_TRANSITION = 90;

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game) {
    super(scene, scene.cameras.main.centerX - 200, scene.cameras.main.centerY - 100, 'player');
    this._build();
  }

  public scene: Game;
  private _jumpCounter: number;
  private _recovery: boolean = false;

  private _build(): void {
    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.anims.create({
      key: 'up',
      frames: this.scene.anims.generateFrameNumbers('jump', { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.anims.create({
      key: 'fly',
      frames: this.scene.anims.generateFrameNumbers('jump', { start: 1, end: 1 }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.anims.create({
      key: 'down',
      frames: this.scene.anims.generateFrameNumbers('jump', { start: 2, end: 2 }),
      frameRate: 10,
      repeat: -1
    });
    this._jumpCounter = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setGravityY(800);
    this.setDepth(3);
    this.body.setSize(220, 200);
  }

  public jump(): void {
    if (!this.scene) return;
    if (this.scene.mts) return;
    if (this.scene?.gameOver) return;
    if (this._jumpCounter === 0 && this.body.velocity.y === 0) {
      this._jumpCounter = 1;
      Settings.sounds.play('jump');
    }
    if (this._jumpCounter > 0 && this._jumpCounter < MAX_JUMP) {
      this.setVelocityY(-500);
    }
  }

  public resetJump(): void {
    this._jumpCounter = 0;
  }

  public setDamage(): void {
    if (this._recovery) return;
    this._recovery = true;

    let counter = 0;
    const time = this.scene.time.addEvent({ delay: 80, callback: (): void => {
      this.alpha === 1 ? this?.setAlpha(0.1) : this?.setAlpha(1);

      if (counter >= 20) {
        this._recovery = false;
        time?.remove();
        this?.setAlpha(1);
      }
      counter++;
    }, loop: true });
  }

  public getRecovery(): boolean {
    return this._recovery;
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    
    if (this.body.velocity.y < -JUMP_TRANSITION) {
      this.anims.play('up', true);
    } else if (this.body.velocity.y >= -JUMP_TRANSITION && this.body.velocity.y < 0) {
      this.anims.play('fly', true);
    } else if (this.body.velocity.y > 0) {
      this.anims.play('down', true);
    } else {
      this.anims.play('run', true);
    }
    
    if (this._jumpCounter > 0) {
      this._jumpCounter = this._jumpCounter > MAX_JUMP ? 0 : this._jumpCounter += delta;
    }
  }
}

export default Player;