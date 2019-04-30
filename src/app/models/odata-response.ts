export class ODataResponse<T> {
    '@odata.nextLink': string;
    value: T;
}
