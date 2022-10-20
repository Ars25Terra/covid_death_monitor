import {observer} from "mobx-react-lite"
import HighchartsReact from "highcharts-react-official/dist/highcharts-react";
import Highcharts from 'highcharts'
import {RootStore} from "../../stores/RootStore";
import {useEffect} from "react";
import moment from "moment";
import '../../styles/style.css'
import Button from "@mui/material/Button";

/**
 * Component to display chart for selected Country
 */
const CountryInfo = ({store}: { store: RootStore }) => {

    /**
     * Get Country Graph Data if needed
     */
    useEffect(() => {
        if (store.currentCountryGraphData.length === 0) {
            store.getCountryInfo(store.currentCountry)
        }
    }, [store])

    /**
     * Prepare Options for Chart
     */
    const options = {
        title: {
            text: `COVID-19 (${store.currentCountry})`,
            style: {color: 'white', height:'600px'}
        },
        xAxis: {
            title: {
                text: 'Dates',
                style: {color: 'white'}
            },
            categories: store.currentCountryGraphData.map(info => moment(info.date).format('DD.MM.yyyy')),
        },
        yAxis: {
            title: {
                text: 'Deaths',
                style: {color: 'white'}
            }
        },
        chart: {
            backgroundColor: '#1e1e1e',
            color: 'white',
            height: '45%'
        },
        legend: {
            itemStyle: {
                color: '#536ba9'
            }
        },
        series: [{
            name: 'Deaths over time',

            data: store.currentCountryGraphData.map(info => {
                return info.deaths
            }),
            type: 'line',
        }]
    }

    return <div style={{height: '100%'}}>
            <HighchartsReact
                highcharts={Highcharts}
                containerProps={
                    {
                        style: {
                            height: '90%',
                            width: '100%'
                        }
                    }}
                options={options}/>
        <div className={'country-info-button-area'}>
            <Button size={"medium"}
                    onClick={() => store.backToCountries()}
                    variant={"outlined"}>
                Back To Countries
            </Button>
        </div>
    </div>
}

export default observer(CountryInfo)