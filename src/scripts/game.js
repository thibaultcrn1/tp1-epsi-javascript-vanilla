import { ClickableArea } from "./clickable-area";
import { Shop } from "./shop";
import "../styles/game.css";

export class Game {
  cookies = 0;
  passiveGain = 0;
  saveTimeout = null;

  constructor(config = {}) {
    this.cookies = config.cookies || 0;
    this.passiveGain = config.passiveGain || 0;
    this.gameElement = document.querySelector("#game");

    this.clickableArea = new ClickableArea(
      this.gameElement,
      this.onClickableAreaClick,
    );

    this.shop = new Shop(
      this.gameElement,
      this.onShopBuy,
      config.items || null,
    );
  }

  start() {
    this.render();

    setInterval(() => {
      this.cookies += this.passiveGain;
      this.updateScore();
      // Sauvegarde après gain passif (avec debounce)
      this.debouncedSave();
    }, 1000);

    // Sauvegarde automatique toutes les 10 secondes
    setInterval(() => {
      this.save();
    }, 10000);

    // Sauvegarde avant de quitter la page
    window.addEventListener("beforeunload", () => {
      this.save();
    });
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
    this.debouncedSave();
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
    this.debouncedSave();
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
    this.save();
  };

  save() {
    const config = {
      cookies: this.cookies,
      passiveGain: this.passiveGain,
      items: this.shop.items,
    };
    localStorage.setItem("cookieClickerSave", JSON.stringify(config));
  }

  debouncedSave() {
    // Sauvegarde avec un délai de 2 secondes pour éviter trop de sauvegardes
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      this.save();
    }, 2000);
  }

  static load() {
    const savedData = localStorage.getItem("cookieClickerSave");
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error("Erreur lors du chargement de la sauvegarde:", error);
        return null;
      }
    }
    return null;
  }
}
