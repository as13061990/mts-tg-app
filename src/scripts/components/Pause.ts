import Settings from '../data/Settings';
import Button from './Button';

class Pause extends Button {
  constructor(scene: Phaser.Scene) {
    super(scene, scene.cameras.main.width - 70, Settings.isMobile() ? 72 : 38.5, 'pause');
    this.setOrigin(1, 0);
    this.setDepth(5);
    this.setSimpleClick();
    this.callback = (): void => this._callback();
  }

  private _callback(): void {
    this.scene.scene.pause();
    this.scene.scene.launch('Pause');
    Settings.sounds.pauseMusic();
  }
}

export default Pause;