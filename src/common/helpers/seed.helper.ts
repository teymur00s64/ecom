import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { runUserSeed } from "src/database/seed/default-user.seed";
import { DataSource } from "typeorm";

export async function runSeed() {
    const app = await NestFactory.create(AppModule)
    const dataSource = app.get(DataSource)

    await runUserSeed(dataSource)

    process.exit(1);
}
