const span1 = document.getElementById("span1");

function adjust_width(span) 
{
    span.style.width = ""; // 초기화
    let scrollWidth = span.scrollWidth; // 내용의 실제 너비
    if (scrollWidth == 0) 
    {
        scrollWidth = 10;
    }
    span.style.width = scrollWidth + "px"; // 동적으로 너비 설정
}



function formatMathExpression(expression) 
{
    return expression.replace(/\^([^\s]+)/g, "<sup>$1</sup>");
}

span1.addEventListener("input", () => {
    const formattedContent = formatMathExpression(span1.innerText);
    span1.innerHTML = formattedContent;
    adjust_width(span1);
});
