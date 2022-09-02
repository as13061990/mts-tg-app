import Button from '../components/Button';
import Settings from '../data/Settings';
import User from '../data/User';
import Utils from '../data/Utils';
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
    if (Settings.isMobile()) {
      this._buildMobileInfo();
      this._buildMobileButtons();
    } else {
      this._buildDesktopInfo();
      this._buildDesktopButtons();
    }
  }

  private _buildMobileInfo(): void {
    const { centerX, height } = this._scene.cameras.main;
    const score = User.getScore();
    const index = Utils.getScoreIndex();
    const centerY = (height - 275) / 2;

    const bg = this._scene.add.sprite(centerX, centerY, 'result-bg');
    const bgHeight = index === 1 ? 780 : index === 2 ? 815 : index === 3 ? 800 : bg.height;
    bg.setDisplaySize(bg.width, bgHeight);
    const bounds = bg.getBounds();

    this._scene.add.sprite(bounds.right - 40, bounds.top + 50, 'result-logo').setOrigin(1, 0);
    const smile = this._scene.add.sprite(bounds.left + 40, bounds.top + 45, 'mobile-smile-' + index).setOrigin(0, 0);
    this._scene.add.text(centerX + 140, smile.getBounds().bottom, String(score), {
      font: '80px MTS-UltraWide',
      color: '#FF0000'
    }).setOrigin(0.5, 1);

    const header = this._scene.add.text(bounds.left + 40, smile.getBounds().bottom + 36, Settings.lang['resultHeaderMobile' + index].toUpperCase(), {
      font: '60px MTS-UltraWide',
      color: '#000000'
    }).setLineSpacing(1);

    const descr = this._scene.add.text(bounds.left + 40, header.getBounds().bottom + 30, Settings.lang['resultDescrMobileBold' + index], {
      font: '33px MTS-Medium',
      color: '#000000'
    }).setLineSpacing(5);

    this._scene.add.text(bounds.left + 40, descr.getBounds().bottom + 40, Settings.lang['resultDescrMobile' + index], {
      font: '26px MTS-Regular',
      color: '#000000',
      wordWrap: { width: 550 }
    }).setLineSpacing(5);
  }

  private _buildDesktopInfo(): void {
    const { centerX, height } = this._scene.cameras.main;
    const score = User.getScore();
    const index = Utils.getScoreIndex();

    const bg = this._scene.add.sprite(centerX, height / 12, 'result-bg').setOrigin(0.5, 0);
    const bounds = bg.getBounds();

    this._scene.add.sprite(bounds.right - 25, bounds.top + 35, 'result-logo').setOrigin(1, 0);

    const smile = this._scene.add.sprite(bounds.left + 40, bounds.top + 95, 'smile-' + index).setOrigin(0, 0.5);

    this._scene.add.text(smile.x + smile.displayWidth + 35, smile.y, String(score), {
      font: '60px MTS-UltraWide',
      color: '#FF0000'
    }).setOrigin(0, 0.5);

    const header = this._scene.add.text(bounds.left + 40, smile.y + 70, Settings.lang['resultHeader' + index].toUpperCase(), {
      font: '40px MTS-UltraWide',
      color: '#000000'
    }).setLineSpacing(1);
    
    const descr = this._scene.add.text(bounds.left + 40, header.getBounds().bottom + 15, Settings.lang['resultDescrBold' + index], {
      font: '25px MTS-Medium',
      color: '#000000'
    }).setLineSpacing(5);

    this._scene.add.text(bounds.left + 40, descr.getBounds().bottom + 20, Settings.lang['resultDescr' + index], {
      font: '25px MTS-Regular',
      color: '#000000',
      wordWrap: { width: 550 }
    }).setLineSpacing(5);
  }

  private _buildMobileButtons(): void {
    const { centerX, height } = this._scene.cameras.main;
    const start = new Button(this._scene, centerX, height - 105, 'red-button');
    start.text = this._scene.add.text(start.x, start.y, Settings.lang.getCard, {
      font: '34px MTS-UltraWide',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);
    start.callback = (): void => this._openLink();

    const rating = new Button(this._scene, centerX - 160, start.y - 120, 'black-button');
    rating.text = this._scene.add.text(rating.x, rating.y, Settings.lang.ratingsTable.toUpperCase(), {
      font: '18px MTS-UltraWide',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);
    rating.callback = (): void => {
      console.log('rating');
    }

    const again = new Button(this._scene, centerX + 160, start.y - 120, 'grey-button');
    again.text = this._scene.add.text(again.x, again.y, Settings.lang.playAgain.toUpperCase(), {
      font: '18px MTS-UltraWide',
      color: '#FF0000'
    }).setOrigin(0.5, 0.5);
    again.callback = (): void => this._scene.actions.startGame();
  }

  private _buildDesktopButtons(): void {
    const { centerX, height } = this._scene.cameras.main;
    const start = new Button(this._scene, centerX, height - height / 10, 'red-button');
    start.text = this._scene.add.text(start.x, start.y, Settings.lang.getCard, {
      font: '34px MTS-UltraWide',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);
    start.callback = (): void => this._openLink();

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

  
  private _openLink(): void {
    const link = 'https://www.mtsbank.ru/factory/l/credit-lukoil/?utm_source=mrk_game&utm_medium=tg_sp&utm_campaign=is0_mts_premium_nozh_q3_nontv_2022&utm_term=button';
    const a = document.createElement('a');
    a.setAttribute('target', '_blank');
    document.body.appendChild(a);
    a.href = link;
    a.click();
    document.body.removeChild(a);
  }
}

export default Result;