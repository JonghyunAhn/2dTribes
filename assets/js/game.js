var Raphael=require('./raphael.js').Raphael;
var Player = require('./player.js').Player;
var constants=require('./constants.js').constants;

function World(sessions) {
    this.sessions = sessions;

    this.getXYCoord=function(context) {
        return context['you'];
    }

    this.getPlayers=function(context) {
        return [context['list']]
    }

    this.IDKey=function(context) {
        return context['identifier']
    }

    this.getRelativeCoordinateFilter=function(context) {
        var currCoord = this.getXYCoord(context);
        var players = this.getPlayers(context);
        var selfID = this.IDKey(context);
        for player in players {
            if (player.identifier == selfID) {
                players.remove(player);           
            }
            else if (Math.abs(player.x-currCoord.x) > screen.width/2 || Math.abs(player.y-currCoord.y) > screen.height/2) {
                players.remove(player)
            }
            else {
                player.x = canvas.width/2 + player.x-currCoord.x
                player.y = canvas.height/2 + player.y-currCoord.y
            }
        }
        return players
    }

    this.draw(context) {
        playersToDraw = this.getRelativeCoordinateFilter(context);
        var canvas = Raphael(screen.width/2,screen.height/2,screen.width,screen.height)

        for player in playersToDraw {
            var circle = canvas.circle(player.x,player.y,20);
            circle.attr("fill",'#f00');
            circle.attr("stroke","#fff");
        }
    }
}


