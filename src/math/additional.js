export function handleNthRootExpr(value) {
  console.log(value);
  if (/(\d)√/.test(value)) {
    if (!/(\d)√-?\d+(\.\d+)?/.test(value)) return 'Error';
    return value.replace(/(\d)√(-?\d+(\.\d+)?)/g, (_, root, radicand) => {
      return root % 2
        ? `${radicand.startsWith('-') ? '-' : ''}(${radicand.startsWith('-') ? radicand.slice(1) : radicand}**(1/${root}))`
        : `${radicand}**(1/${root})`;
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
