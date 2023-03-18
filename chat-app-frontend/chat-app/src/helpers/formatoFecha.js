import moment from 'moment';



export const fechaMensaje = (fecha) => {

    const fechaFormateada = moment(fecha)

    return fechaFormateada.format('HH:mm a | MMMM Do')
}