interface Params {
    filter: any,
    pagination: any,
    sort: any,
    data: any,
    id: any,
    ids: any,
    target: any
}

interface DynamicListQuery {
    query: DocumentNode,
    variables: {
        sort: string,
        order: string,
        limit: number,
        offset: number,
    }
}

interface ListQueryVariables {
    sort: string,
    order: string,
    limit: number,
    offset: number,
    [name: string]: string | number
}

export { Params, DynamicListQuery, ListQueryVariables }