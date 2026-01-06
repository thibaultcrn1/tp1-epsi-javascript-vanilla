export class Shop {
  constructor(gameElement, onBuy, initialItems = null) {
    this.gameElement = gameElement;
    this.onBuy = onBuy;

    this.items = initialItems || [
      {
        name: "Cursor",
        price: 10,
        amount: 0,
        cps: 0.1,
      },
    ];
  }

  render() {
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
      const itemEl = document.createElement("article");
      itemEl.classList.add("shop-item");

      itemEl.innerHTML = `
        <h3>${item.name}</h3>
        <p>Gain passif : ${item.cps} cookies/sec</p>
        <p>Prix : ${item.price}</p>
        <p>Possédés : ${item.amount}</p>
        <button>Acheter</button>
      `;

      const button = itemEl.querySelector("button");
      button.addEventListener("click", () => {
        this.onBuy(item);
      });

      container.append(itemEl);
    });
  }

  update() {
    this.renderItems();
  }
}
