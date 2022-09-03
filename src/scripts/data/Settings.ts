import langs from '../data/langs';
import { screen } from '../types/enums';

class Settings {

  public readonly sizes = {
    width: 720,
    minHeight: 911,
    maxHeight: 1620
  }
  public readonly lang: { [key: string]: string } = langs.ru;
  private _screen: screen = screen.RULES;
  private _mobile: boolean = false;
  private _black: boolean = false;
  public readonly speed: number = 4000;
  public sounds: Isounds;

  public setScreen(screen: screen): screen {
    this._screen = screen;
    return this._screen;
  }

  public getScreen(): screen {
    return this._screen;
  }

  public getSpeed(): number {
    return this.speed;
  }

  public isMobile(): boolean {
    return this._mobile;
  }

  public setMobile(mobile: boolean): boolean {
    this._mobile = mobile;
    return this._mobile;
  }

  public isBlack(): boolean {
    return this._black;
  }

  public setBlack(black: boolean): boolean {
    this._black = black;
    return this._black;
  }
}

export default new Settings();