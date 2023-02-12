import Button from '../components/Button';
import Settings from '../data/Settings';
import User from '../data/User';
import Menu from '../scenes/Menu';
import { screen } from '../types/enums';

class Rating implements Iscreen {
  constructor(scene: Menu) {
    this._scene = scene;
    this._init();
  }

  private _scene: Menu;
  public readonly type: screen = screen.RATING;
  private _bg: Phaser.GameObjects.Sprite;
  private _rating: Irating[];

  private _init(): void {
    if (Settings.isMobile()) {
      this._setHeaderMobile();
      this._setBoardMobile();
      this._setButtonMobile();
    } else {
      this._setHeaderDesktop();
      this._setBoardDesktop();
      this._setButtonDesktop();
    }
    this._getRating();
  }

  private _setHeaderMobile(): void {
    const { centerX } = this._scene.cameras.main;
    const textColor = Settings.isBlack() ? '#FFFFFF' : '#000000';
    this._scene.add.text(centerX, 90, Settings.lang.leaderboard.toUpperCase(), {
      font: '46px MTS-UltraWide',
      color: textColor
    }).setOrigin(0.5, 0.5);
    
  }

  private _setHeaderDesktop(): void {
    const { centerX } = this._scene.cameras.main;
    const textColor = Settings.isBlack() ? '#FFFFFF' : '#000000';
    this._scene.add.text(centerX, 75, Settings.lang.leaderboard.toUpperCase(), {
      font: '45px MTS-UltraWide',
      color: textColor
    }).setOrigin(0.5, 0.5);
  }

  private _setBoardMobile(): void {
    const { centerX, centerY } = this._scene.cameras.main;
    this._bg = this._scene.add.sprite(centerX, centerY - 30, 'rating-bg');
  }

  private _setBoardDesktop(): void {
    const { centerX, centerY } = this._scene.cameras.main;
    this._bg = this._scene.add.sprite(centerX, centerY - 20, 'rating-bg');
  }

  private _setButtonMobile(): void {
    const { centerX, height } = this._scene.cameras.main;
    const again = new Button(this._scene, centerX, height - 110, 'big-grey-button');
    again.text = this._scene.add.text(again.x, again.y + 3, Settings.lang.playAgain.toUpperCase(), {
      font: '33px MTS-UltraWide',
      color: '#FF0000'
    }).setOrigin(0.5, 0.5);
    again.callback = (): void => this._scene.actions.startGame();
  }

  private _setButtonDesktop(): void {
    const { centerX, height } = this._scene.cameras.main;
    const again = new Button(this._scene, centerX, height - 80, 'big-grey-button');
    again.text = this._scene.add.text(again.x, again.y + 1, Settings.lang.playAgain.toUpperCase(), {
      font: '33px MTS-UltraWide',
      color: '#FF0000'
    }).setOrigin(0.5, 0.5);
    again.callback = (): void => this._scene.actions.startGame();
  }

  private _getRating(): void {
    this._rating = [
      {
        id: 1,
        place: 1,
        score: 100,
        name: 'First user example'
      },
      {
        id: 2,
        place: 2,
        score: 99,
        name: 'Second user example',
      },
      {
        id: 3,
        place: 3,
        score: 98,
        name: 'You',
      }
    ];
      
    if (Settings.isMobile()) {
      this._ratingMobile();
    } else {
      this._ratingDesktop();
    }
  }

  private _ratingMobile(): void {
    const { centerX } = this._scene.cameras.main;
    const bounds = this._bg.getBounds();
    const textColor = Settings.isBlack() ? '#FFFFFF' : '#000000';

    this._rating.map((user, index) => {
      const y = bounds.top + 50 + index * 87;
      const place = this._scene.add.text(bounds.left + 45, y, user.place + '. ', {
        font: '24px MTS-UltraWide',
        color: '#FF0000'
      });

      const color = String(user.id) === String(User.getID()) ? '#FF0000' : textColor; 
      this._scene.add.text(place.getBounds().right + 5, place.y, user.name, {
        font: '24px MTS-UltraWide',
        color: color
      }).setCrop(0, 0, 370, 30);

      this._scene.add.text(bounds.right - 45, y, String(user.score), {
        font: '24px MTS-UltraWide',
        color: '#FF0000'
      }).setOrigin(1, 0);

      if (index !== this._rating.length - 1) {
        this._scene.add.sprite(centerX, y + 57, 'line');
      }
    });
  }
  
  private _ratingDesktop(): void {
    this._scene.scene.launch('Scroll', {
      rating: this._rating,
      bounds: this._bg.getBounds()
    });
  }
}

export default Rating;