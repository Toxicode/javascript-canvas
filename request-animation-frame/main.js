var samples = {};

$(function() {

    var canvas = document.getElementById('canvas');
    var spritesheet = document.getElementById('image');
    var ctx = canvas.getContext('2d');

    samples.simpleAnimation = function() {

        var x = 0;
        var y = 0;
        var direction = 1;

        onEachFrame(function() {

            // Clear le canvas à chaque frame
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Tracer l'image
            ctx.drawImage(spritesheet, x, y);

            // Update la position de l'image
            x += 1 * direction;
            if (x >= canvas.width - spritesheet.width) {
                x = canvas.width - spritesheet.width;
                direction = -1;
            } else if (x <= 0) {
                x = 0;
                direction = 1;
            }

        });

    };

    samples.buffer = function() {

        // Création d'un nouveau canvas
        var buffer = document.createElement('canvas');
        buffer.width = canvas.width;
        buffer.height = canvas.height;

        var bufferCtx = buffer.getContext("2d");
        var screenCtx = ctx;

        var x = 0;
        var y = 0;
        var direction = 1;

        onEachFrame(function() {

            // Clear le buffer et le canvas d'affichage
            bufferCtx.clearRect(0, 0, canvas.width, canvas.height);
            screenCtx.clearRect(0, 0, canvas.width, canvas.height);

            // On travail sur le buffer
            bufferCtx.drawImage(spritesheet, x, y);

            x += 1 * direction;
            if (x >= canvas.width - spritesheet.width) {
                x = canvas.width - spritesheet.width;
                direction = -1;
            } else if (x <= 0) {
                x = 0;
                direction = 1;
            }

            // Lorsque tout est déssiné on affiche le buffer sur le canvas d'affichage
            screenCtx.drawImage(buffer, 0, 0);

        });

    };

    samples.game = function() {

        // Création d'un nouveau canvas
        var buffer = document.createElement('canvas');
        buffer.width = canvas.width;
        buffer.height = canvas.height;

        var bufferCtx = buffer.getContext("2d");
        var screenCtx = ctx;

        var x = 0;
        var y = 0;
        
        var spriteFrame = 0;
        
        var keyPressed = {
            37: false, // left
            38: false, // up
            39: false, //right
            40: false // down
        };

        
        function update() {
            if (keyPressed[37]) {
                x -= 1;
                spriteFrame = 4;
            } else if (keyPressed[39]) {
                x += 1;
                spriteFrame = 4;
            }
            
            if (keyPressed[38]) {
                y -= 1;
                spriteFrame = 0;
            } else if (keyPressed[40]) {
                y += 1;
                spriteFrame = 1;
            }
        }

        function draw() {
            if(keyPressed[37]) {
                // Save l'état actuel du canvas
                bufferCtx.save();
                
                // Retourner le canvas
                bufferCtx.scale(-1, 1);
                bufferCtx.drawImage(spritesheet, 16*spriteFrame, 0, 16, 16, -x-16, y, 16, 16);
                
                // Restore le canvas
                bufferCtx.restore();
                
            } else {
                bufferCtx.drawImage(spritesheet, 16*spriteFrame, 0, 16, 16, x, y, 16, 16);
            }

        }

        onEachFrame(function() {

            // Clear le buffer et le canvas d'affichage
            bufferCtx.clearRect(0, 0, canvas.width, canvas.height);
            screenCtx.clearRect(0, 0, canvas.width, canvas.height);

            update();
            draw();

            // Lorsque tout est déssiné on affiche le buffer sur le canvas d'affichage
            screenCtx.drawImage(buffer, 0, 0);

        });
        
        $(document).keydown(function(e) {
            if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
                keyPressed[e.keyCode] = true;
            }
        });
        
        $(document).keyup(function(e) {
            if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
                keyPressed[e.keyCode] = false;
            }
        });

    }

});
