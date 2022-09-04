import Settings from '../data/Settings';
import User from '../data/User';
import Scrolling from '../libs/Scrolling';

class Scroll extends Phaser.Scene {
  constructor() {
    super('Scroll');
  }

  private _rating: Irating[];
  private _bounds: Phaser.Geom.Rectangle;
  
  public init(data: { rating: Irating[], bounds: Phaser.Geom.Rectangle }): void {
    this._rating = data.rating;
    this._bounds = data.bounds;
  }

  public create(): void {
    const bounds = this._bounds;
    new Scrolling(this, {
      x: bounds.left,
      y: bounds.top,
      width: bounds.width,
      height: bounds.height,
      wheel: true,
      top: this.cameras.main.height,
      bottom: this.cameras.main.height + 20 + this._rating.length * 87
    });
    const textColor = Settings.isBlack() ? '#FFFFFF' : '#000000';

    this._rating.map((user, index) => {
      const y = this.cameras.main.height + 50 + index * 87;
      const place = this.add.text(30, y, user.place + '. ', {
        font: '23px MTS-UltraWide',
        color: '#FF0000'
      });

      const color = String(user.id) === String(User.getID()) ? '#FF0000' : textColor; 
      this.add.text(place.getBounds().right + 5, place.y, user.name, {
        font: '23px MTS-UltraWide',
        color: color
      }).setCrop(0, 0, 370, 30);

      this.add.text(bounds.width - 27, y, String(user.score), {
        font: '23px MTS-UltraWide',
        color: '#FF0000'
      }).setOrigin(1, 0);

      if (index !== this._rating.length - 1) {
        this.add.sprite(place.getBounds().left, y + 57, 'line').setOrigin(0, 0.5);
      }
    });
  }
}

export default Scroll;