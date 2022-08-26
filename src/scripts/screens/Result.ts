import Button from '../components/Button';
import Settings from '../data/Settings';
import User from '../data/User';
import Menu from '../scenes/Menu';
import { screen } from '../types/enums';

class Result implements Iscreen {
  constructor(scene: Menu) {
    this._scene = scene;
    this.init();
  }

  private _scene: Menu;
  public readonly type: screen = screen.RESULT;

  private init(): void {
    this._builInfo();
    this._buildButtons();
  }

  private _builInfo(): void {
    const { centerX, height } = this._scene.cameras.main;
    const score = User.getScore();
    const index = score >= 800 ? 4 : score < 800 && score >= 300 ? 3 : score < 300 && score >= 100 ? 2 : 1;

    const bg = this._scene.add.sprite(centerX, height / 12, 'result-bg').setOrigin(0.5, 0);
    const bounds = bg.getBounds();

    this._scene.add.sprite(bounds.right - 25, bounds.top + 35, 'result-logo').setOrigin(1, 0);

    const smile = this._scene.add.sprite(bounds.left + 40, bounds.top + 95, 'smile-' + index).setOrigin(0, 0.5);

    this._scene.add.text(smile.x + smile.displayWidth + 35, smile.y, String(score), {
      font: '60px MTS-UltraWide',
      color: '#FF0000'
    }).setOrigin(0, 0.5);

    const headerY = index === 4 ? smile.y + 70 : smile.y + 85;
    const header = this._scene.add.text(bounds.left + 40, headerY, Settings.lang['resultHeader' + index].toUpperCase(), {
      font: '45px MTS-UltraWide',
      color: '#000000'
    }).setLineSpacing(1);
    
    const font = index === 4 ? '25px ' : '26px ';
    const descrY = index === 4 ? header.getBounds().bottom + 15 : header.getBounds().bottom + 30;
    const descr = this._scene.add.text(bounds.left + 40, descrY, Settings.lang['resultDescrBold' + index], {
      font: font + 'MTS-Medium',
      color: '#000000'
    }).setLineSpacing(5);

    this._scene.add.text(bounds.left + 40, descr.getBounds().bottom + 20, Settings.lang['resultDescr' + index], {
      font: font + 'MTS-Regular',
      color: '#000000',
      wordWrap: { width: 550 }
    }).setLineSpacing(5);
  }

  private _buildButtons(): void {
    const { centerX, height } = this._scene.cameras.main;
    const start = new Button(this._scene, centerX, height - height / 10, 'red-button');
    start.text = this._scene.add.text(start.x, start.y, Settings.lang.getCard, {
      font: '34px MTS-UltraWide',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);
    start.callback = (): void => {
      const link = 'https://www.mtsbank.ru/factory/l/karti/mir-lite-cashback/lukoil/';
      const a = document.createElement('a');
      a.setAttribute('target', '_blank');
      document.body.appendChild(a);
      a.href = link;
      a.click();
      document.body.removeChild(a);
    }

    const rating = new Button(this._scene, centerX - 160, start.y - 100, 'black-button');
    rating.text = this._scene.add.text(rating.x, rating.y, Settings.lang.ratingsTable, {
      font: '18px MTS-UltraWide',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);
    rating.callback = (): void => {
      console.log('rating');
    }

    const again = new Button(this._scene, centerX + 160, start.y - 100, 'grey-button');
    again.text = this._scene.add.text(again.x, again.y, Settings.lang.playAgain, {
      font: '18px MTS-UltraWide',
      color: '#FF0000'
    }).setOrigin(0.5, 0.5);
    again.callback = (): void => this._scene.actions.startGame();
  }
}

export default Result;