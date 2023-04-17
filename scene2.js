class scene2 extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    create(){
        this.add.text(20,20,"Your Mail is Here!!!", {font: "25px Arial", fill: "yellow"});
    }
}