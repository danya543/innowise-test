import { Signs, isAnswer } from "./constants.js";
import { safeEval } from "./utils.js";

import { addToHistory, updateHistoryList } from "./history.js";
import "./theme.js";
import "./styles.css";

document.addEventListener("DOMContentLoaded", function () {
  updateHistoryList();
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".buttons button");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.textContent !== "") {
        if (this.textContent === "AC") {
          display.textContent = "0";
        } else if (Signs.includes(this.textContent)) {
          if (isAnswer) isAnswer = false;
          if (Signs.includes(display.textContent[display.textContent.length - 1])) {
            display.textContent = display.textContent.replace(/.$/, this.textContent);
          } else {
            display.textContent += this.textContent;
          }
        } else if (this.textContent === "+/-") {
          handlePlusMinus();
        } else if (this.textContent === "=") {
          const expr = display.textContent;
          display.textContent = safeEval(display.textContent);
          addToHistory(expr, display.textContent);
          isAnswer = true;
        } else {
          if (display.textContent === "0" || display.textContent === "Error" || isAnswer) {
            display.textContent = this.textContent;
            if (isAnswer) isAnswer = false;
          } else {
            display.textContent += this.textContent;
          }
        }
      }
    });
  });
});

function handlePlusMinus() {
  const display = document.querySelector(".display");
  let currentValue = display.textContent;

  if (currentValue === "0" || currentValue === "Error") return;

  // Если последнее число уже отрицательное
  if (/([-+x÷]|^)-\d+\.?\d*$/.test(currentValue)) {
    display.textContent = currentValue.replace(/([-+x÷]|^)(-\d+\.?\d*)$/, "$1" + "$2".substring(1));
  }
  // Если последнее число положительное
  else if (/([-+x÷]|^)\d+\.?\d*$/.test(currentValue)) {
    display.textContent = currentValue.replace(/([-+x÷]|^)(\d+\.?\d*)$/, "$1-" + "$2");
  }
}

/**
 * ? добавить ограничение по размеру вводимого числа
 */
