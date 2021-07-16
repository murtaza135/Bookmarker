export function fadeOutAndRemove(element, fadeTime = 1000, removeTimeMultiplier = 0.5) {

    if (!isNaN(fadeTime) && fadeTime < 0) {
        fadeTime = 1000;
    }

    if (!isNaN(removeTimeMultiplier) && removeTimeMultiplier < 0) {
        removeTimeMultiplier = 0.5;
    }

    if (element) {
        element.style.transition = `opacity ${fadeTime}ms`;
        element.style.opacity = "0";
    
        setTimeout(function() {
            element.remove();
        }, fadeTime * removeTimeMultiplier)
    }
}

export function scrollToNode(node) {
    const y = node.getBoundingClientRect().top + window.scrollY;
    window.scroll({
        top: y,
        behavior: 'smooth'
    });
}

export function scrollToBottom() {
    window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

export function scrollToTop() {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });
}