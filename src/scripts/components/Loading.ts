import Settings from '../data/Settings';
import Menu from '../scenes/Menu';

class Loading {
  constructor(scene: Menu) {
    this.scene = scene;
    this.init();
  }

  private scene: Menu;

  private init(): void {
    const { centerX, centerY } = this.scene.cameras.main;
    const name = this.scene.add.text(centerX, centerY - 300, Settings.lang.gamename, {
      font: '30px Triomphe',
      color: '#000000'
    }).setOrigin(0.5, 0.5);
    const loading = this.scene.add.sprite(centerX, centerY - 100, 'loading');
    const text = this.scene.add.text(centerX, centerY + 50, '0%', {
      font: '30px Triomphe',
      color: '#000000'
    }).setOrigin(0.5, 0.5);

    this.scene.load.on('progress', (value: number): void => {
      const percent = Math.round(value * 100);
      text.setText(percent + '%');
    }, this);
    this.scene.load.on('complete', (): void => {
      this.scene.load.removeAllListeners();
      name.destroy();
      loading.destroy();
      text.destroy();
    }, this);
  }
}

export default Loading;