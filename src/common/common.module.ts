import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Module({})
export class CommonModule {
    imports: [AuthService]
}
