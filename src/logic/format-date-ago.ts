export function formatDateAgo(date: string | null) : string {
   
    if(!date) return "";
    const milliseconds = new Date().getTime() - new Date(date).getTime();
    const hours = milliseconds / (1000 * 60 * 60);
    const days = Math.floor(hours / 24);

    return (
        days >= 30 ? `${Math.floor(days / 30)} ${days < (30 * 2) ? "mês" : "meses"} atrás` 
        : days < 1 ? `${Math.floor(hours)} ${Math.floor(hours) < 2 ? "hora" : "horas"} atrás`
        : `${days} ${days === 1 ? "dia" : "dias"} atrás`
    )
    
}