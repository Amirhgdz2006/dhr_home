export declare const findByUsername: (username: string) => import("mongoose").Query<import("mongoose").Document<unknown, {}, import("../models/User").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/User").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, import("mongoose").Document<unknown, {}, import("../models/User").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/User").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, {}, import("../models/User").IUser, "findOne", {}>;
export declare const create: (data: {
    username: string;
    password: string;
}) => Promise<import("mongoose").Document<unknown, {}, import("../models/User").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/User").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=userRepository.d.ts.map