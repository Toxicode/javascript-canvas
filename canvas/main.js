var samples = {};

addLoadListener(function() {


    // Récupération de la balise canvas
    var canvas = document.getElementById('canvas');

    // Récupération du context de rendu (2d, ou webgl)
    var ctx = canvas.getContext('2d');


    //Remplir une forme
    samples.fill = function() {

        // RGB
        ctx.fillStyle = "rgb(200,0,0)";

        // Remplir un rectangle : fillRect(x, y, width, height)
        ctx.fillRect(10, 10, 55, 50);

        // RGBAlpha
        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect(30, 30, 55, 50);

        // Couleurs web : http://fr.wikipedia.org/wiki/Couleurs_du_Web
        ctx.fillStyle = "orange";
        ctx.fillRect(50, 50, 55, 50);

        // Hexadecimal
        ctx.fillStyle = "#cdcdcd";
        ctx.fillRect(70, 70, 55, 50);

        // Dessiner une bordure
        ctx.strokeRect(90, 90, 55, 50);
    };


    // Nettoyer une surface ou le canvas entier
    samples.clear = function() {

        // Effacer tout le canvas
        ctx.clearRect(0, 0, 500, 500);

    };


    // Paths
    // Lignes
    samples.basicPath = function() {

        // Commencer un nouveau path
        ctx.beginPath();

        // Bouger le curseur à x, y
        ctx.moveTo(75, 50);

        // Faire une ligne jusque x, y
        ctx.lineTo(100, 75);
        // ...
        ctx.lineTo(100, 25);

        // Terminer le path
        ctx.closePath();

        // Remplir la forme
        ctx.fill();

    };

    // Arc de cercle
    samples.arcPath = function() {

        ctx.beginPath();

        // Params :
        // - Position x du centre du cercle
        // - Position y du centre du cercle
        // - Rayon
        // - Angle de départ (en radian), 0 = position à 3h de l'arc de cercle
        // - Angle de fin (en radian)
        // - Sens horaire (true) ou anti-horaire (false)
        // Tracer un cercle complet
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true);
        ctx.moveTo(110, 75);

        // Tracer la bouche
        ctx.arc(75, 75, 35, 0, Math.PI, false);
        ctx.moveTo(65, 65);

        // Oeil gauche
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
        ctx.moveTo(95, 65);

        // Oeil droit
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
        // Tracer les bordures
        ctx.stroke();

        // Astuce : convertir les degrés en radian
        // function degreesToRadians(degrees) { return (Math.PI/180)*degrees; }
    };

    // Courbes
    samples.bezierPath = function() {
        ctx.beginPath();

        // Point de départ
        ctx.moveTo(75, 40);

        // Params :
        // - Position X du 1er point de contrôle
        // - Position Y du 1er point de contrôle
        // - Position X du 2e point de contrôle
        // - Position Y du 2e point de contrôle
        // - Position X du point de fin
        // - Position Y du point de fin
        ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
        ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
        ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
        ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
        ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
        ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);

        // Remplissage de la forme
        ctx.fill();
    };



    // Images
    samples.image = function() {

        // Créer une nouvelle image
        var img = new Image();

        // Lorsque l'image est chargée
        img.onload = function() {

            // On l'affiche sur le canvas
            // Params de base:
            // - Element de l'image
            // - Position X
            // - Position Y
            ctx.drawImage(img, 50, 50);

            // On peut définir la taille (pour resize l'image) :
            // - Element de l'image
            // - Position X
            // - Position Y
            // - Largeur
            // - Hauteur
            ctx.drawImage(img, 50, 100, img.width * 2, img.height * 2);
            ctx.drawImage(img, 50, 150, img.width / 2, img.height / 2);

            // On peut également découper l'image
            // - Element de l'image
            // - Position X à l'intérieur de l'image
            // - Position Y à l'intérieur de l'image
            // - Largeur à l'intérieur de l'image
            // - Hauteur à l'intérieur de l'image
            // - Position X sur le canvas
            // - Position Y sur le canvas
            // - Largeur sur le canvas
            // - Hauteur sur le canvas
            // Dans notre cas prenons uniquement la première frame du spritesheet
            ctx.drawImage(img, 0, 0, 16, 16, 50, 200, 16, 16);
            // Zoom
            ctx.drawImage(img, 0, 0, 16, 16, 50, 250, 32, 32);
        };

        // Indiquer le chemin vers l'image
        img.src = "../assets/bomberman_spritesheet.png";


        // On peut également utiliser une image déjà présente dans le DOM
        ctx.drawImage(document.getElementById('image'), 50, 300);

    };

    // Styles
    samples.style = function() {

        // Alpha
        ctx.fillRect(0, 0, 150, 150);

        ctx.globalAlpha = 0.5;

        ctx.fillStyle = '#FD0';
        ctx.fillRect(25, 25, 150, 150);
        ctx.fillRect(50, 50, 150, 150);

        ctx.globalAlpha = 1;

        // Taille des bordures
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(250, 15);
        ctx.lineTo(250, 140);
        ctx.stroke();

        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(270, 15);
        ctx.lineTo(270, 140);
        ctx.stroke();

        // Linecap - Determine comme s'affiche la fin d'une ligne (Par défault "butt")
        // Arrondie
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(290, 15);
        ctx.lineTo(290, 140);
        ctx.stroke();

        // Carrée (Ajoute une boite à la fin qui à l'équivalent de la moitié de la largeur en hauteur)
        ctx.lineCap = "square";
        ctx.beginPath();
        ctx.moveTo(310, 15);
        ctx.lineTo(310, 140);
        ctx.stroke();

        // Linejoin - Determine comment 2 segments sont connectés (line, curve, arc)
        var lineJoin = ['round', 'bevel', 'miter'];
        ctx.lineWidth = 10;
        for (var i = 0; i < lineJoin.length; i++) {
            ctx.lineJoin = lineJoin[i];
            ctx.beginPath();
            ctx.moveTo(-5, 305 + i * 40);
            ctx.lineTo(35, 345 + i * 40);
            ctx.lineTo(75, 305 + i * 40);
            ctx.lineTo(115, 345 + i * 40);
            ctx.lineTo(155, 305 + i * 40);
            ctx.stroke();
        }
    };

    // Dégradés
    samples.gradiant = function() {

        var lingrad = ctx.createLinearGradient(0, 0, 0, 150);
        lingrad.addColorStop(0, '#00ABEB');
        lingrad.addColorStop(0.5, '#fff');
        lingrad.addColorStop(1, '#26C000');

        // assign gradients to fill and stroke styles
        ctx.fillStyle = lingrad;

        // draw shapes
        ctx.fillRect(10, 10, 130, 130);

    };
    
    // Textes
    samples.text = function() {
        ctx.font = "20px serif";
        ctx.fillStyle = "#000000";
        
        // Params :
        // - String
        // - Position X
        // - Position Y
        ctx.fillText("Du texte", 5, 30);
    };
    
    
    // Ombres
    samples.shadow = function() {
        
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        
        ctx.font = "20px serif";
        ctx.fillStyle = "#000000";
        ctx.fillText("Du texte", 5, 30);
        
    }
    
    
    // Enregistrer l'état du canvas et le restaurer
    samples.restore = function() {
        ctx.save();
        
        ctx.shadowBlur = 2;
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.font = "20px serif";
        ctx.fillStyle = "#000000";
        ctx.fillText("Style modifié", 5, 30);
        
        ctx.restore();
        ctx.fillText("Style par défault", 5, 80);
    }

});
