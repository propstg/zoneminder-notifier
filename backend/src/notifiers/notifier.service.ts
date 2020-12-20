import { Inject, Injectable } from "@nestjs/common";
import { CameraDefinitionService } from "../cameraDefinitions/camera-definition.service";
import { CameraDefinition } from "../config/cameraDefinition";
import { DiscordNotifier } from "./discord.notifier";
import { Notifier } from "./notifier.interface";

@Injectable()
export class NotifierService {
    private notifiers: Notifier[];

    constructor(
        @Inject("rootScanDirectory") private readonly rootScanDirectory: string,
        private readonly cameraDefinitionService: CameraDefinitionService,
        private readonly discordNotifier: DiscordNotifier,
    ) {
        this.notifiers = [discordNotifier];
    }

    async handleAlarm(alarmPath: string): Promise<void> {
        const cameraDefinition = this.getCameraDefinition(alarmPath);

        if (cameraDefinition.notify) {
            for (const notifier of this.notifiers) {
                await notifier.notify(alarmPath, cameraDefinition);
            }
        } else {
            console.log(`Skipping notification for camera ${cameraDefinition.camera}`)
        }
    }

    private getCameraDefinition(alarmPath: string): CameraDefinition {
        let cameraId = alarmPath.replace(this.rootScanDirectory, "");
        cameraId = cameraId.substr(0, cameraId.indexOf("\\"));

        return this.cameraDefinitionService.getDefinition(cameraId);
    }
}