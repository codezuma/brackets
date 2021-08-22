class FormatObject {
    constructor(keywordsArray, color) {
        this.keywords = keywordsArray;
        this.color = color;
    }
}
const tabsArray = [];
// php keywords
const blueKeywords = new FormatObject(["'", '"', "?PHP", '$', 'IF', 'ELSE'], '#6ADDFF');
// Keyup event
$("#code").on("keyup", function (e) {
    // Space key pressed
    if (e.keyCode === 32) {
        console.log('enter');

        var newHTML = "";
        // Loop through words
        $(this).text().replace(/[\s]+/g, " ").trim().split(" ").forEach(function (val) {
            // If word is statement
            {

            }
            if (blueKeywords.keywords.indexOf(val.trim().toUpperCase()) > -1)
                newHTML += `<span style='color:${blueKeywords.color}'> ${val} &nbsp;</span>`;
            else
                newHTML += "<span class='other'>" + val + "&nbsp;</span>";

        });

        $(this).html(newHTML);

        // Set cursor postion to end of text
        var child = $(this).children();
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(child[child.length - 1], 1);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        this.focus();
    }
});
document.getElementById('add_tab_button').onclick = function () {
    codeTab.createTab();
}
let TabCount = 0;
class codeTab {
    constructor() {
        this.name = `tabnumber${++TabCount}`;
        this.tab_switch = document.createElement('div');
        this.tab_switch.classList.add('tab_button', 'flex');
        this.tab_switch.innerHTML = '<div class="lang_logo flex"> <img src="assets/php_logo.svg" alt=""></div><span class="lang_name">PHP</span>';
        document.getElementById('tab_container').insertBefore(this.tab_switch, document.getElementById('add_tab_button'));
        this.state = true;
        this.code = '';
        this.tab_switch.onclick = () => { this.activeTab() };
    }
    static createTab() {
        const newTab = new codeTab();
        tabsArray.push(newTab);
        newTab.activeTab();
    }
    activeTab() {
        console.log('changed tab', tabsArray);
        const currentTab = tabsArray.find((ele) => { return ele.state == true });
        console.log(currentTab);
        currentTab.code = document.getElementById('code').innerHTML;
        tabsArray.forEach((ele) => { ele.state = false });
        this.state = true;
        document.getElementById('code').innerHTML = this.code;

        const nonActiveTabs = tabsArray.filter((ele)=>{return ele.state ===false})
        nonActiveTabs.forEach((ele)=>{
          ele.tab_switch.style.background = 'var(--light_primary_color)';
          ele.tab_switch.style.opacity = '0.8';
        });

          this.tab_switch.style.background = 'var(--primary_color)';
          this.tab_switch.style.opacity = '1';
    }

}


