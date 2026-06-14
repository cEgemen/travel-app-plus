

type CREATE_VERIFICATION_DTO = {
     userId:number,
     code:string,
     type: "EMAIL_VERIFY" | "PASSWORD_RESET" | "TWO_FACTOR",
     channel: "EMAIL" | "SMS" | "PUSH",
}

type VERIFY_OTP_DTO = {
    userId:number,
    code:string,
    type: "EMAIL_VERIFY" | "PASSWORD_RESET" | "TWO_FACTOR",
    channel: "EMAIL" | "SMS" | "PUSH",
}
