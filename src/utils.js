export function safeEval(expr) {
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
