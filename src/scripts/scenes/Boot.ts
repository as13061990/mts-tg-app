import * as Webfont from 'webfontloader';
import User from '../data/User';
import loadingBg from '../../assets/images/loading-bg.jpg';
import loadingDog from '../../assets/images/loading-dog.png';
import mtsBank from '../../assets/images/mts-bank.png';
import loadingProgress from '../../assets/images/loading-progress.png';

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        viewportHeight: number;
        viewportStableHeight: number;
        ready: () => void;
        expand: () => void;
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

  public build: string = 'v1.0.0';
  private fontsReady: boolean = false;
  private userReady: boolean = false;

  public init(): void {
    Webfont.load({
      custom: {
        families: ['MTS-Black', 'MTS-Bold', 'MTS-Medium', 'MTS-Regular', 'MTS-UltraWide']
      },
      active: (): void => {
        this.fontsReady = true;
      }
    });
    this.checkUser();
  }

  public preload(): void {
    this.load.image('loading-bg', loadingBg);
    this.load.image('loading-dog', loadingDog);
    this.load.image('mts-bank', mtsBank);
    this.load.image('loading-progress', loadingProgress);
  }

  public update(): void {
    if (this.userReady && this.fontsReady) {
      console.log('build', this.build);
      this.userReady = false;
      this.fontsReady = false;
      this.scene.launch('Menu');
    }
  }

  private async checkUser(): Promise<void> {
    const telegram = window.Telegram.WebApp;

    try { User.setID(telegram.initDataUnsafe.user.id); }
    catch (e) { User.setID('0'); }
    
    try { User.setName(telegram.initDataUnsafe.user.first_name); }
    catch (e) { User.setName('Неизвестный игрок'); }
    
    try { User.setUsername(telegram.initDataUnsafe.user.username); }
    catch (e) { User.setUsername('no_username'); }

    this.userReady = true;
  }
}

export default Boot;