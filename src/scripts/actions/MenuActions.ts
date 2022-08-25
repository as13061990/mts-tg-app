import Menu from '../scenes/Menu';

class MenuActions {
  constructor(scene: Menu) {
    this._scene = scene;
  }

  private _scene: Menu;

  public clickStartBtn(): void {
    this._scene.scene.start('Game');
  }
}

export default MenuActions;