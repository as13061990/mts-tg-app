import Background from '../components/Background';
import GameActions from '../actions/GameActions';
import Player from '../components/Player';
import User from '../data/User';
import Points from '../components/Points';
import Health from '../components/Health';
import Pause from '../components/Pause';

class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  public tween: Phaser.Tweens.Tween[];
  public player: Player;
  public points: Points;
  public health: Health;
  public pause: Pause;
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
    User.resetTimer();
  }

  public create(): void {
    this.bg = new Background(this);
    this.player = new Player(this);
    this.points = new Points(this);
    this.pause = new Pause(this);
    this.bonuses = this.physics.add.group();
    this.obstacles = this.physics.add.group();
    this.actions.start();
    this._test();
  }

  private _fps: Phaser.GameObjects.Text;
  private _test(): void {
    const { width, height } = this.cameras.main;
    this._fps = this.add.text(width - 40, height - 40, '', {
      font: '40px MTS-UltraWide',
      color: '#FF0000'
    }).setOrigin(1, 0.5);

    const cursors = this.input.keyboard.createCursorKeys();
    cursors.space.on('down', (): void => {
      // @ts-ignore
      // this.actions._damage();
    });
  }

  public update(time: number, delta: number): void {
    const fps = 'FPS: ' + (1000 / delta).toFixed(0);
    this._fps.setText(fps);
  }
}

export default Game;