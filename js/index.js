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
        this.tab_switch.innerHTML = '<div class="switch_tab_div flex"><div class="lang_logo flex"> <img src="assets/php_logo.svg" alt=""></div><span contenteditable class="lang_name">PHP</span> </div><span class="close_tab_icon flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line> <line x1="6" y1="6" x2="18" y2="18"></line></svg></span>';
        document.getElementById('tab_container').insertBefore(this.tab_switch, document.getElementById('add_tab_button'));
        this.state = true;
        this.code = '';
        this.closeTabButton = this.tab_switch.getElementsByClassName('close_tab_icon')[0];
        this.tab_switch.getElementsByClassName('switch_tab_div')[0].onclick = () => { this.activeTab() };
        this.closeTabButton.onclick = () => { this.deleteTab() };
    }
    static createTab() {
        const newTab = new codeTab();
        tabsArray.push(newTab);
        newTab.activeTab();
    }
    activeTab() {
        const currentTab = tabsArray.find((ele) => { return ele.state == true });
        currentTab.code = document.getElementById('code').innerHTML;
        tabsArray.forEach((ele) => { ele.state = false });
        this.state = true;
        document.getElementById('code').innerHTML = this.code;
        const nonActiveTabs = tabsArray.filter((ele) => { return ele.state === false })
        nonActiveTabs.forEach((ele) => {
            ele.tab_switch.style.background = 'var(--light_primary_color)';
            ele.tab_switch.style.opacity = '0.8';
        });

        this.tab_switch.style.background = 'var(--primary_color)';
        this.tab_switch.style.opacity = '1';
    }
    deleteTab() {
        const tabName = this.name;
        const indexOfRemovedTab = tabsArray.findIndex((ele) => { return ele.name === tabName; });
        const indexOfCurrentTab = tabsArray.findIndex((ele) => { return ele.state == true });

        if (indexOfCurrentTab === indexOfRemovedTab) {
            tabsArray.splice(indexOfRemovedTab, 1);
            this.tab_switch.remove();
            const lastTab = tabsArray[tabsArray.length - 1];
            lastTab.state = true;
            document.getElementById('code').innerHTML = lastTab.code;
            const nonActiveTabs = tabsArray.filter((ele) => { return ele.state === false })
            nonActiveTabs.forEach((ele) => {
                ele.tab_switch.style.background = 'var(--light_primary_color)';
                ele.tab_switch.style.opacity = '0.8';
            });
            lastTab.tab_switch.style.background = 'var(--primary_color)';
            lastTab.tab_switch.style.opacity = '1';
        }
        else {
            if((indexOfRemovedTab > -1) ){
                tabsArray.splice(indexOfRemovedTab, 1);
                this.tab_switch.remove();
            }
            else{
                console.log('error');
            }
        }
    }

}
// and exploiting the fact that IDs pollute the window namespace:
document.getElementById('savebtn').onclick = function () {
    const txtString = document.getElementById('code').innerText || document.getElementById('code').textContent;
    downloadFile(txtString);
}

function downloadFile(txtstrin) {
    const saveElement = document.createElement('a');
    saveElement.setAttribute('href','data:text/plain;charset=utf-8,'+ encodeURIComponent(txtstrin));
    saveElement.download = 'index.php';
    document.body.appendChild(saveElement);
    saveElement.click();
    document.body.removeChild(saveElement); 
}

//opening first tab
document.getElementById('add_tab_button').click();

window.onscroll = function (e) {
    var header = document.getElementsByClassName('app_header')[0];
    if (window.scrollY !== 0 ){
         header.style.background = " var(--background_color)";
         header.style.boxShadow = ' 0px 8px 18px -6px rgba(82, 82, 83, 0.12), 0px 12px 42px -4px rgba(59, 60, 61, 0.12)';
        }
    else{
        header.style.background = "transparent";
        header.style.boxShadow = ' none';
    }
}
/* function for toggle switch in menu bar for small devices */

document.getElementById('menu_icon').onclick = function () {
    this.classList.toggle('opened');
    this.setAttribute('aria-expanded', this.classList.contains('opened'));

    var side_menu_bar = document.getElementById('side_menu_bar');
    side_menu_bar.classList.toggle('aside_open');
    side_menu_bar.classList.toggle('aside_close');
}
