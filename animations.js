// InvestYum — Scroll reveals + ambient glow parallax (no GSAP)

(function () {
    'use strict';

    // Scroll-triggered reveal for services and CTA
    function initScrollReveal() {
        var targets = document.querySelectorAll(
            '.section-label, .service-card, .cta'
        );

        if (!targets.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        targets.forEach(function (el) {
            observer.observe(el);
        });
    }

    // Ambient glow follows mouse with smooth parallax
    function initAmbientGlow() {
        var glow = document.querySelector('.ambient-glow');
        if (!glow) return;

        // Respect reduced motion
        var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mq.matches) return;

        document.addEventListener('mousemove', function (e) {
            var x = (e.clientX / window.innerWidth - 0.5) * 60;
            var y = (e.clientY / window.innerHeight - 0.5) * 40;
            glow.style.transform =
                'translate(calc(-50% + ' + x + 'px), calc(-50% + ' + y + 'px))';
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initScrollReveal();
        initAmbientGlow();
    });
})();
