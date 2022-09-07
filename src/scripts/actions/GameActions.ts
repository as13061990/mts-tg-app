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

  public start(): void {
    this._createClickZone();
    this._setWorldBounds();
    this._interval();
    this._setRunning();
    this._startMusic();
    this._setCollisions(); 
    this._scene.time.addEvent({ delay: 1300, callback: (): void => {
      this._createBonus();
    }, loop: false });
  }

  private _createClickZone(): void {
    const { centerX, centerY, width, height } = this._scene.cameras.main;
    const zone = new Zone(this._scene, centerX, centerY, width, height);
    zone.downCallback = (): void => this._scene.player.jump();
    zone.upCallback = (): void => this._scene.player.resetJump();
  }

  private _setWorldBounds(): void {
    const { width, height } = this._scene.cameras.main;
    this._scene.physics.world.setBounds(0, 0, width, height - 285);
  }

  private _gameOver(): void {
    this._scene.tween.map(tween => tween.stop());
    this._scene.gameOver = true;
    Settings.sounds.stopMusic();
    Settings.sounds.play('finish');
 
    this._scene.time.addEvent({ delay: 2000, callback: (): void => {
      Settings.setScreen(screen.RESULT);
      this._scene.scene.start('Menu');
    }, loop: false });
  }

  private _interval(): void {
    this._scene.time.addEvent({ delay: 1000, callback: (): void => {
      if (!this._scene.gameOver && !this._scene.mts) {
        User.plusScore(3);
        this._scene.points.updatePoints();
      }
      User.plusTimer();
    }, loop: true });
  }

  private _setRunning(): void {
    const tween = this._scene.tweens.add({
      targets: this._scene.bg,
      tilePositionX: { from: 0, to: this._scene.bg.width },
      duration: Settings.speed,
      repeat: -1,
      onStart: (): void => this._setNpc(),
      onRepeat: (): void => this._setNpc()
    });
    this._scene.tween.push(tween);
  }

  private _setNpc(): void {
    const { width, height } = this._scene.cameras.main;
    const x = width + Phaser.Math.Between(0, 500);
    const y = height - 320;
    const random = Phaser.Math.Between(1, 6);
    const type = random === 6 ? Phaser.Math.Between(6, 7) : random;
    new NPC(this._scene, x, y, 'npc-' + type);
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
      this._gameOver();
    }
  }

  private _startMusic(): void {
    Settings.sounds.play('start');
    this._scene.time.addEvent({ delay: 2000, callback: (): void => {
      Settings.sounds.playMusic('game');
    }, loop: false });
  }

  private _setCollisions(): void {
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

  private _createObjects(): void {
    const bonus = Phaser.Math.Between(1, 3) === 1 ? false : true;
    this._scene.time.addEvent({ delay: Phaser.Math.Between(3000, 4500), callback: (): void => {
      if (bonus) {
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
      const { height } = this._scene.cameras.main;
      const y = Phaser.Math.Between(1, 3) === 1 ? height - 220 : Phaser.Math.Between(height - 600, height - 400);
      const bonus = new Bonus(this._scene, y);
      this._scene.bonuses.add(bonus);
    }
    this._createObjects();
  }

  private _createObstacle(): void {
    const obstacle = new Obstacle(this._scene);
    this._scene.obstacles.add(obstacle);
    this._createObjects();
  }
}

export default GameActions;