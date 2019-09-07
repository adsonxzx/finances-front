import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import formatMoney from '../../helpers/formatMoney'

export default class BarChart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          show: false,
          bar: {
            horizontal: false,
          },
        },

        xaxis: {
          categories: ['Mercado', 'Moradia', 'Academia', 'Lazer', 'Outros'],
        },
        legend: {
          show: false
        },
        fill: {
          opacity: 1
        }
      },
      series: [{
        data: [400, 550, 70, 50,  250]
      }, {
        data: [300, 50, 0, 0, 130]
      }]
    }
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        height="380"
      />
    )
  }
}