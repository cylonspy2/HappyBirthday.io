var config = {
    type: Phaser.AUTO,
    width: window.innerWidth - 15,
    height: window.innerHeight - 15,
    backgroundColor: 0x201050,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    render: {
        pixelArt: true
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.spritesheet("envelope", 'Assets/envelope.png', {
        frameWidth: 72, // Width of each frame in pixels
        frameHeight: 50, // Height of each frame in pixels
      });
    this.load.image("confetti", "Assets/confettiPic2.png");
    this.load.image("wellWishes", "Assets/wellwishes.png");
}

function create ()
{
    const centerHeight = config.height/2;
    const centerWidth = config.width/2;

    var jitterNum1 = Phaser.Math.Between(-20, 20);
    var jitterNum2 = Phaser.Math.Between(-20, 20);

    clicker = Phaser.Input.Pointer;

    var clicked = false;
    var clickedActive = false;
    var opened = false;
    var openedActive = false;

    player = this.physics.add.sprite(config.width/2,config.height/2,"envelope");
    player.setBounce(1);
    player.body.setGravityY(-300)
    player.setInteractive();

    const emitter = this.add.particles(config.width/2, config.height/2, "confetti", {
        speed: 200,
        lifespan: 3000,
        frequency: 40,
        gravityY: 200,
        maxParticles:600,
        blendmode: Phaser.BlendModes.ADD,
    });
    emitter.setActive(false);

    wellWishes = this.add.sprite(centerWidth, centerHeight, "wellWishes");
    wellWishes.setScale(0.1);
    wellWishes.visible = false;

    const grandeure = player.anims.create({
        key: 'fill', // Animation key/name
        frames: this.anims.generateFrameNumbers('envelope', { frames: [0,1,2,3,4,5,6,7] }), // Frames to use for the animation
        frameRate: 9, // Frames per second for the animation
      });
    const boooom = player.anims.create({
        key: 'boom', // Animation key/name
        frames: this.anims.generateFrameNumbers('envelope', { frames: [8,9] }), // Frames to use for the animation
        frameRate: 20, // Frames per second for the animation
      });


    const wellWishing = this.add.timeline([
        {
            at: 1600,
            run: () => 
            {
                wellWishes.visible = true;
            },
            tween: {
                targets: wellWishes,
                scaleX: 1.1, 
                scaleY: 1.1, 
                duration: 600, 
                ease: 'Linear',
                repeat: 0, 
                yoyo: false
            }
        }]);

    const timeline = this.add.timeline([
        {
            at: 0,
            run: () => {
                this.clicked = true;
                player.body.angularAcceleration = 5;
            },
            tween: {
                targets: player,
                scaleX: 8.3, 
                scaleY: 8.3, 
                duration: 1600, 
                ease: 'Circ',
                repeat: 0, 
                yoyo: false
            }
        },
        {
            at: 1600,
            run: () => {
                this.opened = true;
                player.body.angularAcceleration = this.jitterNum1;
                const force = new Phaser.Math.Vector2(Math.random()*40 - 20, Math.random()*10 - 300);
                player.body.velocity.add(force);
                player.body.angularAcceleration = (Math.random() - 0.5)*40;
                emitter.active = true;
                player.body.setGravityY(100);
            },
            tween: {
                targets: player,
                scaleX: 7, 
                scaleY: 7, 
                duration: 60, 
                ease: 'Elastic.easeOut',
                repeat: 0, 
                yoyo: false
            },
        },
        {
            at: 90000,
            stop: true
        },
    ]);

    player.setScale(6);

    player.on("pointerdown",() => {
        this.touched = true;
        if (!timeline.isPlaying())
            {
                timeline.play();
                wellWishing.play();
            }
    });

}

function update ()
{
    this.jitterNum1 = Phaser.Math.Between(-200, 200);
    this.jitterNum2 = Phaser.Math.Between(-200, 200);

if(this.clicked && !this.clickedActive)
{
    player.play('fill', true);
    this.clickedActive = true;
}
if(this.opened && !this.openedActive)
{
    player.play('boom', true);
    this.openedActive = true;
}
}