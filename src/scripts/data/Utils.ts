import User from './User';

class Utils {
  
  public static getScoreIndex(): number {
    const score = User.getScore();
    return score >= 800 ? 4 : score < 800 && score >= 300 ? 3 : score < 300 && score >= 100 ? 2 : 1;
  }
}

export default Utils;