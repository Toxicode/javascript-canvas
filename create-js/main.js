var samples = {};

$(function() {

    var canvas = document.getElementById('canvas');

    samples.animation = function() {

        var stage = new createjs.Stage(canvas);

        var spritesheet = new createjs.SpriteSheet({
            images: ["../assets/bomberman_spritesheet.png"],
            frames: {
                width: 16,
                height: 16
            },
            animations: {
                run: [4, 7, "run", 4]
            }
        });

        var character = new createjs.BitmapAnimation(spritesheet);
        character.gotoAndPlay("run");
        character.x = 0;
        character.y = 90;
        character.scaleX = character.scaleY = 3;
        stage.addChild(character);

        function tick(event) {
            character.x = (character.x >= canvas.width) ? 0 : character.x + 2;
            stage.update(event);
        }

        createjs.Ticker.addEventListener("tick", tick);

    };

    samples.dragAndDrop = function() {
        stage = new createjs.Stage(canvas);

        // Création d'un graphique
        var graphic = new createjs.Graphics();
        graphic.setStrokeStyle(1);
        graphic.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
        graphic.beginFill(createjs.Graphics.getRGB(255, 0, 0));
        graphic.drawCircle(0, 0, 50);

        var shape = new createjs.Shape(graphic);
        shape.x = 100;
        shape.y = 100;

        // Ajout de la forme sur le canvas
        stage.addChild(shape);
        stage.update();

        // Activer la fonctionnalité Touch et la souris
        createjs.Touch.enable(stage);
        stage.enableMouseOver(10);
        stage.mouseMoveOutside = true;

        // Update le canvas que lorsque c'est necessaire
        var update = true;

        shape.onPress = function(e) {

            var offset = {
                x: shape.x - e.stageX,
                y: shape.y - e.stageY
            };

            e.onMouseMove = function(ev) {
                shape.x = ev.stageX + offset.x;
                shape.y = ev.stageY + offset.y;

                // Indiquer au canvas qu'il doit se mettre à jour
                update = true;
            }

        };

        function tick(e) {
            if (update) {
                update = false;
                stage.update(e);
            }
        }

        createjs.Ticker.addEventListener("tick", tick);

    };

    samples.tween = function() {

        var stage = new createjs.Stage(canvas);

        // Alternative pour créer une forme
        var ball = new createjs.Shape();
        ball.graphics.setStrokeStyle(5, 'round', 'round');
        ball.graphics.beginStroke(('#000000'));
        ball.graphics.beginFill("#FF0000").drawCircle(0, 0, 50);
        ball.graphics.endStroke();
        ball.graphics.endFill();
        ball.graphics.setStrokeStyle(1, 'round', 'round');
        ball.graphics.beginStroke(('#000000'));
        ball.graphics.moveTo(0, 0);
        ball.graphics.lineTo(0, 50);
        ball.graphics.endStroke();

        ball.x = 200;
        ball.y = -50;

        var tween = createjs.Tween.get(ball, {
            loop: true // Tourner en boucle
        }).to({
            x: ball.x,
            y: canvas.height - 55,
            rotation: -360
        }, 1500, createjs.Ease.bounceOut).wait(1000).to({
            x: canvas.width - 55,
            rotation: 360
        }, 2500, createjs.Ease.bounceOut).wait(1000).to({
            scaleX: 2,
            scaleY: 2,
            x: canvas.width - 110,
            y: canvas.height - 110
        }, 2500, createjs.Ease.bounceOut).wait(1000).to({
            scaleX: .5,
            scaleY: .5,
            x: 30,
            rotation: -360,
            y: canvas.height - 30
        }, 2500, createjs.Ease.bounceOut);

        stage.addChild(ball);

        createjs.Ticker.addEventListener("tick", function() {
            stage.update();
        });
    };

});
