export function getAgeRange(dobString) {
    const dob = new Date(dobString);
    const now = new Date();

    const years = now.getFullYear() - dob.getFullYear();
    const months = now.getMonth() - dob.getMonth();
    const totalMonths = years * 12 + months;

    if (totalMonths < 0) return "Invalid DOB";

    if (totalMonths <= 3) return "0–3";

    const start = Math.floor(totalMonths / 3) * 3 + 1;
    const end = start + 2;

    return `${start}–${end}`;
}

{/* 

| Range            | Example |
| ---------------- | ------- |
| **0–3 months**   | 0–3     |
| **4–6 months**   | 4–6     |
| **7–9 months**   | 7–9     |
| **10–12 months** | 10–12   |
| **13–15 months** | 13–15   |
| **16–18 months** | 16–18   |
| **19–21 months** | 19–21   |
| **22–24 months** | 22–24   |
| **25–27 months** | 25–27   |
| **28–30 months** | 28–30   |
| **31–33 months** | 31–33   |
| **34–36 months** | 34–36   |
| **37–39 months** | 37–39   |
| **40–42 months** | 40–42   |
| **43–45 months** | 43–45   |
| **46–48 months** | 46–48   |
| **49–51 months** | 49–51   |
| **52–54 months** | 52–54   |
| **55–57 months** | 55–57   |
| **58–60 months** | 58–60   |
| **61+ months**   | 61+     |

*/}