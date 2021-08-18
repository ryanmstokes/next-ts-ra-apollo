import * as React from "react";
import { List, Datagrid, TextField } from 'react-admin';
import search from 'components/search/'

const Missions = (props: any) => {
    return (
        <List {...props} filters={search} filter={{ title: props.options.title, query: props.options.query, props: props.options.props }}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="mission_name" />
                <TextField source="launch_year" />
            </Datagrid>
        </List>
    )
};

export default Missions
