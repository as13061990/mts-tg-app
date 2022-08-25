import Settings from '../data/Settings';
import Menu from '../scenes/Menu';
import redButton from '../../assets/images/red-button.png';
import bg from '../../assets/images/bg.jpg';
import player from '../../assets/images/player.png';
import pixel from '../../assets/images/pixel.png';
import pipe from '../../assets/images/pipe.png';
import pipeTile from '../../assets/images/pipe-tile.png';
import blue1 from '../../assets/images/blue-1.png';
import blue2 from '../../assets/images/blue-2.png';
import blue3 from '../../assets/images/blue-3.png';
import blue4 from '../../assets/images/blue-4.png';
import red1 from '../../assets/images/red-1.png';
import red2 from '../../assets/images/red-2.png';
import red3 from '../../assets/images/red-3.png';
import red4 from '../../assets/images/red-4.png';
import red5 from '../../assets/images/red-5.png';
import ice from '../../assets/images/ice.png';
import flame from '../../assets/images/flame.png';
import againBtn from '../../assets/images/again-btn.png';
import rulesBg from '../../assets/images/rules-bg.png';

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
    this._scene.load.image('bg', bg);
    this._scene.load.image('pixel', pixel);
    this._scene.load.image('pipe', pipe);
    this._scene.load.image('pipe-tile', pipeTile);
    this._scene.load.image('player', player);
    this._scene.load.image('blue-1', blue1);
    this._scene.load.image('blue-2', blue2);
    this._scene.load.image('blue-3', blue3);
    this._scene.load.image('blue-4', blue4);
    this._scene.load.image('red-1', red1);
    this._scene.load.image('red-2', red2);
    this._scene.load.image('red-3', red3);
    this._scene.load.image('red-4', red4);
    this._scene.load.image('red-5', red5);
    this._scene.load.image('ice', ice);
    this._scene.load.image('flame', flame);
    this._scene.load.image('again-btn', againBtn);
    this._scene.load.image('rules-bg', rulesBg);
  }
}

export default Loading;