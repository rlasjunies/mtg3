interface IDB{
        production: string,
        development: string,
        test: string    
}

interface ISecret{
    FACEBOOK_SECRET: string,
    GOOGLE_SECRET: string,
    JWT_SECRET: string,
    EMAIL_SECRET: string,
    SMTP_PASS: string,
    db: IDB
} 

var secret : ISecret = {
    FACEBOOK_SECRET: "bad10701c307ea59dfb2933d98c372e2",
    GOOGLE_SECRET: "zHGwmD7bLHOuPVn9QZlzOH5l",
    JWT_SECRET: "SECRET",
    EMAIL_SECRET: "SECRET",
    SMTP_PASS: "L@sjunies01",
    db: {
        production: "rlasjunies:1234",
        development: "",
        test: ""
    }
};
export = secret