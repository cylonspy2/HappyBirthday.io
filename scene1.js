class scene1 extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.image("envelope", "Assets/background.png");
    }

    create(){
        this.add.text(20,20,"Retrieving your Letter...");
        this.scene.start("playGame");
    }
}