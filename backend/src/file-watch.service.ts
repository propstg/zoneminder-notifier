import { Inject, Injectable } from "@nestjs/common";
import { watch } from "chokidar";
import { NotifierService } from "./notifiers/notifier.service";
import { sep as pathSeparator } from "path";

@Injectable()
export class FileWatchService {
    constructor(
        @Inject("rootScanDirectory") private readonly rootScanDirectory: string,
        private readonly notifierService: NotifierService
    ){}

    start() {
        watch(`${this.rootScanDirectory}**${pathSeparator}alarm.jpg`, {
            ignoreInitial: true,
        }).on("add", async (path) => await this.notifierService.handleAlarm(path));
    }
}
