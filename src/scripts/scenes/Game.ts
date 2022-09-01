import Background from '../components/Background';
import GameActions from '../actions/GameActions';
import Player from '../components/Player';
import User from '../data/User';
import Points from '../components/Points';
import Health from '../components/Health';

class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  public tween: Phaser.Tweens.Tween[];
  public player: Player;
  public points: Points;
  public health: Health;
  public actions: GameActions = new GameActions(this);
  public bg: Background;
  public gameOver: boolean;
  public mts: boolean;
  public bonuses: Phaser.Physics.Arcade.Group;
  public obstacles: Phaser.Physics.Arcade.Group;

  public init(): void {
    this.tween = [];
    this.gameOver = false;
    this.mts = true;
    User.resetScore();
    User.resetHealth();
  }

  public create(): void {
    this.bg = new Background(this);
    this.player = new Player(this);
    this.points = new Points(this);
    this.bonuses = this.physics.add.group();
    this.obstacles = this.physics.add.group();
    this.actions.createClickZone();
    this.actions.setWorldBounds();
    this.actions.interval();
    this.actions.setRunning();
    this.actions.startMusic();
    this.actions.setCollisions(); 
    this.time.addEvent({ delay: 1300, callback: (): void => {
      this.actions.createBonus();
    }, loop: false });
    this._test();
  }

  private _test(): void {
    const cursors = this.input.keyboard.createCursorKeys();
    cursors.space.on('down', (): void => {
      // @ts-ignore
      // this.actions._damage();
    });
  }
}

export default Game;