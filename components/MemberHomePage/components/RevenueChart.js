import React from "react";
import {Line} from "react-chartjs-2";
import {MDBContainer} from "mdbreact";
import {REVENUE_DATA_QUERY} from "../queries";
import {graphql} from "react-apollo";
import compose from "lodash.flowright";

class RevenueChart extends React.Component {
  render() {
    const {data: {loading, error, revenueTransactions}} = this.props;
    if (loading) return null;

    if (error) return <h3 className={"my-4 text-danger text-center"}>{error.message}</h3>

    if (!revenueTransactions) return null
    const dataLine = {
      labels: revenueTransactions.map(({time}) => new Date(time)),
      datasets: [
        {
          label: "Income Generated",
          fill: true,
          //lineTension: 0.5,
          backgroundColor: "rgba(0,150,136,0.3)",
          borderColor: "rgba(0,150,136,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(0,150,136,0.7)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: revenueTransactions.map(({time, amount}) => ({x: new Date(time), y: amount})),
        }
      ]
    }
    return (
      <MDBContainer fluid className={"pb-4"}>
        <h2 className={"ml-4 mt-4"}>Income</h2>
        <Line data={dataLine}
              options={{
                responsive: true,
                scales: {
                  xAxes: [{
                    type: 'time',
                    time: {
                      unit:'day'
                    },
                    distribution:"series"
                  }]
                }
              }}/>
      </MDBContainer>
    );
  }
}

export default compose(
  graphql(REVENUE_DATA_QUERY)
)(RevenueChart);