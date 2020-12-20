import { Inject, Injectable } from "@nestjs/common";
import { CameraDefinition } from "src/config/cameraDefinition";
import { DiscordNotifier } from "./discord.notifier";
import { Notifier } from "./notifier.interface";

@Injectable()
export class NotifierService {
    private notifiers: Notifier[];

    constructor(
        @Inject("cameraDefinitions") private readonly cameraDefinitions: CameraDefinition[],
        @Inject("rootScanDirectory") private readonly rootScanDirectory: string,
        private readonly discordNotifier: DiscordNotifier,
    ) {
        this.notifiers = [discordNotifier];
    }

    async handleAlarm(alarmPath: string): Promise<void> {
        const cameraDefinition = this.getCameraDefinition(alarmPath);

        if (cameraDefinition.defaultNotify) {
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

        const cameraDefinition = this.cameraDefinitions.filter(definition => definition.id === cameraId);
        if (cameraDefinition.length > 0) {
            return cameraDefinition[0];
        }

        return {
            camera: `${cameraId} (definition not found)`,
            defaultNotify: false,
            id: "-1"
        }
    }
}