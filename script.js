var mainTopics = null;
var openedFirstTopic = null;
var openedSecondTopic = null;

//---------------------Third level topics-------------------------

const quantitative_aptitude = new Map([

   ["Number System", ["Divisibility Rule"]],
   ["Hcf Lcm", []],
   ["Percentages", []],
   ["Ratios", []],
   ["Averages", []],
   ["Interest", []],
   ["Profit and Loss", []],
   ["Time Speed and Distance", []],
   ["Time and Word", []],
   ["Mixtures and Allegations", []],
   ["Quadratic Equations", []],
   ["Linear Equations", []],
   ["Logarithms", []],
   ["Series and Progressions", []],
   ["Binomial Theorem", []],
   ["Surds and Indices", []],
   ["Functions", []],
   ["Inequalities", []],
   ["Modulus", []],
   ["Geometry", []],
   ["Mensuration", []],
   ["Trigonometry", []],
   ["Co-ordinate Geometry", []],
   ["Permutation and Combination", []],
   ["Probability", []],
   ["Set Theory", []]
    
]);

const analytical_and_logical_reasoning = new Map([

   ["Linear and Circular Arrangements", []],
   ["Selections", []],
   ["Coding and Decoding", []],
   ["Direction Sense", []],
   ["Blood Relations", []],
   ["Series", []],
   ["Analogies", []],
   ["Decision Making", []],
   ["Binary Logic", []],
   ["Syllogisms", []],
   ["Puzzles", []]

]);

const computer_awareness = new Map([

   ["Computer Hardware", []],
   ["Controls", []],
   ["Basic Terminology", []],
   ["Internet and Protocols", []],
   ["Network Basics", []],
   ["Computer Abbrevations", []],
   ["Security Tools", []],
   ["Shortcuts", []],
   ["History Of Computer", []],
   ["Memory", []],
   ["Computer Organization", []],
   ["Input Output Tools", []],
   ["Computer Architecture", []],
   ["Languages and Algorithms", []]
    
]);

var mainTopicsName = ["Quantitative Aptitude", "Analytical and Logical Reasoning", "Computer Awareness"];
var sidebarData = [quantitative_aptitude, analytical_and_logical_reasoning, computer_awareness];


window.onload = function () {
    console.log(window.location.pathname);
    initialize();
}

function initialize() {
    mainTopics = document.getElementById("primary-topics");
    addSidebarEvent();
    addTopics();
    addShowSidebarEvent();
}

//---------------logic for adding third topics-------------------

function addTopics() {
    let firstTopicsElement = mainTopics.getElementsByClassName("first-topics");

    let pageName = document.getElementById("full-page-name").textContent;
    let topics = pageName.split('/');
    let hasSidebarClicked = false;

    for (let i = 0; i < firstTopicsElement.length; i++) {
        let secondTopicsElement = firstTopicsElement.item(i).getElementsByClassName("second-topics");

        let secondTopics = Array.from(sidebarData[i].keys());

        for (let j = 0; j < secondTopicsElement.length; j++) {
            let thirdTopicHolder = secondTopicsElement.item(j).getElementsByClassName("tertiary-topics").item(0);

            let thirdTopics = sidebarData[i].get(secondTopics[j]);

            for(let k = 0; k < thirdTopics.length; k++)
            {
                //---------creating list elements------------
                let li = document.createElement("li");
                li.classList.add("third-topics");
                li.classList.add("topics");

                //----------creating anchor element-----------
                let a = document.createElement("a");
               
                let url = window.location.pathname;
                let filename = url.substring(url.lastIndexOf('/') + 1);

                if(filename == "" || filename == "index.html")
                {
                    a.href = "Topics/" + mainTopicsName[i] + "/"  +secondTopics[j] + "/" + thirdTopics[k] + ".html";
                }
                else{
                    a.href = "../../../Topics/" + mainTopicsName[i] + "/"  +secondTopics[j] + "/" + thirdTopics[k] + ".html";
                }
               
                a.textContent = thirdTopics[k];

                li.appendChild(a);
                thirdTopicHolder.appendChild(li);

                // logic to open side bar

                if(!hasSidebarClicked)
                {
                    if(topics[0] == mainTopicsName[i] && topics [2] == thirdTopics[k])
                    {
                        secondTopicsElement.item(j).click();
                        firstTopicsElement.item(i).click();
                        hasSidebarClicked = true;
                    }
                }
            }
            
        }

    }
   
    // After all the topics added to the page, we have to remove animation
    window.setTimeout(function()
    {
    let loaderAnim = document.getElementById("loader");
    loaderAnim.style.animationPlayState = "paused";
    loaderAnim.style.webkitAnimationPlayState = "paused";
    loaderAnim.style.display = "none";
    }, 1000);
}

//----------end of logic for adding third topics-------------------

//----------logic for events of side bar-----------------


function addSidebarEvent() {
    mainTopics.addEventListener("click", function (event) {

        let clickedElement = event.target;
        let divElement = null;
        let listElement = null;
        let iconElement = null;


        if (clickedElement.nodeName == "DIV") {
            iconElement = clickedElement.firstElementChild;
            divElement = clickedElement;
            listElement = divElement.parentElement;
        }
        else if (clickedElement.classList.contains("material-icons-round")) {
            iconElement = clickedElement;
            divElement = clickedElement.parentElement;
            listElement = divElement.parentElement;
        }
        else if(clickedElement.nodeName == "LI")
        {
            clickedElement.firstElementChild.click();
        }
        else if (clickedElement.nodeName != "UL") {
            divElement = clickedElement.parentElement;
            iconElement = divElement.firstElementChild;
            listElement = divElement.parentElement;
        }

        let rotationAngle = getRotationAngle(iconElement);

        if (rotationAngle == 0) {
            if (listElement.classList.contains("first-topics")) {

                if (openedFirstTopic != null) {
                    closeFirstTopics(openedFirstTopic);
                }

                iconElement.style.transform = "rotate(45deg)";
                listElement.querySelector(".secondary-topics").style.maxHeight = "2000px";
                listElement.querySelector(".secondary-topics").style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.25)";
                divElement.style.backgroundColor = "rgb(195, 195, 195)";
                divElement.style.borderBottom = "1.5px solid rgb(175, 175, 175)";

                openedFirstTopic = listElement;

            }
            else if (listElement.classList.contains("second-topics")) {

                if (openedSecondTopic != null) {
                    closeSecondTopics(openedSecondTopic);
                }

                iconElement.style.transform = "rotate(90deg)";
                listElement.querySelector(".tertiary-topics").style.maxHeight = "2000px";
                listElement.querySelector(".tertiary-topics").style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.25)";
                divElement.style.backgroundColor = "rgb(195, 195, 195)";

                openedSecondTopic = listElement;
            }
        }
        else if (rotationAngle == 45) {
            closeFirstTopics(listElement);
        }
        else if (rotationAngle == 90) {
            closeSecondTopics(listElement);
        }

    }, false);
}


function closeFirstTopics(listElement) {

    let divElement = listElement.firstElementChild;

    $(listElement).children(".secondary-topics").css({ "max-height": "0px" });
    divElement.firstElementChild.style.transform = "rotate(0deg)";
    divElement.style.backgroundColor = "initial";
    divElement.style.borderBottom = "none";
    divElement.style.color = "initial";

    openedFirstTopic = null;
}

function closeSecondTopics(listElement) {

    let divElement = listElement.firstElementChild;

    divElement.firstElementChild.style.transform = "rotate(0deg)";
    listElement.querySelector(".tertiary-topics").style.maxHeight = "0px";
    divElement.style.backgroundColor = "initial";
    divElement.style.color = "initial";

    openedSecondTopic = null;
}

function getRotationAngle(iconElement) {

    if(iconElement == null)
    {
        return;
    }
    
    let style = window.getComputedStyle(iconElement);

    let rotate = style.getPropertyValue("-webkit-transform") ||
        style.getPropertyValue("-moz-transform") ||
        style.getPropertyValue("-ms-transform") ||
        style.getPropertyValue("-o-transform") ||
        style.getPropertyValue("transform") ||
        "none";

    var values = rotate.split('(')[1],
        values = values.split(')')[0],
        values = values.split(',');

    let a = values[1];
    let angle = Math.round(Math.asin(a) * (180 / Math.PI));
    return angle;

}

//-----------end of logic of side bar-----------------------

//------------logic for show side bar------------------

function addShowSidebarEvent()
{
    document.getElementById("show-sidebar").addEventListener("click", function()
    {
        document.getElementById("side-bar").style.visibility = "visible";
    });

    document.getElementById("close-sidebar").addEventListener("click", function(){
        document.getElementById("side-bar").style.visibility = "hidden";
    });
}

function zoomInImage(event)
{
    let img = event.target;
    img.style.transform = "scale(1.125)";
    img.style.boxShadow = "0px 0px 0px 2500px rgba(0, 0, 0, 0.75)";

    let closeButton = img.parentElement.querySelector("span");
    closeButton.style.visibility = "visible";
}

function zoomOutImage(event)
{
    let img = event.target.parentElement.firstElementChild;
    img.style.transform = "scale(1)";
    img.style.boxShadow = "none";

    let closeButton = event.target;
    closeButton.style.visibility = "hidden";
}
