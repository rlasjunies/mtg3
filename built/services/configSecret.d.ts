export interface IDB {
    production: string;
    development: string;
    test: string;
}
export interface ISecret {
    FACEBOOK_SECRET: string;
    GOOGLE_SECRET: string;
    JWT_SECRET: string;
    EMAIL_SECRET: string;
    SMTP_PASS: string;
    db: IDB;
}
export declare var secret: ISecret;
