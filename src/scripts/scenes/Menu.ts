import MenuActions from '../actions/MenuActions';
import Settings from '../data/Settings';
import Rules from '../screens/Rules';
import Result from '../screens/Result';
import Loading from '../components/Loading';
import { screen } from '../types/enums';
import Rating from '../screens/Rating';
import Scrolling from '../libs/Scrolling';

class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
  }
  
  public actions: MenuActions = new MenuActions(this);
  public screen: Iscreen;
  private _loading: boolean = false;
  public scrolling: Scrolling;

  public init(): void {
    this.scrolling?.destroy();
  }

  public preload(): void {
    if (this._loading === false) {
      this._loading = true;
      new Loading(this);
    }
  }

  public create(): void {
    const { centerX, centerY } = this.cameras.main;
    this.add.sprite(centerX, centerY, 'loading-bg');

    if (Settings.getScreen() === screen.RULES) {
      this.screen = new Rules(this);
    } else if (Settings.getScreen() === screen.RESULT) {
      this.screen = new Result(this);
    } else if (Settings.getScreen() === screen.RATING) {
      this.screen = new Rating(this);
    }
    Settings.sounds.playMusic('menu');
  }
}

export default Menu;