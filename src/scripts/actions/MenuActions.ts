import Loading from '../components/Loading';
import Menu from '../scenes/Menu';

import startBtn from '../../assets/images/start-btn.png';
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

class MenuActions {
  constructor(scene: Menu) {
    this.scene = scene;
  }

  private scene: Menu;
  private loading: boolean = false;

  public loadAssets(): void {
    if (this.loading === false) {
      this.loading = true;
      new Loading(this.scene);
    }

    this.scene.load.image('start-btn', startBtn);
    this.scene.load.image('bg', bg);
    this.scene.load.image('pixel', pixel);
    this.scene.load.image('pipe', pipe);
    this.scene.load.image('pipe-tile', pipeTile);
    this.scene.load.image('player', player);
    this.scene.load.image('blue-1', blue1);
    this.scene.load.image('blue-2', blue2);
    this.scene.load.image('blue-3', blue3);
    this.scene.load.image('blue-4', blue4);
    this.scene.load.image('red-1', red1);
    this.scene.load.image('red-2', red2);
    this.scene.load.image('red-3', red3);
    this.scene.load.image('red-4', red4);
    this.scene.load.image('red-5', red5);
    this.scene.load.image('ice', ice);
    this.scene.load.image('flame', flame);
    this.scene.load.image('again-btn', againBtn);
  }

  public clickStartBtn(): void {
    this.scene.scene.start('Game');
  }
}

export default MenuActions;