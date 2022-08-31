interface Iposition {
  x: number;
  y: number;
}
interface Iscreen {
  type: number;
}
interface Isounds {
  resumeMusic: () => void;
  pauseMusic: () => void;
  playMusic: (sound: string) => void;
  stopMusic: () => void;
  play: (sound: string) => void;
}