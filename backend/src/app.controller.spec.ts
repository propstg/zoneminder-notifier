import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { CameraDefinitionService } from "./cameraDefinitions/camera-definition.service";
import { CameraDefinition } from "./config/cameraDefinition";

describe("AppController", () => {
    let appController: AppController;
    let cameraDefinitionService: CameraDefinitionService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [
                CameraDefinitionService,
                {provide: "cameraDefinitions", useValue: []}
            ],
        }).compile();

        appController = app.get<AppController>(AppController);
        cameraDefinitionService = app.get<CameraDefinitionService>(CameraDefinitionService);
    });

    describe("getNotificationStatus", () => {
        it("should return definition from camera definition service", () => {
            const cameraDefinition = new CameraDefinition();
            const getDefinitionSpy = jest.spyOn(cameraDefinitionService, "getDefinition").mockReturnValue(cameraDefinition);

            const response = appController.getNotificationStatus("cameraId");

            expect(response).toBe(cameraDefinition);
            expect(getDefinitionSpy).toHaveBeenCalledWith("cameraId");
        });
    });

    describe("setNotificationStatus", () => {
        it("should call setnotifications with provided notify status", () => {
            const cameraDefinition = new CameraDefinition();
            cameraDefinition.notify = true;
            const setNotificationsSpy = jest.spyOn(cameraDefinitionService, "setNotifications").mockReturnValue(cameraDefinition);

            const response = appController.setNotificationStatus("cameraId", cameraDefinition);

            expect(response).toBe(cameraDefinition);
            expect(setNotificationsSpy).toHaveBeenCalledWith("cameraId", true);
        });
    });
});