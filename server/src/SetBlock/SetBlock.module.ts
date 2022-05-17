import { Module } from "@nestjs/common";
import { SetBlockController } from "./SetBlock.controller";
import { SetBlockSerivce } from "./SetBlock.service";

@Module({
    controllers: [SetBlockController],
    providers: [SetBlockSerivce]
})
export class SetBlockModule {}