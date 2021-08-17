import { TextInput } from 'react-admin';

const postFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
    <TextInput label="Year" source="launch_year" defaultValue="2020" />,
];

export default postFilters