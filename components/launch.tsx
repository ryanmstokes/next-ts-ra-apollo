import { useQuery, gql } from "@apollo/client";
import client from "../apollo-client";

const QUERY = gql`
    query {
        launchesPast {
        mission_name
        }
	}
`

const Launch = () => {
    const { data, loading, error } = useQuery(QUERY);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        console.error(error);
        return null;
    }
    const lastLaunch = data.launchesPast[0].mission_name

    return (
        <h1>{lastLaunch}</h1>
    )

}
export default Launch