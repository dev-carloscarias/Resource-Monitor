import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody } from "shards-react";
import Chart from "../../utils/chart";
import {getRamServerA, getRamServerB} from "../../utils/api"

let dataA = [0];
let dataB = [0];
class RamOverview extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
    this.canvasRef = React.createRef();
  }

  async tick() {
    let cpua = await getRamServerA();
    let cpub = await getRamServerB();
    dataA.push(cpua);
    dataB.push(cpub);
    this.dibujarGrafico();
  }  
  componentDidMount(){
    this.interval = setInterval(() => this.tick(), 5000);
    this.dibujarGrafico();
  }
  dibujarGrafico() {
    const chartOptions = {
      ...{
        responsive: true,
        legend: {
          position: "top"
        },
        elements: {
          line: {
            tension: 0.3
          },
          point: {
            radius: 0
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                callback(tick, index) {
                  // Jump every 7 values on the X axis labels to avoid clutter.
                  return index % 7 !== 0 ? "" : tick;
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                suggestedMax: 45,
                callback(tick) {
                  if (tick === 0) {
                    return tick;
                  }
                  // Format the amounts using Ks for thousands.
                  return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
                }
              }
            }
          ]
        },
        hover: {
          mode: "nearest",
          intersect: false
        },
        tooltips: {
          custom: false,
          mode: "nearest",
          intersect: false
        }
      },
      ...this.props.chartOptions
    };
    const BlogUsersOverview = new Chart(this.canvasRef.current, {
      type: "LineWithLine",
      data: this.props.chartData,
      options: chartOptions
    });    
    BlogUsersOverview.render();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { title } = this.props;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="pt-0">
          <canvas
            height="120"
            ref={this.canvasRef}
            style={{ maxWidth: "100% !important" }}
          />
        </CardBody>
      </Card>
    );
  }
}

RamOverview.propTypes = {
  title: PropTypes.string,
  chartData: PropTypes.object,
  chartOptions: PropTypes.object
};

RamOverview.defaultProps = {
  title: "RAM USAGE",
  chartData: {
    labels: Array.from(new Array(30), (_, i) => (i === 0 ? 1 : i)),
    datasets: [
      {
        label: "Servidor A",
        fill: "start",
        data: dataA,
        backgroundColor: "rgba(0,123,255,0.1)",
        borderColor: "rgba(0,123,255,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgb(0,123,255)",
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 3
      },
      {
        label: "Servidor B",
        fill: "start",
        data: dataB,
        backgroundColor: "rgba(255,65,105,0.1)",
        borderColor: "rgba(255,65,105,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgb(255,65,105,1)",
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 3
      }
    ]
  }
};

export default RamOverview;
