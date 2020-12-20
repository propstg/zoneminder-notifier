import { Inject, Injectable } from '@nestjs/common';
import {watch} from "chokidar";
import { NotifierService } from './notifiers/notifier.service';

@Injectable()
export class FileWatchService {
    constructor(
        @Inject("rootScanDirectory") private readonly rootScanDirectory: string,
        private readonly notifierService: NotifierService
    ){}

    start() {
        watch(`${this.rootScanDirectory}**\\alarm.jpg`, {
            ignoreInitial: true,
        }).on("add", async (path) => await this.notifierService.handleAlarm(path));

        this.notifierService.handleAlarm("D:\\Zoneminder2\\8\\2020-12-19\\855582\\alarm.jpg");
    }
}
