const DateToString = (birthday: Date): string => {
    // Usa métodos UTC para evitar desfases por la zona horaria
    const year = birthday.getFullYear();
    const month = String(birthday.getMonth() + 1).padStart(2, '0');
    const day = String(birthday.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export default DateToString;
