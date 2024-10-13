import { Controller, Get } from "@nestjs/common";

@Controller('healthz')
export class HealthzController {
    @Get()
    async get() {
        return true;
    }
}