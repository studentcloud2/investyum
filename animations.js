// Investyum v2 — Minimal animations: scroll reveal, count-up metrics, sticky nav
(function () {
    'use strict';

    var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    // --- Scroll Reveal ---
    function initReveal() {
        var els = document.querySelectorAll(
            '.hero-inner, .hero-geo, .proof-inner, .services-inner, ' +
            '.service-card, .approach-inner, .step, .about-inner, .contact-inner'
        );
        els.forEach(function (el) { el.classList.add('reveal'); });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        els.forEach(function (el) { observer.observe(el); });
    }

    // --- Count-Up Metrics ---
    function initCountUp() {
        var values = document.querySelectorAll('.metric-value[data-target]');
        if (!values.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                var target = parseInt(el.getAttribute('data-target'), 10);
                var duration = 1500;
                var start = performance.now();

                function tick(now) {
                    var elapsed = now - start;
                    var progress = Math.min(elapsed / duration, 1);
                    // ease-out cubic
                    var eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.round(eased * target);
                    if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
                observer.unobserve(el);
            });
        }, { threshold: 0.5 });

        values.forEach(function (el) { observer.observe(el); });
    }

    // --- Sticky Nav ---
    function initNav() {
        var nav = document.querySelector('.nav');
        if (!nav) return;
        window.addEventListener('scroll', function () {
            if (window.scrollY > 80) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initReveal();
        initCountUp();
        initNav();
    });
})();
