const GRADE_POINTS = {
    'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'F': 0
};

const subjectContainer = document.getElementById('subject-container');
const addBtn = document.getElementById('add-subject');
const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn');
const resultCard = document.getElementById('result-card');

// Template for a new subject row
function createSubjectRow() {
    const div = document.createElement('div');
    div.className = "subject-row grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end animate-fade-in";
    div.innerHTML = `
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
            <input type="text" placeholder="e.g. Mathematics" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none">
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Credits</label>
            <input type="number" step="0.5" placeholder="Credits" class="subject-credits w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none">
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Grade</label>
            <select class="subject-grade w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                ${Object.keys(GRADE_POINTS).map(g => `<option value="${g}">${g}</option>`).join('')}
            </select>
        </div>
        <div class="flex justify-end">
            <button onclick="this.parentElement.parentElement.remove()" class="text-red-500 hover:text-red-700 p-2">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    subjectContainer.appendChild(div);
}

// Initial Rows
for(let i=0; i<4; i++) createSubjectRow();

addBtn.addEventListener('click', createSubjectRow);

calculateBtn.addEventListener('click', () => {
    const creditsInput = document.querySelectorAll('.subject-credits');
    const gradesInput = document.querySelectorAll('.subject-grade');
    
    let totalGradePoints = 0;
    let totalCredits = 0;
    let valid = true;

    creditsInput.forEach((input, index) => {
        const credit = parseFloat(input.value);
        const grade = gradesInput[index].value;
        
        if (!isNaN(credit) && credit > 0) {
            totalCredits += credit;
            totalGradePoints += (credit * GRADE_POINTS[grade]);
        } else if (input.value !== "") {
            valid = false;
        }
    });

    if (totalCredits > 0 && valid) {
        const sgpa = totalGradePoints / totalCredits;
        document.getElementById('sgpa-value').innerText = sgpa.toFixed(2);
        document.getElementById('total-info').innerText = `Based on ${totalCredits} total credits`;
        resultCard.classList.remove('hidden');
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
        alert("Please enter valid credits for your subjects.");
    }
});

resetBtn.addEventListener('click', () => {
    subjectContainer.innerHTML = '';
    for(let i=0; i<4; i++) createSubjectRow();
    resultCard.classList.add('hidden');
});