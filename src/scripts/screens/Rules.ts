import Menu from '../scenes/Menu';
import Button from '../components/Button';
import { screen } from '../types/enums';
import Settings from '../data/Settings';

class Rules implements Iscreen {
  constructor(scene: Menu) {
    this._scene = scene;
    this._build();
  }

  public readonly type: screen = screen.RULES;
  private _scene: Menu;

  private _build(): void {
    this._buildHeader();
    this._buildRules();
    this._buildButton();
  }

  private _buildHeader(): void {
    const { height } = this._scene.cameras.main;
    this._scene.add.text(55, height / 6, Settings.lang.gameRules, {
      font: '56px MTS-UltraWide',
      color: '#171717',
      wordWrap: { width: 630 }
    }).setOrigin(0, 1);
  }

  private _buildRules(): void {
    const { centerX, centerY } = this._scene.cameras.main;
    const bg = this._scene.add.sprite(centerX, centerY, 'rules-bg');
    const bounds = bg.getBounds();
    this._scene.add.text(bounds.left + 40, bounds.top + 30, Settings.lang.makeHappyDog, {
      font: '40px MTS-Bold',
      color: '#FF0000'
    }).setLineSpacing(2);

    const descr1 = this._scene.add.text(bounds.left + 40, bounds.top + 130, Settings.lang.rulesDescr1, {
      font: '20px MTS-Regular',
      color: '#000000'
    }).setLineSpacing(2);
    this._scene.add.text(bounds.left + 127, descr1.getBounds().bottom, Settings.lang.rulesDescr2, {
      font: '20px MTS-Bold',
      color: '#000000'
    }).setOrigin(0, 1);
    const descr4 = this._scene.add.text(bounds.left + 40, descr1.getBounds().bottom + 20, Settings.lang.rulesDescr4, {
      font: '20px MTS-Regular',
      color: '#000000'
    });
    this._scene.add.text(bounds.left + 40, descr4.getBounds().bottom + 15, Settings.lang.rulesDescr3, {
      font: '20px MTS-Regular',
      color: '#000000'
    }).setLineSpacing(2);
  }

  private _buildButton(): void {
    const { centerX, height } = this._scene.cameras.main;
    const start = new Button(this._scene, centerX, height - 100, 'red-button');
    start.text = this._scene.add.text(start.x, start.y, Settings.lang.play, {
      font: '34px MTS-UltraWide',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);
    start.callback = (): void => this._scene.actions.startGame();
  }
}

export default Rules;