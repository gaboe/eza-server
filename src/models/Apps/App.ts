type App = {
    description: AppDescription,
    menuItems: MenuItem[],
    pages: Page[],
};

type Page = {
    name: string,
    table: ViewTable
};

type ViewTable = {
    columns: ViewColumns[],
};

type ViewColumns = {
    schema: string,
    table: string,
    column: string
};

type MenuItem = {
    name: string,
    order: number,
};

type AppDescription = {
    name: string,
};

export { App, AppDescription };