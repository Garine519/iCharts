import React from "react";
import Header from "./Header";
import { Line } from "react-chartjs-2";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import moment from "moment";

class Home extends React.Component {
  state = {
    labels: [],
    datasets: [
      {
        label: "Daily Cases in Lebanon",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        // borderColor: [
        //   "rgba(255, 99, 132, 1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(255, 206, 86, 1)",
        //   "rgba(75, 192, 192, 1)",
        //   "rgba(153, 102, 255, 1)",
        //   "rgba(255, 159, 64, 1)",
        // ],
        borderWidth: 1,
      },
    ],
  };
  componentDidMount() {
    fetch(
      "https://api.covid19api.com/country/lebanon/status/confirmed/live?from=2020-03-01T00:00:00Z"
    )
      .then((res) => res.json())
      .then((data) => {
        var datasetProp = { ...this.state.datasets };
        data = data.filter((x) => x.Cases !== 0);
        if (data[0].Province) {
          data = data.filter((x) => x.Province === "Ontario");
        }
        var newData = data.map((x) => x.Cases);
        datasetProp[0].data = newData;
        console.log(datasetProp);
        var newLabels = data.map((x) => moment(x.Date).format("DD-MMM"));
        this.setState({ datasetProp: datasetProp, labels: newLabels });
      })
      .catch(console.log);
  }
  render() {
    return (
      <div className="container">
        <Header title="iCharts" />
        <div className=" pt-4">
          <Card variant="outlined">
            <CardContent>
              <Line data={this.state}></Line>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

export default Home;
