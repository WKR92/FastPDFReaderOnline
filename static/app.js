// React without JSX

// 1st working try
// var result = data.splice(0, 1);


// generator working try
var genItem = 0;
var maxGenItem = 0;
function* generator(val) {
  for(genItem; genItem<=val.length; genItem++){
      if(genItem === maxGenItem){
        maxGenItem++;
      }
      yield val[genItem];
  }
}
var gen = generator(data);
var num = 1;

class Popup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      e('div', {className:"z-index-2"},
      e('div', {className:"container table-hover border border-dark p-4"},
      e('div', {className:"text-center"},
      e('h2', null, this.props.text),
      e('div', {className:"row pt-4"}, null,
      e('button', {className:"col text-center btn btn-info border border-dark p-4", onClick: this.props.closePopup200}, '200 words/s'),
      e('button', {className:"col text-center btn btn-info border border-dark p-4", onClick: this.props.closePopup300}, '300 words/s'),
      e('button', {className:"col text-center btn btn-info border border-dark p-4", onClick: this.props.closePopup400}, '400 words/s')),
      e('div', {className:"row"}, null,
      e('button', {className:"col text-center btn btn-info border border-dark p-4", onClick: this.props.closePopup500}, '500 words/s'),
      e('button', {className:"col text-center btn btn-info border border-dark p-4", onClick: this.props.closePopup600}, '600 words/s'),
      e('button', {className:"col text-center btn btn-info border border-dark p-4", onClick: this.props.closePopup700}, '700 words/s')),
      e('div', {className:"row"}, null,
      e('button', {className:"col text-center btn btn-info border border-dark p-4", onClick: this.props.closePopup800}, '800 words/s'),
      e('button', {className:"col text-center btn btn-info border border-dark p-4", onClick: this.props.closePopup900}, '900 words/s'),
      e('button', {className:"col text-center btn btn-info border border-dark p-4", onClick: this.props.closePopup1000}, '1000 words/s')))))
    );
  }
}

var save = {name        : '',
            lastWordNum : '',
            title       : ''};


class OverwritingSaveDecission extends React.Component {
  constructor(props) {
    super(props)
  }
  Yes(){
    this.props.overwriteProp();
    this.props.closeProp();
  }
  No(){
    this.props.closeProp();
  }
  render() {
    return (
      e('div', {className:"container table-hover border border-dark mt-4 p-4"},
      e('div', {className:""},
      e('h2', {className:"text-center mb-4"}, "Are you sure you want to overwrite your save file?"),
      e('div', {className:"row w-75 m-auto"},
      e('button', {className:"col bg-success", onClick: () => `${this.Yes()}`}, "Yes"),
      e('button', {className:"col bg-danger", onClick: () => `${this.No()}`}, "No"))))
    )
  }
}


class SaveArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      yesNoWindow: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveMethod = this.saveMethod.bind(this);
    this.yesNoWindow = this.yesNoWindow.bind(this);
  }
  saveMethod(){
    if(this.state.inputValue === ""){
      alert("Your save file has to have a name. Please, name it somehow.")
    } else {
      localStorage.clear();
      this.props.saveProp();
      localStorage.setItem('save', JSON.stringify(data));
      localStorage.setItem('name', JSON.stringify(this.state.inputValue));
      localStorage.setItem('lastWord', JSON.stringify(genItem));
      localStorage.setItem('title', JSON.stringify(bookTitle));
      alert("Your progress has been saved properly. You can load it with the 'Load' button now.");
    }
  }
  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }
  closeSaveWindow(){
    this.props.saveProp();
  }
  yesNoWindow(){
    this.setState({
      yesNoWindow: !this.state.yesNoWindow
    });
  }
  render() {
    if(this.state.inputValue.length >= 10 && this.state.inputValue.length < 13){
      var inpLine = document.getElementById("inp");
      inpLine.className = "text-warning";
    }
    if(this.state.inputValue.length >= 13){
      var inpLine = document.getElementById("inp");
      inpLine.className = "text-danger";
    }
    if(this.state.inputValue.length >= 15){
      alert("Name of the save file can not be longer than 15 characters.")
    }
    return (
      e('div', {className:"container table-hover border border-dark p-4"},
      e('div', {className:""},
      e('h2', {className:""}, "Name save file"),
      e('input', {maxLength:15, className:"", id:"inp", value:`${this.state.inputValue}`, onChange: (e) => `${this.handleChange(e)}`})),
      e('button', {className:"mt-2 btn btn-info ", onClick: () => `${this.yesNoWindow()}`}, "Save"),
      e('button', {className:"mt-2 ml-2 btn btn-info", onClick: () => `${this.closeSaveWindow()}`}, "Close"),
      `${this.state.yesNoWindow}`==="true" ? e(OverwritingSaveDecission, {closeProp: this.yesNoWindow, overwriteProp: this.saveMethod}) : null,
      e('p', {className:"mt-4"}, "Note-1: Remember that you can have only one save file, so every time you create new one, you lose the previuos one. Also - your save file live only in a browser you made it."),
      e('p', {className:""}, "Note-2: Save you are making will start from the word you have now on the screen, not from the last word you read in book order - so choose it carefully"),
      e('p', {className:""}, "Note-3: If you have trouble saving, try to clear previous save in 'Load' button area first."))
    );
  }
}

class ClearingDecission extends React.Component {
  constructor(props) {
    super(props)
  }
  Yes(){
    this.props.clearProp();
    this.props.yesCloseProp();
  }
  No(){
    this.props.closeProp();
  }
  render() {
    return (
      e('div', {className:"container table-hover border border-dark mt-4 p-4"},
      e('div', {className:""},
      e('h2', {className:"text-center mb-4"}, "Are you sure you want to delete your save file?"),
      e('div', {className:"row w-75 m-auto"},
      e('button', {className:"col bg-success", onClick: () => `${this.Yes()}`}, "Yes"),
      e('button', {className:"col bg-danger", onClick: () => `${this.No()}`}, "No"))))
    )
  }
}

class LoadDecission extends React.Component {
  constructor(props) {
    super(props)
  }
  Yes(){
    this.props.load()
  }
  No(){
    this.props.dontLoad();
  }
  render() {
    return (
      e('div', {className:"container table-hover border border-dark mt-4 p-4 mb-4"},
      e('div', {className:""},
      e('h2', {className:"text-center mb-4"}, "Are you sure you want to load?"),
      e('div', {className:"row w-75 m-auto"},
      e('button', {className:"col bg-success", onClick: () => `${this.Yes()}`}, "Yes"),
      e('button', {className:"col bg-danger", onClick: () => `${this.No()}`}, "No"))))
    )
  }
}


class LoadArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clear_visible: false,
      load_visible: false
    };
    this.loadMethod = this.loadMethod.bind(this);
    this.openDeccision = this.openDeccision.bind(this);
    this.openLoadDeccision = this.openLoadDeccision.bind(this);
    this.clearSave = this.clearSave.bind(this);
    this.closeDecissionWithYesFunc = this.closeDecissionWithYesFunc.bind(this);
  }
  emptyData(){
    if(data.length !== 0){
      data.length = 0;
    }else{
      return;
    }
  }
  setGenerator(){
    gen = generator(data);
  }
  loadMethod(){
    this.emptyData();

    if(data.length === 0){
    this.props.loadProp();
    if(localStorage.getItem('save')){
      data = JSON.parse(localStorage.getItem('save'))
    }
    this.setGenerator();
    num = 1;
    maxGenItem = JSON.parse(localStorage.getItem('lastWord')) +1;
    genItem = JSON.parse(localStorage.getItem('lastWord'));
    bookTitle = JSON.parse(localStorage.getItem("title"));
    this.props.flatProp(data[genItem]);

    alert("Your file has been loaded successfully. You can read along now.");
    } else {
      alert("Data not empty");
    }
  }
  closeLoadWindow(){
    this.props.loadProp();
  }
  closeDecissionWithYesFunc(){
    this.setState({
      clear_visible: !this.state.clear_visible
    });
  }
  openDeccision(){
    if(localStorage.getItem('name') === null){
      return;
    }
    this.setState({
      clear_visible: !this.state.clear_visible
    });
  }
  clearSave(){
    localStorage.clear();
    this.forceUpdate();
  }
  openLoadDeccision(){
    this.setState({
      load_visible: !this.state.load_visible
    });
  }
  render() {
    return (
      e('div', {className:"container table-hover border border-dark p-4"},
      e('div', {className:""},
      e('h2', {className:""}, "Your saved file:"),
      e('div', {className:"row"},
      e('p', {className:"mt-4 pl-3 font-weight-bold"}, "Save name: "), 
      e('p', {className:"mt-4 pl-2 text-success", id:"lName"}, localStorage.getItem('name')),
      e('p', {className:"mt-4 pl-2 font-weight-bold"}, " | Save file: "),
      e('p', {className:"mt-4 pl-2 text-success", id:"lTitle"}, localStorage.getItem('title'))),
      localStorage.getItem('name') === null ? e('span', {className:"text-danger"}, "You have no file to load. You can create one with 'Save' button.") : e('button', {className:"btn btn-info", onClick: () => `${this.openLoadDeccision()}`}, "Load"),
      e('button', {className:"mt-2, ml-2 btn btn-info", onClick: () => `${this.closeLoadWindow()}`}, "Close"),
      e('button', {className:"mt-2, ml-2 btn btn-info", onClick: () => `${this.openDeccision()}`}, "Clear"),
      `${this.state.clear_visible}`==="true" ? e(ClearingDecission, {closeProp: this.openDeccision, clearProp: this.clearSave, yesCloseProp: this.closeDecissionWithYesFunc}) : null,
      `${this.state.load_visible}`==="true" ? e(LoadDecission, {dontLoad: this.openLoadDeccision, load: this.loadMethod}) : null,
      e('p', {className:"mt-4"}, "Note: If you want to make new save file you can also just overwrite current one with 'Save' button. Deleting is not necessary."),
      e('p', {className:"font-weight-bold"}, "Note: Remember that if you will clear your browser catche, you will also lose your save file.")))
    );
  }
}


// setting starting_text
if(data.length === 0){
  if(window.location.href === "https://fastpdfreader.herokuapp.com/reader"){
    var starting_text = "There was en error. Try to reload page few times to get your text. If whis wont work, go back and upload again."
  } else {
    var starting_text = "Click 'Load' button to load your save file."
    if(localStorage.getItem('name') === null){
      window.location.replace("/");
      alert("You have no save file. Please, go back and submit your pdf to start reading.");
    } 
  }
  
} else {
  starting_text = "Click start to read"
}


// Main Interval
var mainIntervalId;
const e = React.createElement;
const mainInt = class MainInterval extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       curWord : starting_text,
       time: 200,
       disabled : false,
       showPopup: false,
       showSaveArea: false,
       showLoadArea: false,
       goBackDecissionWindow: false
     }
     this.togglePopup = this.togglePopup.bind(this);
     this.saveProgress = this.saveProgress.bind(this);
     this.loadProgress = this.loadProgress.bind(this);
     this.flatChangeValue = this.flatChangeValue.bind(this);
   }
   componentDidMount(){
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = '';
    });
   }
   saveProgress(){
    if (this.state.curWord === "Click 'Load' button to load your save file") {
      return;
    }
    clearInterval(mainIntervalId);
    this.setState({
      showSaveArea: !this.state.showSaveArea
    });
   }
   loadProgress(){
    clearInterval(mainIntervalId);
    this.setState({
      showLoadArea: !this.state.showLoadArea
    });
   }
   togglePopup(buttonTime) {
     clearInterval(mainIntervalId);
     this.setState({
      disabled: false
    });
    this.setState({
      showPopup: !this.state.showPopup,
      time: buttonTime
    });
  }
   changeValue() {
    this.setState({
      curWord : gen.next().value
    });
   }
   flatChangeValue(val){
    this.setState({
      curWord : val
    });
   }
   startInterval() {
    if (this.state.curWord === "Click 'Load' button to load your save file") {
      return;
    }
    if (this.state.disabled) {
      return;
    }
    this.setState({
      disabled: true
    });
     mainIntervalId = setInterval( () => {
      this.changeValue()
     }, this.state.time)
   }
   stopInterval(){
     clearInterval(mainIntervalId);
     this.setState({
      disabled: false
    });
    num=1;
   }
   previousWord(){
    if (this.state.curWord === "Click 'Load' button to load your save file") {
      return;
    }
    if (this.state.disabled || this.state.curWord === 'Click start to read') {
      return;
    }
    if (num !== maxGenItem){
    num += 1;
    if(genItem > 0){
    genItem -= 1;
    }
    this.setState({
      curWord : data[maxGenItem - num]
    });
   }
   }
   firstWord(){
    if (this.state.curWord === "Click 'Load' button to load your save file") {
      return;
    }
    if (this.state.disabled || this.state.curWord === 'Click start to read') {
      return;
    }
    this.setState({
      curWord : data[0]
    });
    num=maxGenItem;
    genItem = 0;
   }
   nextWord(){
    if (this.state.curWord === "Click 'Load' button to load your save file") {
      return;
    }
    if (this.state.disabled || this.state.curWord === 'Click start to read') {
      return;
    }
    if(num !== 1){
    num -= 1;
    if(genItem < maxGenItem){
      genItem += 1;
      }
    this.setState({
      curWord : data[maxGenItem - num]
    });
   } else {
    this.setState({
      curWord: data[maxGenItem - 1]
    });
   }
   }
   lastWord(){
    if (this.state.curWord === "Click 'Load' button to load your save file") {
      return;
    }
    if (this.state.disabled || this.state.curWord === 'Click start to read') {
      return;
    }
    this.setState({
      curWord: data[maxGenItem - 1]
    });
    num=1;
    genItem = maxGenItem - 1;
   }
   goBack(){
    window.location.replace("/");
   }
  render() {  
       return(
        e('div', {className:""},
        e('div', {className:"mb-5 text-center"},
        e('h1', {id:"headline", className:"text-container"}, "You are reading: " + bookTitle)),
        e('br', null),
        e('div', {id:"txt-container", className:"card-body m-auto"},
        e('h2', {id:"text_p", className:"card-title m-auto text-center"}, `${this.state.curWord}`)),
        e('br', null),
        e('div', {className:"container table-hover"},
        `${this.state.showSaveArea}`==="true" ? e(SaveArea, {saveProp: this.saveProgress}) : null,
        `${this.state.showLoadArea}`==="true" ? e(LoadArea, {loadProp: this.loadProgress, flatProp: this.flatChangeValue}) : null,
        `${this.state.showPopup}`==="true" ? e(Popup, {text:"Set the speed of reading. Avarge is 300 words per sec - it is also a default value in this reader.",
        closePopup200: () => this.togglePopup(300),
        closePopup300: () => this.togglePopup(200),
        closePopup400: () => this.togglePopup(150),
        closePopup500: () => this.togglePopup(120),
        closePopup600: () => this.togglePopup(100),
        closePopup700: () => this.togglePopup(85.76),
        closePopup800: () => this.togglePopup(75.01),
        closePopup900: () => this.togglePopup(66.66),
        closePopup1000: () => this.togglePopup(60.024)}) : null,
        e('div', {className:"row pt-4"},
        e('button', {id:"str", className:"col text-center btn btn-info border border-dark p-4", onClick: () => `${this.startInterval()}`}, 'Start'),
        e('button', {id:"stp", className:"col text-center btn btn-info border border-dark p-4", onClick: () => `${this.stopInterval()}`},"Stop")),
        e('div', {className:"row"},
        e('button', {id:"fword", className:"col text-center btn btn-info border border-dark p-4", onClick: () => `${this.firstWord()}`}, "<<"),
        e('button', {id:"pword", className:"col text-center btn btn-info border border-dark p-4", onClick: () => `${this.previousWord()}`}, "<"),
        // e('button', {id:"str", className:"col-sm text-center btn btn-info border border-dark p-4", onClick: () => `${this.startInterval()}`}, 'Start'),
        // e('button', {id:"stp", className:"col-sm text-center btn btn-info border border-dark p-4", onClick: () => `${this.stopInterval()}`},"Stop"),
        e('button', {id:"nword", className:"col text-center btn btn-info border border-dark p-4", onClick: () => `${this.nextWord()}`}, ">"),
        e('button', {id:"lword", className:"col text-center btn btn-info border border-dark p-4", onClick: () => `${this.lastWord()}`}, ">>")),
        e('div', {className:"row"},
        e("button", {className:"col text-center btn btn-info border border-dark p-4", onClick: () => `${this.goBack()}`}, "Go back"),
        e('button', {className:"col text-center btn btn-info border border-dark p-4",
        onClick: () => `${this.togglePopup()}`}, "Set speed")),
        e('div', {className:"row"},
        e('button', {className:"col text-center btn btn-info border border-dark p-4", onClick: () => `${this.saveProgress()}`}, "Save"),
        e('button', {className:"col text-center btn btn-info border border-dark p-4", onClick: () => `${this.loadProgress()}`}, "Load"))),
        e('br', null),
        e('br', null),
        e('p', {}, "Note-1: Do not refresh the page withouth saving or you will lose your book progress."),
        e('p', {}, "Note-2: '>>' button takes you to the last word you read, not to the last word of the book."),
        e('p', {}, "Note-3: Your saves work smiliar to cookies. If you will clear browser catche, you will also lose your save."))
       );
     }
   }
function startReader(){
  if(data.length !== 0){
    const domContainer = document.querySelector('#NoJsx');
    ReactDOM.render(e(mainInt), domContainer);
  } else if(window.location.href === "http://127.0.0.1:5000/loadReader" && data.length === 0){
    const domContainer = document.querySelector('#NoJsx');
    ReactDOM.render(e(mainInt), domContainer);
  }
}
startReader();