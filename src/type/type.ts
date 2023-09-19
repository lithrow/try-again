export interface loginConfig {
    username: string,
    password: string,
    code: string
}


export interface routeType {
    name: string,
    path: string,
    meta?: any,
    component: any
}

export interface child {
    component: string,
    meta: meta,
    name: string,
    path: string
}
export interface meta {
    title: string,
    icon: string,
    roles: string[]
}

export interface menuType {
    children?: child[],
    component: string,
    name: string,
    path: string,
    meta: meta
}

export interface tabType {
    name: string,
    title: string
}

export interface hisType {
    url: string,
    path: string[]
}