import { FileWatchService } from "./file-watch.service";
import { NotifierService } from "./notifiers/notifier.service";
import * as chokidar from "chokidar";
import { sep as pathSeparator } from "path";

describe("FileWatchService", () => {
    let chokidarWatchResponse;
    let chokidarWatchMock;
    let notifierService: NotifierService;
    let fileWatchService: FileWatchService;

    beforeEach(() => {
        chokidarWatchResponse = { on: jest.fn() };

        chokidarWatchMock = jest.spyOn(chokidar, "watch")
            .mockImplementation((paths, options) => chokidarWatchResponse);

        notifierService = {} as NotifierService;
        notifierService.handleAlarm = jest.fn();

        fileWatchService = new FileWatchService("rootScanDirectory/", notifierService);
    });

    it("should call watch with rootScanDirectory from config", () => {
        fileWatchService.start();

        expect(chokidarWatchMock).toHaveBeenCalledTimes(1);
        expect(chokidarWatchMock).toHaveBeenCalledWith(`rootScanDirectory/**${pathSeparator}alarm.jpg`, {ignoreInitial: true});
    });

    it("should register add event listener with chokidar", () => {
        fileWatchService.start();

        expect(chokidarWatchResponse.on).toHaveBeenCalledTimes(1);
        expect(chokidarWatchResponse.on).toHaveBeenCalledWith("add", expect.anything());
    });

    it("should pass watch's add event on to notifier service", async () => {
        fileWatchService.start();

        expect(notifierService.handleAlarm).toHaveBeenCalledTimes(0);

        const addHandler = chokidarWatchResponse.on.mock.calls[0][1];
        await addHandler("path to alarm");

        expect(notifierService.handleAlarm).toHaveBeenCalledTimes(1);
        expect(notifierService.handleAlarm).toHaveBeenCalledWith("path to alarm");
    });
});