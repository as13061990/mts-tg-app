import Menu from '../scenes/Menu';
import Button from '../components/Button';
import { screen } from '../types/enums';
import Settings from '../data/Settings';

class Rules implements Iscreen {
  constructor(scene: Menu) {
    this.scene = scene;
    this.init();
  }

  public readonly type: screen = screen.RULES;
  private scene: Menu;
  private logo: Phaser.GameObjects.Sprite;
  private text: Phaser.GameObjects.Text;
  private runFinsih: Phaser.GameObjects.Text;
  private thousand: Phaser.GameObjects.Text;
  private bonusRuble: Phaser.GameObjects.Text;
  private fromUralsib: Phaser.GameObjects.Text;
  private goodluck: Phaser.GameObjects.Text;
  private start: Button;

  private init(): void {
    const { centerX, centerY } = this.scene.cameras.main;

    this.scene.add.text(centerX, centerY - 100, Settings.lang.rules, {
      font: '27px Triomphe',
      color: '#000000',
      align: 'center',
      wordWrap: { width: 600 }
    }).setOrigin(0.5, 0);

    this.start = new Button(this.scene, centerX, this.scene.cameras.main.height - 140, 'start-btn');
    this.start.callback = (): void => this.scene.actions.clickStartBtn();
  }

  public show(): void {
    this.logo.setVisible(true);
    this.text.setVisible(true);
    this.runFinsih.setVisible(true);
    this.thousand.setVisible(true);
    this.bonusRuble.setVisible(true);
    this.fromUralsib.setVisible(true);
    this.goodluck.setVisible(true);
    this.start.setVisible(true);
  }

  public hide(): void {
    this.logo.setVisible(false);
    this.text.setVisible(false);
    this.runFinsih.setVisible(false);
    this.thousand.setVisible(false);
    this.bonusRuble.setVisible(false);
    this.fromUralsib.setVisible(false);
    this.goodluck.setVisible(false);
    this.start.setVisible(false);
  }
}

export default Rules;