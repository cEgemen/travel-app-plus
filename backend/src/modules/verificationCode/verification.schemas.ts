

type CREATE_VERIFICATION_DTO = {
     userId:number,
     code:string,
     type: "EMAIL_VERIFY" | "PASSWORD_RESET" | "TWO_FACTOR",
     channel: "EMAIL" | "SMS" | "PUSH",
}

type VERIFY_OTP_DTO = {
    userId:number,
    code:string,
    type?: "EMAIL_VERIFY" | "PASSWORD_RESET" | "TWO_FACTOR",
    channel?: "EMAIL" | "SMS" | "PUSH",
}


type GENERATE_ACCOUNT_ACTIVATION_DTO = {
    id:number,
    type?: "EMAIL_VERIFY" | "PASSWORD_RESET" | "TWO_FACTOR",
    channel?: "EMAIL" | "SMS" | "PUSH",
}

type VALIDATE_OTP_DTO = {
    email:string,
    code:string,
    type?: "EMAIL_VERIFY" | "PASSWORD_RESET" | "TWO_FACTOR",
    channel?: "EMAIL" | "SMS" | "PUSH",
}
