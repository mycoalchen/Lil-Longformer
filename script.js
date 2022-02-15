var mainList = document.querySelector("pre").children;
var mainLinks = [];
var secondaryLinks = [];
var tertiaryLinks = [];
var rapLyrics = [];
var mainInd = 0;
var mainLim = 1;
var secondaryInd = 0;
var tertiaryInd = 0;
for(var i = 1; i<mainList.length; i++){
  mainLinks.push(mainList[i].href);
}
function processMain(){
  if(mainInd < mainLim){
    let secondaryWindow = window.open(mainLinks[mainInd]);
    secondaryWindow.addEventListener("DOMContentLoaded", function(){processSecondary(secondaryWindow);});
    mainInd += 1;
  }
}
function processSecondary(secWin){
  if(secWin.document.getElementById("wrap") == null){
    var table = secWin.document.querySelector("tbody");
    if(table){
      for(var i = 3; i<table.children.length-1; i++){
        secondaryLinks.push(table.children[i].children[1].children[0].href);
      }
    }
  }
  else{
    var table = secWin.document.querySelector("tbody").children[1].children[0];
    for(var i = 0; i<table.children.length; i++){
      var internalTable;
      if(table.children[i].nodeName == "TABLE" && table.children[i].children[0].children.length > 1){
        internalTable = table.children[i].children[0];
      }
      else if(table.children[i].nodeName == "P"){internalTable = table.children[i].children[1].children[0];}
      else{continue;}
      for(var j = 0; j<internalTable.children.length; j++){
        if(internalTable.children[j].children.length > 1){
          for(var k = 0; k<internalTable.children[j].children.length; k++){
            if(internalTable.children[j].children[k].children.length > 0){
              if(internalTable.children[j].children[k].children[0].nodeName == "A"){
                tertiaryLinks.push(internalTable.children[j].children[k].children[0].href);
              }
            }
          }
        }
      }
    }
  }
  secWin.close();
  processMain();
}
function processMainSecondary(){
  if(secondaryInd < secondaryLinks.length){
    let secondaryWindow = window.open(secondaryLinks[secondaryInd]);
    secondaryWindow.addEventListener("DOMContentLoaded", function(){processTertiary(secondaryWindow);});
    secondaryInd += 1;
  }
}
function processTertiary(secWin){
  if(secWin.document.getElementById("wrap") == null){
    var table = secWin.document.querySelector("tbody");
    if(table){
      for(var i = 3; i<table.children.length-1; i++){
        tertiaryLinks.push(table.children[i].children[1].children[0].href);
      }
    }
  }
  secWin.close();
  processMainSecondary();
}
function processMainTertiary(){
  if(tertiaryInd < tertiaryLinks.length){
    let secondaryWindow = window.open(tertiaryLinks[tertiaryInd]);
    secondaryWindow.addEventListener("DOMContentLoaded", function(){processFinal(secondaryWindow);});
    tertiaryInd += 1;
  }
}
function processFinal(secWin){
  var texts = secWin.document.querySelector("pre");
  if(texts != undefined && texts != null){
    var resText = secWin.document.querySelector("pre").innerText.toLowerCase().split("\n");
    var cutIndex = -1;
    for(var i = 0; i<resText.length; i++){
      if(resText[i] == ''){cutIndex = i; break;}
    }
    if(cutIndex != -1){
      rapLyrics.push(resText.slice(cutIndex + 1).map(x => x.split(", ").join(" , ").split(" ")));
    }
  }
  secWin.close();
  processMainTertiary();
}
