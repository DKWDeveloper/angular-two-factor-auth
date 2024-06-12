export class Register {
    name: string | undefined;
    email!: string;
    password!: string;
    confirmPassword!: string;
    terms!: boolean
}

export class Forgot {
    email: string = '';
}

export class Otp {
    otp: string = '';
}

export class Reset {
    password: string = '';
    confirmPassword: string = '';
}