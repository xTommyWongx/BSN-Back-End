declare module Models{
    interface BasicUserInforamtion{
        firstname: string, //facebook 
        lastname: string, //facebook 
        location: string, //user input
        status: string, //user input
        image?: string
    }

    interface Profile{
        firstName: string,
        lastName: string,
        location: string,
        status: string,
        image?: string,
        teamName?: string,
        // teamLogo?: string
    }
    interface SignUpUser {
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        // confirm_password? : string; --> @Bal, we dun need confirmed password in backend. Instead, we check in front end and pass the password only to database
        status: string
    }
    interface LoginUser {
        email: string,
        password: string
    }
}