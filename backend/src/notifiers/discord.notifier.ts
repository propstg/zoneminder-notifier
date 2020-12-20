import { Inject, Injectable } from "@nestjs/common";
import { CameraDefinition } from "../config/cameraDefinition";
import { DiscordConfig } from "../config/discordConfig";
import { Notifier } from "./notifier.interface";
import fetch from "node-fetch";
import * as fs from "fs";
import * as FormData from "form-data";

@Injectable()
export class DiscordNotifier implements Notifier {
    constructor(
        @Inject("discordConfig") private readonly discordConfig: DiscordConfig
    ) {}

    async notify(alarmPath: string, cameraDefinition: CameraDefinition): Promise<void> {
        if (!this.discordConfig.enabled) {
            return;
        }

        const formData = new FormData();
        // @ts-ignore 
        formData.append('file', fs.createReadStream(alarmPath));
        formData.append('payload_json', JSON.stringify({content: `Motion detected on camera ${cameraDefinition.camera}`}));

        const options = {
            method: 'POST',
            body: formData,
        };

        try {
            // @ts-ignore 
            var response = await fetch(this.discordConfig.webhookUrl, options);
            console.log(response);
        } catch(e) {
            console.log(e);
            throw(e);
        }
    }
}