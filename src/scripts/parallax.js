document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('.page')
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    let clientX;
    let clientY;
    let dx, dy, tiltx, tilty, radius, degree, request;

    body.addEventListener('mousemove', e => {
        clientX = e.pageX - 300;
        clientY = e.pageY - 300;
        request = requestAnimationFrame(parallax);
    })
    function parallax() {
        dx     = clientX - cx;
        dy     = clientY - cy;
        tiltx  = dy / cy;
        tilty  = dx / cx;
        radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2));
        degree = radius * 12;
        gsap.to('.savosko', 1, { transform: `rotate3d( ${tiltx}, ${tilty}, 0, ${degree}deg )` });
    }
})
