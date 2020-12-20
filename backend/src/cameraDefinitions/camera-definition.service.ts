import { Inject, Injectable } from "@nestjs/common";
import { CameraDefinition } from "src/config/cameraDefinition";

@Injectable()
export class CameraDefinitionService {
    constructor(@Inject("cameraDefinitions") private readonly cameraDefinitions: CameraDefinition[]) {}

    getDefinition(cameraId: string): CameraDefinition {
        const cameraDefinition = this.cameraDefinitions.filter(definition => definition.id === cameraId);
        if (cameraDefinition.length > 0) {
            return cameraDefinition[0];
        }

        return this.createCameraNotFoundDefinition(cameraId);
    }

    setNotifications(cameraId: string, sendNotifications: boolean): CameraDefinition {
        const cameraDefinition = this.cameraDefinitions.filter(definition => definition.id === cameraId);
        if (cameraDefinition.length > 0) {
            cameraDefinition[0].notify = sendNotifications;
            return cameraDefinition[0];
        }

        return this.createCameraNotFoundDefinition(cameraId);
    }

    private createCameraNotFoundDefinition(cameraId: string) {
        return {
            camera: `${cameraId} (definition not found)`,
            notify: false,
            id: "-1"
        }
    }
}