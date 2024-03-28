import { toast } from 'react-toastify';

export const notifySuccess = (msg, position) => {
    toast.success(msg, { position: position });
}

export const notifyError = (msg, position) => {
    toast.error(msg, { position: position });
}

export const parseDate = (dateString)=>{
    if (!dateString || typeof dateString !== 'string') {
        throw new Error('Invalid input date string');
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Add 1 to month because it is zero-indexed
    const day = date.getDate();

    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    return formattedDate;
}

