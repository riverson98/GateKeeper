import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from "../user/user.module";

@Module({
    providers: [],
    exports: [],
    controllers: [],
    imports: [ UserModule,
        JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
    }),],
})
export class AuthModule {}