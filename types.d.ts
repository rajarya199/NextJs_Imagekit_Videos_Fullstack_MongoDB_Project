import {Connection} from 'mongoose';

declare global{
    // db is conneced/ not/ promise on way to connection
    var mongoose:{
        conn:Connection | null;
        promise: Promise<Connection> | null;
    }
}

export{}