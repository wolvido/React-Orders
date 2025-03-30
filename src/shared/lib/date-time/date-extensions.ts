declare global {
    interface Date {
        toLocalISOString(): string;
    }
}

Date.prototype.toLocalISOString = function (): string {
    const pad = (num: number) => String(num).padStart(2, '0');

    const year = this.getFullYear();
    const month = pad(this.getMonth() + 1);
    const day = pad(this.getDate());
    const hours = pad(this.getHours());
    const minutes = pad(this.getMinutes());
    const seconds = pad(this.getSeconds());
    const milliseconds = String(this.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export {}; // Ensure this is treated as a module to avoid global scope conflicts

// Usage
const now = new Date();
console.log(now.toLocalISOString()); // Local time in ISO format