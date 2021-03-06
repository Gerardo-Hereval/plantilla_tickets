const path = require('path');
const fs = require ('fs');


class Ticket{
    constructor(numero,escritorio){
        this.numero =numero;
        this.escritorio=escritorio;
        }
}

class TicketControl{
    constructor (){
        this.ultimo     =0;
        this.hoy        =new Date().getDate();
        this.tickets    = [];
        this.ultimos5    = [];

        this.init();
    };
    get toJson(){
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos5: this.ultimos5
        }
    };

    init(){
        const {hoy, tickets, ultimo, ultimos5 } = require('../db/data.json');
        if (hoy === this.hoy) {
            this.tickets    = tickets;
            this.ultimo     =ultimo;
            this.ultimos5   =ultimos5;
        }
        else {
            this.guardarDB();
        }
    };

    guardarDB(){
        const dbPath= path.join(__dirname,'../db/data.json');
        fs.writeFileSync(dbPath,JSON.stringify(this.toJson));
    };
    siguiente(){
        this.ultimo+= 1;
        const ticket = new Ticket(this.ultimo,null);
        this.tickets.push(ticket);
        
        this.guardarDB();
        return 'Ticket '+ ticket.numero;
    }

    atenderTicket(escritorio){
        //no tenemos tickets

        if (this.tickets.length===0) {
            return null;
        }

        const ticket=this.tickets.shift(); //borrarlo y lo retorna
        ticket.escritorio = escritorio;

        this.ultimos5.unshift(ticket);//agregarlo al inicio

        if (this.ultimos5.length >5){
            this.ultimos5.splice(-1,1)
        }
        this.guardarDB();

        return ticket;
    }
}

module.exports = TicketControl;