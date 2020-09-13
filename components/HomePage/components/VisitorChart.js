import React from "react";
import {Line} from "react-chartjs-2";
import {MDBAnimation, MDBContainer} from "mdbreact";

class VisitorChart extends React.Component {
  isMobileDevice = () => {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }

  render() {
    const dataLine = {
      datasets: [
        {
          label: "Income Generated",
          fill: true,
          //lineTension: 0.5,
          backgroundColor: "rgba(139, 195, 74, 0.4)",
          borderColor: "rgba(139, 195, 74, 0.9)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(139, 195, 74, 0.9)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [{x:4, y:15},{x:5, y:10},{x:10, y:19},{x:15, y:10},{x:16, y:15},]
        }
      ]
    }
    return (
      <MDBAnimation type={"fadeIn"}>
        <MDBContainer fluid className={"pb-4"}>
          <h2 className={"ml-4 mt-4"}>Amount Deposited</h2>
          <Line data={dataLine}
                options={{
                  responsive: true,
                  scales: {
                    xAxes: [{
                      type: 'time',
                      time: {
                        unit: 'day'
                      },
                      distribution: "series",
                      display: !this.isMobileDevice()
                    }]
                  }
                }}/>
        </MDBContainer>
      </MDBAnimation>
    );
  }
}

export default VisitorChart