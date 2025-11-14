export class Shop {
  shopElement = null;
  items = [];

  constructor(gameElement) {
    this.gameElement = gameElement;

    // Liste d'amélioration de la boutique
    this.items = [
      {
        id: "cursor",
        name: "Cursor",
        basePrice: 10,
        priceIncrease: 3,
        amount: 0,
        cps: 0.1,
      },
    ];
  }

  render() {
    // Création de la section Shop
    this.shopElement = document.createElement("section");
    this.shopElement.id = "game-shop";

    this.shopElement.innerHTML = `
        <h2>Shop</h2>
        <div id="shop-items"></div>
    `;

    this.gameElement.append(this.shopElement);

    this.renderItems();
  }

  renderItems() {
    const container = this.shopElement.querySelector("#shop-items");
    container.innerHTML = "";

    this.items.forEach((item) => {
      const price = item.basePrice + item.amount * item.priceIncrease;

      const itemElement = document.createElement("article");
      itemElement.classList.add("shop-item");

      itemElement.innerHTML = `
        <h3>${item.name}</h3>
        <p>Gain passif : ${item.cps} / secondes</p>
        <p>Possédés : ${item.amount}</p>
        <p>Prix : ${price} cookies</p>
        <button data-id="${item.id}">Acheter</button>
      `;

      container.append(itemElement);
    });
  }
}
