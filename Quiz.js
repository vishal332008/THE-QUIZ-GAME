class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){

     background(bg);

    question.hide();

    fill("yellow");
    textSize(35)
    text("ANSWERS",325,50);

    Contestant.getContestantInfo();

    if(allContestants !== undefined){
      fill("blue");
      textSize(16);
      text("NOTE:THE CONTESTANT NAME WHO HAS ANSWERED CORRECTLY IS HIGHLIGHTED IN GREEN COLOR!!",15,100);

      var displayPosition = 130;

      for(var plr in allContestants){
        var correctAns = "2";
       if(correctAns === allContestants[plr].answer){
         fill("green");
       }
       else{
         fill("red");
       }
       displayPosition+=20;
       textSize(25);
       text(allContestants[plr].name + " : " + allContestants[plr].answer,355,displayPosition);
      }
    }
  }

}
