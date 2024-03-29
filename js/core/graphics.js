
/**
 * clears the screen with a color
 *
 * @param {string} [color='#040408']
 */
function clearScreen(color = '#040408') {
    canvasContext.save();
    canvasContext.setTransform(1, 0, 0, 1, 0, 0);
    canvasContext.fillStyle = color;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.restore();
}

/**
 * draws a stroked equaliteral polygon. assumes canvasContext exists
 * @param  {} x: x position of center
 * @param  {} y: y position of center
 * @param  {} r: radius
 * @param  {} sides: number of sides
 * @param  {} rotation=0 : rotation of polygon in radians
 */
function strokePolygon(x, y, r, sides, rotation = 0) {
    //sides = sides || Math.floor( 120 * (r*2) )+16;
    canvasContext.beginPath();
    let ox, oy, px, py;
    for (let i = 0; i < sides; i++) {
        let j = i / sides * 6.283185; //tau radians
        let j2 = (i + 1) / sides * 6.283185; 
        ox = x + Math.cos(j + rotation) * r;
        oy = y + Math.sin(j + rotation) * r;
        px = x + Math.cos(j2 + rotation) * r;
        py = y + Math.sin(j2 + rotation) * r;
        line(px, py, ox, oy, canvasContext.fillStyle);
    }
    //canvasContext.closePath();
    //canvasContext.stroke();
}

/**
 * draws a filled rectangle. assumes canvasContext exists
 * @param  {} x: x position of center
 * @param  {} y: y position of center
 * @param  {} width: width of rectangle
 * @param  {} height: height of rectangle
 */
function fillRect(x, y, width, height) {
    canvasContext.fillRect(x, y, width, height);
}


/**
 * fills one pixel. assumes canvasContext exists
 * @param  {} x: integer x position of pixel. 
 * @param  {} y: integer y position of pixel
 * @param  {} color: color of pixel. default is error magenta
 * 
 */
function pset(x, y) {
    canvasContext.fillRect(x|0, y|0, 1, 1);
}

//line uses pset and breseham's line algorithm to draw a pixel line between two points in a single color
//dynamically drawn objects and effects should use this instead of canvasContext.line, to avoid anti-aliasing.
function line(x1, y1, x2, y2, color = '#FF00FF') {

    //we take in floats, but we need to round them to integers for the algorithm to work
    x1 = Math.round(x1);
    y1 = Math.round(y1);
    x2 = Math.round(x2);
    y2 = Math.round(y2);
    
    canvasContext.fillStyle = color;
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let sx = (x1 < x2) ? 1 : -1;
    let sy = (y1 < y2) ? 1 : -1;
    let err = dx - dy;
    while (true) {
        pset(x1, y1);
        if ((x1 == x2) && (y1 == y2)) break;
        let e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x1 += sx; }
        if (e2 < dx) { err += dx; y1 += sy; }
    }
}
class spriteFont {
    /**
     * Creates an instance of spriteFont.
     * @date 3/17/2023 - 1:10:36 PM
     *
     * @constructor
     * @param {*} width
     * @param {*} height
     * @param {*} characterWidth
     * @param {*} characterHeight
     * @param {*} image
     */
    constructor(
        width,
        height,
        characterWidth,
        characterHeight,
        image) {
        this.width = width;
        this.height = height;
        this.characterWidth = characterWidth;
        this.characterHeight = characterHeight;

        this.widthInCharacters = Math.floor(width / characterWidth);
        this.heightInCharacters = Math.floor(height / characterHeight);
        this.characterOrderString = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.0123456789 '!@#$%^&*()+-=,":;><`,

        this.characterMap = this.characterOrderString.split("");
        this.image = image;

        return this;
    }

    /**
     * draws text to the canvas. assumes canvasContext exists
     *
     * @param {string} textString
     * @param {{ x: number; y: number; }} [pos={ x: 0, y: 0 }]
     * @param {int} [hspacing=0]
     * @param {int} [vspacing=2]
     * @param {int} [scale=1]
     */
    drawText(textString, pos = { x: 0, y: 0 }, hspacing = 0, vspacing = 2, scale = 1) {
        if (!textString) return;
        var lines = textString.split("\n");
        var self = this;
        self.pos = pos, self.hspacing = hspacing, self.vspacing = vspacing;
        lines.forEach(function (line, index, arr) {
            self._textLine({ textString: line, pos: { x: self.pos.x, y: self.pos.y + index * (self.characterHeight + self.vspacing) * scale }, hspacing: self.hspacing }, scale)
        })
    }

    _textLine({ textString, pos = { x: 0, y: 0 }, hspacing = 0 } = {}, scale = 1) {
        var textStringArray = textString.split("");
        var self = this;

        textStringArray.forEach(function (character, index, arr) {
            //find index in characterMap
            let keyIndex = self.characterMap.indexOf(character);
            //tranform index into x,y coordinates in spritefont texture
            let spriteX = (keyIndex % self.widthInCharacters) * self.characterWidth;
            let spriteY = Math.floor(keyIndex / self.widthInCharacters) * self.characterHeight;
            //draw
            //console.log(character);
            canvasContext.imageSmoothingEnabled = false;
            canvasContext.drawImage(
                self.image,
                spriteX,
                spriteY,
                self.characterWidth,
                self.characterHeight,
                pos.x + ((self.characterWidth + hspacing) * index * scale),
                pos.y,
                self.characterWidth * scale,
                self.characterHeight * scale
            )
        })
    }
}
