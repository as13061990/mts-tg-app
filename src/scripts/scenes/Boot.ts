import * as Webfont from 'webfontloader';
import User from '../data/User';
import loadingBgWhite from '../../assets/images/loading-bg-white.jpg';
import loadingBgBlack from '../../assets/images/loading-bg-black.jpg';
import loadingDogDesktop from '../../assets/images/desktop/loading-dog.png';
import loadingDogMobile from '../../assets/images/mobile/loading-dog.png';
import mtsBankDesktop from '../../assets/images/desktop/mts-bank.png';
import mtsBankMobile from '../../assets/images/mobile/mts-bank.png';
import loadingProgressWhite from '../../assets/images/loading-progress-white.png';
import loadingProgressBlack from '../../assets/images/loading-progress-black.png';
import Sounds from '../actions/Sounds';
import Settings from '../data/Settings';
import axios from 'axios';

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        viewportHeight: number;
        viewportStableHeight: number;
        ready: () => void;
        expand: () => void;
        themeParams: {
          bg_color: string;
          text_color: string;
          hint_color: string;
          link_color: string;
          button_color: string;
          button_text_color: string;
          secondary_bg_color: string;
        },
        initDataUnsafe: {
          user: {
            id: string;
            first_name: string;
            last_name: string;
            username: string;
            language_code: string;
          }
        }
      };
    }
  }
}

class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  public _build: string = 'v1.0.0';
  private _fonts: boolean = false;
  private _user: boolean = false;

  public init(): void {
    Webfont.load({
      custom: {
        families: ['MTS-Black', 'MTS-Bold', 'MTS-Medium', 'MTS-Regular', 'MTS-UltraWide']
      },
      active: (): void => {
        this._fonts = true;
      }
    });
    this.checkUser();
    Settings.sounds = new Sounds(this);
  }

  public preload(): void {
    const loadingDog = Settings.isMobile() ? loadingDogMobile : loadingDogDesktop;
    const mtsBank = Settings.isMobile() ? mtsBankMobile : mtsBankDesktop;
    const loadingBg = Settings.isBlack() ? loadingBgBlack : loadingBgWhite;
    const loadingProgress = Settings.isBlack() ? loadingProgressBlack : loadingProgressWhite;
    this.load.image('loading-bg', loadingBg);
    this.load.image('loading-dog', loadingDog);
    this.load.image('mts-bank', mtsBank);
    this.load.image('loading-progress', loadingProgress);
  }

  public update(): void {
    if (this._user && this._fonts) {
      console.log('build', this._build);
      this._user = false;
      this._fonts = false;
      this.scene.start('Menu');
    }
  }

  private async checkUser(): Promise<void> {
    const telegram = window.Telegram.WebApp;
    telegram.ready();
    telegram.expand();
    // this._checkTheme(telegram.themeParams.bg_color || '#FFFFFF');
    this._checkTheme(telegram.themeParams.bg_color || '#17212b');

    try { User.setID(telegram.initDataUnsafe.user.id); }
    catch (e) { User.setID('0'); }
    
    try { User.setUsername(telegram.initDataUnsafe.user.username); }
    catch (e) { User.setUsername('no_username'); }

    try { User.setFirstName(telegram.initDataUnsafe.user.first_name); }
    catch (e) { User.setFirstName('Неизвестный игрок'); }
    
    try { User.setLastName(telegram.initDataUnsafe.user.last_name); }
    catch (e) { User.setLastName(''); }

    axios.post(process.env.API + '/getData', {
      id: User.getID(),
      username: User.getUsername(),
      first_name: User.getFirstName(),
      last_name: User.getLastName()
    }).then(res => {
      if (!res.data.error) {
        const record: number = res.data.data.record;
        User.setRecord(record);
      }
    });
    this._user = true;
  }

  private _checkTheme(bg: string): void {
    const color = bg.substring(1);
    const rgb = parseInt(color, 16);
    const r = (rgb >> 16) & 0xFF;
    const g = (rgb >> 8) & 0xFF;
    const b = (rgb >> 0) & 0xFF;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (luma < 40) Settings.setBlack(true);
  }
}

export default Boot;