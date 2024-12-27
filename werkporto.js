// Utility function to handle scroll animations
const createScrollAnimation = (selector, offset, animations) => {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const parentSection = element.closest('[class]');
    if (!parentSection) return;

    window.addEventListener('scroll', () => {
        const sectionTop = parentSection.offsetTop;
        const scrollY = window.scrollY;

        if (scrollY >= sectionTop - offset) {
            Object.entries(animations).forEach(([property, value]) => {
                element.style[property] = value;
            });
        } else {
            Object.entries(animations).forEach(([property, value]) => {
                element.style[property] = property === 'transform' ? 'translate(0)' : '0';
            });
        }
    });
};

// Initialize all scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Know Me section animation
    createScrollAnimation('.knowme .glassbg', 500, {
        transform: 'translateY(-70px)',
        opacity: '1'
    });

    // Education box animation
    createScrollAnimation('.resume .educationbox', 400, {
        transform: 'translateX(-50px)',
        opacity: '1'
    });

    // Organization box animation
    createScrollAnimation('.resume .organizationbox', 400, {
        transform: 'translateX(50px)',
        opacity: '1'
    });

    // Skills section animation
    createScrollAnimation('.skills .softskills', 300, {
        opacity: '1'
    });

    // Initialize infinite scroller
    initInfiniteScroller();

    // Initialize slider
    initSlider();
});

// Infinite scroller initialization
const initInfiniteScroller = () => {
    const scrollers = document.querySelectorAll('.scroller');
    
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        scrollers.forEach(scroller => {
            const scrollerInner = scroller.querySelector('.scroller__inner');
            if (!scrollerInner) return;

            const scrollerContent = Array.from(scrollerInner.children);
            
            scrollerContent.forEach(item => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute('aria-hidden', 'true');
                scrollerInner.appendChild(duplicatedItem);
            });
            
            scroller.setAttribute("data-animated", "true");
        });
    }
};

// Slider functionality
const initSlider = () => {
    const list = document.querySelector('.sliderwrapper .slidercontainer');
    const slides = document.querySelectorAll('.sliderwrapper .slidercontainer .slide');
    const dots = document.querySelectorAll('.sliderwrapper .dots li');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const descriptions = document.querySelectorAll('.desc');

    if (!list || !slides.length || !descriptions.length) return;

    let active = 0;
    const lengthItems = slides.length;
    
    const reloadSlider = () => {
        const checkLeft = slides[active].offsetLeft;
        list.style.left = -checkLeft + 'px';

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === active);
        });

        descriptions.forEach((desc, index) => {
            desc.classList.toggle('active', index === active);
        });
    };

    next?.addEventListener('click', () => {
        active = (active + 1) % lengthItems;
        reloadSlider();
    });
    prev?.addEventListener('click', () => {
        active = (active - 1 + lengthItems) % lengthItems;
        reloadSlider();
    });

  
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            active = index;
            reloadSlider();
        });
    });


    reloadSlider();
};