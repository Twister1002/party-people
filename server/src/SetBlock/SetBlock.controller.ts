import { Body, Controller, Delete, Get, Param, Put } from "@nestjs/common";
import { SetBlockSerivce } from "./SetBlock.service";

@Controller("setblock")
export class SetBlockController {
    constructor(private setblockService: SetBlockSerivce) {};

    @Get("")
    public getAllPeopleInSet(): SetData {
        return this.setblockService.getAllSetData();
    }

    @Get(":settimeId")
    public getPeopleInSet(
        @Param("settimeId") settimeId: number
    ): Array<string> {
        return this.setblockService.getSetData(settimeId);
    }

    @Put("add")
    public addPersonToSetTime(
        @Body("settimeId") settimeId: number,
        @Body("name") name: string
    ) {
        return this.setblockService.addPersonToSetTime(settimeId, name);   
    }

    @Delete("delete")
    public deletePersonFromSetTime(
        @Body("settimeId") settimeId: number,
        @Body("name") name: string
    ) {
        return this.setblockService.removePersonFromSetTime(settimeId, name);   
    }



    /**
     * I'm lazy.... Just using this controller for set days
     */

    @Get("day/:setDay")
    public getSetDay(
        @Param("setDay") setDay: number
    ) {
        return this.setblockService.getSetSchedule(setDay);
    }
}