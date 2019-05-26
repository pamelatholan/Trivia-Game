$(document).ready(function() {
// Questions
var options = [
    {
        question: "What are 'Durin's folk' more commonly known as?",
        choice: ["Dwarves", "Hobbits", "Forrest Elves", "Great Eagles"],
        answer: 0,
        photo: "assets/images/gimli.gif"
    },
    {
        question: "What is the bridge of Khazad-dûm?",
        choice: ["The bridge over the Brandywine River at the edge of The Shire", "The mythical gateway between Middle Earth and Valinor", "The bridge inside Moria where Gandolf fought the Belrog", "The entrance to Mirkwood"],
        answer: 2,
        photo: "assets/images/gandolf.gif"
    },
    {
        question: "What Sindarin word was Aragorn known by when he was a child?",
        choice: ["Amdir", "Estel", "Miriel", "Aeluin"],
        answer: 1,
        photo: "assets/images/aragorn.gif"
    },
    {
        question: "What are Morgul wounds?",
        choice: ["What Uruk-hai are born from", "Seige towers used by Orcs", "A wound inflicted by an Elf", "Wounds inflicted by the Nazgûl"],
        answer: 3,
        photo: "assets/images/nazgul.gif"
    },
    {
        question: "What are the Palantíri and how many are there?",
        choice: ["Seeing stones; 7", "Rings; 3", "Jewels; 5", "Elvish blades; 2"],
        answer: 0,
        photo: "assets/images/stone.gif"
    },
    {
        question: "What is the name of the Inn where Aragorn meets the Hobbits?",
        choice: ["The Green Dragon", "The Prancing Pony", "The Golden Peach", "The Ivy"],
        answer: 1,
        photo: "assets/images/inn.gif"
    },
    {
        question: "What was Gollum's name before he found the ring?",
        choice: ["Phil", "Bilbo", "Smeagol", "Deagol"],
        answer: 2,
        photo: "assets/images/smeagol.gif"
    },
    {
        question: "How many rings of power were gifted to the race of men?",
        choice: [4, 2, 8, 9],
        answer: 3,
        photo: "assets/images/rings.gif"
    },
    {
        question: "What is the name of Gandolf's horse?",
        choice: ["Brego", "Shadowfax", "Shadowmane", "Bill"],
        answer: 1,
        photo: "assets/images/shadowfax.gif"
    },
    {
        question: "By what name do the Elves call Gandolf?",
        choice: ["Mithrandir", "Gandolf the Grey", "Gandolf the White", "Tharkûn"],
        answer: 0,
        photo: "assets/images/mithrandir.gif"
    }];

    var correctCount = 0;
    var wrongCount = 0;
    var unansweredCount = 0;
    var timer = 15;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = 0;
    var pick;
    var index;
    var newArray = [];
    var holder = [];


    $("#reset").hide();

    $("#start").on("click", function() {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for(var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    })

    //Start Timer
    function runTimer() {
        if(!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    //Timer Countdown
    function decrement() {
        $("#timeleft").html("<h3>Time Remaining: " + timer + "</h3>");
        timer --;
        //stop timer if reach 0
        if(timer === 0) {
            unansweredCount++;
            stop();
            $("#answerblock").html("<p>Time's up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }

    //Timer Stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    //Randomly pick question. Display, loop through and display possible answers
    function displayQuestion() {
        index = Math.floor(Math.random() * options.length);
        pick = options[index];
        if(pick.shown) {
            displayQuestion();
        } else {
            // console.log(pick.question);
        }
        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for(var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //check answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
        }
    }

    //Select answer and outcome
    $(".answerchoice").on("click", function () {
        userGuess = parseInt($(this).attr("data-guessvalue"));
        if(userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();

        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
        
    })
    
    function hidepicture() {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);

        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer = 15;

            //Score screen
            if((wrongCount + correctCount + unansweredCount) === qCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over! Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unansweredCount + "</h4>");
                correctCount = 0;
                wrongCount = 0;
                unansweredCount = 0;

            } else {
                runTimer();
                displayQuestion();
            }
        }, 3000);
    }

    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for( var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    })
})