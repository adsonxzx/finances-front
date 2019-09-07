import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import formatMoney from '../../helpers/formatMoney'

export default class BarChart extends Component {

  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    const { expenses } = this.props

    let options
    let series

    if (expenses) {
      const categories = expenses.map(({ category }) => category)
      const data = expenses.map(({ maxValue }) => maxValue)

      // Options
      options = {
        chart: {
          toolbar: {
            show: false
          }
        },
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'],
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true
          }
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories,
          labels: {
            style: {
              colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'],
              fontSize: '14px'
            }
          }
        }
      }

      // Series
      series = [{
        data
      }]
    } 

    return (
      expenses ? (
        <Chart
          options={options}
          series={series}
          type="bar"
          height="320"
        />
      ) : null
    )
  }

}