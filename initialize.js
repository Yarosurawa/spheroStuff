//------------------defining functions---------------------------

const DEF_ROTATE_TIME = 200;
const DEF_FRICTION = 0.2;
const DEF_CLR_TIME = 200;

let spheroObj = {
    el: document.getElementById("sphero"),
    x: 0,
    y: 0,
    vx:0,
    vy:0,
    accx:0,
    accy:0,
    speed:0,
    friction: 0,
    heading:0,
    rotateTime: 300,
    clr: {r:255, g:255, b:255},
    clrTime: DEF_CLR_TIME,
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
        so.x += so.vx / 100
        so.y += so.vy / 100

        so.el.style.translate = `${so.x}px ${so.y}px`
        so.el.style.rotate = `${so.heading}deg`

        spheroObj = so;
        render();
    })
}

function updateTransition() {
    spheroObj.el.style.transition = 
        `all 100ms ease
        , rotate ${spheroObj.rotateTime}ms cubic-bezier(.82,-0.01,.19,.99)
        , background-color ${spheroObj.clrTime}ms ease`
}

updateTransition();

function setRotateTime(ms) {
    spheroObj.rotateTime = ms;
    updateTransition();
}


//------------------User functions---------------------------

async function delay(time) {
    await new Promise(resolve => setTimeout(resolve, time*1000))
}

async function roll(angl, speed, time){
    spheroObj.friction = DEF_FRICTION;
    spheroObj.rotateTime = DEF_ROTATE_TIME;
    spheroObj.heading = angl % 360;
    await setTimeout(()=>{
        spheroObj.speed = speed/10;
    }, DEF_ROTATE_TIME)
    await setTimeout(()=>{
        spheroObj.speed = 0
        spheroObj.friction = DEF_FRICTION * 3
    }, time * 1000)
    await delay(1)
}

async function spin(angl, time) {
    setRotateTime(time*1000);
    spheroObj.heading += angl;
    await setTimeout(()=>{
        setRotateTime(DEF_ROTATE_TIME)
    }, time*1000)
    await delay(time);
}

async function setHeading(angl, time) {
    setRotateTime(time*1000);
    spheroObj.heading = angl;
    await setTimeout(()=>{
        setRotateTime(DEF_ROTATE_TIME)
    }, time*1000)
}

function getHeading() {
    return spheroObj.heading % 360;
}

function getLocation() {
    return {x: spheroObj.x, y: spheroObj.y}
}

function setMainLed(clr){
    spheroObj.clr = clr;
    spheroObj.el.style.backgroundColor = `rgb(${clr.r}, ${clr.g}, ${clr.b})`
}

function help() {
    console.table(
        ['roll()', 'spin()', 'setHeading()', 'getHeading()', 'delay()', 'getLocation()', 'setMainLed()', 'startProgram()', 'help()']
    )

    console.info(
        [roll, spin, setHeading, getHeading, delay, getLocation, setMainLed, help]
    )
}
