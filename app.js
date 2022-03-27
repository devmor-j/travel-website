function animateSlides() {
    const slides = document.querySelectorAll('.slide');
    const navHeader = document.querySelectorAll('.nav-header');

    const scrollController = new ScrollMagic.Controller();

    slides.forEach((slide) => {
        const revealImage = slide.querySelector('.reveal-image');
        const slideImage = slide.querySelector('img');
        const revealText = slide.querySelector('.reveal-text');


        const slideTimeline = gsap.timeline({defaults: {duration: 1, ease: 'power2.out'}});

        slideTimeline.to(revealImage, {x: '105%'});
        slideTimeline.from(slideImage, {scale: 2, duration: 2}, '-=1');
        slideTimeline.to(revealText, {x: '105%'}, '-=1.5');
        slideTimeline.fromTo(navHeader, {y: '-100%'}, {y: '0%'}, '-=1');

        new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false,
        })
            .setTween(slideTimeline)
            // .addIndicators({colorStart: 'lime', colorTrigger: 'lime', name: 'slide'})
            .addTo(scrollController);

        const pageTimeline = gsap.timeline({defaults: {ease: 'power4.inOut'}});
        pageTimeline.to(slide, {scale: 0.85, opacity: 0, y: '-25%'});

        new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0,
            duration: 800,
        })
            .setTween(pageTimeline)
            // .addIndicators(({colorStart: 'orange', colorTrigger: 'orange', name: 'page', indent: 200}))
            .setPin(slide, {pushFollowers: false})
            .addTo(scrollController);
    });
}

animateSlides();

function navbarToggle(e) {
    if (!e.target.classList.contains('active-navbar')) {
        e.target.classList.add('active-navbar');
        gsap.to('.line1', 0.5, {rotate: 45, y: '150%', backgroundColor: 'black'});
        gsap.to('.line2', 0.5, {rotate: -45, y: '-150%', backgroundColor: 'black'});
        gsap.to('#logo', 0.5, {color: 'black'});
        gsap.to('.nav-bar', 1.5, {clipPath: 'circle(200vmax at 100% -50%)', ease: 'power2'});
    } else {
        e.target.classList.remove('active-navbar');
        gsap.to('.line1', 0.5, {rotate: 0, y: '0%', backgroundColor: 'white'});
        gsap.to('.line2', 0.5, {rotate: 0, y: '0%', backgroundColor: 'white'});
        gsap.to('#logo', 0.5, {color: 'white'});
        gsap.to('.nav-bar', 1.5, {clipPath: 'circle(50px at 100% -50%)', ease: 'power2'});
    }
}

const burger = document.querySelector('.burger');
burger.addEventListener('click', navbarToggle);
