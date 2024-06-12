export interface UserResponse {
    success: boolean;
    status: string;
    message: string;
    statusCode: number;
    user: {
        name: string;
        email: string;
        token: string;
    };
}