import Button from '../components/Button';
import Settings from '../data/Settings';

class Pause extends Phaser.Scene {
  constructor() {
    super('Pause');
  }

  public create(): void {
    this.cameras.main.setBackgroundColor('rgba(217, 217, 217, 0.7)');
    const { centerX, centerY } = this.cameras.main;
    const resume = new Button(this, centerX, centerY, 'resume');
    resume.callback = (): void => this._resumeGame();
  }

  private _resumeGame(): void {
    this.scene.resume('Game');
    Settings.sounds.resumeMusic();
    this.scene.stop();
  }
}

export default Pause;