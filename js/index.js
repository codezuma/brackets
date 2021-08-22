class FormatObject{
    constructor(keywordsArray,color){
        this.keywords = keywordsArray;
        this.color = color;
    }
}
// php keywords
const blueKeywords = new FormatObject(["'",'"',"?PHP",'$','IF','ELSE'],'#6ADDFF');
// Keyup event
$("#code").on("keyup", function(e){
    console.log('key up');
  // Space key pressed
  if (e.keyCode === 32){
    console.log('enter');

    var newHTML = "";
    // Loop through words
    $(this).text().replace(/[\s]+/g, " ").trim().split(" ").forEach(function(val){
      // If word is statement
      {

      }
      if (blueKeywords.keywords.indexOf(val.trim().toUpperCase()) > -1)
        newHTML +=  `<span style='color:${blueKeywords.color}'> ${val} &nbsp;</span>`;
      else
        newHTML += "<span class='other'>" + val + "&nbsp;</span>"; 

    });

    $(this).html(newHTML);

    // Set cursor postion to end of text
    var child = $(this).children();
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(child[child.length-1], 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    this.focus();
  }
});


