class Sounds implements Isounds {
  constructor(scene: Phaser.Scene) {
    this._scene = scene;
  }

  private _scene: Phaser.Scene;
  private _track: string;
  private _music: Phaser.Sound.BaseSound;

  public resumeMusic(): void {
    if (this._scene.sound.get(this._track)) {
      this._music.resume();
    }
  }

  public playMusic(sound: string): void {
    this.stopMusic();
    this._track = sound;
    this._music = this._scene.sound.add(this._track, {
      volume: 1,
      loop: true
    });
    this._music.play();
  }

  public pauseMusic(): void {
    if (this._scene.sound.get(this._track)) {
      this._music.pause();
    }
  }

  public stopMusic(): void {
    if (this._scene.sound.get(this._track)) {
      this._music.destroy();
    }
  }

  public play(sound: string): void {
    this._scene.sound.add(sound, {
      volume: 1,
      loop: false
    }).play();
  }
}

export default Sounds;