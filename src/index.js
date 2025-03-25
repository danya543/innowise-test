import { capitalize } from "./utils.js";
import { Numbers, Signs } from "./constants.js";

const numbers = document.createElement("div");
numbers.innerText = Numbers.join(" ");

document.getElementById("app").textContent = capitalize("hello, innowise!");
document.getElementById("app").append(numbers);
