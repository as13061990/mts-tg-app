import MenuActions from '../actions/MenuActions';
import Settings from '../data/Settings';
import Rules from '../screens/Rules';
import Result from '../screens/Result';
import Loading from '../components/Loading';
import { screen } from '../types/enums';

class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
  }
  
  public actions: MenuActions = new MenuActions(this);
  public screen: Iscreen;
  private _loading: boolean = false;

  public preload(): void {
    if (this._loading === false) {
      this._loading = true;
      new Loading(this);
    }
  }

  public create(): void {
    const { centerX, centerY } = this.cameras.main;
    this.add.sprite(centerX, centerY, 'loading-bg');

    if (Settings.screen === screen.RULES) {
      this.screen = new Rules(this);
    } else if (Settings.screen === screen.RESULT) {
      this.screen = new Result(this);
    }
  }
}

export default Menu;