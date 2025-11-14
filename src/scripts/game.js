import { ClickableArea } from "./clickable-area";
import { Shop } from "./shop";
import "../styles/game.css";

export class Game {
  cookies = 0;
  gameElement = null;
  scoreElement = null;

  clickableArea = null;
  shop = null;

  constructor(config) {
    this.cookies = config.cookies;
    this.gameElement = document.querySelector("#game");

    this.clickableArea = new ClickableArea(
      this.gameElement,
      this.onClickableAreaClick,
    );

    // Instanciation de la classe shop
    this.shop = new Shop(this.gameElement);
  }

  start() {
    this.render();
  }

  render() {
    this.renderScore();
    this.clickableArea.render();
    this.shop.render(); // Affichage de la boutique
  }

  renderScore() {
    this.scoreElement = document.createElement("section");
    this.scoreElement.id = "game-score";
    this.gameElement.append(this.scoreElement);
    this.updateScore();
  }

  updateScore() {
    this.scoreElement.innerHTML = `
        <span>${this.cookies} cookies</span>
    `;
  }

  onClickableAreaClick = () => {
    this.cookies += 1;
    window.requestAnimationFrame(() => {
      this.updateScore();
    });
  };
}
