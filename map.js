const colorPlatte=['0xb0bec5','0xdd2c00','0xffd600','0xffab00','0xff6d00','0xaeea00','0x64dd17','#00c853']; //700
const r = 8
const grid =29
const startx=20 //larger than r
const starty=30 //larger than 2*r
const interval=2.1 //must larger than2
var graphics
var ws
const bg="#FFFFFF"

// fill color of the rect: different color,different alph
// round color of the rect
// the width of strone line
// seperate width

// startx+(colorfight.game_map[i][j].position[0])*r*interval,10+(colorfight.game_map[i][j].position[1])*r*interval

var config = {
    type: Phaser.AUTO,
    width: (startx+grid*r*interval)+r,
    height: (10+grid*r*interval)+r,
    backgroundColor:bg,
    parent:document.getElementById('game'),
    // "render.transparent": true,
    scene: {
        create: create,
        update: update
    }
};



var game = new Phaser.Game(config);

function preload ()
{
}

function create ()
{
    graphics=this.add.graphics();
    naturalCost()
    fieldCost()
    url="wss://colorfightii.herokuapp.com/game_channel"
    ws = new WebSocket(url); 
    // var circle = new Phaser.Geom.Circle(300, 300, 200);
    // var circle1 = Phaser.Geom.Circle.Clone(circle0);
    // graphics.fillStyle(0xff0000,0.5).fillCircleShape(circle);

//     shapes = new Array(grid*grid).fill(null).map(function (nul, i)
// {   
//     var c = new Phaser.Geom.Circle(startx+i%grid*r*interval,10+Math.floor(i/grid)*r*interval,r);
//     graphics.fillStyle(colorPlatte[0]).fillCircleShape(c)
//     return c

// });

// shapes.forEach((i)=>console.log(i.x,i.y))


    // 
    // alphaAttack(raw[i].attack_cost)

    // this.graphics.lineStyle(10,0xff0000)
    // this.graphics.strokeCircleShape(circle);



//     Phaser.Actions.GridAlign(group.getChildren(), {
//     width: 10,
//     height: 10,
//     cellWidth: 32,
//     cellHeight: 32,
//     x: 100,
//     y: 100
// });





}

function update(){
    // url="wss://colorfightii.herokuapp.com/game_channel"
    // var ws = new WebSocket(url); 
    // // ws.onopen = function(){ws.send(“Test!”); }; 
    ws.onmessage = function(evt){
        console.log('refresh')
        graphics.clear()
        colorfight = JSON.parse(evt.data);
        draw(colorfight)
        naturalCost()
        fieldCost()
    //     for(i=0;i<colorfight.length;i++){
    //         // mapChange(colorfight.game_map[i])
    //         for(j=0;j<colorfight.game_map[i].length;j++)
    // {
    //     console.log(colorfight.game_map[i][j].owner);
    //     var c = new Phaser.Geom.Circle(startx+(colorfight.game_map[i][j].position[0])*r*interval,10+(colorfight.game_map[i][j].position[1])*r*interval,r);
    //     graphics.fillStyle(colorPlatte[colorfight.game_map[i][j].owner],alphaAttack(colorfight.game_map[i][j].attack_cost)).fillCircleShape(c)
    // }
    //         console.log(colorfight.game_map[i])
    //     };

    ws.onclose = function(evt){
        // console.log("d");
    }; 
    ws.onerror = function(evt){
        // console.log("WebSocketError!");
    };
    // ws.close()
    
//     shapes = new Array(grid*grid).fill(null).map(function (nul, i)
// {   
//     var c = new Phaser.Geom.Circle(startx+i%grid*r*interval,10+Math.floor(i/grid)*r*interval,r);
//     graphics.fillStyle(color(i),0.5).fillCircleShape(c)
//     return c


};

}




function alphaAttack(cost){
    let min=50
    if(cost===0){return min}
    else{
        let result=cost/1000*(100-min)+min
        return (result)
    }
}



function draw(colorfight){
    for(i=0;i<=29;i++){
        for(j=0;j<=29;j++){
            let position=colorfight.game_map[i][j].position
            var c = new Phaser.Geom.Circle(startx+(position[0])*r*interval,10+(position[1])*r*interval,r,r);
            shadow(startx+(position[0])*r*interval,10+(position[1])*r*interval,c)
            graphics.fillStyle(colorPlatte[colorfight.game_map[i][j].owner],alphaAttack(colorfight.game_map[i][j].attack_cost)).fillCircleShape(c)
            
            // #region rect
            // graphics.fillStyle(colorPlatte[colorfight.game_map[i][j].owner],alphaAttack(colorfight.game_map[i][j].attack_cost))
            // graphics.fillRectShape(c)
            // let energy=colorfight.game_map[i][j].energy
            // let gold=colorfight.game_map[i][j].gold
            // graphics.lineStyle(1+(energy/10), '#6288d1', 10);   // color: 0xRRGGBB
            // graphics.strokeRectShape(c);
            // #endregion
}}}

function test(){
    graphics.clear();
    json='%5B%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B0%2C%200%5D%2C%20%22attack_cost%22%3A%20125%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B1%2C%200%5D%2C%20%22attack_cost%22%3A%20962%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B2%2C%200%5D%2C%20%22attack_cost%22%3A%20940%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B3%2C%200%5D%2C%20%22attack_cost%22%3A%20479%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B4%2C%200%5D%2C%20%22attack_cost%22%3A%205%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B5%2C%200%5D%2C%20%22attack_cost%22%3A%201000%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B6%2C%200%5D%2C%20%22attack_cost%22%3A%2077%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B7%2C%200%5D%2C%20%22attack_cost%22%3A%2026%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B8%2C%200%5D%2C%20%22attack_cost%22%3A%20519%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B9%2C%200%5D%2C%20%22attack_cost%22%3A%20637%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B10%2C%200%5D%2C%20%22attack_cost%22%3A%20345%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B11%2C%200%5D%2C%20%22attack_cost%22%3A%20712%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B12%2C%200%5D%2C%20%22attack_cost%22%3A%20918%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B13%2C%200%5D%2C%20%22attack_cost%22%3A%20716%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B14%2C%200%5D%2C%20%22attack_cost%22%3A%20635%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B15%2C%200%5D%2C%20%22attack_cost%22%3A%20601%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B16%2C%200%5D%2C%20%22attack_cost%22%3A%20118%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B17%2C%200%5D%2C%20%22attack_cost%22%3A%20520%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B18%2C%200%5D%2C%20%22attack_cost%22%3A%2019%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B19%2C%200%5D%2C%20%22attack_cost%22%3A%2090%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B20%2C%200%5D%2C%20%22attack_cost%22%3A%20111%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B21%2C%200%5D%2C%20%22attack_cost%22%3A%20488%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B22%2C%200%5D%2C%20%22attack_cost%22%3A%20172%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B23%2C%200%5D%2C%20%22attack_cost%22%3A%20459%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B24%2C%200%5D%2C%20%22attack_cost%22%3A%20996%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B25%2C%200%5D%2C%20%22attack_cost%22%3A%20144%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B26%2C%200%5D%2C%20%22attack_cost%22%3A%20104%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B27%2C%200%5D%2C%20%22attack_cost%22%3A%2044%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B28%2C%200%5D%2C%20%22attack_cost%22%3A%2045%2C%20%22owner%22%3A%200%20%7D%2C%0A%20%20%20%20%20%20%7B%20%22position%22%3A%20%5B29%2C%200%5D%2C%20%22attack_cost%22%3A%20766%2C%20%22owner%22%3A%200%20%7D%0A%20%20%20%20%5D'
    var raw=JSON.parse(unescape(json))
    mapChange(raw)
    // var colorfight = JSON.parse(unescape(json));
    // for(i=0;i<colorfight.length;i++){
        // mapChange(colorfight.game_map[i])
        // console.log(colorfight[i])
    // };
    // ws.close();
    
    // setTimeout(function(){ console.log("refresh"); }, 3000);
    
}; 

function naturalCost(){
 
    //red hp radius
    // hpRadius(startx+1*r*interval,10+1*r*interval,0,360,'0xb71c1c')
    // green hp
    // hpRadius(startx+1*r*interval,10+1*r*interval,-90,(-90+87),'0x1B5E20')
    hpRadius(startx+1*r*interval,10+1*r*interval,-90,(-90+87),'0xb71c1c')

    
    //blue filed force
}

function fieldCost(){
    fieldRadius(startx+1*r*interval,10+1*r*interval,(-90+270))
}

function hpRadius(x,y,startAngle=0,endAngle=360,color){
    //lineStyle (width,color,alpha)
    graphics.lineStyle(1.5, color, 1);
    graphics.beginPath();
    // arc (x, y, radius, startAngle, endAngle, anticlockwise)
    graphics.arc(startx+1*r*interval,10+1*r*interval,r, Phaser.Math.DegToRad(startAngle), Phaser.Math.DegToRad(endAngle), false);
    
    // graphics.arc(startx+1*r*interval,10+1*r*interval, r, (startAngle), (endAngle), false);

    graphics.strokePath();

}

function fieldRadius(x,y,endAngle){
        //lineStyle (width,color,alpha)
        graphics.lineStyle(1, '0x80DEEA1', 0.75);
        graphics.beginPath();
        // arc (x, y, radius, startAngle, endAngle, anticlockwise)
        graphics.arc(startx+1*r*interval,10+1*r*interval, 1.1*r, Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(endAngle), false);
        // graphics.arc(startx+1*r*interval,10+1*r*interval, r, (startAngle), (endAngle), false);
    
        graphics.strokePath();
    
}


function color (i)
{
return 0x001100 * (i % 15) + 0x000033 * (i % 5);
}

function shadow(x,y,shape){
        let c1=Phaser.Geom.Circle.Clone(shape);
        c1.setPosition(x+1,y+1)
        graphics.fillStyle(0x000000,0).fillCircleShape(c1)
}

//use before hp and mp
function gold(){

            // graphics.fillStyle(colorPlatte[colorfight.game_map[i][j].owner],alphaAttack(colorfight.game_map[i][j].attack_cost))
            // graphics.fillRectShape(c)
            // let energy=colorfight.game_map[i][j].energy
            // let gold=colorfight.game_map[i][j].gold
            // graphics.lineStyle(1+(energy/10), '#6288d1', 10);   // color: 0xRRGGBB
            // graphics.strokeRectShape(c);

}

function energy(){

}

function halfCircle(x,y,percentage){
    //the center of the circle to the new point
    let offset=r-r/Math.sqrt(percentage)
}