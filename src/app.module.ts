import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { AppointmentModule } from './appointment/appointment.module';
import { PatientModule } from './patient/patient.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AppointmentModule, PatientModule, UserModule, AuthModule, DoctorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}