export default class Utilities {
    static fadeOutAndRemove(element, fadeTime = 1000, removeTimeMultiplier = 0.5) {

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

    static scrollToNode(node) {
        const y = node.getBoundingClientRect().top + window.scrollY;
        window.scroll({
            top: y,
            behavior: 'smooth'
        });
    }

    static scrollToBottom() {
        window.scroll({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }

    static scrollToTop() {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }

    static clamp(number, min, max) {
        return Math.max(min, Math.min(number, max));
    }

    static capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1); 
    }

    static capitalizeAllWords(string, ascii = true) {
        if (ascii == true) {
            return string.replace(/\b\w/g, l => l.toUpperCase());
        }
        else {
            return string.replace(/(^|\s)\S/g, l => l.toUpperCase());
        }
    }
}