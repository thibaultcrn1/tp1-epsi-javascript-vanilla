import GoldenCookieIMG from "../assets/golden-cookie.png";

export default class RandomSpawn {
  constructor(game) {
    this.game = game;
  }

  start() {
    setInterval(() => {
      this.spawnGoldenCookie();
    }, 10000);
  }

  spawnGoldenCookie() {
    const golden = document.createElement("img");
    golden.src = GoldenCookieIMG;
    golden.classList.add("golden-cookie");

    golden.style.position = "absolute";
    golden.style.top = Math.random() * 80 + "%";
    golden.style.left = Math.random() * 80 + "%";

    document.body.appendChild(golden);

    // clic sur le golden cookie
    golden.addEventListener("click", () => {
      // gain aléatoire entre 1 et passiveGain * 1000
      const gain = Math.max(
        1,
        Math.floor(Math.random() * (this.game.passiveGain * 1000) + 1),
      );
      this.game.addCookies(gain);
      golden.remove();
    });

    // disparition automatique après 5 secondes
    setTimeout(() => {
      golden.remove();
    }, 5000);
  }
}
