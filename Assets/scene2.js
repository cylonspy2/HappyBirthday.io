class scene2 extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    create(){
        //this.background = this.add.image((window.innerWidth - 15)/2,(window.innerHeight - 15)/2,"envelope");
        this.envelope = this.add.image(config.width/2,config.height/2,"envelope");

        this.add.text(20,20,"Your Mail is Here!!!", {font: "25px Arial", fill: "yellow"});
    }
}