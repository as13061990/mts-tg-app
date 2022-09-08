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
    if (Settings.isMobile()) {
      this._buildMobileHeader();
      this._buildMobileRules()
      this._buildMobileButton();
    } else {
      this._buildDesktopHeader();
      this._buildDesktopRules();
      this._buildDesktopButton();
    }
  }

  private _buildMobileHeader(): void {
    const textColor = Settings.isBlack() ? '#FFFFFF' : '#171717';
    this._scene.add.text(55, 50, Settings.lang.gameRules, {
      font: '80px MTS-UltraWide',
      color: textColor,
      wordWrap: { width: 630 }
    }).setLineSpacing(6);
  }

  private _buildDesktopHeader(): void {
    const textColor = Settings.isBlack() ? '#FFFFFF' : '#171717';
    const { height } = this._scene.cameras.main;
    this._scene.add.text(55, height / 6, Settings.lang.gameRules, {
      font: '56px MTS-UltraWide',
      color: textColor,
      wordWrap: { width: 630 }
    }).setOrigin(0, 1);
  }

  private _buildMobileRules(): void {
    const { centerX, centerY } = this._scene.cameras.main;
    const bg = this._scene.add.sprite(centerX, centerY + 35, 'rules-bg');
    const bounds = bg.getBounds();
    const header = this._scene.add.text(bounds.left + 35, bounds.top + 30, Settings.lang.makeHappyDog, {
      font: '40px MTS-Bold',
      color: '#FF0000'
    }).setLineSpacing(2);
    const textColor = Settings.isBlack() ? '#FFFFFF' : '#000000';

    const textDescr1 = 'Для этого прыгай через преграды\nи собирай суперкешбэк 5% на самые\nпопулярные категории';
    const descr1 = this._scene.add.text(bounds.left + 35, header.getBounds().bottom + 30, textDescr1, {
      font: '27px MTS-Regular',
      color: textColor
    }).setLineSpacing(2);
    this._scene.add.text(centerX + 28, descr1.getBounds().bottom, 'по карте', {
      font: '27px MTS-Bold',
      color: textColor
    }).setOrigin(0, 1);
    
    const descr2 = this._scene.add.text(bounds.left + 35, descr1.getBounds().bottom + 6, Settings.lang.rulesDescr2, {
      font: '27px MTS-Bold',
      color: textColor
    }).setLineSpacing(2);
    const descr3 = this._scene.add.text(bounds.left + 35, descr2.getBounds().bottom + 33, Settings.lang.rulesDescr3, {
      font: '27px MTS-Bold',
      color: '#FF0000'
    }).setLineSpacing(2);
    
    const textDescr4 = 'Собирай бонусы и избегай препятствий\nс помощью прыжка, для этого нажимай\nна любую часть экрана, чем дольше\nнажатие – тем выше прыжок.\n\nУ тебя будет 3 жизни – они будут сгорать\nпри столкновении с препятствиями.\nКак только сгорит последняя –\nигра закончится.';
    this._scene.add.text(bounds.left + 35, descr3.getBounds().bottom + 28, textDescr4, {
      font: '27px MTS-Regular',
      color: textColor
    }).setLineSpacing(2);
  }

  private _buildDesktopRules(): void {
    const { centerX, centerY } = this._scene.cameras.main;
    const bg = this._scene.add.sprite(centerX, centerY, 'rules-bg');
    const bounds = bg.getBounds();
    this._scene.add.text(bounds.left + 40, bounds.top + 30, Settings.lang.makeHappyDog, {
      font: '40px MTS-Bold',
      color: '#FF0000'
    }).setLineSpacing(2);
    const textColor = Settings.isBlack() ? '#FFFFFF' : '#000000';

    const textDescr1 = 'Для этого прыгай через преграды и собирай\nсуперкешбэк 5% на самые популярные категории\n';
    const descr1 = this._scene.add.text(bounds.left + 40, bounds.top + 130, textDescr1, {
      font: '20px MTS-Regular',
      color: textColor
    }).setLineSpacing(2);
    this._scene.add.text(bounds.left + 40, descr1.getBounds().bottom + 2, 'по карте ' + Settings.lang.rulesDescr2, {
      font: '20px MTS-Bold',
      color: textColor
    }).setOrigin(0, 1);
    const descr3 = this._scene.add.text(bounds.left + 40, descr1.getBounds().bottom + 20, Settings.lang.rulesDescr3, {
      font: '20px MTS-Bold',
      color: '#FF0000'
    });

    const textDescr4 = 'Собирай бонусы и избегай препятствий с помощью\nпрыжка, для этого нажимай на любую часть экрана,\nчем дольше нажатие – тем выше прыжок.\n\nУ тебя будет 3 жизни – они будут сгорать\nпри столкновении с препятствиями.\nКак только сгорит последняя – игра закончится.';
    this._scene.add.text(bounds.left + 40, descr3.getBounds().bottom + 15, textDescr4, {
      font: '20px MTS-Regular',
      color: textColor
    }).setLineSpacing(2);
  }

  private _buildMobileButton(): void {
    const { centerX, height } = this._scene.cameras.main;
    const start = new Button(this._scene, centerX, height - 120, 'red-button');
    start.text = this._scene.add.text(start.x, start.y, Settings.lang.play, {
      font: '48px MTS-UltraWide',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);
    start.callback = (): void => this._scene.actions.startGame();
  }

  private _buildDesktopButton(): void {
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