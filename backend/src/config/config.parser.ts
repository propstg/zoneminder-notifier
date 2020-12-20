import { Provider } from "@nestjs/common";
import * as fs from "fs";
import * as yaml from "yaml";

const file = fs.readFileSync("../config.yaml", "utf8");
const config = yaml.parse(file);

const propertyProviders: Provider<any>[] = [];

for (const prop in config) {
    propertyProviders.push({
        provide: prop,
        useValue: config[prop],
    } as Provider<any>);
}

export const CONFIG_PROPERTIES = propertyProviders;