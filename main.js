function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    // ctx.fillStyle = "SaddleBrown";
    ctx.fillStyle = "Red"
    // startX, startY, length, height
    ctx.fillRect(0,550,800,250);
    Entity.prototype.draw.call(this);
}

// function Unicorn(game) {
//     //function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse)
//     this.animation = new Animation(ASSET_MANAGER.getAsset("./img/RobotUnicorn.png"), 0, 0, 206, 110, 0.02, 30, true, true);
    
//     this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/RobotUnicorn.png"), 618, 334, 174, 138, 0.03, 40, false, true);
    
//     this.dashAnimation = new Animation(ASSET_MANAGER.getAsset("./img/RobotUnicorn.png"), 0, 900, 474, 194, 0.04, 16, false, false);
    
//     // this.walkAnimation = new Animation(ASSET_MANAGER.getAsset("./img/RobotUnicorn.png"), 0, 0, 206, 110, 0.02, 30, true, true);

//     this.jumping = false;
//     this.dashing = false;
//     this.radius = 100;
//     this.ground = 400;
//     Entity.call(this, game, 0, 400);
// }

// Unicorn.prototype = new Entity();
// Unicorn.prototype.constructor = Unicorn;

// Unicorn.prototype.update = function () {
//     if (this.game.space) this.jumping = true;

//     if (this.game.dashKey) this.dashing = true;

//     if (this.jumping) {
//         if (this.jumpAnimation.isDone()) {
//             this.jumpAnimation.elapsedTime = 0;
//             this.jumping = false;
//         }
//         var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
//         var totalHeight = 200;

//         if (jumpDistance > 0.5)
//             jumpDistance = 1 - jumpDistance;

//         // var height = jumpDistance * 2 * totalHeight;
//         var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
//         this.y = this.ground - height;
//     }

//     if (this.dashing) {
//         if (this.dashAnimation.isDone()) {
//             this.dashAnimation.elapsedTime = 0;
//             this.dashing = false;
//         }
//         // var dashDistance = this.dashAnimation.elapsedTime / this.dashAnimation.totalTime;
//     }

//     Entity.prototype.update.call(this);
// }

// Unicorn.prototype.draw = function (ctx) {
//     if (this.jumping) {
//         this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x + 17, this.y - 34, 1);
//     }
//     else if (this.dashing) {
//         this.dashAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y - 100, 1);
//         this.x += 1
//     }
//     else {
//         this.animation.drawFrame(this.game.clockTick, ctx, this.x += 5, this.y, 1);

//         if (this.x > 800) this.x = -50;
//     }
//     Entity.prototype.draw.call(this);
// }

////////////////////////////////////////////////////////////
function Ryu(game) {
    //function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse)
    // this.animation = new Animation(ASSET_MANAGER.getAsset("./img/Ryu.png"), 0, 123, 73, 100, 0.1, 5, true, false);
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/runningGirl.png"), 0, 0, 250, 253, 0.1, 6, true, false);

    this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/runningGirl.png"), 618, 334, 174, 138, 0.03, 40, false, true);


    this.jump = false;
    // this.dashing = false;
    // this.radius = 100;
    this.ground = 400;
    Entity.call(this, game, 0, this.ground);
}

Ryu.prototype = new Entity();
Ryu.prototype.constructor = Ryu;

Ryu.prototype.update = function () {
    console.log("x: " + this.x);

    // if (this.x > 200 && this.x <= 300) this.jump = true;
    // if (this.x > 550) this.jump = false;
    this.jump = this.x > 200 && this.x <= 420 ? true : false;

    if (this.jump) {
        if (this.jumpAnimation.isDone()) {
            this.jumpAnimation.elapsedTime = 0;
            this.jump = false;
        }
        var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
        var totalHeight = 200;

        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
    }
}

Ryu.prototype.draw = function (ctx) {
    if (this.jump) {
        this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x + 17, this.y - 34, 1);
    }
    this.animation.drawFrame(this.game.clockTick, ctx, this.x += 3, this.y, 0.5);

    if (this.x > 800) this.x = -50;
    // }
    Entity.prototype.draw.call(this);
}





////////////////////////////////////////////////////////////


// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

// ASSET_MANAGER.queueDownload("./img/RobotUnicorn.png");
ASSET_MANAGER.queueDownload("./img/runningGirl.png");
// ASSET_MANAGER.queueDownload("./img/Seattle.jpg");

ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine);
    // var unicorn = new Unicorn(gameEngine);
    var ryu = new Ryu(gameEngine);
    // var bg = new Background(gameEngine, ASSET_MANAGER.getAsset("./img/Seattle.jpg"));


    gameEngine.addEntity(bg);
    // gameEngine.addEntity(unicorn);
    gameEngine.addEntity(ryu);
 
    gameEngine.init(ctx);
    gameEngine.start();
});
