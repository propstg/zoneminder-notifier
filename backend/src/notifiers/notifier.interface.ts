import { CameraDefinition } from "src/config/cameraDefinition";

export interface Notifier {
    notify(alarmPath: string, cameraDefinition: CameraDefinition): Promise<void>;
}