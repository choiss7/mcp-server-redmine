import { z } from "zod";
declare const ConfigSchema: z.ZodObject<{
    redmine: z.ZodObject<{
        apiKey: z.ZodString;
        host: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        apiKey: string;
        host: string;
    }, {
        apiKey: string;
        host: string;
    }>;
    server: z.ZodObject<{
        name: z.ZodDefault<z.ZodString>;
        version: z.ZodDefault<z.ZodString>;
        port: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        version: string;
        port: number;
    }, {
        name?: string | undefined;
        version?: string | undefined;
        port?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    redmine: {
        apiKey: string;
        host: string;
    };
    server: {
        name: string;
        version: string;
        port: number;
    };
}, {
    redmine: {
        apiKey: string;
        host: string;
    };
    server: {
        name?: string | undefined;
        version?: string | undefined;
        port?: number | undefined;
    };
}>;
export type Config = z.infer<typeof ConfigSchema>;
declare let config: Config;
export default config;
//# sourceMappingURL=config.d.ts.map