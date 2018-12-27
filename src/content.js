/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import "./content.css";
import Pie from './useCasePopup';

class Usecase extends React.Component {
   constructor(props) {
       super(props);
      // this.handleIntro=this.handleIntro.bind(this);
      this.state = {
          colourSelected:false
      }
   }

 makeEditableAndHighlight(colour) {
     var sel;
     var range;
     sel = this.props.text;
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
    document.designMode = "on";
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
    // Use HiliteColor since some browsers apply BackColor to the whole block
    if (!document.execCommand("HiliteColor", false, colour)) {
        document.execCommand("backColor", true, colour);
    }
    document.designMode = "off";
}
handleColor(colour) {
    // console.log(this.props.text);
    console.log('intro');
    if (this.props.text) {
        try {
            if (!document.execCommand("backColor", false, colour)) {
                this.makeEditableAndHighlight(colour);
            }
        } catch (ex) {
            this.smakeEditableAndHighlight(colour)
        }
      this.setState({colourSelected:true});
    } 
}


    render() {
        console.log(this.state)
        return (
            <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}>
                <FrameContextConsumer>
                    {
                        // Callback is invoked with iframe's window and document instances
                        ({ document, window }) => {
                            // Render Children
                            return (
                                // <div>{ !this.state.colourSelected ?
                                <div className={'popup'} style={{overflow:"hidden",marginTop:"-23px"}}>
                                    <h5 style={{textAlign:"center"}}>Use This in</h5>
                                    {console.log('hey')}
                                      
                                    <table style={{width:'35%',marginTop:"-14px",fontSize:"15px"}}>
                                        <tbody>
                                            <tr>
                                                <td><button class="button introBtn" style={{backgroundColor:'#266b39'}} onClick={this.handleColor.bind(this,'#12ba28')}>+</button></td>
                                                <td >Introduction</td>
                                            </tr>
                                            <tr>
                                                <td><button class="button materialBtn" style={{backgroundColor:'#a9d164'}} onClick={this.handleColor.bind(this,'#a9d164')}>+</button></td>
                                                <td>Materials</td>
                                            </tr>
                                            <tr>
                                                <td><button class="button staticsBtn" style={{backgroundColor:'red'}} onClick={this.handleColor.bind(this,'red')}>+</button></td>
                                                <td>Statistics</td>
                                            </tr>
                                            <tr>
                                                <td><button class="button discussionBtn" style={{backgroundColor:'pink'}} onClick={this.handleColor.bind(this,'pink')}>+</button></td>
                                                <td>Discussion</td>
                                            </tr>
                                            <tr>
                                                <td><button class="button conclusionBtn" style={{backgroundColor:'#64d1cb'}} onClick={this.handleColor.bind(this,'#64d1cb')}>+</button></td>
                                                <td>Conclusion</td>
                                            </tr>
                                            <tr>
                                                <td> <button class="button otherBtn" style={{backgroundColor:'yellow'}} onClick={this.handleColor.bind(this,'yellow')}>+</button></td>
                                                <td>Others</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                                // : <Pie /> }</div>
                            )
                        }
                    }
                </FrameContextConsumer>
            </Frame>
        );
    }
}

const app = document.createElement('div');
app.id = "my-popup";
document.body.appendChild(app);

//app.style.display = "none";
console.log('hello world')

window.addEventListener('mouseup', wordSelected);
function wordSelected(event) {
    let selectedText = window.getSelection().toString().trim();
    console.log(selectedText);
    if (selectedText.length > 0) {
        // let msg ={
        //     text:selectedText
        // }
        // chrome.runtime.sendMessage(msg)
       if(event.screenY <= (window.outerHeight/2)) {
        ReactDOM.render(<Usecase text={selectedText} />, app);
        app.style.position = "absolute";
        var y=event.clientY+window.scrollY;
        app.style.display = "inline-block";
        app.style.backgroundColor = "white";
        app.style.top = y + 9 + "px";
        app.style.left = event.clientX - 100 + "px";
       }
       else {
        ReactDOM.render(<Usecase text={selectedText} />, app);
        app.style.position = "absolute";
        var y=event.clientY+window.scrollY;
        app.style.display = "inline-block";
        app.style.backgroundColor = "white";
        app.style.top = y - 210 + "px";
        app.style.left = event.clientX - 100 + "px";

       }
        console.log('screeny', event.screenY, 'outerheight', window.outerHeight/2);
        //alert(selectedText);
    }
    else {
        ReactDOM.render(<Pie />,app);
        app.style.position = "absolute";
        var y=event.clientY+window.scrollY;
        app.style.display = "inline-block";
        app.style.backgroundColor = "white";
        app.style.width='400px';
        app.style.top = y - 210 + "px";
        app.style.left = event.clientX - 100 + "px";
        // app.style.display = "none";
    }
}



