let spheroObj = {
    el: document.getElementById("sphero"),
    x: 0,
    y: 0,
    vx:0,
    vy:0,
    accx:0,
    accy:0,
    speed:0,
    friction: 0.1,
    heading:0,
}

async function roll(angl, speed, time){
    spheroObj.friction = 0.1;
    spheroObj.heading = angl;
    spheroObj.speed = speed/10;
    await setTimeout(()=>{
        spheroObj.speed = 0
        spheroObj.friction = .3
    }, time * 1000)
}

function render(){
    requestAnimationFrame(()=>{
        let so = spheroObj
        let speed = spheroObj.speed 
        sinx = Math.sin((so.heading)%360 * Math.PI / 180)
        siny = Math.sin((so.heading - 90)%360 * Math.PI / 180)

        so.accx = speed * sinx
        so.accy = speed * siny
        so.vx += so.accx
        so.vy += so.accy
        so.vx -= so.friction * so.vx / 10
        so.vy -= so.friction * so.vy / 10
        so.x += so.vx
        so.y += so.vy

        so.el.style.translate = `${so.x / 100}px ${so.y / 100}px`

        spheroObj = so;
        render();
    })
}
