window.onload = function() {

    var config = {
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x191970,
        scene: [scene1, scene2]
    }

    var game = new Phaser.Game(config);
}