var e = React.createElement;


window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});


var child = class Child extends React.Component {
    constructor(props) {
      super(props);
    }
    dismiss() {
      clearInterval(refresh_id);
      this.props.unmountMe();
    }
    render(){
      return (
        e('div', {className:""},
        e('h1', {className:"text-center mb-3 mt-3"}, "Loading time depends on the size of your PDF file. It can take up to minute or two."),
        e('div', {className:"loadIcon mt-5 mb-5 text-center"}, ''),
        e('div', {className:"d-inline-block w-100 m-auto"},
        e('p', {className:"text-center d-block m-auto w-25 font-weight-bold"}, "Time of loading: " + this.props.Sec + " sec"),
        e('button', {id:"cancelBtn", className:"btn btn-primary ml-auto mr-auto mb-auto mt-4 d-block", onClick: () => `${this.dismiss()}`}, 'Cancel loading')),
        e('p', {className:"text-center mt-4"}, "Note: This reader can not be able to efficiently process every PDF file. If something's wrong with one, please try another."),
        e('p', {className:"text-center"}, "Note: If you stopped page loading from here with browser 'Stop' button, the loading circle will spin forever. In that case, you have to go back."))
      );
    }
  }


var loadIcon = class LoadIcon extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        visible: true,
        seconds: 0
      };
      this.cancelBtn = this.cancelBtn.bind(this);
    }
    componentDidMount() {
      setInterval(
        () => this.setState({
          seconds: this.state.seconds += 1
        }), 1000
      );
    }
    cancelBtn(){
      window.location.replace("/");
    }
    render() {
      return (
        `${this.state.visible}`==="true" ? e(child, {unmountMe: this.cancelBtn, Sec: this.state.seconds}) : null
      );
    }
  }
const domContainer = document.querySelector('#icon');
ReactDOM.render(e(loadIcon), domContainer);