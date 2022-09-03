import * as Webfont from 'webfontloader';
import User from '../data/User';
import loadingBg from '../../assets/images/loading-bg.jpg';
import loadingDogDesktop from '../../assets/images/desktop/loading-dog.png';
import loadingDogMobile from '../../assets/images/mobile/loading-dog.png';
import mtsBankDesktop from '../../assets/images/desktop/mts-bank.png';
import mtsBankMobile from '../../assets/images/mobile/mts-bank.png';
import loadingProgress from '../../assets/images/loading-progress.png';
import Sounds from '../actions/Sounds';
import Settings from '../data/Settings';

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        viewportHeight: number;
        viewportStableHeight: number;
        ready: () => void;
        expand: () => void;
        themeParams: any,
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
      this.scene.launch('Menu');
    }
  }

  private async checkUser(): Promise<void> {
    const telegram = window.Telegram.WebApp;
    telegram.ready();
    telegram.expand();

    console.log(telegram.themeParams);
    

    try { User.setID(telegram.initDataUnsafe.user.id); }
    catch (e) { User.setID('0'); }
    
    try { User.setName(telegram.initDataUnsafe.user.first_name); }
    catch (e) { User.setName('Неизвестный игрок'); }
    
    try { User.setUsername(telegram.initDataUnsafe.user.username); }
    catch (e) { User.setUsername('no_username'); }

    this._user = true;
  }
}

export default Boot;