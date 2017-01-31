var colors = ['redSound', 'blueSound', 'greenSound', 'yellowSound'];
var strict = false;

function play(color){
  var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  var audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
  if(color=='redSound')audio1.play();
  if(color=='blueSound')audio2.play();
  if(color=='yellowSound')audio3.play();
  if(color=='greenSound')audio4.play();
}
var Game=(function(){
  var faces=$("#simon .b");
  var sequence=[];
  var userSequence=[];
  function init(){
    makeFacesClickable();
    $(".new-game").on('click',start);
  }
  function start(){
    $(".msg1,.msg2").html("&nbsp;");
    sequence=[];
    userSequence=[];
    addNextSequence();
    playSequence();
  }
  function makeFacesClickable(){
    faces.on('click',function(){
      highlight.call(this);
      play(this.id);
      userSequence.push($(this).index("#simon .b"));
      checkUserSequence();
    });
  }
  function checkUserSequence(){
    if(userSequence.join('')!=sequence.slice(0,userSequence.length).join('')) {
      if(!strict) {
      $(".msg1").html("Try");
      $(".msg2").html("Again");
      // return false;
      userSequence = [];
      setTimeout(playSequence,1000);
      }else {
        $(".msg1").html("Game");
        $(".msg2").html("Over");
        return false;
      }
    } else if(userSequence.length==sequence.length) {
      $(".msg1").html(sequence.length)
      $(".msg2").html("");
      if(sequence.length == 5) {
        $(".msg1").html("YOU");
        $(".msg2").html("WON!");
        alert("Game will reset in 2 seconds");
        setTimeout(start,2000);
      }else {
      addNextSequence();
      userSequence=[];
      setTimeout(playSequence,1000);
      return true;
      }
    }
  }
  function addNextSequence(){
    sequence.push(Math.floor(Math.random()*4));
  }
  function highlight(){
    $(this)
      .addClass('hl');    
    setTimeout(dehighlight.bind(this),300);
    
  }
  function dehighlight(){
    $(this)
      .removeClass('hl');
       play(this[0].id);
  }
  function playSequence(){
    for(var i=0;i<sequence.length;i++) {
        setTimeout(highlight.bind(faces.eq(sequence[i])),i*400);
    }
  }
  return {
    init:init,
    start:start};
})();

 Game.init();
 Game.start();

$(window).on('resize',function(){
  var m = Math.min($(window).height(),$(window).width());
  m-=50;
  $("#simon").css({
    height:m+'px',
    width:m+'px',
    margin:(-m/2)+'px 0 0 '+(-m/2)+'px'
  });
});

function toggleStrict() {
  if(strict == false) {
    strict = true;
  }else {
    strict = false;
  }
}