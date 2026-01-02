export declare const register: ({ username, password }: {
    username: string;
    password: string;
}) => Promise<import("mongoose").Document<unknown, {}, import("../models/User").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/User").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const login: ({ username, password }: {
    username: string;
    password: string;
}) => Promise<{
    token: string;
    user: {
        id: number;
        username: string;
    };
}>;
//# sourceMappingURL=authService.d.ts.map