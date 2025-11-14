import { Game } from "./game";
import RandomSpawn from "./random-spawn.js";
import "../styles/style.css";

document.querySelector("#app").innerHTML = `
    <h1>Welcome to my Cookie Clicker!</h1>
    <main id="game"></main>
`;

const game = new Game({ cookies: 0 });
game.start();

const randomSpawn = new RandomSpawn(game);
randomSpawn.start();
