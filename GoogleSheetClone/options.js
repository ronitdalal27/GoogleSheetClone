//this body is variable which is available script.js so we are accessing it directly,how accessing direclty,bcoz in html we added options.js after script.js
//so all the variables which are declared in script.js will be accessible in options.js


let selectedCell = "";
const activeCellElement = document.querySelector(".selected-cell");
const form = document.querySelector(".form-container");
const expressionInput = document.querySelector(".expression");
const state = {};

/* the state is an array of object where we can find each cell what it's properties are 
    state = {
        A1 : {
            innerText: "Ronit",
            isBold: true,
            isItalic: true,
            isUnderlined: true,
            align: center,
            fontSize" "16",
            fontFamily: "normal",
            color: #00000,
            backgroundColor: "white"
        },
        D1 : {
            //so on n so forth
        }
    }
*/

//this is going to be default state of every cell
const defaultState = {
    innerText: "",
    isBold: false,
    isItalic: false,
    isUnderlined: false,
    align: left,
    fontSize: "16",
    fontFamily: "default",
    color: "black",
    backgroundColor: "white"
};

//here we are using the concept of event delegation n applying eventlistner to only body i.e. all cells instead of each cell
body.addEventListener("click",(event) => {
    if(selectedCell){ //if cell is already selected we have to remove it
        selectedCell.classList.remove("active-cell");    
    }
    selectedCell = event.target;
    console.log(event.target); //which cell has been clicked that will display
    activeCellElement.innerText = selectedCell.id;
    selectedCell.classList.add("active-cell");
    if(!state[selectedCell.id]){
        state[selectedCell.id] = {
            ...defaultState, innerText: selectedCell?.innerText,
        };     
    }
    state[selectedCell.id] = {
        ...state[selectedCell.id], innerText: selectedCell?.innerText,
    };
    applyCellInfoToForm();
});

//we added actionListener on form so if anything clicked will be seen i.e. bold,italic,alignment,etc,bocz they are inside form
form.addEventListener('change',() => { 
    console.log("change event triggered");
    if(!selectedCell){
        alert("please select a cell before making change on options");
        form.reset(); //if any cell is not selected so the options will not be clicked
        return;
    }
    //extracting form data
    const formdata = {
        fontFamily: form["fontFamily"].value,
        fontSize: form["fontSize"].value,
        isBold: form["isBold"].checked,
        isItalic: form["isItalic"].checked,
        isUnderlined: form["isUnderlined"].checked,
        align: form["align"].value,
        textColor: form["textColor"].value,
        backgroundColor: form["backgroundColor"].value
    };

    //update the state of selected cell
    state[selectedCell.id] = {
        ...formdata,innerText:selectedCell.innerText,
    };

    //console.log(formdata); //once you have the form data with you,you should change the text written in cell to this form option properties
    applyStyleToSelectedCell(formdata);
});

function applyStyleToSelectedCell(styles){
    selectedCell.style.fontSize = styles.fontSize+"px";
    selectedCell.style.fontFamily = styles.fontFamily;
    selectedCell.style.fontWeight = styles.isBold ? "bold" : "normal";
    selectedCell.style.fontStyle = styles.isItalic ? "italic" : "normal";
    selectedCell.style.textDecoration = styles.isUnderlined ? "underline" : "normal";
    selectedCell.style.textAlign = styles.align; //left,center,right
    selectedCell.style.color = styles.textColor;
    selectedCell.style.backgroundColor = styles.backgroundColor;
}


//whatever expression we are getting in exp box we are evaluating her
expressionInput.addEventListener("keyup",(event) => {
    //console.log(event);
    if(event.key === "Enter"){
        const expressionResult = eval(event?.target?.value);
        console.log(expressionResult);
        selectedCell.innerText = expressionResult;
    }
});

function applyCellInfoToForm(){
    //putting cell to the state object 1st time with default state
    if(!state[selectedCell.id]){
        console.log(defaultState);
        return;
    }
    //if cell is already present in the state object then print its current state
    console.log(state[selectedCell.id]);

    synFormOptions(state[selectedCell.id]); //seeing properites of each cell
}

//this function is implemeted when we will go to paticular cell we should see their properties i.e. bold,italic,align,backgrouncolor,etc
function synFormOptions(selectedCellState){
    form["fontFamily"].value = selectedCellState.fontFamily;
    form["fontSize"].value = selectedCellState.fontSize;
    form["isBold"].checked = selectedCellState.isBold;
    form["isItalic"].checked = selectedCellState.isItalic;
    form["isUnderlined"].checked = selectedCellState.isUnderlined;
    form["align"].value = selectedCellState.align;
    form["textColor"].value = selectedCellState.textColor;
    form["backgroundColor"].value = selectedCellState.backgroundColor;
}