import MenuActions from '../actions/MenuActions';
import Settings from '../data/Settings';
import Rules from '../screens/Rules';
import Result from '../screens/Result';
import { screen } from '../types/enums';

class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
  }
  
  public actions: MenuActions = new MenuActions(this);
  public screen: Iscreen;

  public preload(): void {
    this.actions.loadAssets();
  }

  public create(): void {
    if (Settings.screen === screen.RULES) {
      this.screen = new Rules(this);
    } else if (Settings.screen === screen.RESULT) {
      this.screen = new Result(this);
    }
  }
}

export default Menu;