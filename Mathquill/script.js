window.addEventListener('DOMContentLoaded', () => {
  var MQ = MathQuill.getInterface(2);
  var formulaSpans = document.getElementsByClassName("span_formula");
  Array.from(formulaSpans).forEach(span => {
    var mathField = MQ.MathField(span, {
      spaceBehavesLikeTab: true,
    });
    // 초기 수식 설정
    mathField.latex('lim_{x \\to \\infty} \\sum_{n=1}^{\\infty} \\pi e');
  });
});