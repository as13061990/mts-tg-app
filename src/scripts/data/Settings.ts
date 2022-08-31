import langs from '../data/langs';
import { screen } from '../types/enums';

class Settings {

  public readonly sizes = {
    width: 720,
    minHeight: 911,
    maxHeight: 1620
  }
  public readonly lang: { [key: string]: string } = langs.ru;
  public screen: screen = screen.RULES;
  public readonly speed: number = 5000;
  public sounds: Isounds;

  public setScreen(screen: screen): screen {
    this.screen = screen;
    return this.screen;
  }

  public getSpeed(): number {
    return this.speed;
  }
}

export default new Settings();