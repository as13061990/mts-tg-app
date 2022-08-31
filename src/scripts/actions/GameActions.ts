import Game from '../scenes/Game';
import Zone from '../components/Zone';
import { screen } from '../types/enums';
import Settings from '../data/Settings';
import Score from '../components/Score';
import User from '../data/User';
import NPC from '../components/NPC';
import Bonus from '../components/Bonus';
import Premium from '../components/Premium';
import Player from '../components/Player';
import Health from '../components/Health';
import Obstacle from '../components/Obstacle';

class GameActions {
  constructor(scene: Game) {
    this._scene = scene;
  }

  private _scene: Game;

  public createClickZone(): void {
    const { centerX, centerY, width, height } = this._scene.cameras.main;
    const zone = new Zone(this._scene, centerX, centerY, width, height);
    zone.downCallback = (): void => this._scene.player.jump();
    zone.upCallback = (): void => this._scene.player.resetJump();
  }

  public setWorldBounds(): void {
    const { width, height } = this._scene.cameras.main;
    const x = 0;
    const y = 0;
    this._scene.physics.world.setBounds(x, y, width, height - 240);
  }

  public gameOver(): void {
    this._scene.tween.map(tween => tween.stop());
    this._scene.gameOver = true;
    Settings.sounds.stopMusic();
    Settings.sounds.play('finish');
 
    this._scene.time.addEvent({ delay: 2000, callback: (): void => {
      Settings.setScreen(screen.RESULT);
      this._scene.scene.start('Menu');
    }, loop: false });
  }

  public interval(): void {
    this._scene.time.addEvent({ delay: 1000, callback: (): void => {
      if (!this._scene.gameOver && !this._scene.mts) {
        User.plusScore(1);
        this._scene.points.updatePoints();
      }
    }, loop: true });
  }

  public setRunning(): void {
    const tween = this._scene.tweens.add({
      targets: this._scene.bg,
      tilePositionX: { from: 0, to: this._scene.bg.width },
      duration: Settings.speed,
      repeat: -1,
      onStart: (): void => this.setNpc(),
      onRepeat: (): void => this.setNpc()
    });
    this._scene.tween.push(tween);
  }

  private setNpc(): void {
    const { width, height } = this._scene.cameras.main;
    const x = width + Phaser.Math.Between(0, 500);
    const y = height - 320;
    new NPC(this._scene, x, y, 'npc-' + Phaser.Math.Between(1, 4));
  }

  private _damage(): void {
    if (this._scene.player.getRecovery() === true) return;
    const health = User.minusHealht();
    this._scene.health.updateHealth();
    Settings.sounds.play('obstacle');

    if (health > 0) {
      this._scene.player.setDamage();
    } else {
      this._scene.player.destroy();
      this.gameOver();
    }
  }

  public startMusic(): void {
    Settings.sounds.play('start');
    this._scene.time.addEvent({ delay: 2000, callback: (): void => {
      Settings.sounds.playMusic('game');
    }, loop: false });
  }

  public setCollisions(): void {
    this._scene.physics.add.overlap(
      this._scene.player,
      this._scene.bonuses,
      this._bonusesCollisions.bind(this)
    );
    this._scene.physics.add.overlap(
      this._scene.player,
      this._scene.obstacles,
      this._obstaclesCollisions.bind(this)
    );
  }

  private _bonusesCollisions(player: Player, bonus: Phaser.Physics.Arcade.Sprite): void {
    if (bonus.texture.key === 'premium') {
      Settings.sounds.play('mts');
      this._scene.mts = false;
      this._scene.health = new Health(this._scene);
      this._scene.points.updatePoints();
    } else {
      const sound = bonus.texture.key === 'bonus-4' ? 'gas' : 'food';
      Settings.sounds.play(sound);
      const { centerX, top } = bonus.getBounds();
      new Score(this._scene, centerX, top, '+5%');
      User.plusScore(5);
      this._scene.points.updatePoints();
    }
    bonus.destroy();
  }

  private _obstaclesCollisions(): void {
    if (this._scene.player.getRecovery()) return;
    this._damage();
  }

  public createObjects(bonus?: boolean): void {
    this._scene.time.addEvent({ delay: Phaser.Math.Between(3000, 6000), callback: (): void => {
      if (bonus || this._scene.mts) {
        this._createBonus();
      } else {
        this._createObstacle();
      }
    }, loop: false });
  }

  private _createBonus(): void {
    if (this._scene.mts) {
      const bonus = new Premium(this._scene);
      this._scene.bonuses.add(bonus);
    } else {
      const bonus = new Bonus(this._scene);
      this._scene.bonuses.add(bonus);
    }
    this.createObjects();
  }

  private _createObstacle(): void {
    const obstacle = new Obstacle(this._scene);
    this._scene.obstacles.add(obstacle);
    this.createObjects(true);
  }
}

export default GameActions;