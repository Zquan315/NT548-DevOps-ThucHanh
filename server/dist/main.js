"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongoose = require("mongoose");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    mongoose.connection.on('connected', () => {
        console.log('Successfully connected to MongoDB Atlas');
    });
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map