import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {RootStore} from "../../stores/RootStore";
import BasicTable from "../Table/BasicTable";
import {GridColDef} from "@mui/x-data-grid";
import Spinner from "../Spinner/Spinner";
import {TextField} from "@mui/material";
import CountryInfo from "../CountryInfo/CountryInfo";

/**
 * Component to display Table
 */
const UserArea = ({store}: { store: RootStore }) => {

    /**
     * Filter string for Country search
     */
    const [filter, setFilter] = useState<string>('')

    /**
     * Get Countries for table if needed
     */
    useEffect(() => {
        if (store.countries.length === 0) {
            store.getCountries()
        }
    }, [store, filter])

    /**
     * Get Rows for Table
     */
    const tableRows = store.countries.map((country, index) => {
            return {id: index, country: country }
        })

    /**
     * Get Columns for Table
     */
    const tableColumns: GridColDef[] = [
        {
            field: 'id',
            headerName: '#',
            width: 70
        },
        {
            field: 'country',
            headerName: 'Country',
            width: 300
        }
    ]

    return (
        <div className={'user-area'}>
                {store.isLoading && <Spinner/>}
                {!store.currentCountry && !store.isLoading &&
                    <div>
                        <div style={{padding: '10px'}}>
                            <TextField
                                onChange={(e) => {
                                    setFilter(e.target.value)
                                    store.filterCountries(e.target.value)
                                }}
                                id="outlined-basic"
                                label="Search"
                                variant="standard"/>
                        </div>
                        <BasicTable columns={tableColumns}
                                     rows={tableRows}
                                     onRowClick={store.setCurrentCountry}
                                     pageSize={10}/>
                    </div>}
                {store.currentCountry && !store.isLoading && <CountryInfo store={store}/>}
        </div>
    )
}

export default observer(UserArea)