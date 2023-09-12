const PREFIX = "";

export const ROUTE_PATH = {
    LOGIN: `${PREFIX}/login`,
    REGISTER: `${PREFIX}/register`,
    MAINLAYOUT: `${PREFIX}/`,
};
export class Endpoint {
    static Auth = class {
        static Login = "/auth/login";
    }
};