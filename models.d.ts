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
        teamName?: string
        // teamLogo?; 
    }
}