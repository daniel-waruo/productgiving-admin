import React from "react"
import {MDBCard, MDBCardBody, MDBCardHeader} from "mdbreact";
import {HorizontalBar} from 'react-chartjs-2';

export class SeatChart extends React.Component {

  render() {
    const {seat: {name, candidates}} = this.props;

    const sorted = candidates.sort(
      (candidate1, candidate2) => {
        return candidate1.votes.number - candidate2.votes.number
      }
    ).reverse();
    const votes = sorted.map(
      ({votes: {number}}) => number
    );
    const totalVotes = votes.reduce(
      (total, num) => total + num
    );

    const percentageVotes = votes.map(
      (value) => (value / totalVotes) * 100
    );

    const labels = sorted.map(
      ({firstName, lastName}) => `${firstName} ${lastName}`
    );

    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: "#80deea",
          label: '% of votes',
          data: percentageVotes,
          fill: true,
          borderWidth: 1,
          tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';

                    if (label) {
                        label += ': ';
                    }
                    label += Math.round(tooltipItem.yLabel * 100) / 100;
                    return label;
                }
            }
        }
        }
      ]
    };

    return (
      <>
        <MDBCard style={{marginTop: "1rem"}}>
          <MDBCardHeader color="cyan darken-2">Results for {name}</MDBCardHeader>
          <MDBCardBody>
            <HorizontalBar
              data={data}
              width={100}
              height={30}
              options={{responsive: true}}
            />
          </MDBCardBody>
        </MDBCard>
      </>
    )
  }
}