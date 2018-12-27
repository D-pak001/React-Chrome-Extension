/*global chrome*/
/* src/content.js */
import React from 'react';
// import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import "./content.css";
// import {Chart} from "react-google-charts";
import {Doughnut} from 'react-chartjs-2';

// const data = [
//     ['use case', 'Size'],
//     ['intro', 2],
//     ['materials', 10],
//     ['statistics', 9],
//     ['Discussion', 5],
//     ['conclusion', 9],
//     ['others', 1]
// ];
// const options = {
//     title: "",
//     pieHole: 0.65,
//     pieSliceBorderColor: "none",
//     colors: ['#266b39', '#a9d164', 'red', 'pink', '#64d1cb', 'yellow'],
//     legend: 'none',
//     pieSliceText: "none",
//     tooltip: {
//         trigger: "none"
//     }
// };
const data = {
	labels: [],
	datasets: [{
		data: [3, 5, 10,9,6,8],
		backgroundColor: [
		'#266b39',
		'#a9d164',
        'red',
        'pink',
        '#64d1cb',
        'yellow'
		],
		hoverBackgroundColor: [
            '#266b39',
            '#a9d164',
            'red',
            'pink',
            '#64d1cb',
            'yellow'
		]
	}],
  text: '23%'
};
class Usecase extends React.Component {
    render() {
        return (
            <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}>
                <FrameContextConsumer>
                    {
                        // Callback is invoked with iframe's window and document instances
                        ({ document, window }) => {
                            // Render Children
                            return (
                                <div className={'note'} style={{marginTop:'-4px'}}>
                                    <h5 style={{ textAlign: "center" }}>Use This in</h5>
                                    <div className="note-content" style={{ display: 'flex',marginTop:'-8px' }}>
                                         <div style={{marginTop:'-8px'}}>
                                            <h3>Discussion</h3>
                                            <textarea placeholder="note come here" cols={18} rows={6} />
                                            </div>
                                        <div className="chart">
                                            <Doughnut
                                                
                                                width="120px"
                                                height="120px"
                                                data={data}
                                                
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                </FrameContextConsumer>
            </Frame>
        );
    }
}
export default Usecase;

// console.log('hello world')
// window.addEventListener('mouseup', wordSelected);
// function wordSelected(event) {
//     let selectedText =window.getSelection().toString();
//     console.log(selectedText);
//     if(selectedText.length>0) {
//         // let msg ={
//         //     text:selectedText
//         // }
//         // chrome.runtime.sendMessage(msg)
//         const newapp = document.createElement('div');
//             newapp.id = "my-popup";
//             document.body.appendChild(newapp);
//           ReactDOM.render(<Usecase />, newapp);

//          console.log('x',event.clientX,'y',event.clientY);  
//         //alert(selectedText);
//     }
// }



