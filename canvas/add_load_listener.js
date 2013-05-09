
// Si vous n'utilisez pas jQuery : $(function () {});
// Vous pouvez utiliser cette fonction qui gère la compatibilité : addLoadListener(function() {});
// http://www.alsacreations.com/article/lire/565-JavaScript-organiser-son-code-en-modules.html
function addLoadListener(func) {
    if (window.addEventListener) {
        window.addEventListener("load", func, false);
    } else if (document.addEventListener) {
        document.addEventListener("load", func, false);
    } else if (window.attachEvent) {
        window.attachEvent("onload", func);
    } else if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        var oldonload = window.onload;
        window.onload = function() {
            oldonload();
            func();
        };
    }
}
