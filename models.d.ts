declare module Models {
    interface BasicUserInforamtion {
        firstname: string, //facebook 
        lastname: string, //facebook 
        location: string, //user input
        status: string, //user input
        image?: string
    }

    interface Profile {
        firstname: string,
        lastname: string,
        position: string,
        location: string,
        status: string,
        image?: string,
        team_id?: number,
        teamname?: string,
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

    // Organizer service create tournaments
    interface PostTournamentBody {
        category: string;
        number_of_teams: string;
        game_size: string;
        organizer_id: string;
        tournament_name: string;
        winner_prize: string;
        runnerup_prize: string;
        entry_fee: string;
        date: string;
        location: string;
    }

    interface TeamInformation {
        teamname: string;
        numberOfPlayers: number;
        logo?: string;
        manager_firstname: string;
        manager_lastname: string;
    }

    interface TeamSquad {
        position: string;
        firstname: string;
        lastname: string;
        image?: string;
    }

    interface TeamFixtures {
        tournament_name: string;
        opponent_teamname: string;
        opponent_logo?: string;
        opponent_position: string;
        date: Date;
        park_name: string;
        district: string;
        street: string;
    }

    interface AddTournamentFixture {
        home_team: string;
        away_team: string;
        venue: string;
        date: Date;
    }
    
    interface TournamentFixtures {
        tournament_id: number;
        tournament_name: string;
        fixture_id: number;
        home_team_id: number;
        home_teamname: string;
        home_logo: string;
        away_team_id: number;
        away_teamname: string;
        away_logo: string;
        date: Date;
        park_name: string;
        district: string;
        street: string;
    }
}