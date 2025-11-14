import { ClickableArea } from "./clickable-area";
import { Shop } from "./shop";
import "../styles/game.css";

export class Game {
  cookies = 0;
  passiveGain = 0;

  constructor(config) {
    this.cookies = config.cookies;
    this.gameElement = document.querySelector("#game");

    this.clickableArea = new ClickableArea(
      this.gameElement,
      this.onClickableAreaClick,
    );

    this.shop = new Shop(this.gameElement, this.onShopBuy);
  }

  start() {
    this.render();

    setInterval(() => {
      this.cookies += this.passiveGain;
      this.updateScore();
    }, 1000);
  }

  render() {
    this.renderScore();
    this.clickableArea.render();
    this.shop.render();
  }

  renderScore() {
    this.scoreElement = document.createElement("section");
    this.scoreElement.id = "game-score";

    this.passiveElement = document.createElement("section");
    this.passiveElement.id = "game-passive";

    this.gameElement.append(this.scoreElement);
    this.gameElement.append(this.passiveElement);

    this.updateScore();
    this.updatePassiveGain();
  }

  addCookies = (amount) => {
    this.cookies += amount;
    this.updateScore();
  };

  updateScore() {
    this.scoreElement.innerHTML = `
      <span>${this.cookies.toFixed(1)} cookies</span>
    `;
  }

  updatePassiveGain() {
    this.passiveElement.innerHTML = `
      <span>Gain passif : ${this.passiveGain.toFixed(1)} / sec</span>
    `;
  }

  onClickableAreaClick = () => {
    this.cookies += 1;
    this.updateScore();
  };

  onShopBuy = (item) => {
    const price = item.price;

    if (this.cookies < price) {
      console.log("Pas assez de cookies !");
      return;
    }

    this.cookies -= price;

    this.passiveGain += item.cps;

    item.amount++;

    this.updateScore();
    this.updatePassiveGain();

    this.shop.update();
  };
}
