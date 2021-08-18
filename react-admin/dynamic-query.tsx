import {
    gql,
    DocumentNode
} from "@apollo/client";

import { DynamicListQuery, ListQueryVariables } from 'types.d'

interface Prop {
    name: string,
    type: string
}

const dynamicQuery = (
    resource: string,
    field: string,
    order: string,
    perPage: number,
    page: number,
    params: any,
    props: Prop[]): DynamicListQuery => {

    let propsString: string = ''
    let filterVariables: string = ''


    let queryVariables: ListQueryVariables = {
        sort: field,
        order: order,
        limit: perPage,
        offset: page
    }

    let findString: string = ''

    props.forEach((prop: Prop) => {
        propsString += prop.name + ","
        const filterTitle = `filter` + prop.name
        filterVariables += `$filter` + prop.name + ':' + prop.type + ","

        /** !!!: For some reason I can't use "params.filter[prop.name] here??? so filters are nnot working" */
        queryVariables[filterTitle] = params.filter.q
        findString += prop.name + `:$` + filterTitle + ","
    })

    const queryString = `query ` + resource + `($limit:Int, $offset:Int, $sort:String, $order:String, ` + filterVariables + ` ){ ` + resource + `(limit: $limit, offset: $offset, sort: $sort, order: $order, find: { ` + findString + ` }) { ` + propsString + ` }}`

    const constructedQuery: DocumentNode = gql(queryString)

    return {
        query: constructedQuery,
        variables: queryVariables
    }
}

export default dynamicQuery