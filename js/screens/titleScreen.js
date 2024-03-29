const titleScreen = {

    box: {
        x: 0,
        y: 0,
    },

    draw: function () {

        //fill background
        canvasContext.fillStyle = 'black';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        //fun polygon background
        for(let i = 0; i < 20; i++){
            canvasContext.fillStyle = `
            rgb(
                ${Math.floor(255*Math.sin(ticker/300*i))},
                ${Math.floor(255*Math.cos(ticker/100*i/20))},
                ${Math.floor(255*Math.sin(ticker/60))})`;

            strokePolygon(canvas.width/2, 180 - i*7, 10*i, 7, ticker/100*i/2);
            
        }
        
        //title text
        gameFont.drawText("Diggernaut", { x: 10, y: 10 }, 0, 0, 2);
        gameFont.drawText("Press Z to Start", { x: 10, y: 30 }, 0, 0);

    },

    update: function () {
        if(Key.justReleased(Key.a)){
            audio.playSound(loader.sounds.test1);
        }
        if(Key.justReleased(Key.z)) { signal.dispatch('startGame'); }

        this.box.x = canvas.width/2 - 5;
        this.box.y = canvas.height/2 - 5;
        this.box.x += Math.sin(ticker/10) * 100;
        this.box.y += Math.cos(ticker/10) * 100;
        
    }
}


