var ang = 0;
var h = 100;
var barStatus = true; //bar increasing
var id;
var id2;
$(document).ready(function () {
    
    $('#girlb').hide();
    
    id2 = setInterval(showDir, 50);
    
    $('button').mouseup(function () {
        ang += 10 * strength();
        console.log(ang)
        $('#compass').rotate({
            duration: 2000 + 50 * strength()
            , animateTo: ang
            , callback: function () {
                ang = ang % 360;
                $(this).rotate(ang);
            }
        });
    });
    
    $('button').mousedown(function () {
        
        toggleGirl('a');
        id = setInterval(barAnime, 10);
        barStatus = true; //increase bar
        barAnime();
    });
    
    $(window).mouseup(function () {
        
        toggleGirl('b');
        clearInterval(id);
        h = 100;
        $('#barhide').css({
            'height': h
        });
        toggleGirl();
    });

    function strength() {
        return 100 - h;
    }

    function showDir() {
        var a = $('#compass').getRotateAngle() % 360
        $('#angle').html("Now angle: " + a.toFixed(2));
        $('#direction').html("Now direction: " + direction(a));
    }

    function direction(a) {
        var n = Math.floor((a + 22.5) / 45);
        switch (n) {
        case 0:
        case 8:
            return 'N';
            break;
        case 1:
            return 'NW';
            break;
        case 2:
            return 'W';
            break;
        case 3:
            return 'SW';
            break;
        case 4:
            return 'S';
            break;
        case 5:
            return 'SE';
            break;
        case 6:
            return 'E';
            break;
        case 7:
            return 'NE';
            break;
        default:
            return '...';
        }
    }

    function barAnime() {
        if (barStatus) { //barhide decreasing
            h--; //bar increase
            if (h <= 0) {
                barStatus = !barStatus
            } //bar reached its limit
        }
        else {
            h++;
            if (h >= 99) {
                barStatus = !barStatus
            }
        }
        $('#barhide').css({
            'height': h
        });
    }

    function arrowAnime() {}

    function toggleGirl(ab) {
        if (ab == 'a') {
            $('#girla').show();
            $('#girlb').hide();
        }
        else {
            $('#girla').hide();
            $('#girlb').show();
        }
    }
});