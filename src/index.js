import { capitalize } from "./utils.js";
import { Numbers, Signs, isAnswer } from "./constants.js";
import "./styles.css";

document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.textContent === "AC") {
        display.textContent = "0";
      } else if (Signs.includes(this.textContent)) {
        if (isAnswer) isAnswer = false;
        if (Signs.includes(display.textContent[display.textContent.length - 1])) {
          display.textContent = display.textContent.replace(/.$/, this.textContent);
        } else {
          display.textContent += this.textContent;
        }
      } else if (this.textContent === "=") {
        display.textContent = safeEval(display.textContent);
        isAnswer = true;
      } else {
        if (display.textContent === "0" || display.textContent === "Error" || isAnswer) {
          display.textContent = this.textContent;
          if (isAnswer) isAnswer = false;
        } else {
          display.textContent += this.textContent;
        }
      }
    });
  });
});

function safeEval(expr) {
  // Заменяем специальные символы
  let processedExpr = expr
    .replace(/÷/g, "/")
    .replace(/x/g, "*")
    .replace(/,/g, ".")
    .replace(/%/g, "/100");

  processedExpr = processedExpr.replace(/[^\d+\-*\/.()]/g, "");

  try {
    const result = new Function("return " + processedExpr)();
    if (!isFinite(result)) throw new Error("Division by zero");
    return result % 1 === 0 ? result.toString() : result.toFixed(8).replace(/\.?0+$/, "");
  } catch (e) {
    return "Error";
  }
}

/**
 * ? добавить ограничение по размеру вводимого числа
 * ? 50 + 20% должно быть 60
 */
