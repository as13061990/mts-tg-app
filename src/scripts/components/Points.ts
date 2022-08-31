import User from '../data/User';
import Utils from '../data/Utils';
import Game from '../scenes/Game';

class Points {
  constructor(scene: Game) {
    this._scene = scene;
    this._build();
  }

  private _scene: Game;
  private _icon: Phaser.GameObjects.Sprite;
  private _text: Phaser.GameObjects.Text;

  private _build(): void {
    const { centerX } = this._scene.cameras.main;

    this._icon = this._scene.add.sprite(centerX, 50, 'smile-1').setOrigin(0.5, 0);
    this._text = this._scene.add.text(centerX, this._icon.getBounds().bottom + 10, String(User.getScore()), {
      font: '40px MTS-UltraWide',
      color: '#41494F'
    }).setOrigin(0.5, 0).setStroke('#FFFFFF', 5);
    this._icon.setDepth(4);
    this._text.setDepth(4);
  }

  public updatePoints(): void {
    const index = Utils.getScoreIndex() === 1 && !this._scene.mts ? 2 : Utils.getScoreIndex();
    const texture = 'smile-' + index;

    if (texture !== this._icon.texture.key) {
      this._icon.setTexture(texture);
    }
    this._text.setText(String(User.getScore()));
  }
}

export default Points;