import React, { useState } from 'react';
import Modal from "@mui/material/Modal";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

import 'chartjs-plugin-dragdata';
import "./VoiceModal.css";

Chart.register(...registerables);

const VoiceModal = (props) => {
    const { showVoiceModal, handleVoiceModalClose } = props;

    const [data, setData] = useState({
        labels: [0, 1, 2, 3, 4],
        datasets: [
            {
                label: 'Draggable Points',
                data: [
                    { x: 0, y: 1 },
                    { x: 1, y: 3 },
                    { x: 2, y: 2 },
                    { x: 3, y: 4 },
                    { x: 4, y: 5 },
                ],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                pointBackgroundColor: 'rgba(75,192,192,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(75,192,192,1)',
                dragData: true,
                dragX: true,
                dragY: true,
            },
        ],
    });

    const options = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
            },
            y: {
                type: 'linear',
                position: 'left',
            },
        },
        plugins: {
            dragData: {
                round: 1,
                onDragEnd: (e, datasetIndex, index, value) => {
                    const newData = [...data.datasets[0].data];
                    newData[index] = value;
                    setData({
                        ...data,
                        datasets: [
                            {
                                ...data.datasets[0],
                                data: newData,
                            },
                        ],
                    });
                },
                dragX: true,
                dragY: true,
            },
        },
    };

    return (
        <Modal open={showVoiceModal} onClose={handleVoiceModalClose}>
            <div className="voice-modal-container">
                <div className="voice-modal-header">
                    <h2 className="modal-title">Add Comment</h2>
                    <HighlightOffRoundedIcon
                        className="modal-close-icon"
                        onClick={handleVoiceModalClose}
                    />
                </div>
                <div className='voice-modal-points-container'>
                    <Line data={data} options={options} />
                </div>
            </div>
        </Modal>

    )
}

export default VoiceModal;


/*
   ** Remove this commented code when points drag and drop functionality is done and stable **
*/


// import Modal from "@mui/material/Modal";
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import HighchartsDrag from 'highcharts/modules/drag-panes';
// import HighchartsMore from 'highcharts/highcharts-more';

// import "./VoiceModal.css";

// HighchartsMore(Highcharts);
// HighchartsDrag(Highcharts);

// const options = {
//     chart: {
//         type: 'scatter',
//     },
//     title: {
//         text: 'Draggable Points',
//     },
//     xAxis: {
//         title: {
//             enabled: true,
//             text: 'X Axis',
//         },
//         startOnTick: true,
//         endOnTick: true,
//         showLastLabel: true,
//     },
//     yAxis: {
//         title: {
//             text: 'Y Axis',
//         },
//     },
//     plotOptions: {
//         series: {
//             dragDrop: {
//                 draggableY: true,
//                 draggableX: true
//             },
//             point: {
//                 events: {
//                     drop: function () {
//                         console.log(`Point dropped at x: ${this.x}, y: ${this.y}`);
//                     },
//                 },
//             },
//         },
//     },
//     series: [
//         {
//             data: [
//                 { x: 0, y: 1 },
//                 { x: 1, y: 3 },
//                 { x: 2, y: 2 },
//                 { x: 3, y: 4 },
//                 { x: 4, y: 5 },
//             ],
//         },
//     ],
// };


// const VoiceModal = (props) => {

//     return (
//         <Modal open={true}>
//             <div className="voice-modal-container">
//                 <HighchartsReact highcharts={Highcharts} options={options} />
//             </div>
//         </Modal>
//     );
// };

// export default VoiceModal;


