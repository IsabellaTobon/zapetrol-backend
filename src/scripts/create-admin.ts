import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const adminEmail = 'admin@test.com';

  // Verifica si ya existe
  const exists = await usersService.findByEmail(adminEmail);
  if (exists) {
    await app.close();
    return;
  }

  // Crea el admin
  const hashedPassword = await bcrypt.hash('Admin123', 10);
  await usersService.create({
    name: 'Administrador',
    email: adminEmail,
    password: hashedPassword,
    role: 'admin',
  });

  await app.close();
}

bootstrap().catch((err) => {
  console.error('Error creando admin:', err);
  process.exit(1);
});
