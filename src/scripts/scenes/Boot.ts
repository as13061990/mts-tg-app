import * as Webfont from '../libs/Webfonts.js';
import User from '../data/User';
import loading from '../../assets/images/loading.png';

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
        families: ['Triomphe']
      },
      active: (): void => {
        this.fontsReady = true;
      }
    });
    this.checkUser();
  }

  public preload(): void {
    this.load.image('loading', loading);
  }

  public update(): void {
    if (this.userReady && this.fontsReady) {
      console.clear();
      console.log('build', this.build);
      this.userReady = false;
      this.fontsReady = false;
      this.scene.launch('Menu');
    }
  }

  private async checkUser(): Promise<void> {
    const telegram = window.Telegram.WebApp;
    telegram.ready();
    telegram.expand();
    console.clear();
    console.log(telegram.viewportHeight, telegram.viewportStableHeight);
    console.log(telegram);
    
    
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