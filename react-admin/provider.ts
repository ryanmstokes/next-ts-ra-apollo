import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import {
    ApolloClient,
    InMemoryCache,
    gql,
    DocumentNode
} from "@apollo/client";

import { Params } from 'types'

import dynamicQuery from 'react-admin/dynamic-query'

const apiUrl = 'https://api.spacex.land/graphql/'

const client = new ApolloClient({
    uri: apiUrl,
    cache: new InMemoryCache()
});

const httpClient = fetchUtils.fetchJson;

/**
 * React-Admin dataProvider
 * see: https://marmelab.com/react-admin/DataProviders.html
 * @returns 
 */

export default {

    getList: async (resource: string, params: any) => {

        //** Get the params object passed by RA to the function to use for filtering,sorting and ordering */
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const result = await client
            .query(dynamicQuery(params.filter.query, field, order, perPage, page, params, params.filter.props));

        return { data: result.data.launchesPast, total: 50 };
    },



    /************************************************************************************ */



    /** IGNORE: Everything from here is the default boilerplate for REST providers */
    getOne: (resource: string, params: Params) =>
        httpClient(`${apiUrl} /${resource}/${params.id} `).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource: string, params: Params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl} /${resource}?${stringify(query)}`;
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