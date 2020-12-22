import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

describe("main", () => {
    let appMock;
    let fileWatchServiceMock;
    let nestFactoryCreateSpy;

    beforeEach(() => {
        jest.isolateModules(() => {
            appMock = {} as INestApplication;
            appMock.listen = jest.fn();
            appMock.get = jest.fn();

            fileWatchServiceMock = {};
            fileWatchServiceMock.start = jest.fn();
            (appMock.get as jest.Mock).mockReturnValue(fileWatchServiceMock);

            nestFactoryCreateSpy = jest
                .spyOn(NestFactory, "create")
                .mockReturnValue(appMock);

            require("./main");
        });
    });

    it("should create app using NestFactory", () => {
        expect(nestFactoryCreateSpy).toHaveBeenLastCalledWith(AppModule);
    });

    it("should call listen on port 3000", () => {
        expect(appMock.listen).toHaveBeenCalledWith(3000);
    });

    it("should call start on fileWatchService", () => {
        expect(appMock.get).toHaveBeenCalledTimes(1);
        expect(appMock.get).toHaveReturnedWith(fileWatchServiceMock);
        expect(fileWatchServiceMock.start).toHaveBeenCalledTimes(1);
    });
});