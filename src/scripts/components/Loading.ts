import Settings from '../data/Settings';
import Menu from '../scenes/Menu';
import redButton from '../../assets/images/red-button.png';
import greyButton from '../../assets/images/grey-button.png';
import blackButton from '../../assets/images/black-button.png';
import bg from '../../assets/images/bg.jpg';
import player from '../../assets/images/player.png';
import jumpPlayer from '../../assets/images/jump.png';
import pixel from '../../assets/images/pixel.png';
import rulesBg from '../../assets/images/rules-bg.png';
import smile1 from '../../assets/images/smile-1.png';
import smile2 from '../../assets/images/smile-2.png';
import smile3 from '../../assets/images/smile-3.png';
import smile4 from '../../assets/images/smile-4.png';
import resultBg from '../../assets/images/result-bg.png';
import resultLogo from '../../assets/images/result-logo.png';
import npc1 from '../../assets/images/npc-1.png';
import npc2 from '../../assets/images/npc-2.png';
import npc3 from '../../assets/images/npc-3.png';
import npc4 from '../../assets/images/npc-4.png';
import health from '../../assets/images/health.png';
import bonus1 from '../../assets/images/bonus-1.png';
import bonus2 from '../../assets/images/bonus-2.png';
import bonus3 from '../../assets/images/bonus-3.png';
import bonus4 from '../../assets/images/bonus-4.png';
import finish from '../../assets/sounds/finish.mp3';
import food from '../../assets/sounds/food.mp3';
import game from '../../assets/sounds/game.mp3';
import gas from '../../assets/sounds/gas.mp3';
import jump from '../../assets/sounds/jump.mp3';
import menu from '../../assets/sounds/menu.mp3';
import mts from '../../assets/sounds/mts.mp3';
import obstacle from '../../assets/sounds/obstacle.mp3';
import start from '../../assets/sounds/start.mp3';
import premium from '../../assets/images/premium.png';
import flash from '../../assets/images/flash.png';
import obstacle1 from '../../assets/images/obstacle-1.png';
import obstacle2 from '../../assets/images/obstacle-2.png';
import obstacle3 from '../../assets/images/obstacle-3.png';
import obstacle4 from '../../assets/images/obstacle-4.png';

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
    this._scene.load.spritesheet('player', player, { frameWidth: 305, frameHeight: 243 });
    this._scene.load.spritesheet('jump', jumpPlayer, { frameWidth: 305, frameHeight: 243 });
    this._scene.load.image('rules-bg', rulesBg);
    this._scene.load.image('smile-1', smile1);
    this._scene.load.image('smile-2', smile2);
    this._scene.load.image('smile-3', smile3);
    this._scene.load.image('smile-4', smile4);
    this._scene.load.image('result-bg', resultBg);
    this._scene.load.image('result-logo', resultLogo);
    this._scene.load.image('npc-1', npc1);
    this._scene.load.image('npc-2', npc2);
    this._scene.load.image('npc-3', npc3);
    this._scene.load.image('npc-4', npc4);
    this._scene.load.image('health', health);
    this._scene.load.image('bonus-1', bonus1);
    this._scene.load.image('bonus-2', bonus2);
    this._scene.load.image('bonus-3', bonus3);
    this._scene.load.image('bonus-4', bonus4);
    this._scene.load.audio('finish', finish);
    this._scene.load.audio('food', food);
    this._scene.load.audio('game', game);
    this._scene.load.audio('gas', gas);
    this._scene.load.audio('jump', jump);
    this._scene.load.audio('menu', menu);
    this._scene.load.audio('mts', mts);
    this._scene.load.audio('obstacle', obstacle);
    this._scene.load.audio('start', start);
    this._scene.load.image('premium', premium);
    this._scene.load.image('flash', flash);
    this._scene.load.image('obstacle-1', obstacle1);
    this._scene.load.image('obstacle-2', obstacle2);
    this._scene.load.image('obstacle-3', obstacle3);
    this._scene.load.image('obstacle-4', obstacle4);
  }
}

export default Loading;