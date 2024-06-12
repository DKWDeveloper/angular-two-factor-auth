export class User {
    constructor(
        public email: string,
        public userId: string,
        private token: string,
        private tokenExpire: Date
    ) { }

    get usertoken() {
        if (!this.tokenExpire || new Date() > this.tokenExpire) {
            return null;
        }
        return this.token;
    }
} 