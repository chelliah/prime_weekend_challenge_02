var indexTracker = 0;
var interval = 10000;
var seconds = 10;
var timerInterval = 1000;
var fadeTime = 200;
var autoSwitch;
var timer;

$(document).ready(function(){
    talkToServer();
});

function talkToServer (){
    $.ajax({//passing in an object to ajax function
        type : "GET", //match function type
        url : "/data", //url wants to match app.get function (different style of routing) (the address of the function)
        success : onSuccess //if get is successful, the function performs a certain action
    });
}

function onSuccess(data){
    var zetaArray = data.zeta;
    createCarousel(zetaArray);
    updateIndexPoints(zetaArray);
    resetTimer(zetaArray);
    //countdown(seconds);



    $('#carousel').on('click','#left',function(){
        prevSlide(zetaArray);
        resetTimer(zetaArray);
    });

    $('#carousel').on('click','#right',function(){
        nextSlide(zetaArray);
        resetTimer(zetaArray);
    });

    $(".index-point").on('click',function(event){
        //console.log(event.target.id.slice(5));
        var id = event.target.id.slice(5);  //retrieves the ID of the object clicked
        indexTracker = parseInt(id);
        updateIndexPoints(zetaArray);
        resetTimer(zetaArray);
    })

}

////TIMER FUNCTIONS
function resetTimer(array){
    clearInterval(autoSwitch);
    startTimer(array);

}

function startTimer(array){
    clearInterval(timer);
    startCountdown();

    autoSwitch = setInterval(function(){
        //startTimer;
        clearInterval(timer);
        startCountdown();
        nextSlide(array);
    },interval);
}

function startCountdown(){
    var countDownTime = seconds;
    $("#timer").text(countDownTime);
    timer = setInterval(function(){
        //if(countDownTime <= 0){
        //    clearInterval(timer);
        //}
        countDownTime--;
        $("#timer").text(countDownTime);

    },timerInterval);
}

////CAROUSEL SETUP FUNCTIONS
function createCarousel(array){
    //create many things like: index points, next and prev buttons
    $("#carousel").append("<div class='main'></div>");
    var $el = $("#carousel").children().last();
    createIndexPoints(array, $el);
    createNavButtons($el);
}

function createIndexPoints(array, $el) {
    //create something visual, divs will work
    for (var i = 0; i<array.length; i++){
        $el.append("<div class='index-point' id='index" + i + "'></div>");
    }
}

function createNavButtons($el){
    $el.prepend("<div class='nav-button' id='left'>" +
        "<span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span>" +
        " Left</div>");
    $el.append("<div class='nav-button' id='right'>Right " +
        "<span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span>" +
        "</div>");
}

/////NEXT AND PREVIOUS FUNCTIONS
function nextSlide(array){
    indexTracker++;
    if (indexTracker>=array.length){
        indexTracker=0;
    }
    updateIndexPoints(array);
}

function prevSlide(array) {
    indexTracker--;
    if (indexTracker<0){
        indexTracker = array.length-1;
    }
    updateIndexPoints(array);
}

/////UPDATE INDEX POINTS
function updateIndexPoints(array){
    for(var i = 0; i<array.length;i++){
        $('#index' + i).removeClass('index-point-active');
        if(i==indexTracker){
            $('#index' + i).addClass('index-point-active');
        }
    }
    updateMainContent(array);
}


////UPDATE TO DOM
function updateMainContent(array){

    console.log(array);
    $("#mainContent").fadeOut(fadeTime,function(){
        $(this).empty();
        for(var i=0;i<array.length;i++){
            var person = array[i];
            if(i==indexTracker){
                $(this).append("<div class='student'>" +
                    "<img src='"+ person.imageURL +"' alt='"+ person.name +" image' height='200' width='200'>" +
                    "<h1>" + person.name + "</h1>" +
                    "<p>Github Repo: <a href='" + person.github + "' target='_blank'>" + person.github + "</a></p>" +
                    "<p>Shoutout: " + person.shoutout + "</p>" +
                    "</div>").fadeIn(fadeTime);

            }
        }
    })

    //countdown(seconds);
}
