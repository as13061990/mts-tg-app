import Button from '../components/Button';
import Menu from '../scenes/Menu';
import { screen } from '../types/enums';

class Result implements Iscreen {
  constructor(scene: Menu) {
    this.scene = scene;
    this.init();
  }

  private scene: Menu;
  public readonly type: screen = screen.RESULT;

  private init(): void {
    const { centerX, height } = this.scene.cameras.main;

    const again = new Button(this.scene, centerX, height - 150, 'again-btn');
    again.callback = (): void => {
      this.scene.scene.start('Game');
    }
  }

  public hide(): void {}
  public show(): void {}
}

export default Result;