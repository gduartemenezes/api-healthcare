import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { AppointmentModule } from './appointment/appointment.module';
import { PatientModule } from './patient/patient.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AppointmentModule, PatientModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}