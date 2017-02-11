// This code is used of TCSS 491 Comp World Assignment 1
// Credits:
// Running girl sprite sheet is from https://www.codeandweb.com/texturepacker/tutorials/how-to-create-a-sprite-sheet


// Animation and it's drawFrame and update prototype is from sample code.
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

// Background object
function Background(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/Seattle.jpg"), 0, 0, 1680, 1111, 1, 1, true, true);
    Entity.call(this, game, 0, 0);
};

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
};

Background.prototype.update = function () {
};

// Running girl object
function RunningGirl(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/runningGirl.png"), 0, 0, 250, 253, 0.1, 6, true, false);
    this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/runningGirl.png"), 618, 334, 174, 138, 0.03, 40, false, true);
    this.jump = false;
    this.ground = 400;
    Entity.call(this, game, 0, this.ground);
}

RunningGirl.prototype = new Entity();
RunningGirl.prototype.constructor = RunningGirl;

RunningGirl.prototype.update = function () {
 
    // Jump over Space Needle
    this.jump = this.x > 400 && this.x <= 619 ? true : false;

    if (this.jump) {

        if (this.jumpAnimation.isDone()) {

            console.log("land at x: " + this.x);

            this.jumpAnimation.elapsedTime = 0;
            this.jump = false;
            this.y = this.ground;
        }
        var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
        var totalHeight = 200;

        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
    }
    else {
        this.y = this.ground;
    }
}

// Draw the running girl on canvas
RunningGirl.prototype.draw = function (ctx) {
    if (this.jump) {
        this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x + 15, this.y - 30, 1);
    }
    this.animation.drawFrame(this.game.clockTick, ctx, this.x += 3, this.y, 0.5);
    // back to the beginning
    if (this.x > 800) {
        this.x = 0;
    }
    Entity.prototype.draw.call(this);
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./img/runningGirl.png");
ASSET_MANAGER.queueDownload("./img/Seattle.jpg");

ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    var gameEngine = new GameEngine();

    // Add background then the running girl
    gameEngine.addEntity(new Background(gameEngine));
    gameEngine.addEntity(new RunningGirl(gameEngine));

    gameEngine.init(ctx);
    gameEngine.start();
});
