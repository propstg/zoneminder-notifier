import { CameraDefinitionService } from "../cameraDefinitions/camera-definition.service";
import { DiscordNotifier } from "./discord.notifier";
import { NotifierService } from "./notifier.service";
import { sep as pathSeparator } from "path";

describe("NotifierService", () => {
    let cameraDefinitionServiceSpy: jest.SpyInstance;
    let discordNotifierSpy: jest.SpyInstance;
    let service: NotifierService;

    beforeEach(() => {
        const cameraDefinitionService = new CameraDefinitionService(null);
        cameraDefinitionServiceSpy = jest.spyOn(cameraDefinitionService, "getDefinition");
        const discordNotifier = new DiscordNotifier(null);
        discordNotifierSpy = jest.spyOn(discordNotifier, "notify");
        discordNotifierSpy.mockReturnValue(null);

        service = new NotifierService("rootScanDir/", cameraDefinitionService, discordNotifier);
    });

    it("should extract camera id out of alarmPath", async () => {
        cameraDefinitionServiceSpy.mockReturnValue({camera: "name", id: "1", notify: false});

        await service.handleAlarm(`rootScanDir/1${pathSeparator}2020-12-20${pathSeparator}123456${pathSeparator}alarm.jpg`);

        expect(cameraDefinitionServiceSpy).toHaveBeenCalledTimes(1);
        expect(cameraDefinitionServiceSpy).toHaveBeenCalledWith("1");
    });

    it("should skip sending notifications when camera definition is set to not notify", async () => {
        cameraDefinitionServiceSpy.mockReturnValue({camera: "name", id: "1", notify: false});

        await service.handleAlarm(`rootScanDir/1${pathSeparator}2020-12-20${pathSeparator}123456${pathSeparator}alarm.jpg`);

        expect(discordNotifierSpy).toHaveBeenCalledTimes(0);
    });

    it("should call notifiers when camera definition is set to notify", async () => {
        cameraDefinitionServiceSpy.mockReturnValue({camera: "name", id: "1", notify: true});

        await service.handleAlarm(`rootScanDir/1${pathSeparator}2020-12-20${pathSeparator}123456${pathSeparator}alarm.jpg`);

        expect(discordNotifierSpy).toHaveBeenCalledTimes(1);
    });
});