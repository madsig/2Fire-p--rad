//model
const app = document.getElementById('app');
let setup = {
    "a1": '', "b1": '', "c1": '', "d1": '', "e1": '', "f1": '', "g1": '',
    "a2": '', "b2": '', "c2": '', "d2": '', "e2": '', "f2": '', "g2": '',
    "a3": '', "b3": '', "c3": '', "d3": '', "e3": '', "f3": '', "g3": '',
    "a4": '', "b4": '', "c4": '', "d4": '', "e4": '', "f4": '', "g4": '',
    "a5": '', "b5": '', "c5": '', "d5": '', "e5": '', "f5": '', "g5": '',
    "a6": '', "b6": '', "c6": '', "d6": '', "e6": '', "f6": '', "g6": '',
};
const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const number = [1, 2, 3, 4, 5, 6];
let black = false;

//view
show();
function show() {
    app.innerHTML = '';
    for (row = 5; row >= 0; row--) {
        for (col = 0; col < 7; col++) {
            let square = letter[col] + number[row]
            app.innerHTML += /*HTML*/`
                <div id="${square}" class="box">${setup[square]}</div>
            `;
        }
    }
}

//controller
app.addEventListener("click", handleClick);
function handleClick(event) {
    let square = event.target.id;
    if (square === "app") return;
    if (setup[square] != '') return;
    let oneUnder = square[0] + (parseInt(square[1]) - 1);

    if (square.includes('1') || setup[oneUnder] != '') {
        setup[square] = black ? '⚫' : '⚪';
        black = !black;
        show();
        if (checkForWin()) {
            setTimeout(function () {
                const winner = black ? '⚪' : '⚫';
                alert(`Gratulerer ${winner}! Du vant`);
                app.removeEventListener("click", handleClick);
            }, 200);
        }
    }
}

// ikke mitt |
//     :(    v

function checkForWin() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            let cell = letter[col] + number[row];
            let piece = setup[cell];
            if (piece && piece === setup[letter[col + 1] + number[row]] &&
                piece === setup[letter[col + 2] + number[row]] &&
                piece === setup[letter[col + 3] + number[row]]) {
                return true;
            }
        }
    }

    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            let cell = letter[col] + number[row];
            let piece = setup[cell];
            if (piece && piece === setup[letter[col] + number[row + 1]] &&
                piece === setup[letter[col] + number[row + 2]] &&
                piece === setup[letter[col] + number[row + 3]]) {
                return true;
            }
        }
    }

    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 3; row++) {
            let cell = letter[col] + number[row];
            let piece = setup[cell];
            if (piece && piece === setup[letter[col + 1] + number[row + 1]] &&
                piece === setup[letter[col + 2] + number[row + 2]] &&
                piece === setup[letter[col + 3] + number[row + 3]]) {
                return true;
            }
        }
    }

    for (let col = 0; col < 4; col++) {
        for (let row = 5; row > 2; row--) {
            let cell = letter[col] + number[row];
            let piece = setup[cell];
            if (piece && piece === setup[letter[col + 1] + number[row - 1]] &&
                piece === setup[letter[col + 2] + number[row - 2]] &&
                piece === setup[letter[col + 3] + number[row - 3]]) {
                return true;
            }
        }
    }

    return false;
}