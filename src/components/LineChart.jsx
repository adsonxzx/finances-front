import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import formatMoney from '../helpers/formatMoney'

export default class LineChart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      options: {
        annotations: {
          yaxis: [{
            y: 50,
            borderColor: '#F33A5A',
            label: {
              borderColor: '#F33A5A',
              style: {
                color: '#fff',
                background: '#F33A5A',
              },
              text: 'Limite de Gasto',
            }
          }],
        },

        chart: {
          toolbar: {
            show: false
          },
          id: "basic-bar",
        },
        xaxis: {
          categories: props.months
        },
        yaxis: {
          labels: {
            formatter: (val) => formatMoney(val)
          }
        },
        dataLabels: {
          enabled: true,
        }
      },

      series: [
        {
          name: "Gasto total do mes",
          data: props.values
        }
      ]
    };
  }

  render() {

    return (
      <div className="box-container">
        <div className="box-header">
          <span className="title">Gastos Mensais</span>
          <ul className="select">
            <li className="geral active">Geral</li>
            <li className="mercado">Mercado</li>
            <li className="lazer">Lazer</li>
          </ul>
        </div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height="320"
        />
      </div>
    )
  }

}
