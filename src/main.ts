import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { useContainer } from "class-validator";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix("api");

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      })
    );

    const config = new DocumentBuilder().setTitle("example api").setDescription("example endpoints").setVersion("1.0").build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.listen(process.env.PORT);
  } catch (err) {
    Logger.error({ err: err });
    process.exit();
  }
}
bootstrap();
