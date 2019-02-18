export class Session {
    public id: string;
    public date: string;

    public seats: SessionSeat[];
}

export class SessionSeat {
    public seat: string;
    public bow: boolean;
    public stroke: boolean;

    public data: any;
}
