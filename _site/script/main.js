$(document).ready(function(){

// =============================================================================
// TO SAVE THE DOM ELEMENTS TO VARIABLES.
// =============================================================================
    var container = $('#container');
    var bird = $('#bird');
    var pole = $('.pole');
    var pole_1 = $('#pole-1');
    var pole_2 = $('#pole-2');
    var speedSpan = $('#speed');
    var restartButton = $('#restart');
    var score =0 // $('#score');
    var gameScore = $('#score');

    // =========================================================================
    // SAVING INITIAL SETUP
    // =========================================================================

    var containerWidth = parseInt(container.width());
    var containerHeight = parseInt(container.height());
    var poleInitialPosition = parseInt(pole.css('right'));
    var poleInitialHeight = parseInt(pole.css('height'));
    var birdLeft = parseInt(bird.css('left'));
    var birdHeight = parseInt(bird.height());
    var speed = 10;

    
    // other dclarations
    var goUp = false;
    var scoreUpdated = false;
    var gameOver = false;

    var theGame = setInterval(function(){

        if(collision(bird,pole_1) || collision(bird,pole_2)
         || parseInt(bird.css('top'))<=0 || parseInt(bird.css('top')) > containerHeight - birdHeight){

            stopTheGame(); // stop game if any of this is true.

        } else{
            
            var poleCurrentPosition = parseInt(pole.css('right')); // set pole current position.

            // update scores when bird passes poles successfully.

            if(poleCurrentPosition > containerWidth - birdLeft){
                if(scoreUpdated === false){
               score+=1
               gameScore.text('Current Score: ' + score);

               scoreUpdated = true;
               console.log(score);


                }
               

            }

            // check if poles moved outside the conatiner
            if(poleCurrentPosition > containerWidth){

                var newHeight = parseInt(Math.random() *100); // generate random new heights from 10 -100
                console.log(newHeight);

                // change pole height
                pole_1.css('height', poleInitialHeight + newHeight);
                pole_2.css('height', poleInitialHeight - newHeight);

                // increase speed
                speed +=1;
                speedSpan.text("SPEED " + speed);
                scoreUpdated = false;

                poleCurrentPosition = poleInitialPosition; // reset the pole current position to it's initial position.
            }
            // move the poles.
            pole.css('right', poleCurrentPosition + speed); // move the poles.

            if(goUp === false){
                goDown();
            }
        }
    },40);
    // set bird to go up when space bar is pressed.
    var spaceBarDown = addEventListener('keydown', function(e){
        var key = e.keyCode;
        if(key === 32 && goUp === false && gameOver ===false){
            goUp = setInterval(up,50);
        }
    });
    // let bird to go down when the space bar is released.
    var spaceBarUp = addEventListener('keyup', function(e){
        var key = e.keyCode;
        if(key === 32 ){
            this.clearInterval(goUp);
            goUp = false;
        }
    });
    // function for bird going down
    function goDown(){
         bird.css('top', parseInt(bird.css('top')) +5);
    }
    // function for bird going up.
    function up(){
        bird.css('top', parseInt(bird.css('top')) -10);
    }
    // =========================================================================
    // FUNCTION FOR STOPPING GAME
    // =========================================================================

    function stopTheGame(){
        clearInterval(theGame);
        gameOver = true;
        restartButton.slideDown(500);


    }

    // =========================================================================
    // FUNCTION TO RESTART GAME
    // =========================================================================

    restartButton.click(function(){
        location.reload();

    });


    // =========================================================================
    // FUNCTION TO RETURN TRUE / FALSE IF BIRD COLLIDES WITH POLES 
    // =========================================================================
    function collision($div1, $div2){
         var x1 = $div1.offset().left;
         var y1 = $div1.offset().top;
         var h1 = $div1.outerHeight(true);
         var w1 = $div1.outerWidth(true); 
         var b1 = y1 + h1;
         var r1 = x1 + w1;
         var x2 = $div2.offset().left;
         var y2 = $div2.offset().top;
         var h2 = $div2.outerHeight(true);
         var w2 = $div2.outerWidth(true);
         var b2 = y2 + h2;
         var r2 = x2 + w2;

         if(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
         return true;
 
    }
});