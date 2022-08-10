import Game from '../scenes/Game';

const MAX_JUMP = 500; // максимальный счетчик нажатия прыжка

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game) {
    super(scene, scene.cameras.main.centerX - 210, scene.cameras.main.centerY - 100, 'player');
    this.init();
  }

  public scene: Game;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  public jumpCounter: number;

  private init(): void {
    this.jumpCounter = 0;
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
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
    
    if (this.jumpCounter > 0) {
      this.jumpCounter = this.jumpCounter > MAX_JUMP ? 0 : this.jumpCounter += delta;
    }

    if (this.cursors.space.isDown) {
      this.jump();
    }

    if ((this.y > this.scene.cameras.main.height + this.height / 2) || this.getBounds().bottom < 0) {
      this.scene.actions.gameOver();
    }
  }
}

export default Player;