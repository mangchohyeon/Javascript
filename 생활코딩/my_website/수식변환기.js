function convertFormula() {
  const input = document.getElementById('input').value;
  const output = document.getElementById('output');

  // LaTeX 스타일 문법 변환
  let result = input
      .replace(/_(\{.*?\}|\d+)/g, (_, sub) => `<sub>${sub.replace(/[{}]/g, '')}</sub>`) // 아래첨자 변환
      .replace(/\^(\{.*?\}|\d+)/g, (_, sup) => `<sup>${sup.replace(/[{}]/g, '')}</sup>`); // 위첨자 변환

  output.innerHTML = result;
}

function copyOutput() {
  const output = document.getElementById('output').innerText;
  navigator.clipboard.writeText(output).then(() => {
      alert('복사되었습니다: ' + output);
  }).catch(err => {
      alert('복사에 실패했습니다.');
  });
}