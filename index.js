let cnvsSize = 600
let tick = 0
let entities = []
let buffer = true

function setup() {
    createCanvas(cnvsSize, cnvsSize)
    hud = createGraphics(cnvsSize, cnvsSize)
    bar = createGraphics(cnvsSize, cnvsSize)
    dots = createGraphics(cnvsSize, cnvsSize)
    setSize([hud, bar, dots])

    for (let i = 0; i < 20; i++) {
        entities.push({
            r: random(0, TWO_PI),
            d: 1 - random(0.1, 0.9) ** 2,
            s: random(-1, 1)
        })
    }
    console.log(entities)
}

function draw() {
    background(0)

    tick += TWO_PI / 500
    tick %= TWO_PI

    if (buffer) {
        entities.forEach((item) => {
            item.r += item.s * (1 - item.d) * TWO_PI / 500
            item.r %= TWO_PI
        })
    }
    buffer = !buffer

    drawHud()
    drawBar()
    drawDots()
}

function windowResized() {
    setSize([hud, bar, dots])
}

function setSize(arr) {
    cnvsSize = min(windowWidth, windowHeight) - 20
    resizeCanvas(cnvsSize, cnvsSize)
    translate(cnvsSize / 2, cnvsSize / 2)
    arr.forEach((item) => {
        item.resizeCanvas(cnvsSize, cnvsSize)
        item.translate(cnvsSize / 2, cnvsSize / 2)
    })
}

function drawHud() {
    hud.clear()
    hud.stroke(150, 255, 150)
    hud.strokeWeight(cnvsSize / 400)
    hud.noFill()
    hud.textSize(cnvsSize / 30)
    hud.textAlign(CENTER, CENTER)
    hud.textFont('Arial')

    for (let i = 0.8; i >= 0.2; i -= 0.2) {
        hud.ellipse(0, 0, cnvsSize * i)
    }

    for (i = 0; i < TWO_PI; i += QUARTER_PI) {
        hud.stroke(150, 255, 150)
        hud.line(0, 0, cos(i) * 0.4 * cnvsSize,
            sin(i) * 0.4 * cnvsSize)

        hud.noStroke()
        hud.fill(150, 255, 150)
        hud.text(180 * (i / PI), cos(i) * 0.45 * cnvsSize,
            sin(i) * 0.45 * cnvsSize)
    }
    hud.strokeWeight(1)

    image(hud, 0, 0)
}

function drawBar() {
    bar.erase(12)
    bar.rect(-cnvsSize / 2, -cnvsSize / 2, cnvsSize, cnvsSize)
    bar.erase()
    bar.arc(
        0, 0, 0.8 * cnvsSize,
        0.8 * cnvsSize,
        tick,
        tick + 0.1)
    bar.noErase()
    bar.stroke(0, 255, 0)
    bar.strokeWeight(2)
    bar.fill(0, 255, 0)
    bar.arc(
        0, 0, 0.8 * cnvsSize,
        0.8 * cnvsSize, 
        tick,
        tick + 0.1)

    image(bar, 0, 0)
}

function drawDots() {
    dots.erase(2)
    dots.rect(-cnvsSize / 2, -cnvsSize / 2, cnvsSize, cnvsSize)
    dots.erase()
    dots.fill(255)
    dots.arc(
        0, 0, 0.8 * cnvsSize,
        0.8 * cnvsSize,
        tick + TWO_PI / 500,
        tick + 2 * TWO_PI / 500)
    dots.noErase()
    dots.fill(0, 255, 0)
    dots.noStroke()
    entities.forEach((item) => {
        if (item.r > tick - TWO_PI / 500 &&
            item.r <= tick) {
            dots.ellipse(
                cos(item.r) * item.d * 0.4 * cnvsSize,
                sin(item.r) * item.d * 0.4 * cnvsSize,
                5)
        }
    })

    image(dots, 0, 0)
}
