//监听视口宽度 计算html的fontSize
export function setHtmlFontSize(){
    const clientWidth = window.innerWidth;
    const htmlDom = document.documentElement;
    htmlDom.style.fontSize = clientWidth/20 +'px';
}
setHtmlFontSize();
window.onresize = setHtmlFontSize;