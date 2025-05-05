export function handleNthRootExpr(value) {
  if (/(\d)√/g.test(value)) {
    if (!/(\d)√(\d+(\.\d+)?)/g.test(value)) return 'Error';
    return value.replace(/(\d)√(\d+(\.\d+)?)/g, (_, root, radicand) => {
      return `${radicand}**(1/${root})`;
    });
  }
  return value;
}

export function checkFactorial(value) {
  return value.replace(/(\d+(\.\d+)?)!/g, (_, num) => {
    return countFactorial(+num);
  });
}

function countFactorial(value) {
  if (value === 1) return value;
  return value * countFactorial(value - 1);
}
