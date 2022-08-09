import Button from '../components/Button';
import Menu from '../scenes/Menu';
import Settings from '../data/Settings';
import { screen } from '../types/enums';

class Result implements Iscreen {
  constructor(scene: Menu) {
    this.scene = scene;
    this.init();
  }

  private scene: Menu;
  public readonly type: screen = screen.RESULT;

  private init(): void {
    const camera = this.scene.cameras.main;
    const percent = camera.height / 100;

    this.scene.add.text(camera.centerX, camera.centerY - percent * 19, Settings.lang.resultDescr, {
      font: '27px stolzl_light',
      color: '#000000',
      align: 'center'
    }).setOrigin(0.5, 0);
    
    const ad = this.scene.add.text(camera.centerX + 20, camera.centerY + percent * 4.5, Settings.lang.ad, {
      font: '27px stolzl_medium',
      color: '#000000',
      align: 'center'
    }).setOrigin(0.5, 0.5).setLineSpacing(5);
    
    const attention1 = this.scene.add.text(camera.centerX - 253, camera.centerY + percent * 15, Settings.lang.attention1, {
      font: '24px stolzl_light',
      color: '#000000'
    }).setOrigin(0, 0.5);

    this.scene.add.text(attention1.getBounds().right + 12, attention1.y, Settings.lang.only, {
      font: '24px stolzl_medium',
      color: '#000000'
    }).setOrigin(0, 0.5);

    const oneApplication = this.scene.add.text(camera.centerX - 248, attention1.y + 35, Settings.lang.oneApplication, {
      font: '24px stolzl_medium',
      color: '#000000'
    }).setOrigin(0, 0.5);

    this.scene.add.text(oneApplication.getBounds().right + 12, oneApplication.y, Settings.lang.attention2, {
      font: '24px stolzl_light',
      color: '#000000'
    }).setOrigin(0, 0.5);

    this.scene.add.text(camera.centerX, oneApplication.y + 20, Settings.lang.attention3, {
      font: '24px stolzl_light',
      color: '#000000',
      align: 'center'
    }).setOrigin(0.5, 0).setLineSpacing(7);

    const again = new Button(this.scene, camera.centerX, camera.height - 80, 'again-btn');
    const prize = new Button(this.scene, camera.centerX, again.getBounds().top - 60, 'prize-btn');
    again.callback = (): void => {
      this.scene.scene.start('Game');
    }
    prize.callback = (): void => {
      
    }
  }

  public hide(): void {}
  public show(): void {}
}

export default Result;