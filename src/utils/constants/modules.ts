import { AuthModule } from '../../auth/auth.module';
import { UserModule } from '../../api/user/user.module';

export const modules = { //For API Documentation
  auth: AuthModule,
  user: UserModule,
};
