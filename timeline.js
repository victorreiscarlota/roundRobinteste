window.addEventListener('DOMContentLoaded', function() {
    (
        
        function () {
        const timeline = document.querySelector(".timeline ol"),
        elH = document.querySelectorAll(".timeline li > div"),
        arrows = document.querySelectorAll(".timeline .arrows .arrow"),
        arrowPrev = document.querySelector(".timeline .arrows .arrow__prev"),
        arrowNext = document.querySelector(".timeline .arrows .arrow__next"),
        firstItem = document.querySelector(".timeline ol:first-child"),
        lastItem = document.querySelector(".timeline ol:last-child"),
        xScrolling = 280,
        disabledClass = "disabled";
        
        window.addEventListener("load", init);
        
        function init() {
        setEqualHeights(elH);
        animateTl(xScrolling, arrows, timeline);
        setSwipeFn(timeline, arrowPrev, arrowNext);
        setKeyboardFn(arrowPrev, arrowNext);

        
        setBtnState(arrowPrev, isElementOutOfViewport(firstItem));
        setBtnState(arrowNext, isElementOutOfViewport(lastItem));
    }
    
    function setEqualHeights(el) {
        let counter = 0;
        for (let i = 0; i < el.length; i++) {
            const singleHeight = el[i].offsetHeight;
            if (counter < singleHeight) {
            counter = singleHeight;
        }
        }

        for (let i = 0; i < el.length; i++) {
            el[i].style.height = `${counter}px`;
        }
    }
            function isElementOutOfViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        return rect.right <= 0 || rect.left >= windowWidth;
    }
    
    function setBtnState(el, disable) {
        try {
            if (disable) {
                el.classList.add(disabledClass);
            } else {
                el.classList.remove(disabledClass);
                el.removeAttribute("disabled");
            }
        } catch (err) {
            console.log(err);
        }
        
    }
    
    function animateTl(scrolling, el, tl) {
        for (let i = 0; i < el.length; i++) {
            el[i].addEventListener("click", function () {
            const sign = this.classList.contains("arrow__prev") ? "" : "-";
            const tlStyle = getComputedStyle(tl);
            const tlTransform = tlStyle.getPropertyValue("transform") || "translateX(0px)";
            const transformValues = tlTransform.match(/-?\d+/g);
            const xTranslate = transformValues ? parseInt(transformValues[4]) : 0;
            const values = xTranslate + parseInt(`${sign}${scrolling}`);
            tl.style.transform = `translateX(${values}px)`;
            console.log("values");
            
            setTimeout(() => {
                console.log(arrowPrev);
                console.log(firstItem);
                setBtnState(arrowPrev, isElementOutOfViewport(firstItem));
                setBtnState(arrowNext, isElementOutOfViewport(lastItem));
            }, 500);
        });
        }
    }
    
    function setSwipeFn(tl, prev, next) {
        const hammer = new Hammer(tl);
        hammer.on("swipeleft", () => next.click());
        hammer.on("swiperight", () => prev.click());
    }
    
    function setKeyboardFn(prev, next) {
        document.addEventListener("keydown", (e) => {
            if (e.which === 37 || e.which === 39) {
            const timelineOfTop = timeline.offsetTop;
            const y = window.pageYOffset;
            if (timelineOfTop !== y) {
                window.scrollTo(0, timelineOfTop);
            }
            if (e.which === 37) {
                prev.click();
            } else if (e.which === 39) {
                next.click();
            }
        }
        });
    }
    })();
});