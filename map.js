const colorPlatte=['0xb0bec5','0xdd2c00','0xffd600','0xffab00','0xff6d00','0xaeea00','0x64dd17','#00c853']; //700
const goldColor=['0xfffde7','0xfff9c4','0xfff59d','0xfff176','0xffee58','0xffeb3b','0xfdd835','0xfbc02d','0xf9a825','0xf57f17']
const energyColor = []
const r = 8
const grid =29
const startx=20 //larger than r
const starty=30 //larger than 2*r
const interval=2.5 //must larger than2
var graphics
var ws
const bg="#FFFFFF"
var colorfight

// fill color of the rect: different color,different alph
// round color of the rect
// the width of strone line
// seperate width

// startx+(colorfight.game_map[i][j].position[0])*r*interval,10+(colorfight.game_map[i][j].position[1])*r*interval

var config = {
    type: Phaser.AUTO,
    width: (startx+grid*r*interval)+1.1*r,
    height: (10+grid*r*interval)+1.1*r,
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
    // coverTest()
    url="wss://colorfightii.herokuapp.com/game_channel"
    ws = new WebSocket(url); 
    // test()

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
        // coverLayer(startx+1*r*interval,10+1*r*interval,80)
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
            let absolutex=startx+(position[0])*r*interval
            let absolutey=10+(position[1])*r*interval
            let field=colorfight.game_map[i][j].force_field
            let natural=colorfight.game_map[i][j].natural_cost
            let gold=colorfight.game_map[i][j].gold

            var c = new Phaser.Geom.Circle(absolutex,absolutey,r);
            // shadow(startx+(position[0])*r*interval,10+(position[1])*r*interval,c)
            graphics.fillStyle(colorPlatte[colorfight.game_map[i][j].owner],alphaAttack(colorfight.game_map[i][j].attack_cost)).fillCircleShape(c)
            naturalCost(absolutex,absolutey,natural,gold)
            fieldCost(absolutex,absolutey,field)
            
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
    json='%7B%22turn%22%3A%20500%2C%20%22info%22%3A%20%7B%22max_turn%22%3A%20500%2C%20%22width%22%3A%2030%2C%20%22height%22%3A%2030%7D%2C%20%22error%22%3A%20%7B%7D%2C%20%22game_map%22%3A%20%5B%7B%22position%22%3A%20%5B0%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%208%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%201%2C%20%22energy%22%3A%208%2C%20%22natural_cost%22%3A%208%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B1%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2066%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%205%2C%20%22energy%22%3A%204%2C%20%22natural_cost%22%3A%2066%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B2%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2030%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%207%2C%20%22energy%22%3A%205%2C%20%22natural_cost%22%3A%2030%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B3%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%205%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%203%2C%20%22energy%22%3A%208%2C%20%22natural_cost%22%3A%205%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B4%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2034%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%204%2C%20%22energy%22%3A%203%2C%20%22natural_cost%22%3A%2034%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B5%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%209%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%202%2C%20%22energy%22%3A%206%2C%20%22natural_cost%22%3A%209%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B6%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2097%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%204%2C%20%22energy%22%3A%207%2C%20%22natural_cost%22%3A%2097%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B7%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2017%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%207%2C%20%22energy%22%3A%205%2C%20%22natural_cost%22%3A%2017%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B8%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2039%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%205%2C%20%22energy%22%3A%202%2C%20%22natural_cost%22%3A%2039%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B9%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2091%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%209%2C%20%22energy%22%3A%204%2C%20%22natural_cost%22%3A%2091%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B10%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2031%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%201%2C%20%22energy%22%3A%206%2C%20%22natural_cost%22%3A%2031%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B11%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2035%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%208%2C%20%22energy%22%3A%202%2C%20%22natural_cost%22%3A%2035%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B12%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2055%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%207%2C%20%22energy%22%3A%206%2C%20%22natural_cost%22%3A%2055%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B13%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2056%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%2010%2C%20%22energy%22%3A%208%2C%20%22natural_cost%22%3A%2056%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B14%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%201%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%204%2C%20%22energy%22%3A%202%2C%20%22natural_cost%22%3A%201%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B15%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2091%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%206%2C%20%22energy%22%3A%205%2C%20%22natural_cost%22%3A%2091%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B16%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2060%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%202%2C%20%22energy%22%3A%203%2C%20%22natural_cost%22%3A%2060%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B17%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2016%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%2010%2C%20%22energy%22%3A%202%2C%20%22natural_cost%22%3A%2016%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B18%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2043%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%2010%2C%20%22energy%22%3A%205%2C%20%22natural_cost%22%3A%2043%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B19%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2067%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%204%2C%20%22energy%22%3A%201%2C%20%22natural_cost%22%3A%2067%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B20%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2017%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%206%2C%20%22energy%22%3A%203%2C%20%22natural_cost%22%3A%2017%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B21%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2025%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%209%2C%20%22energy%22%3A%201%2C%20%22natural_cost%22%3A%2025%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B22%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2032%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%206%2C%20%22energy%22%3A%206%2C%20%22natural_cost%22%3A%2032%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B23%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%20100%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%205%2C%20%22energy%22%3A%2010%2C%20%22natural_cost%22%3A%20100%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B24%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2010%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%202%2C%20%22energy%22%3A%203%2C%20%22natural_cost%22%3A%2010%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B25%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2051%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%207%2C%20%22energy%22%3A%2010%2C%20%22natural_cost%22%3A%2051%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B26%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2098%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%206%2C%20%22energy%22%3A%209%2C%20%22natural_cost%22%3A%2098%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B27%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2076%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%205%2C%20%22energy%22%3A%207%2C%20%22natural_cost%22%3A%2076%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B28%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2081%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%206%2C%20%22energy%22%3A%2010%2C%20%22natural_cost%22%3A%2081%2C%20%22force_field%22%3A%200%7D%2C%20%7B%22position%22%3A%20%5B29%2C%200%5D%2C%20%22building%22%3A%20%22empty%22%2C%20%22attack_cost%22%3A%2055%2C%20%22owner%22%3A%200%2C%20%22gold%22%3A%209%2C%20%22energy%22%3A%203%2C%20%22natural_cost%22%3A%2055%2C%20%22force_field%22%3A%200%7D%5D%7D'
    colorfight=JSON.parse(unescape(json))

    for(i=0;i<=1;i++){
            let position=colorfight.game_map[i].position
            let field=colorfight.game_map[i].force_field
            let natural=colorfight.game_map[i].natural_cost
            var c = new Phaser.Geom.Circle(startx+(position[0])*r*interval,10+(position[1])*r*interval,r);
            // shadow(startx+(position[0])*r*interval,10+(position[1])*r*interval,c)
            graphics.fillStyle(colorPlatte[colorfight.game_map[i].owner],alphaAttack(colorfight.game_map[i].attack_cost)).fillCircleShape(c)
            naturalCost(position[0],position[1],natural)}
    
    // var colorfight = JSON.parse(unescape(json));
    // for(i=0;i<colorfight.length;i++){
        // mapChange(colorfight.game_map[i])
        // console.log(colorfight[i])
    // };
    // ws.close();
    
    // setTimeout(function(){ console.log("refresh"); }, 3000);
    
}; 

function naturalCost(x,y,value,gold){
    console.log(x,y)
    let angle=value/1000*360
    let endAngle=-90+angle
    // hpRadius(x,y,-90,(-90+angle),'0xb71c1c')
    graphics.lineStyle(1.5, goldColor[Math.floor(gold/2)+4], 1);
    graphics.beginPath();
    graphics.arc(x,y,r, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(endAngle), false);
    graphics.strokePath();    
    //blue filed force
}

function fieldCost(x,y,value){
    let angle=value/1000*360
    fieldRadius(x,y,(-90+angle))
}

function hpRadius(x,y,endAngle=360,color){
    //lineStyle (width,color,alpha)
    graphics.lineStyle(1.5, color, 1);
    graphics.beginPath();
    // arc (x, y, radius, startAngle, endAngle, anticlockwise)
    graphics.arc(x,y,r, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(endAngle), false);
    
    // graphics.arc(startx+1*r*interval,10+1*r*interval, r, (startAngle), (endAngle), false);

    graphics.strokePath();

}

function fieldRadius(x,y,endAngle){
        //lineStyle (width,color,alpha)
        graphics.lineStyle(1, '0x80DEEA1', 0.75);
        graphics.beginPath();
        // arc (x, y, radius, startAngle, endAngle, anticlockwise)
        graphics.arc(x,y, 1.1*r, Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(endAngle), false);
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
let energy=colorfight.game_map[i][j].energy
let gold=colorfight.game_map[i][j].gold
return
}

function coverLayer(x,y,percentage){
    // percentage is less than 1 bigger than 0
    //the center of the circle to the new point
    let offset=r-r/Math.sqrt(percentage)
    let c = new Phaser.Geom.Rectangle(x-50,y+0.5*offset,50*2,offset)
    graphics.fillStyle('#FFFFFF',1)
    graphics.fillRectShape(c)
    // graphics.lineStyle(1+(energy/10), '#6288d1', 10);   // color: 0xRRGGBBgraphics.strokeRectShape(c);

}

function coverTest(){
    var c = new Phaser.Geom.Circle(300,300,50);
    // shadow(startx+(position[0])*r*interval,10+(position[1])*r*interval,c)
    graphics.fillStyle(colorPlatte[2],100).fillCircleShape(c)
    coverLayer(300,300,0)

}