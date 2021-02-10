import { User } from "src/auth/schemas/user.schema";

export interface AdminRegistrationDto{
    userModel: Partial<User>;
    userRole: string;
}