class User {

  private _id: string = '0';
  private _name: string = 'Неизвестный игрок';
  private _username: string = 'no_username';
  private _score: number = 0;
  private _record: number = 0;
  private _health: number = 0;

  public setID(id: string): string {
    this._id = id;
    return this._id;
  }

  public setName(name: string): string {
    this._name = name;
    return this._name;
  }

  public setUsername(username: string): string {
    this._username = username;
    return this._username;
  }

  public getScore(): number {
    return this._score;
  }

  public resetScore(): number {
    this._score = 0;
    return this._score;
  }

  public plusScore(score: number): number {
    this._score += score;
    if (this._score > this._record) this._record = this._score; 
    return this._score;
  }

  public setRecord(): number {
    return this._record;
  }

  public getRecord(): number {
    return this._record;
  }

  public resetHealth(): number {
    this._health = 3;
    return this._health;
  }

  public minusHealht(): number {
    if (this._health > 0) this._health--;
    return this._health;
  }

  public getHealth(): number {
    return this._health;
  }
}

export default new User();