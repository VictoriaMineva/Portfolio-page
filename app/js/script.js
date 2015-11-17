function openMenu() {
    $(".hamburger-menu").animate({
        height: 'toggle'},
        1500 );
}

$(document).ready(function(){
    $('.hamburger-icon').click(function(){
        $(this).toggleClass('open');
        console.log(1);
    });
});


//Function to check if the div is visible on the screen
$(function() {
    var loaded = false;
    var oTop = $('#skills-left').offset().top - window.innerHeight;

    checkPosition();

    $(window).scroll(function(){
        checkPosition();
    });

    function checkPosition(){ 
        var pTop = $('body').scrollTop();
        if( pTop > oTop ){
            if(!loaded) {
                loaded = true;
                loadChart();
            }
        }   
    }  
});

//Data for left div
var dataLeft = 
   [{ "skill": "HTML", "progress": 96 }, 
    { "skill": "CSS", "progress": 80 }, 
    { "skill": "JavaScript", "progress": 80 }, 
    { "skill": "jQuery", "progress": 76 }, 
    { "skill": "PHP", "progress": 60 },
    { "skill": "C#", "progress": 70 },
    { "skill": "ASP.NET", "progress": 30 }];

//Data for right div
var dataRight =  
   [{"skill": "AngularJS", "progress": 60}, 
    {"skill": "SASS", "progress": 60}, 
    {"skill": "Bootstrap", "progress": 50}, 
    {"skill": "MySQL", "progress": 50}, 
    {"skill": "Grunt", "progress": 90},
    {"skill": "Scrum", "progress": 70},
    {"skill": "D3.js", "progress": 60}];

anchorLeft = d3.select("#skills-left");

//Bind data for left bars
var divLeft = anchorLeft.selectAll("#skills-left div")
.data(dataLeft);

//Add shadow for the left bars
divLeft.enter().append("div")
.attr("class", "skill");

anchorRight = d3.select("#skills-right");

//Bind data for left bars
var divRight = anchorRight.selectAll("#skills-right div")
.data(dataRight);

//Add shadow for the left bars
divRight.enter().append("div")
.attr("class", "skill");

d3.select("body").selectAll(".skill")
.append("div")
.attr("class", "label")
.text(function(d) {
        return d.skill;
   });

d3.select("body").selectAll(".skill")
.append("div")
.attr("class", "shadow");

//Create the bars
d3.select("body").selectAll(".shadow")
.append("div")
.attr("class","bar");

//Create the path
d3.select("body").selectAll(".bar")
.append("div")
.attr("class","path");

//Add the pattern for the bars
d3.select("body").selectAll(".path")
.append("div")
.attr("class","pattern");

//Animate the bars when they are both visible on screen
function loadChart(){

    var start_val = 0;

    //add the percentage to the progress bar and transition the number
    d3.select("body").selectAll(".pattern")
    .append("div")
    .text(start_val)
    .attr("class", "percentage")
    .transition()
    .delay(function(d, i) {
        return i * 200;
    })
    .duration(1000)
    .style("min-width", function(d, i) {
        return (d.progress)/2 + "%";
    })
    .tween(".percentage", function(d) {
        var i = d3.interpolate(this.textContent, d.progress),
            prec = (d.progress + "").split("."),
            round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;

        return function(t) {
            this.textContent = Math.round(i(t) * round) / round + "%";
        };
    });

    //transition the width of the path
    d3.select("body").selectAll(".path")
    .transition()
    .delay(function(d, i) {
        return i * 200;
    })
    .duration(1000)
    .style("width", function(d, i) {
        return d.progress-1 + "%"; 
    });

    //transition between the different colors depending on the value
    d3.select("body").selectAll(".pattern")
    //transition to first color
    .transition()
    .delay(function(d, i) {
        return i * 200;
    })
    .duration(250)
    .style("background-color", function(d) {
        if(d.progress < 40) {
            return "#FB7457";
        }
        else {
            return "#FBB272";
        }
    })
    //transition to second color
    .transition()
    .delay(function(d, i) {
        return (i * 200) + 250;
    })
    .duration(250)
    .style("background-color", function(d) {
        if(d < 40) {
            return "#FB7457";
        }
        else if (d.progress < 60) {
            return "#FBB272";
        }
        else {
            return "#FFE584";
        }
    })
    //transition to third color
    .transition()
    .delay(function(d, i) {
        return (i * 200) + 500;
    })
    .duration(250)
    .style("background-color", function(d) {
        if(d.progress < 40) {
            return "#FB7457";
        }
        else if (d.progress < 60) {
            return "#FBB272";
        }
        else if (d.progress < 80) {
            return "#FFE584";
        }
        else {
            return "#C9D790";
        }
    })
    //transition to fourth color
    .transition()
    .delay(function(d, i) {
        return (i * 200) + 750;
    })
    .duration(250)
    .style("background-color", function(d) {
        if(d.progress < 40) {
            return "#FB7457";
        }
        else if (d.progress < 60) {
            return "#FBB272";
        }
        else if (d.progress < 80) {
            return "#FFE584";
        }
        else  if (d.progress < 100) {
            return "#C9D790";
        }
        else {
            return "#7AC191";
        }
    });

    var isMobile = false; //initiate as false
    // device detection
    
    if($(window).width() < 480) {
        isMobile = true;
    }

    if(!isMobile) {
        //transition the sadow under the progress bar
        d3.select("body").selectAll(".shadow")
        .transition()
        .delay(function(d, i) {
            return i * 200;
        })
        .duration(1000)
        .style("width", function(d, i) {
            return d.progress*3-6 + "px"; 
        });
    }
}