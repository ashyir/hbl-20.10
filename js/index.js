let current_pattern = -1;
let pattern_array = shuffle(Array.from({ length: 8 }, (_, i) => i + 1));

$(document).on("click", "#logo", selectPattern);

function shuffle(array) {
    let tmp, current, top = array.length;
    if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }

    console.log(array);
    return array;
}

function showCurrentPattern() {
    current_pattern = pattern_array.pop();
    $(`#pattern_${current_pattern}`).removeClass("pattern-disable");
}

function selectPattern() {
    $(`#pattern_${current_pattern}`).addClass("pattern-ignore");

    switch (pattern_array.length) {
        case 1: showCurrentPattern(); return;
        case 0: location.reload();
    }

    let timer = 0;
    let current_position = -1;

    const pattern_interval = setInterval(() => {
        let random_position = Math.floor(Math.random() * pattern_array.length);

        $(`#pattern_${pattern_array[current_position]}`).toggleClass("pattern-disable");
        $(`#pattern_${pattern_array[random_position]}`).toggleClass("pattern-disable");

        current_position = random_position;

        if (30 === timer++) {
            $(`#pattern_${pattern_array[current_position]}`).toggleClass("pattern-disable");

            showCurrentPattern();
            clearInterval(pattern_interval);
        }
    }, 100);
}