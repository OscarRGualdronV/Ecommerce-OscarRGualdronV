import { SetMetadata } from "@nestjs/common";
import { Role } from "../users/enum/rol.enum";

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);