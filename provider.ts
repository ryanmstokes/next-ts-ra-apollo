import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

import { Params } from 'types'

const apiUrl = 'https://api.spacex.land/graphql/'

const client = new ApolloClient({
    uri: apiUrl,
    cache: new InMemoryCache()
});

const httpClient = fetchUtils.fetchJson;

export default {


    /** !!: We are hijacking this initially for the first query - It seems with graphQL it would be difficult to make this getList and the RA provider system
     * dynamic like graphQL requiring object fields to be defined in the quuery and the fact that graphQL frowns upon constructing queries with strign concatonation.
     * Nevertheless other data-ra-graphql and similar libraries acheive this with introspection (and I presume recursion and subsequent queries) somehow (*if the shape 
     * of the queries/schema matches what RA expects). 
     * */

    getList: async (resource: string, params: Params) => {

        s        //** Get the params object passed by RA to the function to use for filtering,sorting and ordering */
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        /** Build the Query  
         * !!: My initial thoughts are to build this string dynamically using the provided "resource" 
         * (which is the string/name you pass the component (*see pages/index)), and using introspection 
         * to get all of the fields of the reequest we will make. I think this does not follow the philosophy 
         * of graphQL where they do not want unknown variables beinng delivered, only what you request specifically.
         * see: https://stackoverflow.com/questions/34199982/how-to-query-all-the-graphql-type-fields-without-writing-a-long-query 
        */
        const query = gql`query LaunchesPast($limit:Int, $offset:Int, $sort:String, $order:String, $filterMissionName:String, $filterYear:String){
                            launchesPast(limit:$limit, offset:$offset, sort:$sort, order: $order, find: {mission_name: $filterMissionName, launch_year: $filterYear}) {
                                id,
                                mission_name,
                                launch_year
                            }
                        }`

        /** Make the Apollo Client Query and deefine the variables that should be passed to the query */
        const result = await client
            .query({
                query: query,
                variables: {
                    sort: field,
                    order: order,
                    limit: perPage,
                    offset: page,
                    filterMissionName: params.filter.q,
                    filterYear: params.filter.launch_year
                }
            });

        return { data: result.data.launchesPast, total: 50 };
    },


    /** IGNORE: Everything from here is the default boilerplate for REST providers */
    getOne: (resource: string, params: Params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource: string, params: Params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource: string, params: Params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}` as string;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range')!.split('/').pop() as any, 10),
        }));
    },

    update: (resource: string, params: Params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource: string, params: Params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource: string, params: Params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete: (resource: string, params: Params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource: string, params: Params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
};