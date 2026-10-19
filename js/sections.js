/* =====================================================================
   SECTIONS JS
   Small behaviours for the new sections in index.html.
   ===================================================================== */


/* ---------------------------------------------------------------------
   HERO / STATS (#stats): count each number up from 0 when it scrolls
   into view. The final value comes from the data-target attribute, so to
   change a number edit data-target in index.html.
   --------------------------------------------------------------------- */
(function () {
    var counters = document.querySelectorAll('#stats .stat_count[data-target]');
    if (!counters.length) {
        return;
    }

    function animate(el) {
        var target = parseInt(el.getAttribute('data-target'), 10) || 0;
        var duration = 1600;
        var start = null;

        function step(timestamp) {
            if (!start) {
                start = timestamp;
            }
            var progress = Math.min((timestamp - start) / duration, 1);
            // ease-out so the count slows down near the end
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
        counters.forEach(function (el) {
            el.textContent = el.getAttribute('data-target');
        });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animate(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    counters.forEach(function (el) {
        el.textContent = '0';
        observer.observe(el);
    });
})();


/* ---------------------------------------------------------------------
   HERO SECTION (#head): typing effect for the role line.
   The roles come from data-roles in index.html, separated by "|".
   --------------------------------------------------------------------- */
(function () {
    var el = document.querySelector('#head .hero_typed');
    if (!el || !el.getAttribute('data-roles')) {
        return;
    }

    var roles = el.getAttribute('data-roles').split('|'),
        role = 0,
        chars = roles[0].length,
        deleting = true;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    function tick() {
        var text = roles[role];
        el.textContent = text.slice(0, chars);

        if (deleting) {
            chars--;
            if (chars < 0) {
                deleting = false;
                role = (role + 1) % roles.length;
                chars = 0;
                return setTimeout(tick, 300);
            }
            return setTimeout(tick, 35);
        }

        chars++;
        if (chars > text.length) {
            deleting = true;
            chars = text.length;
            return setTimeout(tick, 2200);
        }
        setTimeout(tick, 70);
    }

    // start by showing the first role for a moment, then begin cycling
    setTimeout(tick, 2500);
})();


/* ---------------------------------------------------------------------
   TECHNICAL SKILLS SECTION (#techSphere): interactive 3D tech sphere.
   Every .sphere_item is spread evenly over a sphere, which spins on its
   own and can be dragged with mouse or finger.
   --------------------------------------------------------------------- */
(function () {
    var sphere = document.getElementById('techSphere');
    if (!sphere) {
        return;
    }

    var items = Array.prototype.slice.call(sphere.querySelectorAll('.sphere_item')),
        count = items.length,
        points = [];

    // Fibonacci sphere: evenly spaced points
    for (var i = 0; i < count; i++) {
        var y = 1 - (i / Math.max(count - 1, 1)) * 2,
            radius = Math.sqrt(1 - y * y),
            phi = i * Math.PI * (3 - Math.sqrt(5));
        points.push({ x: Math.cos(phi) * radius, y: y, z: Math.sin(phi) * radius });
    }

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        autoSpeed = reduceMotion ? 0 : 0.004,
        rotX = 0.35,
        rotY = 0,
        velX = 0,
        velY = autoSpeed,
        dragging = false,
        lastX = 0,
        lastY = 0;

    function render() {
        var size = sphere.clientWidth / 2 - 40,
            cosX = Math.cos(rotX), sinX = Math.sin(rotX),
            cosY = Math.cos(rotY), sinY = Math.sin(rotY);

        items.forEach(function (el, index) {
            var p = points[index],
                x1 = p.x * cosY + p.z * sinY,
                z1 = -p.x * sinY + p.z * cosY,
                y1 = p.y * cosX - z1 * sinX,
                z2 = p.y * sinX + z1 * cosX,
                depth = (z2 + 1) / 2;   // 0 = back, 1 = front

            el.style.transform = 'translate3d(' + (x1 * size).toFixed(1) + 'px,' +
                (y1 * size).toFixed(1) + 'px,0) scale(' + (0.55 + 0.45 * depth).toFixed(3) + ')';
            el.style.opacity = (0.3 + 0.7 * depth).toFixed(2);
            el.style.zIndex = Math.round(depth * 100);
        });
    }

    function loop() {
        if (!dragging) {
            rotX += velX;
            rotY += velY;
            // after a drag, slow down smoothly back to the normal spin
            velX *= 0.95;
            velY += (autoSpeed - velY) * 0.05;
        }
        render();
        window.requestAnimationFrame(loop);
    }

    sphere.addEventListener('pointerdown', function (e) {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        sphere.classList.add('dragging');
        sphere.setPointerCapture(e.pointerId);
    });

    sphere.addEventListener('pointermove', function (e) {
        if (!dragging) {
            return;
        }
        var dx = e.clientX - lastX,
            dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        velY = dx * 0.008;
        velX = -dy * 0.008;
        rotY += velY;
        rotX += velX;
    });

    function stopDrag() {
        dragging = false;
        sphere.classList.remove('dragging');
    }

    sphere.addEventListener('pointerup', stopDrag);
    sphere.addEventListener('pointercancel', stopDrag);

    loop();
})();


/* ---------------------------------------------------------------------
   PORTFOLIO SECTION (#Portfolio): "View details" opens the gallery of
   that project (same as clicking the big image).
   --------------------------------------------------------------------- */
(function () {
    if (!window.jQuery) {
        return;
    }
    jQuery(document).on('click', '#portfolio_wrapper .open-gallery', function (e) {
        e.preventDefault();
        jQuery(this).closest('.portfolio-card').find('a.hover-bg').trigger('click');
    });
})();


/* ---------------------------------------------------------------------
   TECHNICAL SKILLS SECTION (#techSkills): duplicate the tags of every
   moving row once, so the CSS loop (translateX -50%) has no gap.
   Add or remove skills only in index.html - this copies them for you.
   --------------------------------------------------------------------- */
(function () {
    var tracks = document.querySelectorAll('#techSkills .skills_track');

    tracks.forEach(function (track) {
        var tags = Array.prototype.slice.call(track.children);
        tags.forEach(function (tag) {
            var copy = tag.cloneNode(true);
            copy.setAttribute('aria-hidden', 'true');
            track.appendChild(copy);
        });
    });
})();
