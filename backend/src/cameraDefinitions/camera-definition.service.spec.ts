import { CameraDefinition } from "src/config/cameraDefinition";
import { CameraDefinitionService } from "./camera-definition.service";

describe("CameraDefinitionService", () => {
    let definitions: CameraDefinition[];
    let service : CameraDefinitionService;

    beforeEach(() => {
        definitions = [{
            camera: "Camera",
            id: "1",
            notify: true
        },{
            camera: "Camera 2",
            id: "2",
            notify: false
        }];
        service = new CameraDefinitionService(definitions);
    });

    describe("getDefinition", () => {
        it("should return camera definition when matching camera found", () => {
            const returnedDefinition = service.getDefinition("1");
            expect(returnedDefinition).toBe(definitions[0]);
        });

        it("should return not found definition when no matching camera found", () => {
            const returnedDefinition = service.getDefinition("x");
            expect(returnedDefinition).toStrictEqual({
                camera: "x (definition not found)",
                notify: false,
                id: "-1"
            });
        });
    });

    describe("setNotifications", () => {
        it("should update notify and return camera definition when matching camera found", () => {
            const returnedDefinition = service.setNotifications("2", true)
            expect(returnedDefinition).toStrictEqual({
                camera: "Camera 2",
                id: "2",
                notify: true
            });
        });

        it("should return not found definition when no matching camera found", () => {
            const returnedDefinition = service.setNotifications("x", true)
            expect(returnedDefinition).toStrictEqual({
                camera: "x (definition not found)",
                notify: false,
                id: "-1"
            });
        });
    });
});