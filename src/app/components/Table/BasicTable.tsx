import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';

interface IProps {
    rows: any[]
    columns: GridColDef[]
    pageSize: number
}

interface IActions {
    onRowClick: (country: string) => void
}

/**
 * Table Component
 */
const BasicTable = (props: IProps & IActions) => {
    return (
        <div style={{ width: '100%', height: '34.375em' }}>
            <DataGrid
                rows={props.rows}
                columns={props.columns}
                pageSize={props.pageSize}
                onRowClick={(params) => {props.onRowClick(params.row.country)}}
            />
        </div>
    );
}

export default observer(BasicTable)