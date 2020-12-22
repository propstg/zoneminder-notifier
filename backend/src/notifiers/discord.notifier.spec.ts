import * as fs from "fs";
import * as FormData from "form-data";
import fetch from "node-fetch";
import { DiscordConfig } from "../config/discordConfig";
import { DiscordNotifier } from "./discord.notifier";
import { CameraDefinition } from "../config/cameraDefinition";
const { Response } = jest.requireActual("node-fetch");

jest.mock("node-fetch");
jest.mock("form-data");

describe("DiscordNotifier", () => {
    let discordConfig: DiscordConfig;
    let fsCreateReadStreamMock;
    let cameraDefinition: CameraDefinition;

    beforeEach(() => {

        discordConfig = new DiscordConfig();
        discordConfig.enabled = true;
        discordConfig.webhookUrl = "webhookUrl";

        fsCreateReadStreamMock = jest.spyOn(fs, "createReadStream").mockReturnValue(null);

        cameraDefinition = new CameraDefinition();
        cameraDefinition.camera = "mock camera";

        fetch.mockReturnValue(Promise.resolve(new Response("please work")));
    });

    it("should skip processing if discord is disabled", async () => {
        const notifier = new DiscordNotifier({enabled: false} as DiscordConfig);

        await notifier.notify("alarm path", cameraDefinition);
        
        expect(fetch).toHaveBeenCalledTimes(0);
    });

    it("should call webhook URL from config", async () => {
        const notifier = new DiscordNotifier(discordConfig);
        await notifier.notify("alarm path", cameraDefinition);
        
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("webhookUrl", expect.anything());
    });

    it("should rethrow exception", async () => {
        fetch.mockRejectedValue(new Error("test exception"));

        try {
            const notifier = new DiscordNotifier(discordConfig);
            await notifier.notify("alarm path", cameraDefinition);
            fail("Should have thrown exception");
        } catch(e) {
            expect(e.message).toBe("test exception");
        }

    });
});