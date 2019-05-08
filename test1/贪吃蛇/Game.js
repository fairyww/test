(function () {
    var that = null;

    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    Game.prototype.init = function () {
        //初始化游戏
        this.food.init(this.map);
        this.snake.init(this.map);
        this.runSnake(this.food,this.map);
        this.bindKey();
    };
    //设置小蛇可以自动的跑起来
    Game.prototype.runSnake=function(food,map){
        var timeId=setInterval(function () {
            //此时的this是window
            //移动小蛇
            this.snake.move(food,map);
            this.snake.init(map);
            var maxX=map.offsetWidth/this.snake.width;
            var maxY=map.offsetHeight/this.snake.height;
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;
            if(headX<0||headX>=maxX){
                clearInterval(timeId);
                alert("游戏结束!");
            }
            if(headY<0||headY>=maxY){
                clearInterval(timeId);
                alert("游戏结束!");
            }
        }.bind(that),250);
    }
    //设置用户按键
    Game.prototype.bindKey=function(){
        document.addEventListener("keydown",function (e) {
            switch (e.keyCode) {
                case 37:this.snake.direction="left";break;
                case 38:this.snake.direction="top";break;
                case 39:this.snake.direction="right";break;
                case 40:this.snake.direction="bottom";break;
            }
        }.bind(that),false);
    };
    window.Game = Game;
}());