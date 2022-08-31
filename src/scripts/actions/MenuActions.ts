import Menu from '../scenes/Menu';
import User from '../data/User';
import Settings from '../data/Settings';

class MenuActions {
  constructor(scene: Menu) {
    this._scene = scene;
  }

  private _scene: Menu;

  public startGame(): void {
    User.resetScore();
    Settings.sounds.stopMusic();
    this._scene.scene.start('Game');
  }
}

export default MenuActions;