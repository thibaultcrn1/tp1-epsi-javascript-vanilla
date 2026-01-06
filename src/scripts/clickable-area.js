import CookieIMG from "../assets/cookie.png";

export class ClickableArea {
  gameElement = null;
  onClick = null;
  audioContext = null;

  constructor(gameElement, onClick) {
    this.gameElement = gameElement;
    this.onClick = onClick;
  }

  async playBellSound() {
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
      }

      if (this.audioContext.state === "suspended") {
        await this.audioContext.resume();
      }

      const now = this.audioContext.currentTime;
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(800, now);
      oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.2);
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.5, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      oscillator.start(now);
      oscillator.stop(now + 0.3);
    } catch (error) {
      console.warn("Impossible de jouer le son:", error);
    }
  }

  render() {
    this.clickableAreaElement = document.createElement("section");
    this.clickableAreaElement.id = "game-clickable-area";
    this.clickableAreaElement.innerHTML = `
         <img id="cookie" src=${CookieIMG} width="256px" height="256px" alt="An awesome cookie." />
     `;
    this.clickableAreaElement.addEventListener("click", () => {
      window.requestAnimationFrame(() => {
        this.clickableAreaElement.classList.add("active");
        setTimeout(() => {
          window.requestAnimationFrame(() => {
            this.clickableAreaElement.classList.remove("active");
          });
        }, 100);
      });
      this.playBellSound();
      this.onClick();
    });
    this.gameElement.append(this.clickableAreaElement);
  }
}
