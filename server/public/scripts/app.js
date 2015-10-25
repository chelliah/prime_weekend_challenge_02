var indexTracker = 0;

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

    $('#carousel').on('click','#left',function(){
        prevSlide(zetaArray);
    });

    $('#carousel').on('click','#right',function(){
        nextSlide(zetaArray);
    });

    $(".index-point").on('click',function(event){
        console.log(event.target.id.slice(5));
        var id = event.target.id.slice(5);
        indexTracker = parseInt(id);
        updateIndexPoints(zetaArray);
    })
}

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
    $el.prepend("<div class='nav-button' id='left'>Left</div>");
    $el.append("<div class='nav-button' id='right'>Right</div>");
}

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

function updateIndexPoints(array){
    for(var i = 0; i<array.length;i++){
        $('#index' + i).removeClass('index-point-active');
        if(i==indexTracker){
            $('#index' + i).addClass('index-point-active');
        }
    }
    updateMainContent(array);
}

function updateMainContent(array){
    console.log(array);
    $("#mainContent").fadeOut(500,function(){
        $(this).empty();
        for(var i=0;i<array.length;i++){
            var person = array[i];
            if(i==indexTracker){
                $(this).append("<div class='student'>" +
                    "<h1>Name: " + person.name + "</h1>" +
                    "<p>Github Repo: " + person.github + "</p>" +
                    "<p>Shoutout: " + person.shoutout + "</p>" +
                    "</div>").fadeIn(500);

            }
        }
    })

    //$("#mainContent").empty();
    //for(var i=0;i<array.length;i++){
    //    var person = array[i];
    //    if(i==indexTracker){
    //        $("#mainContent").append("<div class='student'>" +
    //            "<h1>Name: " + person.name + "</h1>" +
    //            "<p>Github Repo: " + person.github + "</p>" +
    //            "<p>Shoutout: " + person.shoutout + "</p>" +
    //            "</div>");
    //    }
    //}
}

function fade(array){

}