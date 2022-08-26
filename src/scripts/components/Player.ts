import Game from '../scenes/Game';

const MAX_JUMP = 500; // максимальный счетчик нажатия прыжка

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game) {
    super(scene, scene.cameras.main.centerX - 210, scene.cameras.main.centerY - 100, 'player');
    this._build();
  }

  public scene: Game;
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  public jumpCounter: number;

  private _build(): void {
    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    this.jumpCounter = 0;
    this._cursors = this.scene.input.keyboard.createCursorKeys();
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setGravityY(800);
    this.setDepth(3);
  }

  public jump(): void {
    if (this.scene.gameOver) return;
    if (this.jumpCounter === 0) return;
    this.setVelocityY(-300);
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this.anims.play('run', true);
    
    if (this.jumpCounter > 0) {
      this.jumpCounter = this.jumpCounter > MAX_JUMP ? 0 : this.jumpCounter += delta;
    }

    if (this._cursors.space.isDown) {
      this.jump();
    }
  }
}

export default Player;