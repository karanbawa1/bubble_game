let timer = 60;
let score = 0;
let hitrn = null;

function make_bubble() {

    let clutter = "";
    for (let i = 0; i < 60; i++) {
        let num = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${num}</div>`;
    }
    document.querySelector("#pbottom").innerHTML = clutter;

    setTimeout(() => {
  document.querySelectorAll('.bubble').forEach(bub => {
    bub.style.transform = 'scale(1)';
    bub.style.opacity = '1';
  });
}, 50);
    
}

function run_timer() {
    let timer_int = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timer_val").textContent = `${timer}`;

            if (timer < 5) {
                document.querySelector("#timer_val").style.color = "red";
                document.querySelector("#last_count").textContent = `${timer}`;
            }
        } else {
            clearInterval(timer_int);
            document.querySelector("#pbottom").innerHTML = `
                <h1>Game Over!<br>You scored ${score}.</h1>
                <button id="play_again">Play Again!</button>`;

            document.querySelector("#last_count").textContent = "";

            // Attach event after button is added
            setTimeout(() => {
                document.querySelector("#play_again").addEventListener("click", function () {
                    // Reset game state
                    timer = 60;
                    score = 0;
                    document.querySelector("#timer_val").textContent = timer;
                    document.querySelector("#timer_val").style.color = "black";
                    document.querySelector("#score_val").textContent = score;
                    make_bubble();
                    get_new_hit();
                    run_timer();
                });
            }, 50);
        }
    }, 1000);
}

function get_new_hit() {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector("#hit_val").textContent = `${hitrn}`;
}

function increase_score() {
    score += 10;
    document.querySelector("#score_val").textContent = `${score}`;
}

function decrease_score() {
    score -= 5;
    document.querySelector("#score_val").textContent = `${score}`;
}

document.querySelector("#pbottom").addEventListener("click", function (details) {
    if (details.target.classList.contains("bubble")) {
        let clicked_num = Number(details.target.textContent);
        if (clicked_num === hitrn) {
            increase_score();
        } else {
            decrease_score();
        }
        make_bubble();
        get_new_hit();
    }
});

// Start the game
make_bubble();
run_timer();
get_new_hit();
