interface IMapSql<From, To> {
    map(from: From): To;
}

export { IMapSql };