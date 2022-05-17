const fs = require("fs");
const path = require("path");

export class SetBlockSerivce {
    private setSchedule = path.join(__dirname, "../", "../", "data", "setSchedule.json");
    private friendSetData = path.join(__dirname, "../", "../", "data", "savedSetData.json");

    private getSetDataFromFile(fileLocation: string) {
        let fileContents = {};

        if (fs.existsSync(fileLocation)) {
            fileContents = JSON.parse(fs.readFileSync(fileLocation));
        }

        return fileContents;
    }

    private saveSetDataToFile(fileLocation: string, data: SetData): void {
        fs.writeFileSync(fileLocation, JSON.stringify(data), { flags: "w+" });
    }

    public addPersonToSetTime(setId: number, name: string): Array<string> {
        const fileData = this.getSetDataFromFile(this.friendSetData);

        if (!fileData[setId]) {
            fileData[setId] = [];
        }

        fileData[setId].push(name);

        this.saveSetDataToFile(this.friendSetData, fileData)

        return fileData[setId];
    }

    public removePersonFromSetTime(setId: number, name: string): Array<string> {
        const fileData = this.getSetDataFromFile(this.friendSetData);
        fileData[setId] = fileData[setId].filter(x => x !== name);

        this.saveSetDataToFile(this.friendSetData, fileData)

        return fileData[setId];
    }

    public getAllSetData(): SetData {
        return this.getSetDataFromFile(this.friendSetData);
    }

    public getSetData(setId: number): Array<string> {
        const setData = this.getSetDataFromFile(this.friendSetData);

        return setData[setId];
    }

    public getSetSchedule(day: number): {[stageName: string]: Array<SetData>} {
        const dayData = this.getSetDataFromFile(this.setSchedule)[day];

        return dayData;
    }
}