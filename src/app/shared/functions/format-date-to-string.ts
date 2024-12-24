const DateToString = (birthday: Date): string => {
    // Usa métodos UTC para evitar desfases por la zona horaria
    const year = birthday.getUTCFullYear();
    const month = String(birthday.getUTCMonth() + 1).padStart(2, '0');
    const day = String(birthday.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export default DateToString;
