import Menu from '../scenes/Menu';
import User from '../data/User';

class MenuActions {
  constructor(scene: Menu) {
    this._scene = scene;
  }

  private _scene: Menu;

  public startGame(): void {
    User.resetScore();
    this._scene.scene.start('Game');
  }
}

export default MenuActions;