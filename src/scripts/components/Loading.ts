import Settings from '../data/Settings';
import Menu from '../scenes/Menu';
import redButton from '../../assets/images/red-button.png';
import greyButton from '../../assets/images/grey-button.png';
import blackButton from '../../assets/images/black-button.png';
import bg from '../../assets/images/bg.jpg';
import player from '../../assets/images/player.png';
import pixel from '../../assets/images/pixel.png';
import pipe from '../../assets/images/pipe.png';
import pipeTile from '../../assets/images/pipe-tile.png';
import rulesBg from '../../assets/images/rules-bg.png';
import smile1 from '../../assets/images/smile-1.png';
import smile2 from '../../assets/images/smile-2.png';
import smile3 from '../../assets/images/smile-3.png';
import smile4 from '../../assets/images/smile-4.png';
import resultBg from '../../assets/images/result-bg.png';
import resultLogo from '../../assets/images/result-logo.png';

class Loading {
  constructor(scene: Menu) {
    this._scene = scene;
    this._build();
  }

  private _scene: Menu;

  private _build(): void {
    const { centerX, centerY, height } = this._scene.cameras.main;
    const bg = this._scene.add.sprite(centerX, centerY, 'loading-bg');
    const dog = this._scene.add.sprite(0, height, 'loading-dog').setOrigin(0, 1);
    const mts = this._scene.add.sprite(centerX + 265, centerY, 'mts-bank');
    const logo = this._scene.add.text(centerX, height / 4.5, Settings.lang.happyCashback, {
      font: '80px MTS-UltraWide',
      color: '#171717',
      wordWrap: { width: 650 }
    }).setOrigin(0.5, 1);
    const progress = this._scene.add.sprite(centerX, height - 100, 'loading-progress');
    const text = this._scene.add.text(progress.x, progress.y + 2, '0%', {
      font: '52px MTS-UltraWide',
      color: '#FF0000'
    }).setOrigin(0.5, 0.5);

    this._scene.load.on('progress', (value: number): void => {
      const percent = Math.round(value * 100);
      text.setText(percent + '%');
    }, this);
    this._scene.load.on('complete', (): void => {
      this._scene.load.removeAllListeners();
      bg.destroy();
      dog.destroy();
      dog.destroy();
      mts.destroy();
      logo.destroy();
      progress.destroy();
      text.destroy();
    }, this);

    this._loadAssets();
  }

  private _loadAssets(): void {
    this._scene.load.image('red-button', redButton);
    this._scene.load.image('grey-button', greyButton);
    this._scene.load.image('black-button', blackButton);
    this._scene.load.image('bg', bg);
    this._scene.load.image('pixel', pixel);
    this._scene.load.image('pipe', pipe);
    this._scene.load.image('pipe-tile', pipeTile);
    this._scene.load.image('player', player);
    this._scene.load.image('rules-bg', rulesBg);
    this._scene.load.image('smile-1', smile1);
    this._scene.load.image('smile-2', smile2);
    this._scene.load.image('smile-3', smile3);
    this._scene.load.image('smile-4', smile4);
    this._scene.load.image('result-bg', resultBg);
    this._scene.load.image('result-logo', resultLogo);
  }
}

export default Loading;