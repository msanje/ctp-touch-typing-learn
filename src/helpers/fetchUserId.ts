// utils/fetchUserId.ts
export async function fetchUserId(): Promise<string> {
    const response = await fetch("/api/userid");

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.userId;
}
