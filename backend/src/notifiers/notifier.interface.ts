import { CameraDefinition } from "../config/cameraDefinition";

export interface Notifier {
    notify(alarmPath: string, cameraDefinition: CameraDefinition): Promise<void>;
}