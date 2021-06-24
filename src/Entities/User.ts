class User implements IUser {
    private id: number;
    private firstName: string;
    private lastName: string;
    private identificationCard: string;
    private password: string;
    constructor(firstName: string, lastName: string, password:string, identificationCard: string, id?:number){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.identificationCard = identificationCard;
    }

    setPassword(){
        
    }
};

export default User;

