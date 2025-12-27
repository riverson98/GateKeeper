import { JwtService } from "@nestjs/jwt";
import { UserContracts } from "src/modules/user/domain/contracts/user.contracts";

export class AuthenticateUserUseCase {
    constructor(private readonly userRepo: UserContracts, 
        private readonly jwtService: JwtService) {}
}